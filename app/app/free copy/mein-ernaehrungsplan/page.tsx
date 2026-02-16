"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Heading,
  Text,
  Card,
  Button,
  Stack,
  Box,
  HStack,
  SimpleGrid,
  Input,
  NumberInput,
  Badge,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Section } from "@/components/layout/section";
import { EmptyState } from "@/components/ui/empty-state";
import { Link } from "@/components/ui/link";
import { Plus, Pencil, X, Lock, MagnifyingGlass, Trash } from "@phosphor-icons/react";
import { nutritionPlans, getNutritionPlanById, type NutritionPlan } from "../ernaehrungsplan/data";
import { searchFoods, getFoodNutrition, extractMacrosFromServing, type MacroInfo } from "@/utils/fatsecret/api";

interface FoodItem {
  id: string;
  foodId: string;
  name: string;
  amount: number; // in g oder Portionen
  macros: MacroInfo;
}

interface NutritionDay {
  date: string; // YYYY-MM-DD
  mealSuggestion: string;
  foods: FoodItem[];
  targetMacros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const formatDateDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });
};

const getDaysInMonth = (date: Date): Date[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Date[] = [];

  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  for (let i = 0; i < startDay; i++) {
    days.push(new Date(year, month, -startDay + i + 1));
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  return days;
};

// Erstelle automatisch Ernährungstage basierend auf Plan
const createNutritionSchedule = (plan: NutritionPlan, startDate: Date = new Date()): NutritionDay[] => {
  const days: NutritionDay[] = [];
  const weeks = parseInt(plan.duration.split(" ")[0]);
  const totalDays = weeks * 7;

  for (let day = 0; day < totalDays; day++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + day);
    
    // Rotiere durch Gericht-Vorschläge
    const mealIndex = day % plan.mealSuggestions.length;
    
    days.push({
      date: formatDate(date),
      mealSuggestion: plan.mealSuggestions[mealIndex],
      foods: [],
      targetMacros: {
        calories: plan.dailyCalories,
        protein: plan.macros.protein,
        carbs: plan.macros.carbs,
        fat: plan.macros.fats,
      },
    });
  }

  return days;
};

