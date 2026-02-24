-- =============================================================================
-- Populate Training Plans with CSV Data
-- =============================================================================

-- 1. OK & UK (Frau) - 4 Tage
update public.training_plans
set structure = '{
  "days": [
    {
      "key": "montag",
      "label": "Montag (Beine)",
      "exercises": [
        {"name": "Beinbeuger Sitzend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Kniebeugen Langhantel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Hip Thrust", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Adduktoren", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Wadenheben gestreckt", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Crunches am Kabel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "donnerstag",
      "label": "Donnerstag (Beine)",
      "exercises": [
        {"name": "Beinstrecker sitzend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Rumänisches Kreuzheben", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Split Squats", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Abduktoren", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Wadenheben gestreckt", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Sidebends", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "dienstag",
      "label": "Dienstag (Oberkörper Brust)",
      "exercises": [
        {"name": "Brustpresse", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Flys am Kabel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Klimmzüge", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Rudern eng am Kabel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Seitheben (Kurzhantel)", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Bizepscurls KH", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Trizepsdrücken am Seil (gerader Griff)", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "freitag",
      "label": "Freitag (Oberkörper Rücken)",
      "exercises": [
        {"name": "Schrägbank (Kurzhanteln)", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Dips", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Rudern Kurzhantel einarmig", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Low-Row-Shrugs mit gestreckten Armen", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Rudern Kurzhantel einarmig", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Reverse-Flys", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Preacher Curls", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    }
  ]
}'::jsonb
where slug = 'ok-uk-frau';

-- 2. OK & UK (Mann) - 4 Tage
update public.training_plans
set structure = '{
  "days": [
    {
      "key": "montag",
      "label": "Montag (Beine Quad Focused)",
      "exercises": [
        {"name": "Beinstrecker Maschine", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Beinbeuger liegend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Kniebeugen Langhantel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Wadenheben stehend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Crunches am Kabel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "donnerstag",
      "label": "Donnerstag (Beine Hams Focused)",
      "exercises": [
        {"name": "Beinbeuger sitzend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Beinstrecker", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Rumänisches Kreuzheben", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Adduktoren", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Wadenheben sitzend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "dienstag",
      "label": "Dienstag (OK Brust Focused)",
      "exercises": [
        {"name": "Schrägbank KH", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Brustpresse", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Flys Maschine", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Trizepsdrücken Kabel Stange", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Trizeps Seil über Kopf", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "freitag",
      "label": "Freitag (OK Rücken Focused)",
      "exercises": [
        {"name": "Klimmzüge", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Rudern Kabel eng", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Low-Row-Shrugs mit gestreckten Armen", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Langhantel Bizepscurls", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Hammer Curls", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]}
      ]
    }
  ]
}'::jsonb
where slug = 'ok-uk-mann';

-- 3. OK, UK, Fullbody (Frau) - 3 Tage
update public.training_plans
set structure = '{
  "days": [
    {
      "key": "montag",
      "label": "Montag",
      "exercises": [
        {"name": "Klimmzüge", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Low-Row-Shrugs mit gestreckten Armen", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Schrägbankdrücken", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Dips", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Seitheben", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Bizepscurls Kurzhantel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "mittwoch",
      "label": "Mittwoch",
      "exercises": [
        {"name": "Beinbeuger liegend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Kniebeugen Langhantel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Hip Thrust", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Split Squats Kurzhantel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Wadenheben stehend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Crunches am Kabel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "freitag",
      "label": "Freitag",
      "exercises": [
        {"name": "Rudern Kabel am eng", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Reverse Flys", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Flys für Brust", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Supersatz: Preachercurls + Trizepsdrücken am Seil mit Stange", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    }
  ]
}'::jsonb
where slug = 'ok-uk-fullbody-frau';

-- 4. Push- & Pull-Fullbody (Frau) - 4 Tage
update public.training_plans
set structure = '{
  "days": [
    {
      "key": "montag",
      "label": "Montag (Push-Fullbody 1)",
      "exercises": [
        {"name": "Beinstrecker (Maschine)", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Kniebeugen Langhantel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Abduktoren", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Schrägbank Kurzhantel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Flys für Brust", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Dips (Brust + Trizeps)", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Trizepsdrücken am Seil hinter Kopf", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Seitheben (Kurzhanteln)", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Schulterdrücken Kurzhantel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "donnerstag",
      "label": "Donnerstag (Push-Fullbody 2)",
      "exercises": [
        {"name": "Beinstrecker", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Splitsquats (Kurzhanteln)", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Brustpresse", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "dienstag",
      "label": "Dienstag (Pull-Fullbody 1)",
      "exercises": [
        {"name": "Beinbeuger liegend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Kreuzheben Langhantel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Adduktoren", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Kickbacks", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Klimmzüge", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Bizepcurls", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Low-Row-Shrugs mit gestreckten Armen", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Reverseflys", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Preacher Curls", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "freitag",
      "label": "Freitag (Pull-Fullbody 2)",
      "exercises": [
        {"name": "Beinbeuger sitzend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Hip Thrust", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    }
  ]
}'::jsonb
where slug = 'push-pull-fullbody-frau';

-- 5. Push- & Pull-Fullbody (Mann) - 4 Tage
update public.training_plans
set structure = '{
  "days": [
    {
      "key": "montag",
      "label": "Montag (Push-Fullbody 1)",
      "exercises": [
        {"name": "Beinstrecker Maschine", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Kniebeugen Langhantel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Schrägbank KH", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Flys Maschine", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Seitheben", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Trizepsdrücken Kabel Stange", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Trizeps Seil hinter dem Kopf auf Bank", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Crunches am Kabel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"}
        ]}
      ]
    },
    {
      "key": "dienstag",
      "label": "Dienstag (Push-Fullbody 2)",
      "exercises": [
        {"name": "Beinstrecker Maschine", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Frontsquats", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Schrägbank KH", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Dips", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Military-Press", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "dienstag",
      "label": "Dienstag (Pull-Fullbody 1)",
      "exercises": [
        {"name": "Beinbeuger liegend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Rumänisches Kreuzheben", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Klimmzüge", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Rudern Kabel eng", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Reverseflys an der Maschine", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Face Pulls Kabel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Langhantel Bizepscurls", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Preachercurls", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "freitag",
      "label": "Freitag (Pull-Fullbody 2)",
      "exercises": [
        {"name": "Beinbeuger Sitzend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Adduktoren", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Rudern Kurzhantel einarmig", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]},
        {"name": "Low-Row-Shrugs mit gestreckten Armen", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8", "rest": "90 Sek."}
        ]}
      ]
    }
  ]
}'::jsonb
where slug = 'push-pull-fullbody-mann';

-- 6. Arnold Split (Mann) - 3 Tage
update public.training_plans
set structure = '{
  "days": [
    {
      "key": "montag",
      "label": "Montag (Schulter/Arme)",
      "exercises": [
        {"name": "Seitheben (Kurzhantel)", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Reverse Fly Maschine", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Trizepsdrücken gerade Stange am Kabel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Trizeps Seil hinter Kopf am Kabel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Langhantel Bizepscurls", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Hammer Curls", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "mittwoch",
      "label": "Mittwoch (Beine)",
      "exercises": [
        {"name": "Beinstrecker", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Beinbeuger (sitzend)", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Kniebeugen (Langhantel)", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Adduktoren Maschine", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Wadenheben stehend", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Crunches Kabel", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Hyperextentions", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]}
      ]
    },
    {
      "key": "freitag",
      "label": "Freitag (Brust/Rücken)",
      "exercises": [
        {"name": "Schrägbankdrücken KH", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Flys Maschine", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Klimmzüge", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Rudern Kabel eng", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]},
        {"name": "Low-Row-Shrugs mit gestreckten Armen", "sets": [
          {"type": "Aufwärmsatz 1", "reps": "5 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 2", "reps": "3 Wdh.", "rest": "keine"},
          {"type": "Aufwärmsatz 3", "reps": "2 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 1", "reps": "5–8 Wdh.", "rest": "90 Sek."},
          {"type": "Arbeitssatz 2", "reps": "5–8 Wdh.", "rest": "90 Sek."}
        ]}
      ]
    }
  ]
}'::jsonb
where slug = 'arnold-split-mann';