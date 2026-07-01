import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabase, isCloudEnabled, type ProfileRow } from "~/lib/supabase";

export interface Profile {
  id: string;
  name: string;
  avatarUrl: string | null;
}

interface AuthResult {
  error: string | null;
}

interface AuthContextValue {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  cloudEnabled: boolean;
  signInWithPassword: (email: string, password: string) => Promise<AuthResult>;
  signUpWithPassword: (email: string, password: string, name: string) => Promise<AuthResult>;
  signInWithGoogle: () => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const CLOUD_DISABLED_MSG =
  "Cloud is not connected. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable sign-in.";

function deriveProfile(user: User, row?: ProfileRow | null): Profile {
  const meta = user.user_metadata ?? {};
  return {
    id: user.id,
    name:
      row?.name ||
      (meta.full_name as string) ||
      (meta.name as string) ||
      user.email?.split("@")[0] ||
      "Studio Member",
    avatarUrl: row?.avatar_url || (meta.avatar_url as string) || null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(isCloudEnabled);

  const loadProfile = useCallback(async (u: User) => {
    const supabase = getSupabase();
    if (!supabase) {
      setProfile(deriveProfile(u));
      return;
    }
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", u.id)
      .maybeSingle();

    const derived = deriveProfile(u, data as ProfileRow | null);
    setProfile(derived);

    // Upsert a profile row on first sign-in so the profiles table stays in sync.
    if (!data) {
      await supabase.from("profiles").upsert({
        id: u.id,
        name: derived.name,
        avatar_url: derived.avatarUrl,
        updated_at: new Date().toISOString(),
      });
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    let active = true;

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (!active) return;
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) void loadProfile(u);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) void loadProfile(u);
      else setProfile(null);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [loadProfile]);

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) return { error: CLOUD_DISABLED_MSG };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signUpWithPassword = useCallback(
    async (email: string, password: string, name: string) => {
      const supabase = getSupabase();
      if (!supabase) return { error: CLOUD_DISABLED_MSG };
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name, name } },
      });
      return { error: error?.message ?? null };
    },
    [],
  );

  const signInWithGoogle = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return { error: CLOUD_DISABLED_MSG };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/favorites` },
    });
    return { error: error?.message ?? null };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      loading,
      cloudEnabled: isCloudEnabled,
      signInWithPassword,
      signUpWithPassword,
      signInWithGoogle,
      signOut,
    }),
    [user, profile, loading, signInWithPassword, signUpWithPassword, signInWithGoogle, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