export default function MeinErnaehrungsplan() {
  const [assignedPlans, setAssignedPlans] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nutritionDays, setNutritionDays] = useState<NutritionDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any | null>(null);
  const [foodAmount, setFoodAmount] = useState(100); // in g

  // Lade zugewiesene Pläne und erstelle automatisch Ernährungstage
  useEffect(() => {
    const stored = localStorage.getItem("assignedNutritionPlans");
    if (stored) {
      const planIds = JSON.parse(stored) as string[];
      setAssignedPlans(planIds);
      
      const allNutritionDays: NutritionDay[] = [];
      planIds.forEach((planId) => {
        const plan = getNutritionPlanById(planId);
        if (plan) {
          const schedule = createNutritionSchedule(plan);
          allNutritionDays.push(...schedule);
        }
      });
      
      const storedDays = localStorage.getItem("myNutritionDays");
      if (storedDays) {
        const existingDays = JSON.parse(storedDays) as NutritionDay[];
        const merged = [...existingDays];
        allNutritionDays.forEach((day) => {
          if (!merged.find((d) => d.date === day.date)) {
            merged.push(day);
          }
        });
        setNutritionDays(merged);
      } else {
        setNutritionDays(allNutritionDays);
      }
    }
  }, []);

  // Speichere Ernährungstage in localStorage
  useEffect(() => {
    if (nutritionDays.length > 0) {
      localStorage.setItem("myNutritionDays", JSON.stringify(nutritionDays));
    }
  }, [nutritionDays]);

  const daysInMonth = useMemo(() => getDaysInMonth(currentDate), [currentDate]);
  const monthYear = currentDate.toLocaleDateString("de-DE", { month: "long", year: "numeric" });

  const getNutritionDay = (dateString: string): NutritionDay | undefined => {
    return nutritionDays.find((day) => day.date === dateString);
  };

  const handleDateClick = (dateString: string) => {
    setSelectedDate(dateString);
    setIsDialogOpen(true);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedFood(null);
  };

  const handleSearchFoods = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      console.log("Searching for:", searchQuery);
      const results = await searchFoods(searchQuery, 10);
      console.log("Search results:", results);
      setSearchResults(results);
      if (results.length === 0) {
        alert("Keine Ergebnisse gefunden. Versuche einen anderen Suchbegriff.");
      }
    } catch (error) {
      console.error("Error searching foods:", error);
      alert(`Fehler bei der Lebensmittelsuche: ${error instanceof Error ? error.message : "Unbekannter Fehler"}`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectFood = async (food: any) => {
    try {
      const nutritionInfo = await getFoodNutrition(food.food_id);
      if (nutritionInfo && nutritionInfo.servings?.serving) {
        const servings = Array.isArray(nutritionInfo.servings.serving) 
          ? nutritionInfo.servings.serving 
          : [nutritionInfo.servings.serving];
        
        // Verwende das erste Serving als Standard
        const serving = servings[0];
        const macros = extractMacrosFromServing(serving);
        
        setSelectedFood({
          ...food,
          nutritionInfo,
          macros,
          serving,
        });
      }
    } catch (error) {
      console.error("Error fetching food nutrition:", error);
      alert("Fehler beim Laden der Nährwerte.");
    }
  };

  const handleAddFood = () => {
    if (!selectedDate || !selectedFood) return;

    const nutritionDay = getNutritionDay(selectedDate);
    const macros = selectedFood.macros;
    
    // Berechne Makros basierend auf Menge (100g = Standard)
    const multiplier = foodAmount / 100;
    
    const newFood: FoodItem = {
      id: Date.now().toString(),
      foodId: selectedFood.food_id,
      name: selectedFood.food_name,
      amount: foodAmount,
      macros: {
        ...macros,
        calories: macros.calories * multiplier,
        protein: macros.protein * multiplier,
        carbs: macros.carbs * multiplier,
        fat: macros.fat * multiplier,
      },
    };

    if (nutritionDay) {
      setNutritionDays(
        nutritionDays.map((day) =>
          day.date === selectedDate
            ? { ...day, foods: [...day.foods, newFood] }
            : day
        )
      );
    } else {
      const plan = assignedPlans.length > 0 ? getNutritionPlanById(assignedPlans[0]) : null;
      setNutritionDays([
        ...nutritionDays,
        {
          date: selectedDate,
          mealSuggestion: plan?.mealSuggestions[0] || "Gericht auswählen",
          foods: [newFood],
          targetMacros: plan
            ? {
                calories: plan.dailyCalories,
                protein: plan.macros.protein,
                carbs: plan.macros.carbs,
                fat: plan.macros.fats,
              }
            : {
                calories: 2000,
                protein: 150,
                carbs: 200,
                fat: 67,
              },
        },
      ]);
    }

    setSelectedFood(null);
    setSearchQuery("");
    setSearchResults([]);
    setFoodAmount(100);
  };

  const handleDeleteFood = (foodId: string) => {
    if (!selectedDate) return;

    const nutritionDay = getNutritionDay(selectedDate);
    if (nutritionDay && nutritionDay.foods.length === 1) {
      setNutritionDays(nutritionDays.filter((day) => day.date !== selectedDate));
    } else {
      setNutritionDays(
        nutritionDays.map((day) =>
          day.date === selectedDate
            ? {
                ...day,
                foods: day.foods.filter((food) => food.id !== foodId),
              }
            : day
        )
      );
    }
  };

  const calculateTotalMacros = (foods: FoodItem[]) => {
    return foods.reduce(
      (acc, food) => ({
        calories: acc.calories + food.macros.calories,
        protein: acc.protein + food.macros.protein,
        carbs: acc.carbs + food.macros.carbs,
        fat: acc.fat + food.macros.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const weekDays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

  if (assignedPlans.length === 0) {
    return (
      <Section header>
        <EmptyState
          icon={<Lock size={48} color="var(--chakra-colors-green-500)" />}
          title="Noch kein Ernährungsplan zugewiesen"
          description="Weise dir zuerst einen Ernährungsplan in 'Ernährungsplan' zu, um deinen persönlichen Ernährungsplan zu erstellen."
        >
          <Link href="/app/free/ernaehrungsplan">
            <Button colorPalette="green" size="lg">
              Zu Ernährungsplan
            </Button>
          </Link>
        </EmptyState>
      </Section>
    );
  }

  const selectedDay = selectedDate ? getNutritionDay(selectedDate) : null;
  const totalMacros = selectedDay ? calculateTotalMacros(selectedDay.foods) : null;

  return (
    <Section header>
      <Stack gap="6">
        <Stack gap="2">
          <Heading>Mein Ernährungsplan</Heading>
          <Text color="green.700">
            Verwalte deine Ernährungstage im Kalender und tracke deine Makros.
          </Text>
        </Stack>

        {/* Kalender */}
        <Card.Root>
          <Card.Body>
            <Stack gap="4">
              <HStack justify="space-between" align="center">
                <Button
                  variant="ghost"
                  colorPalette="green"
                  onClick={() => navigateMonth("prev")}
                >
                  ←
                </Button>
                <Heading size="md" color="green.800">
                  {monthYear}
                </Heading>
                <Button
                  variant="ghost"
                  colorPalette="green"
                  onClick={() => navigateMonth("next")}
                >
                  →
                </Button>
              </HStack>

              <SimpleGrid columns={7} gap="2">
                {weekDays.map((day) => (
                  <Box
                    key={day}
                    textAlign="center"
                    fontWeight="bold"
                    color="green.700"
                    fontSize="sm"
                    py="2"
                  >
                    {day}
                  </Box>
                ))}
              </SimpleGrid>

              <SimpleGrid columns={7} gap="2">
                {daysInMonth.map((day, index) => {
                  const dateString = formatDate(day);
                  const nutritionDay = getNutritionDay(dateString);
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const isToday = dateString === formatDate(new Date());

                  return (
                    <Box
                      key={index}
                      minH="80px"
                      p="2"
                      border="1px solid"
                      borderColor={isCurrentMonth ? "green.200" : "gray.200"}
                      borderRadius="md"
                      bg={isCurrentMonth ? (isToday ? "green.50" : "white") : "gray.50"}
                      cursor="pointer"
                      onClick={() => handleDateClick(dateString)}
                      _hover={{
                        bg: "green.50",
                        borderColor: "green.400",
                      }}
                      position="relative"
                    >
                      <Text
                        fontSize="sm"
                        color={isCurrentMonth ? "green.800" : "gray.400"}
                        fontWeight={isToday ? "bold" : "normal"}
                        mb="1"
                      >
                        {day.getDate()}
                      </Text>
                      {nutritionDay && (
                        <Stack gap="1">
                          {nutritionDay.mealSuggestion && (
                            <Box
                              bg="green.500"
                              color="white"
                              px="1"
                              py="0.5"
                              borderRadius="sm"
                              fontSize="xs"
                              fontWeight="medium"
                            >
                              {nutritionDay.mealSuggestion.substring(0, 20)}...
                            </Box>
                          )}
                          {nutritionDay.foods.length > 0 && (
                            <Text fontSize="xs" color="green.600" fontWeight="medium">
                              {nutritionDay.foods.length} Lebensmittel
                            </Text>
                          )}
                        </Stack>
                      )}
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Dialog für Ernährungstag */}
        <DialogRoot open={isDialogOpen} onOpenChange={(e) => !e.open && setIsDialogOpen(false)}>
          <DialogContent maxW="700px" maxH="90vh" overflowY="auto">
            <DialogHeader>
              <DialogTitle>
                {selectedDate ? `Ernährung am ${formatDateDisplay(selectedDate)}` : "Ernährung"}
              </DialogTitle>
            </DialogHeader>
            <DialogBody>
              {selectedDate && (
                <Stack gap="4">
                  {/* Gericht-Vorschlag */}
                  {selectedDay?.mealSuggestion && (
                    <Card.Root borderColor="green.200">
                      <Card.Body>
                        <Stack gap="2">
                          <Heading size="sm" color="green.800">
                            Gericht-Vorschlag
                          </Heading>
                          <Text color="green.700">{selectedDay.mealSuggestion}</Text>
                        </Stack>
                      </Card.Body>
                    </Card.Root>
                  )}

                  {/* Makro-Übersicht */}
                  {selectedDay && (
                    <Card.Root borderColor="blue.200">
                      <Card.Body>
                        <Stack gap="3">
                          <Heading size="sm" color="blue.800">
                            Makro-Tracking
                          </Heading>
                          <SimpleGrid columns={2} gap="4">
                            <Stack gap="2">
                              <Text fontSize="sm" fontWeight="medium" color="blue.700">
                                Ziel:
                              </Text>
                              <Text fontSize="sm" color="blue.600">
                                Kalorien: {selectedDay.targetMacros.calories} kcal
                              </Text>
                              <Text fontSize="sm" color="blue.600">
                                Protein: {selectedDay.targetMacros.protein}g
                              </Text>
                              <Text fontSize="sm" color="blue.600">
                                Kohlenhydrate: {selectedDay.targetMacros.carbs}g
                              </Text>
                              <Text fontSize="sm" color="blue.600">
                                Fette: {selectedDay.targetMacros.fat}g
                              </Text>
                            </Stack>
                            {totalMacros && (
                              <Stack gap="2">
                                <Text fontSize="sm" fontWeight="medium" color="green.700">
                                  Aktuell:
                                </Text>
                                <Text fontSize="sm" color="green.600">
                                  Kalorien: {Math.round(totalMacros.calories)} kcal
                                </Text>
                                <Text fontSize="sm" color="green.600">
                                  Protein: {Math.round(totalMacros.protein)}g
                                </Text>
                                <Text fontSize="sm" color="green.600">
                                  Kohlenhydrate: {Math.round(totalMacros.carbs)}g
                                </Text>
                                <Text fontSize="sm" color="green.600">
                                  Fette: {Math.round(totalMacros.fat)}g
                                </Text>
                              </Stack>
                            )}
                          </SimpleGrid>
                        </Stack>
                      </Card.Body>
                    </Card.Root>
                  )}

                  {/* Bestehende Lebensmittel */}
                  {selectedDay?.foods.map((food) => (
                    <Card.Root key={food.id} borderColor="green.200">
                      <Card.Body>
                        <Stack gap="3">
                          <HStack justify="space-between">
                            <Heading size="sm" color="green.800">
                              {food.name}
                            </Heading>
                            <Button
                              size="sm"
                              variant="ghost"
                              colorPalette="red"
                              onClick={() => handleDeleteFood(food.id)}
                            >
                              <X size={16} />
                            </Button>
                          </HStack>
                          <HStack gap="4" fontSize="sm" color="green.700">
                            <Text>
                              <strong>{Math.round(food.macros.calories)}</strong> kcal
                            </Text>
                            <Text>
                              <strong>{Math.round(food.macros.protein)}g</strong> Protein
                            </Text>
                            <Text>
                              <strong>{Math.round(food.macros.carbs)}g</strong> Carbs
                            </Text>
                            <Text>
                              <strong>{Math.round(food.macros.fat)}g</strong> Fett
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                              ({food.amount}g)
                            </Text>
                          </HStack>
                        </Stack>
                      </Card.Body>
                    </Card.Root>
                  ))}

                  {/* Lebensmittelsuche */}
                  <Card.Root borderColor="green.300" borderWidth="2px">
                    <Card.Body>
                      <Stack gap="4">
                        <Heading size="sm" color="green.800">
                          Lebensmittel hinzufügen
                        </Heading>

                        <HStack gap="2">
                          <Input
                            placeholder="Nach Zutaten suchen (z.B. Hähnchen, Reis, Brokkoli)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearchFoods()}
                            colorPalette="green"
                            flex="1"
                          />
                          <Button
                            colorPalette="green"
                            onClick={handleSearchFoods}
                            loading={isSearching}
                          >
                            <MagnifyingGlass size={20} />
                          </Button>
                        </HStack>

                        {/* Suchergebnisse */}
                        {searchResults.length > 0 && !selectedFood && (
                          <Stack gap="2" maxH="200px" overflowY="auto">
                            {searchResults.map((food) => (
                              <Box
                                key={food.food_id}
                                p="3"
                                border="1px solid"
                                borderColor="green.200"
                                borderRadius="md"
                                cursor="pointer"
                                _hover={{ bg: "green.50", borderColor: "green.400" }}
                                onClick={() => handleSelectFood(food)}
                              >
                                <Text fontWeight="medium" color="green.800">
                                  {food.food_name}
                                </Text>
                                {food.brand_name && (
                                  <Text fontSize="sm" color="green.600">
                                    {food.brand_name}
                                  </Text>
                                )}
                              </Box>
                            ))}
                          </Stack>
                        )}

                        {/* Ausgewähltes Lebensmittel */}
                        {selectedFood && (
                          <Stack gap="3">
                            <Box
                              p="3"
                              bg="green.50"
                              borderRadius="md"
                              border="1px solid"
                              borderColor="green.300"
                            >
                              <Text fontWeight="medium" color="green.800" mb="2">
                                {selectedFood.food_name}
                              </Text>
                              <Text fontSize="sm" color="green.700" mb="3">
                                {selectedFood.macros.servingDescription}
                              </Text>
                              <SimpleGrid columns={4} gap="2" fontSize="sm">
                                <Text color="green.700">
                                  <strong>{Math.round(selectedFood.macros.calories)}</strong> kcal
                                </Text>
                                <Text color="green.700">
                                  <strong>{Math.round(selectedFood.macros.protein)}g</strong> Protein
                                </Text>
                                <Text color="green.700">
                                  <strong>{Math.round(selectedFood.macros.carbs)}g</strong> Carbs
                                </Text>
                                <Text color="green.700">
                                  <strong>{Math.round(selectedFood.macros.fat)}g</strong> Fett
                                </Text>
                              </SimpleGrid>
                            </Box>

                            <HStack gap="2">
                              <Text fontSize="sm" fontWeight="medium" color="green.700" minW="80px">
                                Menge (g):
                              </Text>
                              <NumberInput.Root
                                value={foodAmount.toString()}
                                onValueChange={(e) => setFoodAmount(parseFloat(e.value) || 100)}
                                min={1}
                                max={10000}
                                flex="1"
                              >
                                <NumberInput.Input />
                              </NumberInput.Root>
                            </HStack>

                            <HStack gap="2">
                              <Button
                                variant="outline"
                                colorPalette="gray"
                                onClick={() => {
                                  setSelectedFood(null);
                                  setSearchQuery("");
                                }}
                                flex="1"
                              >
                                Abbrechen
                              </Button>
                              <Button
                                colorPalette="green"
                                onClick={handleAddFood}
                                flex="1"
                              >
                                <HStack gap="2">
                                  <Plus size={20} />
                                  <Text>Hinzufügen</Text>
                                </HStack>
                              </Button>
                            </HStack>
                          </Stack>
                        )}
                      </Stack>
                    </Card.Body>
                  </Card.Root>
                </Stack>
              )}
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" colorPalette="gray" onClick={() => setIsDialogOpen(false)}>
                Schließen
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </Stack>
    </Section>
  );
}
