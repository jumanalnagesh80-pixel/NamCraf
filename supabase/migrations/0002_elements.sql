-- ============================================================================
-- Adds the `elements` column to template_designs for existing projects that
-- already ran 0001_init.sql. New installs get it from 0001 directly.
-- Stores the array of graphic elements (shapes + stickers) placed on a design.
-- ============================================================================

alter table public.template_designs
  add column if not exists elements jsonb not null default '[]'::jsonb;
