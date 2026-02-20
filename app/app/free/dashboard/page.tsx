"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Heading,
  Text,
  Card,
  Button,
  Stack,
  Box,
  HStack,
  VStack,
  SimpleGrid,
  Progress,
  Badge,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { Link } from "@/components/ui/link";
import {
  TrendUp,
  TrendDown,
  Calendar,
  Play,
  CheckCircle,
  ArrowRight,
  ForkKnife,
  ChartPie,
  VideoCamera,
} from "@phosphor-icons/react";
import {
  type AnyProgressEntry,
  type WeightEntry,
  formatDate,
  getDateKey,
} from "../fortschritt-tracker/data";
import { nutritionPlans, getNutritionPlanById } from "../ernaehrungsplan/data";
import { getAllLessons, calculateProgress } from "../lerne-die-grundlagen/data";

// Pie Chart Komponente für Makros
const MacroPieChart = ({
  protein,
  carbs,
  fats,
  size = 200,
}: {
  protein: number;
  carbs: number;
  fats: number;
  size?: number;
}) => {
  const total = protein + carbs + fats;
  if (total === 0) {
    return (
      <Box
        w={size}
        h={size}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="green.600"
        bg="green.50"
        borderRadius="full"
      >
        <Text fontSize="sm">Keine Daten</Text>
      </Box>
    );
  }

  const proteinPercent = (protein / total) * 100;
  const carbsPercent = (carbs / total) * 100;
  const fatsPercent = (fats / total) * 100;

  const radius = size / 2 - 10;
  const centerX = size / 2;
  const centerY = size / 2;

  // Berechne SVG-Pfade für Pie Chart
  let currentAngle = -90; // Start bei 12 Uhr

  const getPath = (percent: number, color: string) => {
    const angle = (percent / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    currentAngle = endAngle;

    return { path, color };
  };

  const proteinPath = getPath(proteinPercent, "#22c55e");
  const carbsPath = getPath(carbsPercent, "#3b82f6");
  const fatsPath = getPath(fatsPercent, "#f59e0b");

  return (
    <Box position="relative" w={size} h={size}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={centerX} cy={centerY} r={radius} fill="#f3f4f6" />
        <path d={proteinPath.path} fill={proteinPath.color} />
        <path d={carbsPath.path} fill={carbsPath.color} />
        <path d={fatsPath.path} fill={fatsPath.color} />
        <circle cx={centerX} cy={centerY} r={radius * 0.6} fill="white" />
        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#22c55e"
        >
          {Math.round(total)}g
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          fontSize="12"
          fill="#6b7280"
        >
          Gesamt
        </text>
      </svg>
    </Box>
  );
};

export default function Dashboard() {
  const [progressEntries, setProgressEntries] = useState<AnyProgressEntry[]>([]);
  const [trainingDays, setTrainingDays] = useState<any[]>([]);
  const [assignedNutritionPlans, setAssignedNutritionPlans] = useState<string[]>([]);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Lade Daten aus localStorage
  useEffect(() => {
    // Fortschritt-Tracker Daten
    const savedProgress = localStorage.getItem("progressEntries");
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProgressEntries(parsed);
        }
      } catch (e) {
        console.error("Error parsing progress entries", e);
      }
    }

    // Trainingsplan Daten
    const savedTrainingDays = localStorage.getItem("myTrainingDays");
    if (savedTrainingDays) {
      try {
        const parsed = JSON.parse(savedTrainingDays);
        if (Array.isArray(parsed)) {
          setTrainingDays(parsed);
        }
      } catch (e) {
        console.error("Error parsing training days", e);
      }
    }

    // Ernährungsplan Daten
    const savedNutritionPlans = localStorage.getItem("assignedNutritionPlans");
    if (savedNutritionPlans) {
      try {
        const parsed = JSON.parse(savedNutritionPlans);
        if (Array.isArray(parsed)) {
          setAssignedNutritionPlans(parsed);
        }
      } catch (e) {
        console.error("Error parsing nutrition plans", e);
      }
    }

    // Kurs-Fortschritt
    const savedCompleted = localStorage.getItem("completedLessons");
    if (savedCompleted) {
      try {
        const parsed = JSON.parse(savedCompleted);
        if (Array.isArray(parsed)) {
          setCompletedLessons(new Set(parsed));
        }
      } catch (e) {
        console.error("Error parsing completed lessons", e);
      }
    }
  }, []);

  // Berechne Gewichtsstatistiken
  const weightStats = useMemo(() => {
    const weightEntries = progressEntries
      .filter((e) => e.type === "weight")
      .map((e) => e as WeightEntry)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (weightEntries.length === 0) return null;

    const first = weightEntries[0].value;
    const last = weightEntries[weightEntries.length - 1].value;
    const change = last - first;
    const changePercent = first > 0 ? ((change / first) * 100).toFixed(1) : "0";

    return {
      first,
      last,
      change,
      changePercent,
      trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
    };
  }, [progressEntries]);

  // Finde heutiges Training
  const todayTraining = useMemo(() => {
    const today = getDateKey(new Date());
    return trainingDays.find((day) => day.date === today);
  }, [trainingDays]);

  // Berechne Makros aus Ernährungsplänen
  const macros = useMemo(() => {
    if (assignedNutritionPlans.length === 0) return null;

    // Nehme den ersten zugewiesenen Plan
    const plan = getNutritionPlanById(assignedNutritionPlans[0]);
    if (!plan) return null;

    return plan.macros;
  }, [assignedNutritionPlans]);

  // Gerichtsempfehlung
  const mealRecommendation = useMemo(() => {
    if (assignedNutritionPlans.length === 0) return null;

    const plan = getNutritionPlanById(assignedNutritionPlans[0]);
    if (!plan || plan.mealSuggestions.length === 0) return null;

    // Zufällige Gerichtsempfehlung
    const randomIndex = Math.floor(Math.random() * plan.mealSuggestions.length);
    return plan.mealSuggestions[randomIndex];
  }, [assignedNutritionPlans]);

  // Kurs-Fortschritt
  const courseProgress = useMemo(() => {
    const allLessons = getAllLessons();
    const lessonsWithStatus = allLessons.map((lesson) => ({
      ...lesson,
      completed: completedLessons.has(lesson.id),
    }));
    return calculateProgress(lessonsWithStatus);
  }, [completedLessons]);

  // Nächste Lektion
  const nextLesson = useMemo(() => {
    const allLessons = getAllLessons();
    return allLessons.find((lesson) => !completedLessons.has(lesson.id));
  }, [completedLessons]);

  return (
    <Section header>
      <Stack gap="6">
        <Stack gap="2">
          <Heading>Dashboard</Heading>
          <Text color="green.700">
            Willkommen zurück! Hier ist deine Übersicht über alle wichtigen Bereiche.
          </Text>
        </Stack>

        {/* Hauptbereich - Grid Layout */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {/* Fortschritt-Tracker Karte */}
          <Card.Root bg="green.50" borderColor="green.300" borderWidth="2px">
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between" align="flex-start">
                  <Stack gap="1">
                    <Text fontSize="sm" fontWeight="bold" color="green.800" textTransform="uppercase">
                      Fortschritt
                    </Text>
                    <Text fontSize="xs" color="green.600">
                      Gewicht & Körpermaße
                    </Text>
                  </Stack>
                  <Link href="/app/free/fortschritt-tracker">
                    <Button size="xs" variant="ghost" colorPalette="green">
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </HStack>

                {weightStats ? (
                  <Stack gap="3">
                    <HStack gap="2" align="baseline">
                      <Text fontSize="3xl" fontWeight="bold" color="green.800">
                        {weightStats.last.toFixed(1)}
                      </Text>
                      <Text fontSize="lg" color="green.600" fontWeight="medium">
                        kg
                      </Text>
                      {weightStats.trend === "up" && (
                        <TrendUp size={24} color="#22c55e" weight="fill" />
                      )}
                      {weightStats.trend === "down" && (
                        <TrendDown size={24} color="#22c55e" weight="fill" />
                      )}
                    </HStack>
                    <HStack gap="1" align="baseline">
                      <Text fontSize="sm" color="green.700" fontWeight="semibold">
                        {weightStats.change > 0 ? "+" : ""}
                        {weightStats.change.toFixed(1)} kg
                      </Text>
                      <Text fontSize="xs" color="green.600">
                        ({weightStats.changePercent}%) seit Start
                      </Text>
                    </HStack>
                    <Link href="/app/free/fortschritt-tracker">
                      <Button size="sm" variant="outline" colorPalette="green" w="full">
                        Details anzeigen
                      </Button>
                    </Link>
                  </Stack>
                ) : (
                  <Stack gap="2">
                    <Text fontSize="sm" color="green.600">
                      Noch keine Daten vorhanden
                    </Text>
                    <Link href="/app/free/fortschritt-tracker">
                      <Button size="sm" colorPalette="green" w="full">
                        Ersten Eintrag hinzufügen
                      </Button>
                    </Link>
                  </Stack>
                )}
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Heutiges Training */}
          <Card.Root bg="blue.50" borderColor="blue.300" borderWidth="2px">
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between" align="flex-start">
                  <Stack gap="1">
                    <Text fontSize="sm" fontWeight="bold" color="blue.800" textTransform="uppercase">
                      Heutiges Training
                    </Text>
                    <Text fontSize="xs" color="blue.600">
                      {formatDate(new Date().toISOString().split("T")[0])}
                    </Text>
                  </Stack>
                  <Link href="/app/free/mein-trainingsplan">
                    <Button size="xs" variant="ghost" colorPalette="blue">
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </HStack>

                {todayTraining && todayTraining.exercises && todayTraining.exercises.length > 0 ? (
                  <Stack gap="3">
                    <VStack align="stretch" gap="2">
                      {todayTraining.exercises.slice(0, 3).map((exercise: any, index: number) => (
                        <Box
                          key={exercise.id || index}
                          p="2"
                          bg="white"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="blue.200"
                        >
                          <Text fontSize="sm" fontWeight="medium" color="blue.800">
                            {exercise.name}
                          </Text>
                          <Text fontSize="xs" color="blue.600">
                            {exercise.sets} Sätze × {exercise.reps} Wdh.
                            {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                          </Text>
                        </Box>
                      ))}
                      {todayTraining.exercises.length > 3 && (
                        <Text fontSize="xs" color="blue.600" textAlign="center">
                          +{todayTraining.exercises.length - 3} weitere Übungen
                        </Text>
                      )}
                    </VStack>
                    <Link href="/app/free/mein-trainingsplan">
                      <Button size="sm" variant="outline" colorPalette="blue" w="full">
                        Training öffnen
                      </Button>
                    </Link>
                  </Stack>
                ) : (
                  <Stack gap="2">
                    <Box
                      p="4"
                      bg="white"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="blue.200"
                      textAlign="center"
                    >
                      <Calendar size={32} color="#3b82f6" weight="duotone" />
                      <Text fontSize="sm" color="blue.600" mt="2">
                        Kein Training geplant
                      </Text>
                    </Box>
                    <Link href="/app/free/trainingsplaene">
                      <Button size="sm" colorPalette="blue" w="full">
                        Trainingsplan zuweisen
                      </Button>
                    </Link>
                  </Stack>
                )}
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Makros Kuchendiagramm */}
          <Card.Root bg="purple.50" borderColor="purple.300" borderWidth="2px">
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between" align="flex-start">
                  <Stack gap="1">
                    <Text fontSize="sm" fontWeight="bold" color="purple.800" textTransform="uppercase">
                      Tägliche Makros
                    </Text>
                    <Text fontSize="xs" color="purple.600">
                      Aus Ernährungsplan
                    </Text>
                  </Stack>
                  <Link href="/app/free/ernaehrungsplan">
                    <Button size="xs" variant="ghost" colorPalette="purple">
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </HStack>

                {macros ? (
                  <Stack gap="4" align="center">
                    <MacroPieChart
                      protein={macros.protein}
                      carbs={macros.carbs}
                      fats={macros.fats}
                      size={180}
                    />
                    <VStack gap="2" w="full" align="stretch">
                      <HStack justify="space-between">
                        <HStack gap="2">
                          <Box w="3" h="3" bg="#22c55e" borderRadius="sm" />
                          <Text fontSize="sm" color="purple.700">
                            Protein
                          </Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="bold" color="purple.800">
                          {macros.protein}g
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <HStack gap="2">
                          <Box w="3" h="3" bg="#3b82f6" borderRadius="sm" />
                          <Text fontSize="sm" color="purple.700">
                            Kohlenhydrate
                          </Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="bold" color="purple.800">
                          {macros.carbs}g
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <HStack gap="2">
                          <Box w="3" h="3" bg="#f59e0b" borderRadius="sm" />
                          <Text fontSize="sm" color="purple.700">
                            Fette
                          </Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="bold" color="purple.800">
                          {macros.fats}g
                        </Text>
                      </HStack>
                    </VStack>
                    <Link href="/app/free/ernaehrungsplan">
                      <Button size="sm" variant="outline" colorPalette="purple" w="full">
                        Ernährungsplan öffnen
                      </Button>
                    </Link>
                  </Stack>
                ) : (
                  <Stack gap="2" align="center">
                    <Box
                      p="4"
                      bg="white"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="purple.200"
                      textAlign="center"
                    >
                      <ChartPie size={32} color="#a855f7" weight="duotone" />
                      <Text fontSize="sm" color="purple.600" mt="2">
                        Noch kein Plan zugewiesen
                      </Text>
                    </Box>
                    <Link href="/app/free/ernaehrungsplan">
                      <Button size="sm" colorPalette="purple" w="full">
                        Ernährungsplan wählen
                      </Button>
                    </Link>
                  </Stack>
                )}
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Gerichtsempfehlung */}
          <Card.Root bg="orange.50" borderColor="orange.300" borderWidth="2px">
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between" align="flex-start">
                  <Stack gap="1">
                    <Text fontSize="sm" fontWeight="bold" color="orange.800" textTransform="uppercase">
                      Gerichtsempfehlung
                    </Text>
                    <Text fontSize="xs" color="orange.600">
                      Für heute
                    </Text>
                  </Stack>
                  <Link href="/app/free/ernaehrungsplan">
                    <Button size="xs" variant="ghost" colorPalette="orange">
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </HStack>

                {mealRecommendation ? (
                  <Stack gap="3">
                    <Box
                      p="4"
                      bg="white"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="orange.200"
                    >
                      <HStack gap="3" align="flex-start">
                        <ForkKnife size={24} color="#f97316" weight="duotone" />
                        <Text fontSize="sm" color="orange.800" fontWeight="medium" flex="1">
                          {mealRecommendation}
                        </Text>
                      </HStack>
                    </Box>
                    <Link href="/app/free/ernaehrungsplan">
                      <Button size="sm" variant="outline" colorPalette="orange" w="full">
                        Weitere Vorschläge
                      </Button>
                    </Link>
                  </Stack>
                ) : (
                  <Stack gap="2">
                    <Box
                      p="4"
                      bg="white"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="orange.200"
                      textAlign="center"
                    >
                      <ForkKnife size={32} color="#f97316" weight="duotone" />
                      <Text fontSize="sm" color="orange.600" mt="2">
                        Noch kein Plan zugewiesen
                      </Text>
                    </Box>
                    <Link href="/app/free/ernaehrungsplan">
                      <Button size="sm" colorPalette="orange" w="full">
                        Ernährungsplan wählen
                      </Button>
                    </Link>
                  </Stack>
                )}
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Video-Kurs Fortschritt */}
          <Card.Root bg="teal.50" borderColor="teal.300" borderWidth="2px">
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between" align="flex-start">
                  <Stack gap="1">
                    <Text fontSize="sm" fontWeight="bold" color="teal.800" textTransform="uppercase">
                      Video-Kurs
                    </Text>
                    <Text fontSize="xs" color="teal.600">
                      Lerne die Grundlagen
                    </Text>
                  </Stack>
                  <Link href="/app/free/lerne-die-grundlagen">
                    <Button size="xs" variant="ghost" colorPalette="teal">
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </HStack>

                <Stack gap="3">
                  <Stack gap="2">
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="teal.700">
                        Gesamtfortschritt
                      </Text>
                      <Text fontSize="sm" fontWeight="bold" color="teal.800">
                        {courseProgress}%
                      </Text>
                    </HStack>
                    <Progress.Root value={courseProgress} colorPalette="teal" size="sm">
                      <Progress.Track>
                        <Progress.Range />
                      </Progress.Track>
                    </Progress.Root>
                  </Stack>

                  {nextLesson ? (
                    <Box
                      p="3"
                      bg="white"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="teal.200"
                    >
                      <HStack gap="2" align="flex-start">
                        <VideoCamera size={20} color="#14b8a6" weight="duotone" />
                        <VStack align="flex-start" gap="0" flex="1">
                          <Text fontSize="sm" fontWeight="medium" color="teal.800">
                            Nächste Lektion
                          </Text>
                          <Text fontSize="xs" color="teal.600">
                            {nextLesson.title}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  ) : (
                    <Box
                      p="3"
                      bg="white"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="teal.200"
                      textAlign="center"
                    >
                      <CheckCircle size={24} color="#14b8a6" weight="fill" />
                      <Text fontSize="sm" color="teal.600" mt="2">
                        Alle Lektionen abgeschlossen!
                      </Text>
                    </Box>
                  )}

                  <Link href="/app/free/lerne-die-grundlagen">
                    <Button size="sm" variant="outline" colorPalette="teal" w="full">
                      {nextLesson ? "Weiter lernen" : "Kurs öffnen"}
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Quick Actions */}
          <Card.Root>
            <Card.Body>
              <Stack gap="4">
                <Text fontSize="sm" fontWeight="bold" color="green.800" textTransform="uppercase">
                  Schnellzugriff
                </Text>
                <VStack gap="2" align="stretch">
                  <Link href="/app/free/fortschritt-tracker">
                    <Button size="sm" variant="outline" colorPalette="green" w="full" justifyContent="flex-start">
                      <HStack gap="2">
                        <TrendUp size={20} />
                        <Text>Fortschritt eintragen</Text>
                      </HStack>
                    </Button>
                  </Link>
                  <Link href="/app/free/mein-trainingsplan">
                    <Button size="sm" variant="outline" colorPalette="blue" w="full" justifyContent="flex-start">
                      <HStack gap="2">
                        <Calendar size={20} />
                        <Text>Trainingsplan öffnen</Text>
                      </HStack>
                    </Button>
                  </Link>
                  <Link href="/app/free/ernaehrungsplan">
                    <Button size="sm" variant="outline" colorPalette="purple" w="full" justifyContent="flex-start">
                      <HStack gap="2">
                        <ForkKnife size={20} />
                        <Text>Ernährungsplan öffnen</Text>
                      </HStack>
                    </Button>
                  </Link>
                  <Link href="/app/free/lerne-die-grundlagen">
                    <Button size="sm" variant="outline" colorPalette="teal" w="full" justifyContent="flex-start">
                      <HStack gap="2">
                        <Play size={20} />
                        <Text>Video-Kurs starten</Text>
                      </HStack>
                    </Button>
                  </Link>
                </VStack>
              </Stack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Stack>
    </Section>
  );
}
