-- ============================================================================
-- NAMCRAFT Graphic Studio — initial schema
-- Run this in your Supabase project's SQL editor (Database > SQL).
-- Creates profiles, favorites and template_designs, all protected by
-- Row Level Security so a user can only ever read/write their own rows.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- profiles: one row per auth user (name + avatar)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  name       text,
  avatar_url text,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by their owner" on public.profiles;
create policy "Profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- favorites: bookmarked template ids
-- ----------------------------------------------------------------------------
create table if not exists public.favorites (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  template_id text not null,
  created_at  timestamptz not null default now(),
  unique (user_id, template_id)
);

create index if not exists favorites_user_id_idx on public.favorites (user_id);

alter table public.favorites enable row level security;

drop policy if exists "Users manage their own favorites (select)" on public.favorites;
create policy "Users manage their own favorites (select)"
  on public.favorites for select
  using (auth.uid() = user_id);

drop policy if exists "Users manage their own favorites (insert)" on public.favorites;
create policy "Users manage their own favorites (insert)"
  on public.favorites for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users manage their own favorites (delete)" on public.favorites;
create policy "Users manage their own favorites (delete)"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- template_designs: a user's saved edits for a given template
-- ----------------------------------------------------------------------------
create table if not exists public.template_designs (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  template_id      text not null,
  headline         text not null default '',
  tagline          text not null default '',
  palette_id       text not null default 'stamp',
  font_id          text not null default 'fraunces',
  dark_text        boolean not null default false,
  headline_size    integer not null default 96,
  background_image text,
  elements         jsonb not null default '[]'::jsonb,
  updated_at       timestamptz not null default now(),
  unique (user_id, template_id)
);

create index if not exists template_designs_user_id_idx on public.template_designs (user_id);

alter table public.template_designs enable row level security;

drop policy if exists "Users manage their own designs (select)" on public.template_designs;
create policy "Users manage their own designs (select)"
  on public.template_designs for select
  using (auth.uid() = user_id);

drop policy if exists "Users manage their own designs (insert)" on public.template_designs;
create policy "Users manage their own designs (insert)"
  on public.template_designs for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users manage their own designs (update)" on public.template_designs;
create policy "Users manage their own designs (update)"
  on public.template_designs for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users manage their own designs (delete)" on public.template_designs;
create policy "Users manage their own designs (delete)"
  on public.template_designs for delete
  using (auth.uid() = user_id);

-- ----------------------------------------------------------------------------
-- Auto-create a profile row when a new auth user signs up.
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- Keep updated_at fresh on writes.
-- ----------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists template_designs_touch_updated_at on public.template_designs;
create trigger template_designs_touch_updated_at
  before update on public.template_designs
  for each row execute function public.touch_updated_at();
