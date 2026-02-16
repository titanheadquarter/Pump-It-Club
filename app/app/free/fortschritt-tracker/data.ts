export type MetricType = "weight" | "circumference" | "training";

export interface ProgressEntry {
  id: string;
  date: string; // YYYY-MM-DD
  type: MetricType;
  value: number;
  notes?: string;
}

// Spezifische Typen für verschiedene Metriken
export interface WeightEntry extends ProgressEntry {
  type: "weight";
  value: number; // in kg
}

export interface CircumferenceEntry extends ProgressEntry {
  type: "circumference";
  value: number; // in cm
  bodyPart: "chest" | "waist" | "hips" | "arm" | "thigh" | "neck";
}

export interface TrainingEntry extends ProgressEntry {
  type: "training";
  value: number; // Gewicht in kg oder Wiederholungen
  exercise: string;
  sets?: number;
  reps?: number;
  weight?: number; // für Krafttraining
}

export type AnyProgressEntry = WeightEntry | CircumferenceEntry | TrainingEntry;

export const bodyPartLabels: Record<CircumferenceEntry["bodyPart"], string> = {
  chest: "Brust",
  waist: "Bauch",
  hips: "Hüfte",
  arm: "Arm",
  thigh: "Oberschenkel",
  neck: "Hals",
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
};

export const getDateKey = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

// Generiere Testdaten für die letzten 90 Tage
export const generateTestData = (): AnyProgressEntry[] => {
  const entries: AnyProgressEntry[] = [];
  const today = new Date();
  
  // Gewichtsdaten - langsame Abnahme von 85kg auf 78kg über 90 Tage
  for (let i = 90; i >= 0; i -= 3) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const weight = 85 - (i / 90) * 7 + (Math.random() * 0.5 - 0.25); // Langsame Abnahme mit kleinen Schwankungen
    
    entries.push({
      id: `weight-${i}`,
      type: "weight",
      date: getDateKey(date),
      value: Math.round(weight * 10) / 10,
      notes: i % 9 === 0 ? "Nach dem Training" : undefined,
    } as WeightEntry);
  }

  // Umfangsdaten - verschiedene Körperteile
  const bodyParts: CircumferenceEntry["bodyPart"][] = ["chest", "waist", "hips", "arm", "thigh"];
  const startValues: Record<string, number> = {
    chest: 105,
    waist: 95,
    hips: 100,
    arm: 35,
    thigh: 60,
  };
  const targetValues: Record<string, number> = {
    chest: 102,
    waist: 88,
    hips: 95,
    arm: 33,
    thigh: 57,
  };

  bodyParts.forEach((bodyPart) => {
    for (let i = 90; i >= 0; i -= 7) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const progress = i / 90;
      const value = startValues[bodyPart] - (startValues[bodyPart] - targetValues[bodyPart]) * (1 - progress) + (Math.random() * 0.5 - 0.25);
      
      entries.push({
        id: `circ-${bodyPart}-${i}`,
        type: "circumference",
        date: getDateKey(date),
        value: Math.round(value * 10) / 10,
        bodyPart,
      } as CircumferenceEntry);
    }
  });

  // Trainingsdaten - verschiedene Übungen mit Fortschritt
  const exercises = [
    { name: "Bankdrücken", startWeight: 60, endWeight: 85 },
    { name: "Kniebeugen", startWeight: 80, endWeight: 120 },
    { name: "Kreuzheben", startWeight: 100, endWeight: 150 },
    { name: "Schulterdrücken", startWeight: 40, endWeight: 60 },
  ];

  exercises.forEach((exercise) => {
    for (let i = 90; i >= 0; i -= 4) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const progress = i / 90;
      const weight = exercise.startWeight + (exercise.endWeight - exercise.startWeight) * (1 - progress) + (Math.random() * 2 - 1);
      const reps = 8 + Math.floor(Math.random() * 3); // 8-10 Wiederholungen
      const sets = 3 + Math.floor(Math.random() * 2); // 3-4 Sätze
      
      entries.push({
        id: `training-${exercise.name}-${i}`,
        type: "training",
        date: getDateKey(date),
        value: Math.round(weight),
        exercise: exercise.name,
        weight: Math.round(weight),
        reps,
        sets,
      } as TrainingEntry);
    }
  });

  return entries;
};
