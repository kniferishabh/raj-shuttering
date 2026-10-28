ALTER TABLE "site_settings"
ADD COLUMN IF NOT EXISTS "page_content" JSONB NOT NULL DEFAULT '{}'::jsonb;
