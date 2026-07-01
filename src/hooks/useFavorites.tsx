import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getSupabase, type FavoriteRow } from "~/lib/supabase";
import { useAuth } from "./useAuth";

const LS_KEY = "namcraft:favorites";

interface FavoritesContextValue {
  favorites: string[];
  isFavorite: (templateId: string) => boolean;
  toggleFavorite: (templateId: string) => void;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function readLocal(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load: from cloud when signed in, else localStorage.
  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      const supabase = getSupabase();
      if (user && supabase) {
        const { data } = await supabase
          .from("favorites")
          .select("*")
          .eq("user_id", user.id);
        if (!active) return;
        const cloudIds = ((data as FavoriteRow[] | null) ?? []).map((r) => r.template_id);

        // Merge any guest favorites into the cloud on first sign-in.
        const local = readLocal();
        const missing = local.filter((id) => !cloudIds.includes(id));
        if (missing.length) {
          await supabase
            .from("favorites")
            .insert(missing.map((template_id) => ({ user_id: user.id, template_id })));
          writeLocal([]);
        }
        setFavorites(Array.from(new Set([...cloudIds, ...missing])));
      } else {
        setFavorites(readLocal());
      }
      if (active) setLoading(false);
    }
    void load();
    return () => {
      active = false;
    };
  }, [user]);

  const toggleFavorite = useCallback(
    (templateId: string) => {
      setFavorites((prev) => {
        const has = prev.includes(templateId);
        const next = has ? prev.filter((id) => id !== templateId) : [...prev, templateId];

        const supabase = getSupabase();
        if (user && supabase) {
          if (has) {
            void supabase
              .from("favorites")
              .delete()
              .eq("user_id", user.id)
              .eq("template_id", templateId);
          } else {
            void supabase
              .from("favorites")
              .insert({ user_id: user.id, template_id: templateId });
          }
        } else {
          writeLocal(next);
        }
        return next;
      });
    },
    [user],
  );

  const isFavorite = useCallback(
    (templateId: string) => favorites.includes(templateId),
    [favorites],
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({ favorites, isFavorite, toggleFavorite, loading }),
    [favorites, isFavorite, toggleFavorite, loading],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
