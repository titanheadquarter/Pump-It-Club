-- =============================================================================
-- Kurs: 3 Module, 12 Videos (Videos 1-4, 5-8, 9-12)
-- Module: 1 = DAS FUNDAMENT, 2 = DAS TRAINING, 3 = WARUM FUNKTIONIERT ES BEI MIR NICHT?
-- Dauer: numeric(5,2) = Minuten.Sekunden (z.B. 4.39 = 4 Min 39 Sek)
-- =============================================================================

-- Tabelle: Kurs-Module (3 Stück)
create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  sort_order int not null unique,
  title text not null,
  created_at timestamptz default now()
);

-- Tabelle: Kursvideos (12 Einträge, je 4 pro Modul)
-- duration: Minuten.Sekunden als Dezimal, z.B. 4.39 = 4 Min 39 Sek
create table if not exists public.course_videos (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.course_modules(id) on delete cascade,
  sort_order int not null,
  title text not null,
  duration numeric(5,2) not null,
  video_key text not null,
  created_at timestamptz default now(),
  unique(sort_order)
);

-- Tabelle: Fortschritt pro Nutzer und Video (Outseta Uid = Nutzer)
create table if not exists public.course_video_progress (
  id uuid primary key default gen_random_uuid(),
  outseta_user_uid text not null,
  video_id uuid not null references public.course_videos(id) on delete cascade,
  watched_seconds int not null default 0,
  completed boolean not null default false,
  last_watched_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(outseta_user_uid, video_id)
);

-- Index auf module_id erst nach Spalte vorhanden (siehe Fix-Block unten)
create index if not exists idx_course_video_progress_user on public.course_video_progress(outseta_user_uid);
create index if not exists idx_course_video_progress_video on public.course_video_progress(video_id);

-- RLS (optional) – Policies mit DROP IF EXISTS, damit Skript mehrfach lauffähig ist
alter table public.course_modules enable row level security;
alter table public.course_videos enable row level security;
alter table public.course_video_progress enable row level security;

drop policy if exists "course_modules_read" on public.course_modules;
create policy "course_modules_read" on public.course_modules for select using (true);

drop policy if exists "course_videos_read" on public.course_videos;
create policy "course_videos_read" on public.course_videos for select using (true);

drop policy if exists "course_video_progress_select" on public.course_video_progress;
create policy "course_video_progress_select" on public.course_video_progress for select using (true);
drop policy if exists "course_video_progress_insert" on public.course_video_progress;
create policy "course_video_progress_insert" on public.course_video_progress for insert with check (true);
drop policy if exists "course_video_progress_update" on public.course_video_progress;
create policy "course_video_progress_update" on public.course_video_progress for update using (true);

-- =============================================================================
-- Seed: 3 Module
-- =============================================================================
insert into public.course_modules (id, sort_order, title) values
  ('a0000001-0000-4000-8000-000000000001', 1, 'DAS FUNDAMENT'),
  ('a0000001-0000-4000-8000-000000000002', 2, 'DAS TRAINING'),
  ('a0000001-0000-4000-8000-000000000003', 3, 'WARUM FUNKTIONIERT ES BEI MIR NICHT?')
on conflict (id) do nothing;

-- =============================================================================
-- Fix: course_videos ohne module_id und/oder duration (bestehende Tabelle aus älterer Migration)
-- Spalten hinzufügen und bestehende Zeilen zuordnen
-- =============================================================================
alter table public.course_videos
  add column if not exists module_id uuid references public.course_modules(id) on delete cascade;

alter table public.course_videos
  add column if not exists duration numeric(5,2);

update public.course_videos set module_id = 'a0000001-0000-4000-8000-000000000001' where sort_order between 1 and 4;
update public.course_videos set module_id = 'a0000001-0000-4000-8000-000000000002' where sort_order between 5 and 8;
update public.course_videos set module_id = 'a0000001-0000-4000-8000-000000000003' where sort_order between 9 and 12;

-- Set default duration for existing rows if not set
update public.course_videos set duration = 5.00 where duration is null;

alter table public.course_videos
  alter column module_id set not null;

alter table public.course_videos
  alter column duration set not null;

create index if not exists idx_course_videos_module on public.course_videos(module_id);

-- =============================================================================
-- Video-Seed: auskommentiert – Videos wurden bereits händisch angelegt.
-- Der Fix-Block oben setzt module_id auf bestehende Zeilen (sort_order 1–4, 5–8, 9–12).
-- Zum erneuten Einfügen der 12 Videos die folgenden Zeilen wieder aktivieren.
-- =============================================================================
/*
insert into public.course_videos (module_id, sort_order, title, duration, video_key) values
  ('a0000001-0000-4000-8000-000000000001', 1,  'Willkommen bei Pump It Club',              3.00, 'Free Kurs Video 1.mp4'),
  ('a0000001-0000-4000-8000-000000000001', 2,  'Die mentale Einstellung zum Training',    7.00, 'Free Kurs Video 2.mp4'),
  ('a0000001-0000-4000-8000-000000000001', 3,  'Motivation und Disziplin',                5.00, 'Free Kurs Video 3.mp4'),
  ('a0000001-0000-4000-8000-000000000001', 4,  'Umgang mit Rückschlägen',                 4.00, 'Free Kurs Video 4.mp4'),
  ('a0000001-0000-4000-8000-000000000002', 5,  'Grundlagen des Krafttrainings',            8.00, 'Free Kurs Video 5.mp4'),
  ('a0000001-0000-4000-8000-000000000002', 6,  'Trainingsplanung und Periodisierung',    10.00, 'Free Kurs Video 6.mp4'),
  ('a0000001-0000-4000-8000-000000000002', 7,  'Die wichtigsten Übungen',                12.00, 'Free Kurs Video 7.mp4'),
  ('a0000001-0000-4000-8000-000000000002', 8,  'Trainingsvolumen und Intensität',         6.00, 'Free Kurs Video 8.mp4'),
  ('a0000001-0000-4000-8000-000000000003', 9,  'Grundlagen der Sporternährung',          9.00, 'Free Kurs Video 9.mp4'),
  ('a0000001-0000-4000-8000-000000000003', 10, 'Makronährstoffe verstehen',              11.00, 'Free Kurs Video 10.mp4'),
  ('a0000001-0000-4000-8000-000000000003', 11, 'Mahlzeiten-Timing',                      7.00, 'Free Kurs Video 11.mp4'),
  ('a0000001-0000-4000-8000-000000000003', 12, 'Supplemente im Kraftsport',              8.00, 'Free Kurs Video 12.mp4')
on conflict (sort_order) do nothing;
*/
