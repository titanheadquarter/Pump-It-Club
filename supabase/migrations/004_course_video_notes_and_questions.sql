-- =============================================================================
-- Kurs-Video Notizen und Fragen: User können Notizen und Fragen zu Videos speichern
-- =============================================================================

-- Tabelle: Notizen zu Kurs-Videos (pro Nutzer und Video)
create table if not exists public.course_video_notes (
  id uuid primary key default gen_random_uuid(),
  outseta_user_uid text not null,
  video_id uuid not null references public.course_videos(id) on delete cascade,
  content text not null,
  timestamp_seconds int null, -- Zeitpunkt im Video in Sekunden (optional)
  created_at timestamptz default now()
);

-- Tabelle: Fragen zu Kurs-Videos (pro Nutzer und Video)
create table if not exists public.course_video_questions (
  id uuid primary key default gen_random_uuid(),
  outseta_user_uid text not null,
  video_id uuid not null references public.course_videos(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- Indizes für Performance
create index if not exists idx_course_video_notes_user on public.course_video_notes(outseta_user_uid);
create index if not exists idx_course_video_notes_video on public.course_video_notes(video_id);
create index if not exists idx_course_video_questions_user on public.course_video_questions(outseta_user_uid);
create index if not exists idx_course_video_questions_video on public.course_video_questions(video_id);

-- RLS (Row Level Security) aktivieren
alter table public.course_video_notes enable row level security;
alter table public.course_video_questions enable row level security;

-- Policies für Notizen (analog zu course_video_progress)
drop policy if exists "course_video_notes_select" on public.course_video_notes;
create policy "course_video_notes_select" on public.course_video_notes for select using (true);
drop policy if exists "course_video_notes_insert" on public.course_video_notes;
create policy "course_video_notes_insert" on public.course_video_notes for insert with check (true);
drop policy if exists "course_video_notes_update" on public.course_video_notes;
create policy "course_video_notes_update" on public.course_video_notes for update using (true);
drop policy if exists "course_video_notes_delete" on public.course_video_notes;
create policy "course_video_notes_delete" on public.course_video_notes for delete using (true);

-- Policies für Fragen (analog zu course_video_progress)
drop policy if exists "course_video_questions_select" on public.course_video_questions;
create policy "course_video_questions_select" on public.course_video_questions for select using (true);
drop policy if exists "course_video_questions_insert" on public.course_video_questions;
create policy "course_video_questions_insert" on public.course_video_questions for insert with check (true);
drop policy if exists "course_video_questions_update" on public.course_video_questions;
create policy "course_video_questions_update" on public.course_video_questions for update using (true);
drop policy if exists "course_video_questions_delete" on public.course_video_questions;
create policy "course_video_questions_delete" on public.course_video_questions for delete using (true);