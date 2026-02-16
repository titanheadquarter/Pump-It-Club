export interface Lesson {
  id: string;
  title: string;
  duration: number; // in Minuten
  videoId?: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: "psychologie",
    title: "Psychologie des Kraftsport",
    lessons: [
      {
        id: "psychologie-1",
        title: "Willkommen bei Pump It Club",
        duration: 3,
        videoId: "123456789",
        completed: false,
      },
      {
        id: "psychologie-2",
        title: "Die mentale Einstellung zum Training",
        duration: 7,
        videoId: "123456790",
        completed: false,
      },
      {
        id: "psychologie-3",
        title: "Motivation und Disziplin",
        duration: 5,
        videoId: "123456791",
        completed: false,
      },
      {
        id: "psychologie-4",
        title: "Umgang mit Rückschlägen",
        duration: 4,
        videoId: "123456792",
        completed: false,
      },
    ],
  },
  {
    id: "training",
    title: "Das richtige Training",
    lessons: [
      {
        id: "training-1",
        title: "Grundlagen des Krafttrainings",
        duration: 8,
        videoId: "123456793",
        completed: false,
      },
      {
        id: "training-2",
        title: "Trainingsplanung und Periodisierung",
        duration: 10,
        videoId: "123456794",
        completed: false,
      },
      {
        id: "training-3",
        title: "Die wichtigsten Übungen",
        duration: 12,
        videoId: "123456795",
        completed: false,
      },
      {
        id: "training-4",
        title: "Trainingsvolumen und Intensität",
        duration: 6,
        videoId: "123456796",
        completed: false,
      },
      {
        id: "training-5",
        title: "Regeneration und Erholung",
        duration: 5,
        videoId: "123456797",
        completed: false,
      },
    ],
  },
  {
    id: "ernaehrung",
    title: "Der Hebel der Ernährung",
    lessons: [
      {
        id: "ernaehrung-1",
        title: "Grundlagen der Sporternährung",
        duration: 9,
        videoId: "123456798",
        completed: false,
      },
      {
        id: "ernaehrung-2",
        title: "Makronährstoffe verstehen",
        duration: 11,
        videoId: "123456799",
        completed: false,
      },
      {
        id: "ernaehrung-3",
        title: "Mahlzeiten-Timing",
        duration: 7,
        videoId: "123456800",
        completed: false,
      },
      {
        id: "ernaehrung-4",
        title: "Supplemente im Kraftsport",
        duration: 8,
        videoId: "123456801",
        completed: false,
      },
    ],
  },
  {
    id: "ziel",
    title: "Was ist dein Ziel",
    lessons: [
      {
        id: "ziel-1",
        title: "Ziele definieren und SMART formulieren",
        duration: 6,
        videoId: "123456802",
        completed: false,
      },
      {
        id: "ziel-2",
        title: "Muskelaufbau vs. Fettabbau",
        duration: 8,
        videoId: "123456803",
        completed: false,
      },
      {
        id: "ziel-3",
        title: "Individuelle Zielsetzung",
        duration: 5,
        videoId: "123456804",
        completed: false,
      },
    ],
  },
  {
    id: "erfolg",
    title: "Wie erzielst du langfristig Erfolge",
    lessons: [
      {
        id: "erfolg-1",
        title: "Konsistenz als Schlüssel zum Erfolg",
        duration: 7,
        videoId: "123456805",
        completed: false,
      },
      {
        id: "erfolg-2",
        title: "Fortschritt messen und dokumentieren",
        duration: 6,
        videoId: "123456806",
        completed: false,
      },
      {
        id: "erfolg-3",
        title: "Anpassung und Optimierung",
        duration: 8,
        videoId: "123456807",
        completed: false,
      },
      {
        id: "erfolg-4",
        title: "Langfristige Strategie entwickeln",
        duration: 9,
        videoId: "123456808",
        completed: false,
      },
    ],
  },
];

export const getAllLessons = (): Lesson[] => {
  return modules.flatMap((module) => module.lessons);
};

export const getModuleById = (moduleId: string): Module | undefined => {
  return modules.find((m) => m.id === moduleId);
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  return getAllLessons().find((l) => l.id === lessonId);
};

export const calculateProgress = (lessons: Lesson[]): number => {
  if (lessons.length === 0) return 0;
  const completed = lessons.filter((l) => l.completed).length;
  return Math.round((completed / lessons.length) * 100);
};
