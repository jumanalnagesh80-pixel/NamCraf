-- ============================================================================
-- Adds the `body_font_id` column to template_designs.
-- Stores the body / supporting-copy font from the curated font pairing, so a
-- design keeps both its heading font (`font_id`) and its paired body font.
-- Existing rows fall back to the app's default body font at read time.
-- ============================================================================

alter table public.template_designs
  add column if not exists body_font_id text;
