-- ============================================================================
-- Adds the `bg_filters` column to template_designs for existing projects.
-- Stores background-image photo adjustments (brightness/contrast/etc.).
-- ============================================================================

alter table public.template_designs
  add column if not exists bg_filters jsonb not null default '{}'::jsonb;
