-- FAQ Migration for Supabase
-- Run in SQL editor with a service role or SQL permissions

-- 1) extension
create extension if not exists "pgcrypto";

-- 2) profiles table for admin mapping (references auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  is_admin boolean default false,
  created_at timestamptz default now()
);

-- 3) categories
create table if not exists public.faq_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  sort_order integer default 0
);

-- 4) faqs
create table if not exists public.faq_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  sort_order integer default 0
);

-- 5) faqs
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  content text not null,
  summary text,
  category_id uuid references public.faq_categories(id) on delete set null,
  is_published boolean default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  comment_count integer default 0,
  like_count integer default 0,
  view_count integer default 0
);

-- 6) comments (threaded via parent_id)
create table if not exists public.faq_comments (
  id uuid primary key default gen_random_uuid(),
  faq_id uuid not null references public.faqs(id) on delete cascade,
  parent_id uuid references public.faq_comments(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  content text not null,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  like_count integer default 0
);

-- 7) likes for faqs
create table if not exists public.faq_likes (
  id uuid primary key default gen_random_uuid(),
  faq_id uuid not null references public.faqs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  constraint faq_likes_uniq unique(faq_id, user_id)
);

-- 8) likes for comments
create table if not exists public.comment_likes (
  id uuid primary key default gen_random_uuid(),
  comment_id uuid not null references public.faq_comments(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  constraint comment_likes_uniq unique(comment_id, user_id)
);

-- 9) Indexes
create index if not exists idx_faqs_category on public.faqs(category_id);
create index if not exists idx_faqs_created_by on public.faqs(created_by);
create index if not exists idx_comments_faq on public.faq_comments(faq_id);
create index if not exists idx_comments_parent on public.faq_comments(parent_id);
create index if not exists idx_faq_likes_faq on public.faq_likes(faq_id);
create index if not exists idx_comment_likes_comment on public.comment_likes(comment_id);

-- 10) Trigger functions to maintain counters

-- increment comment_count on insert
create or replace function public.fn_increment_faq_comment_count() returns trigger as $$
begin
  update public.faqs set comment_count = comment_count + 1 where id = NEW.faq_id;
  return NEW;
end;
$$ language plpgsql volatile;

create or replace function public.fn_decrement_faq_comment_count() returns trigger as $$
begin
  update public.faqs set comment_count = greatest(comment_count - 1, 0) where id = OLD.faq_id;
  return OLD;
end;
$$ language plpgsql volatile;

create trigger trg_faq_comment_insert after insert on public.faq_comments for each row execute procedure public.fn_increment_faq_comment_count();
create trigger trg_faq_comment_delete after delete on public.faq_comments for each row execute procedure public.fn_decrement_faq_comment_count();

-- increment faq like_count on insert/delete
create or replace function public.fn_increment_faq_like_count() returns trigger as $$
begin
  update public.faqs set like_count = like_count + 1 where id = NEW.faq_id;
  return NEW;
end;
$$ language plpgsql;

create or replace function public.fn_decrement_faq_like_count() returns trigger as $$
begin
  update public.faqs set like_count = greatest(like_count - 1, 0) where id = OLD.faq_id;
  return OLD;
end;
$$ language plpgsql;

create trigger trg_faq_like_insert after insert on public.faq_likes for each row execute procedure public.fn_increment_faq_like_count();
create trigger trg_faq_like_delete after delete on public.faq_likes for each row execute procedure public.fn_decrement_faq_like_count();

-- increment comment like_count on insert/delete
create or replace function public.fn_increment_comment_like_count() returns trigger as $$
begin
  update public.faq_comments set like_count = like_count + 1 where id = NEW.comment_id;
  return NEW;
end;
$$ language plpgsql;

create or replace function public.fn_decrement_comment_like_count() returns trigger as $$
begin
  update public.faq_comments set like_count = greatest(like_count - 1, 0) where id = OLD.comment_id;
  return OLD;
end;
$$ language plpgsql;

create trigger trg_comment_like_insert after insert on public.comment_likes for each row execute procedure public.fn_increment_comment_like_count();
create trigger trg_comment_like_delete after delete on public.comment_likes for each row execute procedure public.fn_decrement_comment_like_count();

-- 11) Enable RLS & policies

-- Enable RLS on main tables
alter table public.faqs enable row level security;
alter table public.faq_comments enable row level security;
alter table public.faq_likes enable row level security;
alter table public.comment_likes enable row level security;

-- FAQ SELECT: public may read published FAQs
create policy "public_select_published" on public.faqs for select using (is_published = true);

-- FAQ SELECT: owner or admin may read any
create policy "owner_or_admin_select" on public.faqs for select using (
  created_by = auth.uid() or exists(select 1 from public.profiles p where p.id = auth.uid() and p.is_admin)
);

-- FAQ INSERT: authenticated users can create FAQs (created_by must equal auth.uid())
create policy "faq_insert_authenticated" on public.faqs for insert with check (created_by = auth.uid());

-- FAQ UPDATE: owner or admin
create policy "faq_update_owner" on public.faqs for update using (created_by = auth.uid()) with check (created_by = auth.uid());
create policy "faq_update_admin" on public.faqs for update using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));

-- FAQ DELETE: admin only
create policy "faq_delete_admin" on public.faqs for delete using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));

-- Comments: authenticated users can insert comments (author_id must equal auth.uid())
create policy "comment_insert_authenticated" on public.faq_comments for insert with check (author_id = auth.uid());

-- Comments: select published comments or owner/admin
create policy "comment_select_public" on public.faq_comments for select using (is_public = true);
create policy "comment_select_owner_admin" on public.faq_comments for select using (author_id = auth.uid() or exists(select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));

-- Comment update/delete: owner or admin
create policy "comment_update_owner" on public.faq_comments for update using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy "comment_update_admin" on public.faq_comments for update using (exists(select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));
create policy "comment_delete_owner_admin" on public.faq_comments for delete using (author_id = auth.uid() or exists(select 1 from public.profiles p where p.id = auth.uid() and p.is_admin));

-- Likes: only authenticated users can insert/delete their own likes
create policy "faq_like_insert" on public.faq_likes for insert with check (user_id = auth.uid());
create policy "faq_like_delete" on public.faq_likes for delete using (user_id = auth.uid());
create policy "comment_like_insert" on public.comment_likes for insert with check (user_id = auth.uid());
create policy "comment_like_delete" on public.comment_likes for delete using (user_id = auth.uid());

-- 12) Convenience views / helper queries (optional)
create or replace view public.v_faq_summary as
select f.id, f.slug, f.title, f.summary, f.category_id, f.is_published, f.comment_count, f.like_count, f.view_count, f.created_by, f.created_at, f.updated_at
from public.faqs f;

-- 13) Example: Insert a seed FAQ (admin or via service role)
-- insert into public.faqs (slug, title, content, summary, is_published, created_by) values ('was-ist-pumpitclub','Was ist Pump-It-Club?','Langer Content', 'Kurzbeschreibung', true, '<SERVICE_UUID>');

-- End of migration