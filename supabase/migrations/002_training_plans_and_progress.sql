-- =============================================================================
-- Training Plans and Progress: 6 Pläne, Nutzerzuweisung, Fortschritt
-- =============================================================================

-- Tabelle: Trainingspläne (6 Einträge, die CSV-Pläne als JSON)
create table if not exists public.training_plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  gender text check (gender in ('male', 'female')) null,
  description text not null,
  structure jsonb not null,
  created_at timestamptz default now()
);

-- Tabelle: Zuweisung Nutzer ↔ Plan (Outseta Uid = Nutzer)
create table if not exists public.user_training_plan_assignment (
  outseta_user_uid text primary key,
  training_plan_id uuid not null references public.training_plans(id) on delete cascade,
  assigned_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tabelle: Training-Log (Fortschritt pro Satz pro Übung pro Tag)
create table if not exists public.training_log (
  id uuid primary key default gen_random_uuid(),
  outseta_user_uid text not null,
  training_plan_id uuid not null references public.training_plans(id) on delete cascade,
  workout_date date not null,
  day_key text not null, -- z.B. "montag", "push-1", "dienstag-ok-brust"
  exercise_name text not null,
  set_index int not null, -- 1, 2, 3... für Sätze der Übung
  reps_done int not null,
  weight_kg numeric(5,2) null, -- optional, wenn Gewicht nicht getrackt wird
  notes text,
  logged_at timestamptz default now(),
  unique(outseta_user_uid, workout_date, training_plan_id, exercise_name, set_index)
);

-- Indizes für Performance
create index if not exists idx_training_plans_gender on public.training_plans(gender);
create index if not exists idx_user_training_plan_assignment_user on public.user_training_plan_assignment(outseta_user_uid);
create index if not exists idx_training_log_user on public.training_log(outseta_user_uid);
create index if not exists idx_training_log_user_date on public.training_log(outseta_user_uid, workout_date);
create index if not exists idx_training_log_plan_date on public.training_log(training_plan_id, workout_date);

-- RLS (Row Level Security) - wie bei course_video_progress
alter table public.training_plans enable row level security;
alter table public.user_training_plan_assignment enable row level security;
alter table public.training_log enable row level security;

-- Pläne: alle können lesen
drop policy if exists "training_plans_read" on public.training_plans;
create policy "training_plans_read" on public.training_plans for select using (true);

-- Zuweisungen: Nutzer können ihre eigene lesen/schreiben (aber API mit Service-Role macht das)
drop policy if exists "user_training_plan_assignment_select" on public.user_training_plan_assignment;
create policy "user_training_plan_assignment_select" on public.user_training_plan_assignment for select using (true);
drop policy if exists "user_training_plan_assignment_insert" on public.user_training_plan_assignment;
create policy "user_training_plan_assignment_insert" on public.user_training_plan_assignment for insert with check (true);
drop policy if exists "user_training_plan_assignment_update" on public.user_training_plan_assignment;
create policy "user_training_plan_assignment_update" on public.user_training_plan_assignment for update using (true);

-- Logs: Nutzer können ihre eigenen lesen/schreiben
drop policy if exists "training_log_select" on public.training_log;
create policy "training_log_select" on public.training_log for select using (true);
drop policy if exists "training_log_insert" on public.training_log;
create policy "training_log_insert" on public.training_log for insert with check (true);
drop policy if exists "training_log_update" on public.training_log;
create policy "training_log_update" on public.training_log for update using (true);

-- =============================================================================
-- Seed: 6 Trainingspläne (CSV-Inhalte als strukturierte JSON)
-- =============================================================================

-- 1. OK & UK (Frau)
insert into public.training_plans (id, slug, name, gender, description, structure) values
  ('00000000-1111-2222-3333-444444444444', 'ok-uk-frau', 'OK & UK (Frau)', 'female', 'Oberkörper/Unterkörper Split für Frauen - 4 Tage pro Woche', '{}')
on conflict (id) do nothing;

-- 2. OK & UK (Mann)
insert into public.training_plans (id, slug, name, gender, description, structure) values
  ('00000000-1111-2222-3333-444444444445', 'ok-uk-mann', 'OK & UK (Mann)', 'male', 'Oberkörper/Unterkörper Split für Männer - 4 Tage pro Woche', '{}')
on conflict (id) do nothing;

-- 3. OK, UK, Fullbody (Frau)
insert into public.training_plans (id, slug, name, gender, description, structure) values
  ('00000000-1111-2222-3333-444444444446', 'ok-uk-fullbody-frau', 'OK, UK, Fullbody (Frau)', 'female', 'Fullbody-Training mit Oberkörper/Unterkörper-Fokus - 3 Tage pro Woche', '{}')
on conflict (id) do nothing;

-- 4. Push- & Pull-Fullbody (Frau)
insert into public.training_plans (id, slug, name, gender, description, structure) values
  ('00000000-1111-2222-3333-444444444447', 'push-pull-fullbody-frau', 'Push- & Pull-Fullbody (Frau)', 'female', 'Push/Pull Fullbody-Training - 4 Tage pro Woche', '{}')
on conflict (id) do nothing;

-- 5. Push- & Pull-Fullbody (Mann)
insert into public.training_plans (id, slug, name, gender, description, structure) values
  ('00000000-1111-2222-3333-444444444448', 'push-pull-fullbody-mann', 'Push- & Pull-Fullbody (Mann)', 'male', 'Push/Pull Fullbody-Training - 4 Tage pro Woche', '{}')
on conflict (id) do nothing;

-- 6. Arnold Split (Mann)
insert into public.training_plans (id, slug, name, gender, description, structure) values
  ('00000000-1111-2222-3333-444444444449', 'arnold-split-mann', 'Arnold Split (Mann)', 'male', 'Klassischer Arnold-Split - 3 Tage pro Woche', '{}')
on conflict (id) do nothing;