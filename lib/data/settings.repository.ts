import type { BusinessSettings } from '@/lib/types';
import {
  prisma,
  readJsonFile,
  readFromBackend,
  writeJsonFile,
  getSupabaseAdmin,
  preferPrisma,
  preferSupabaseRest,
} from './client';
import {
  SETTINGS_ID,
  settingsFromPrisma,
  settingsFromSupabase,
  settingsToPrisma,
  settingsToSupabase,
} from './mappers';

async function getFromPrisma(): Promise<BusinessSettings | null> {
  const row = await prisma.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
  return row ? settingsFromPrisma(row) : null;
}

async function getFromSupabase(): Promise<BusinessSettings | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', SETTINGS_ID)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data ? settingsFromSupabase(data) : null;
}

async function saveToPrisma(settings: BusinessSettings): Promise<void> {
  await prisma.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: settingsToPrisma(settings),
    update: settingsToPrisma(settings),
  });
}

async function saveToSupabase(settings: BusinessSettings): Promise<void> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    throw new Error('Supabase not configured');
  }

  const { error } = await supabase.from('site_settings').upsert(settingsToSupabase(settings));
  if (error) {
    throw error;
  }
}

export async function getSiteSettings(): Promise<BusinessSettings | null> {
  return readFromBackend(
    getFromSupabase,
    getFromPrisma,
    async () => readJsonFile<BusinessSettings>('settings.json'),
  );
}

export async function saveSiteSettings(settings: BusinessSettings): Promise<void> {
  if (preferSupabaseRest()) {
    await saveToSupabase(settings);
    return;
  }

  if (preferPrisma()) {
    await saveToPrisma(settings);
    return;
  }

  writeJsonFile('settings.json', settings);
}

export async function hasSiteSettings(): Promise<boolean> {
  try {
    const settings = await getSiteSettings();
    return settings !== null;
  } catch {
    return false;
  }
}
