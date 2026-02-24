-- FAQ Seed Data Migration for Supabase
-- Run after 005_faq_system.sql to populate initial data

-- 1) FAQ Categories
INSERT INTO public.faq_categories (name, slug, sort_order) VALUES
('Allgemein', 'allgemein', 1),
('Training', 'training', 2),
('Ernaehrung', 'ernaehrung', 3),
('App & Technik', 'app', 4),
('Account & Abo', 'account', 5)
ON CONFLICT (slug) DO NOTHING;

-- 2) Example FAQs (based on original data.ts)
-- Note: created_by is set to NULL since we don't have real user IDs yet
-- Admins can create/edit FAQs through the admin panel after logging in
INSERT INTO public.faqs (
  slug,
  title,
  content,
  summary,
  category_id,
  is_published
) VALUES
(
  'fortschritt-tracker',
  'Wie funktioniert der Fortschritt-Tracker?',
  'Der Fortschritt-Tracker zeigt dir deine Entwicklung über die Zeit. Du kannst Gewicht, Maße und Fotos dokumentieren. Die App berechnet automatisch Trends und zeigt dir, ob du auf dem richtigen Weg bist. Regelmäßige Updates helfen dir motiviert zu bleiben.',
  'Verfolge deine Fortschritte automatisch',
  (SELECT id FROM faq_categories WHERE slug = 'app'),
  true
),
(
  'kalorien-berechnen',
  'Wie werden Kalorien berechnet?',
  'Die Kalorienberechnung basiert auf deinen persönlichen Daten (Alter, Größe, Gewicht, Aktivitätslevel) und deinem Ziel (Abnehmen, Zunehmen, Erhalten). Die App verwendet wissenschaftliche Formeln wie die Mifflin-St Jeor Gleichung für deinen Grundumsatz.',
  'Personalisierte Kalorienberechnung basierend auf deinen Zielen',
  (SELECT id FROM faq_categories WHERE slug = 'ernaehrung'),
  true
),
(
  'training-frequenz',
  'Wie oft sollte ich trainieren?',
  'Die ideale Trainingsfrequenz hängt von deinem Erfahrungslevel ab. Anfänger sollten 3x pro Woche trainieren, Fortgeschrittene 4-5x. Wichtig ist die Qualität vor Quantität. Achte auf ausreichende Regeneration zwischen den Einheiten.',
  '3-5 Trainingseinheiten pro Woche je nach Level',
  (SELECT id FROM faq_categories WHERE slug = 'training'),
  true
),
(
  'free-vs-premium',
  'Was ist der Unterschied zwischen Free und Premium?',
  'Die Free-Version bietet Grundfunktionen wie Kalorien-Tracking und Basis-Trainingspläne. Premium-Mitglieder erhalten personalisierte Ernährungspläne, erweiterte Analysen, Premium-Trainingspläne und 1:1 Betreuung durch unsere Experten.',
  'Free: Grundfunktionen, Premium: Personalisiert + Experten-Betreuung',
  (SELECT id FROM faq_categories WHERE slug = 'account'),
  true
),
(
  'mahlzeiten-tracking',
  'Wie tracke ich Mahlzeiten am besten?',
  'Verwende die integrierte Lebensmitteldatenbank oder scanne Barcodes. Für beste Ergebnisse wiege deine Mahlzeiten ab und tracke direkt nach dem Essen. Die App merkt sich deine häufigen Lebensmittel für schnelleres Logging.',
  'Barcodes scannen oder aus Datenbank auswählen',
  (SELECT id FROM faq_categories WHERE slug = 'app'),
  true
),
(
  'trainingsplan-anpassung',
  'Kann ich meinen Trainingsplan anpassen?',
  'Ja! Du kannst Übungen ersetzen, Reihenfolgen ändern und Gewichte anpassen. Premium-Mitglieder erhalten zusätzlich vollständig personalisierte Pläne. Achte darauf, dass deine Anpassungen zu deinem Fitnesslevel passen.',
  'Übungen und Gewichte individuell anpassen',
  (SELECT id FROM faq_categories WHERE slug = 'training'),
  true
),
(
  'daten-synchronisation',
  'Wie funktioniert die Daten-Synchronisation?',
  'Deine Daten werden automatisch zwischen Geräten synchronisiert, wenn du mit dem gleichen Account angemeldet bist. Die Synchronisation erfolgt in Echtzeit über unsere sicheren Server. Stelle sicher, dass du eine stabile Internetverbindung hast.',
  'Automatische Synchronisation zwischen allen Geräten',
  (SELECT id FROM faq_categories WHERE slug = 'app'),
  true
),
(
  'pre-workout-ernaehrung',
  'Sollte ich vor dem Training essen?',
  'Es kommt auf das Timing an. 2-3 Stunden vor dem Training kannst du eine komplette Mahlzeit essen. 30-60 Minuten vorher eignet sich ein kleiner Snack mit Kohlenhydraten und Protein. Höre auf deinen Körper und teste verschiedene Strategien.',
  'Abhängig vom Timing: Mahlzeit oder Snack vor dem Training',
  (SELECT id FROM faq_categories WHERE slug = 'ernaehrung'),
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 3) Note about Admin Profile
-- The profiles table is created in 005_faq_system.sql
-- To make a user admin, run:
-- UPDATE public.profiles SET is_admin = true WHERE id = 'actual-user-uuid-from-auth.users';

-- End of seed data migration