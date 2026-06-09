import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let adminClient: SupabaseClient | null = null;

function getSupabaseUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || process.env.SUPABASE_URL?.trim();
}

function getSupabaseKey(): string | undefined {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  );
}

export function isSupabaseRestEnabled(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseKey());
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (adminClient) {
    return adminClient;
  }

  const url = getSupabaseUrl();
  const key = getSupabaseKey();
  if (!url || !key) {
    return null;
  }

  adminClient = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return adminClient;
}
