export interface TrainingPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Anfänger" | "Fortgeschritten" | "Profi";
  exercises: string[];
  recommended?: boolean;
}

export const trainingPlans: TrainingPlan[] = [
  {
    id: "1",
    title: "Ganzkörper-Basis",
    description: "Perfekt für Einsteiger. Ein ausgewogenes Ganzkörpertraining, das alle Muskelgruppen anspricht.",
    duration: "4 Wochen",
    difficulty: "Anfänger",
    exercises: [
      "Kniebeugen (3x12)",
      "Liegestütze (3x10)",
      "Plank (3x30s)",
      "Ausfallschritte (3x10 pro Seite)",
      "Rudern (3x12)",
    ],
    recommended: true,
  },
  {
    id: "2",
    title: "Oberkörper-Fokus",
    description: "Intensives Training für Brust, Rücken, Schultern und Arme. Ideal für den Aufbau von Oberkörperkraft.",
    duration: "6 Wochen",
    difficulty: "Fortgeschritten",
    exercises: [
      "Bankdrücken (4x8)",
      "Klimmzüge (3x8)",
      "Schulterdrücken (3x10)",
      "Bizeps-Curls (3x12)",
      "Trizeps-Dips (3x10)",
    ],
  },
  {
    id: "3",
    title: "Beine & Po Power",
    description: "Spezielles Training für die untere Körperhälfte. Stärkt Beine, Po und Rumpf.",
    duration: "4 Wochen",
    difficulty: "Anfänger",
    exercises: [
      "Kniebeugen (4x15)",
      "Beinpresse (3x12)",
      "Rumänisches Kreuzheben (3x10)",
      "Wadenheben (3x15)",
      "Beinbeuger (3x12)",
    ],
  },
];

export const getTrainingPlanById = (id: string): TrainingPlan | undefined => {
  return trainingPlans.find((plan) => plan.id === id);
};
