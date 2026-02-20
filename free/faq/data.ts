export interface FAQQuestion {
  id: string;
  question: string;
  answer: string;
  category: "allgemein" | "training" | "ernaehrung" | "app" | "account";
  author?: string;
  createdAt: string;
  views?: number;
  helpful?: number;
  tags?: string[];
}

export interface UserQuestion {
  id: string;
  question: string;
  category: FAQQuestion["category"];
  author: string;
  createdAt: string;
  answers: FAQAnswer[];
  views: number;
  status: "open" | "answered" | "closed";
}

export interface FAQAnswer {
  id: string;
  questionId: string;
  answer: string;
  author: string;
  createdAt: string;
  helpful: number;
  isAccepted?: boolean;
}

export const categoryLabels: Record<FAQQuestion["category"], string> = {
  allgemein: "Allgemein",
  training: "Training",
  ernaehrung: "Ernährung",
  app: "App & Technik",
  account: "Account & Abo",
};

export const initialFAQs: FAQQuestion[] = [
  {
    id: "1",
    question: "Wie funktioniert der Fortschritt-Tracker?",
    answer: "Der Fortschritt-Tracker ermöglicht es dir, deine Fitness-Fortschritte umfassend zu dokumentieren. Du kannst dein Gewicht, Körperumfänge (Brust, Bauch, Hüfte, Arm, Oberschenkel, Hals) und deine Trainingsleistungen eintragen. Die App erstellt automatisch Diagramme, die deine Entwicklung über die Zeit visualisieren. So siehst du auf einen Blick, wie sich dein Körper und deine Leistung verändern.",
    category: "app",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    views: 245,
    helpful: 18,
    tags: ["tracking", "fortschritt"],
  },
  {
    id: "2",
    question: "Wie viele Kalorien sollte ich täglich zu mir nehmen?",
    answer: "Die optimale Kalorienzufuhr hängt von verschiedenen Faktoren ab: deinem Grundumsatz, deinem Aktivitätslevel, deinem Ziel (Muskelaufbau, Fettabbau oder Gewicht halten) und deinem Geschlecht. In der App kannst du einen Ernährungsplan erstellen, der diese Faktoren berücksichtigt. Als grobe Richtlinie: Für Fettabbau solltest du 300-500 kcal unter deinem Erhaltungswert liegen, für Muskelaufbau 300-500 kcal darüber.",
    category: "ernaehrung",
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    views: 189,
    helpful: 24,
    tags: ["kalorien", "ernährung"],
  },
  {
    id: "3",
    question: "Wie oft sollte ich trainieren?",
    answer: "Die optimale Trainingsfrequenz hängt von deinem Erfahrungslevel und deinem Ziel ab. Anfänger sollten 3-4 Mal pro Woche trainieren, um dem Körper Zeit zur Regeneration zu geben. Fortgeschrittene können 4-6 Mal pro Woche trainieren, wenn sie ein Split-Training verwenden. Wichtig ist, dass du mindestens einen Ruhetag pro Woche einplanst und auf ausreichend Schlaf achtest.",
    category: "training",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    views: 312,
    helpful: 31,
    tags: ["training", "frequenz"],
  },
  {
    id: "4",
    question: "Was ist der Unterschied zwischen Free und Premium?",
    answer: "Die Free-Version bietet Zugang zu grundlegenden Features wie dem Ernährungstagebuch, Basis-Trainingsplänen, dem Fortschritt-Tracker und der Community. Mit Premium erhältst du erweiterte Trainingspläne, personalisierte Ernährungspläne, erweiterte Analytics, Prioritäts-Support und Zugang zu exklusiven Inhalten und Live-Coachings.",
    category: "account",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    views: 456,
    helpful: 42,
    tags: ["premium", "features"],
  },
  {
    id: "5",
    question: "Wie tracke ich meine Mahlzeiten am besten?",
    answer: "Für das beste Tracking solltest du deine Mahlzeiten direkt nach dem Essen eintragen. Nutze die Barcode-Scan-Funktion für verpackte Lebensmittel, suche in unserer umfangreichen Datenbank oder erstelle eigene Rezepte. Wichtig ist die Konsistenz - tracke möglichst alle Mahlzeiten, auch Snacks. Die App speichert deine häufig verwendeten Lebensmittel, was das Tracking mit der Zeit beschleunigt.",
    category: "ernaehrung",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    views: 278,
    helpful: 19,
    tags: ["tracking", "mahlzeiten"],
  },
  {
    id: "6",
    question: "Kann ich meinen Trainingsplan anpassen?",
    answer: "Ja, absolut! Du kannst jeden Trainingsplan individuell an deine Bedürfnisse anpassen. Füge Übungen hinzu, entferne welche, ändere Sätze und Wiederholungen oder passe das Gewicht an. Die App speichert deine Anpassungen automatisch. Du kannst auch komplett eigene Trainingspläne erstellen und diese in deinem Kalender planen.",
    category: "training",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    views: 167,
    helpful: 15,
    tags: ["trainingsplan", "anpassung"],
  },
  {
    id: "7",
    question: "Wie synchronisiere ich meine Daten zwischen Geräten?",
    answer: "Deine Daten werden automatisch in der Cloud gespeichert, sobald du mit deinem Account eingeloggt bist. Melde dich einfach auf allen deinen Geräten mit demselben Account an, und deine Daten werden automatisch synchronisiert. Stelle sicher, dass du eine aktive Internetverbindung hast, damit die Synchronisation funktioniert.",
    category: "app",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    views: 134,
    helpful: 12,
    tags: ["sync", "cloud"],
  },
  {
    id: "8",
    question: "Was sollte ich vor dem Training essen?",
    answer: "Die ideale Pre-Workout-Mahlzeit sollte leicht verdaulich sein und etwa 30-60 Minuten vor dem Training eingenommen werden. Gute Optionen sind: eine Banane, Haferflocken mit etwas Obst, ein Protein-Shake oder ein kleiner Snack mit komplexen Kohlenhydraten. Vermeide fettige oder sehr ballaststoffreiche Mahlzeiten direkt vor dem Training, da diese schwer im Magen liegen können.",
    category: "ernaehrung",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    views: 223,
    helpful: 28,
    tags: ["pre-workout", "ernährung"],
  },
];

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return "Heute";
  if (diffInDays === 1) return "Gestern";
  if (diffInDays < 7) return `vor ${diffInDays} Tagen`;
  if (diffInDays < 30) return `vor ${Math.floor(diffInDays / 7)} Wochen`;
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
};
