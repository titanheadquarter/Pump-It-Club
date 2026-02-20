export interface NutritionPlan {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Anfänger" | "Fortgeschritten" | "Profi";
  dailyCalories: number;
  macros: {
    protein: number; // in g
    carbs: number; // in g
    fats: number; // in g
  };
  mealSuggestions: string[];
  recommended?: boolean;
}

export const nutritionPlans: NutritionPlan[] = [
  {
    id: "1",
    title: "Ausgewogene Ernährung",
    description: "Ein ausgewogener Plan mit allen wichtigen Nährstoffen. Perfekt für den Einstieg in eine gesunde Ernährung.",
    duration: "4 Wochen",
    difficulty: "Anfänger",
    dailyCalories: 2000,
    macros: {
      protein: 150,
      carbs: 200,
      fats: 67,
    },
    mealSuggestions: [
      "Vollkorn-Haferflocken mit Beeren und Joghurt",
      "Gegrilltes Hähnchen mit Quinoa und Gemüse",
      "Lachs mit Süßkartoffel und Brokkoli",
      "Protein-Pancakes mit Banane",
      "Türkische Linsen-Suppe",
    ],
    recommended: true,
  },
  {
    id: "2",
    title: "High-Protein Plan",
    description: "Optimiert für Muskelaufbau mit hohem Proteinanteil. Ideal für aktive Sportler und Fitness-Enthusiasten.",
    duration: "6 Wochen",
    difficulty: "Fortgeschritten",
    dailyCalories: 2200,
    macros: {
      protein: 200,
      carbs: 180,
      fats: 73,
    },
    mealSuggestions: [
      "Protein-Smoothie mit Whey und Haferflocken",
      "Rindersteak mit braunem Reis und grünen Bohnen",
      "Thunfisch-Salat mit Avocado",
      "Griechischer Joghurt mit Nüssen",
      "Putenbrust mit Vollkornnudeln",
    ],
  },
  {
    id: "3",
    title: "Low-Carb Plan",
    description: "Reduzierte Kohlenhydrate für effektive Fettverbrennung. Perfekt für Abnehmziele.",
    duration: "4 Wochen",
    difficulty: "Anfänger",
    dailyCalories: 1600,
    macros: {
      protein: 140,
      carbs: 100,
      fats: 89,
    },
    mealSuggestions: [
      "Omelett mit Spinat und Feta",
      "Gegrillter Lachs mit Spargel",
      "Hähnchen-Curry mit Blumenkohlreis",
      "Avocado-Ei-Salat",
      "Zucchini-Nudeln mit Pesto und Hähnchen",
    ],
  },
];

export const getNutritionPlanById = (id: string): NutritionPlan | undefined => {
  return nutritionPlans.find((plan) => plan.id === id);
};
