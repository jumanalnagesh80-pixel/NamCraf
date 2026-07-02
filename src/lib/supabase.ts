/**
 * Supabase client — the auth + database layer (the same technology that powers
 * "Lovable Cloud"). The client is only created when env vars are present, so the
 * app degrades gracefully to localStorage-only for guests when unconfigured.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isCloudEnabled = Boolean(url && anonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isCloudEnabled) return null;
  if (typeof window === "undefined") return null; // client-side only
  if (!client) {
    client = createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return client;
}

// ---- Row types --------------------------------------------------------------

export interface ProfileRow {
  id: string;
  name: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export interface FavoriteRow {
  id: string;
  user_id: string;
  template_id: string;
  created_at: string;
}

export interface TemplateDesignRow {
  id: string;
  user_id: string;
  template_id: string;
  headline: string;
  tagline: string;
  palette_id: string;
  font_id: string;
  dark_text: boolean;
  headline_size: number;
  background_image: string | null;
  elements: unknown | null;
  bg_filters: unknown | null;
  updated_at: string;
}
