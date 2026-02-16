"use client";

import { useState, useEffect, useMemo } from "react";
import { createListCollection } from "@chakra-ui/react";
import {
  Heading,
  Text,
  Card,
  Button,
  Stack,
  Box,
  HStack,
  VStack,
  Input,
  NumberInput,
  Select,
  Tabs,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import {
  Plus,
  Trash,
  TrendUp,
  TrendDown,
  Minus,
  Calendar,
} from "@phosphor-icons/react";
import {
  type AnyProgressEntry,
  type WeightEntry,
  type CircumferenceEntry,
  type TrainingEntry,
  type MetricType,
  bodyPartLabels,
  formatDate,
  getDateKey,
  generateTestData,
} from "./data";

// Verbesserte SVG-basierte Line Chart Komponente mit Gradient
const LineChart = ({
  data,
  width = 400,
  height = 200,
  color = "#22c55e",
  label,
  unit = "",
}: {
  data: { date: string; value: number }[];
  width?: number;
  height?: number;
  color?: string;
  label?: string;
  unit?: string;
}) => {
  if (data.length === 0) {
    return (
      <Box
        w="full"
        h={height}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="green.600"
        bg="green.50"
        borderRadius="md"
      >
        <Text>Keine Daten vorhanden</Text>
      </Box>
    );
  }

  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = data.map((d) => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue || 1;
  const paddingValue = valueRange * 0.1; // 10% Padding oben und unten

  const points = data.map((d, index) => {
    const x = padding.left + (index / (data.length - 1 || 1)) * chartWidth;
    const normalizedValue = (d.value - minValue + paddingValue) / (valueRange + paddingValue * 2);
    const y = padding.top + chartHeight - normalizedValue * chartHeight;
    return { x, y, value: d.value, date: d.date };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  // Area unter der Linie für Gradient
  const areaPath = `${pathData} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  return (
    <Box w="full" position="relative" bg="white" borderRadius="lg" p="4" border="1px solid" borderColor="green.100">
      {label && (
        <Text fontSize="sm" fontWeight="semibold" color="green.800" mb="2">
          {label}
        </Text>
      )}
      <Box w="full" position="relative" overflow="hidden">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: "100%" }}>
          <defs>
            <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Area unter der Linie */}
          <path d={areaPath} fill={`url(#gradient-${color.replace("#", "")})`} />

          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + chartHeight - ratio * chartHeight;
            const value = minValue + ratio * valueRange;
            return (
              <g key={ratio}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  fontSize="11"
                  fill="#6b7280"
                  textAnchor="end"
                  fontWeight="500"
                >
                  {value.toFixed(1)}{unit}
                </text>
              </g>
            );
          })}

          {/* X-Axis Labels (Daten) */}
          {data.length > 0 && data.length <= 10 && (
            <>
              {points.map((point, index) => {
                if (index % Math.ceil(data.length / 5) === 0 || index === data.length - 1) {
                  return (
                    <text
                      key={index}
                      x={point.x}
                      y={height - padding.bottom + 15}
                      fontSize="10"
                      fill="#6b7280"
                      textAnchor="middle"
                    >
                      {formatDate(point.date).split(".")[0]}
                    </text>
                  );
                }
                return null;
              })}
            </>
          )}

          {/* Chart Line */}
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="white"
                stroke={color}
                strokeWidth="3"
              />
              <circle
                cx={point.x}
                cy={point.y}
                r="3"
                fill={color}
              />
              <title>
                {formatDate(point.date)}: {point.value.toFixed(1)}{unit}
              </title>
            </g>
          ))}
        </svg>
      </Box>
    </Box>
  );
};

export default function FortschrittTracker() {
  const [entries, setEntries] = useState<AnyProgressEntry[]>([]);
  const [activeTab, setActiveTab] = useState<MetricType>("weight");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "all">("30d");

  // Collection für Select
  const bodyPartCollection = useMemo(
    () => createListCollection({ items: Object.keys(bodyPartLabels) }),
    []
  );

  // Form States
  const [weightForm, setWeightForm] = useState({ value: "", date: getDateKey(new Date()), notes: "" });
  const [circumferenceForm, setCircumferenceForm] = useState({
    value: "",
    bodyPart: "waist" as CircumferenceEntry["bodyPart"],
    date: getDateKey(new Date()),
    notes: "",
  });
  const [trainingForm, setTrainingForm] = useState({
    exercise: "",
    value: "",
    sets: "",
    reps: "",
    weight: "",
    date: getDateKey(new Date()),
    notes: "",
  });

  // Lade Daten aus localStorage oder generiere Testdaten
  useEffect(() => {
    const saved = localStorage.getItem("progressEntries");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length > 0) {
        setEntries(parsed);
        return;
      }
    }
    // Wenn keine Daten vorhanden, generiere Testdaten
    const testData = generateTestData();
    setEntries(testData);
    localStorage.setItem("progressEntries", JSON.stringify(testData));
  }, []);

  // Speichere Daten in localStorage
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem("progressEntries", JSON.stringify(entries));
    }
  }, [entries]);

  // Filtere Daten nach Zeitraum
  const filteredEntries = useMemo(() => {
    const now = new Date();
    const cutoffDate = new Date();
    
    switch (timeRange) {
      case "7d":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "30d":
        cutoffDate.setDate(now.getDate() - 30);
        break;
      case "90d":
        cutoffDate.setDate(now.getDate() - 90);
        break;
      case "all":
        return entries;
    }

    return entries.filter((entry) => new Date(entry.date) >= cutoffDate);
  }, [entries, timeRange]);

  // Gruppiere Einträge nach Typ
  const weightEntries = filteredEntries.filter((e) => e.type === "weight") as WeightEntry[];
  const circumferenceEntries = filteredEntries.filter(
    (e) => e.type === "circumference"
  ) as CircumferenceEntry[];
  const trainingEntries = filteredEntries.filter((e) => e.type === "training") as TrainingEntry[];

  // Berechne Statistiken
  const weightStats = useMemo(() => {
    if (weightEntries.length === 0) return null;
    const sorted = [...weightEntries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const first = sorted[0].value;
    const last = sorted[sorted.length - 1].value;
    const change = last - first;
    const changePercent = first > 0 ? ((change / first) * 100).toFixed(1) : "0";
    return { first, last, change, changePercent, trend: change > 0 ? "up" : change < 0 ? "down" : "neutral" };
  }, [weightEntries]);

  const handleAddWeight = () => {
    if (!weightForm.value) return;
    const entry: WeightEntry = {
      id: Date.now().toString(),
      type: "weight",
      date: weightForm.date,
      value: parseFloat(weightForm.value),
      notes: weightForm.notes,
    };
    setEntries([...entries, entry]);
    setWeightForm({ value: "", date: getDateKey(new Date()), notes: "" });
  };

  const handleAddCircumference = () => {
    if (!circumferenceForm.value) return;
    const entry: CircumferenceEntry = {
      id: Date.now().toString(),
      type: "circumference",
      date: circumferenceForm.date,
      value: parseFloat(circumferenceForm.value),
      bodyPart: circumferenceForm.bodyPart,
      notes: circumferenceForm.notes,
    };
    setEntries([...entries, entry]);
    setCircumferenceForm({ value: "", bodyPart: "waist", date: getDateKey(new Date()), notes: "" });
  };

  const handleAddTraining = () => {
    if (!trainingForm.exercise || !trainingForm.weight) return;
    const entry: TrainingEntry = {
      id: Date.now().toString(),
      type: "training",
      date: trainingForm.date,
      value: trainingForm.weight ? parseFloat(trainingForm.weight) : 0,
      exercise: trainingForm.exercise,
      sets: trainingForm.sets ? parseInt(trainingForm.sets) : undefined,
      reps: trainingForm.reps ? parseInt(trainingForm.reps) : undefined,
      weight: trainingForm.weight ? parseFloat(trainingForm.weight) : undefined,
      notes: trainingForm.notes,
    };
    setEntries([...entries, entry]);
    setTrainingForm({
      exercise: "",
      value: "",
      sets: "",
      reps: "",
      weight: "",
      date: getDateKey(new Date()),
      notes: "",
    });
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  // Gruppiere Umfang-Einträge nach Körperteil
  const circumferenceByPart = useMemo(() => {
    const grouped: Record<string, CircumferenceEntry[]> = {};
    circumferenceEntries.forEach((entry) => {
      if (!grouped[entry.bodyPart]) {
        grouped[entry.bodyPart] = [];
      }
      grouped[entry.bodyPart].push(entry);
    });
    return grouped;
  }, [circumferenceEntries]);

  // Gruppiere Training-Einträge nach Übung
  const trainingByExercise = useMemo(() => {
    const grouped: Record<string, TrainingEntry[]> = {};
    trainingEntries.forEach((entry) => {
      if (!grouped[entry.exercise]) {
        grouped[entry.exercise] = [];
      }
      grouped[entry.exercise].push(entry);
    });
    return grouped;
  }, [trainingEntries]);

  return (
    <Section header>
      <Stack gap="6">
        <Stack gap="2">
          <Heading>Fortschritt-Tracker</Heading>
          <Text color="green.700">
            Verfolge deine Fortschritte und sehe, wie du dich kontinuierlich verbesserst.
          </Text>
        </Stack>

        {/* Zeitraum-Filter */}
        <Card.Root>
          <Card.Body>
            <HStack justify="space-between" align="center">
              <Text fontSize="sm" fontWeight="medium" color="green.700">
                Zeitraum
              </Text>
              <HStack gap="2">
                {(["7d", "30d", "90d", "all"] as const).map((range) => (
                  <Button
                    key={range}
                    size="sm"
                    variant={timeRange === range ? "solid" : "outline"}
                    colorPalette="green"
                    onClick={() => setTimeRange(range)}
                  >
                    {range === "7d" ? "7 Tage" : range === "30d" ? "30 Tage" : range === "90d" ? "90 Tage" : "Alle"}
                  </Button>
                ))}
              </HStack>
            </HStack>
          </Card.Body>
        </Card.Root>

        {/* Übersichtskarten */}
        {weightStats && (
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
            <Card.Root bg="green.50" borderColor="green.300" borderWidth="2px" boxShadow="md">
              <Card.Body>
                <Stack gap="2">
                  <Text fontSize="sm" color="green.700" fontWeight="medium">
                    Aktuelles Gewicht
                  </Text>
                  <HStack gap="2">
                    <Text fontSize="3xl" fontWeight="bold" color="green.800">
                      {weightStats.last.toFixed(1)}
                    </Text>
                    <Text fontSize="lg" color="green.600" fontWeight="medium">
                      kg
                    </Text>
                    {weightStats.trend === "up" && <TrendUp size={28} color="#22c55e" weight="fill" />}
                    {weightStats.trend === "down" && <TrendDown size={28} color="#22c55e" weight="fill" />}
                    {weightStats.trend === "neutral" && <Minus size={28} color="#6b7280" weight="fill" />}
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
                </Stack>
              </Card.Body>
            </Card.Root>

            <Card.Root bg="blue.50" borderColor="blue.300" borderWidth="2px" boxShadow="md">
              <Card.Body>
                <Stack gap="2">
                  <Text fontSize="sm" color="blue.700" fontWeight="medium">
                    Startgewicht
                  </Text>
                  <HStack gap="2">
                    <Text fontSize="3xl" fontWeight="bold" color="blue.800">
                      {weightStats.first.toFixed(1)}
                    </Text>
                    <Text fontSize="lg" color="blue.600" fontWeight="medium">
                      kg
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="blue.600">
                    Vor {Math.ceil((new Date().getTime() - new Date(weightEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0].date).getTime()) / (1000 * 60 * 60 * 24))} Tagen
                  </Text>
                </Stack>
              </Card.Body>
            </Card.Root>

            <Card.Root bg="purple.50" borderColor="purple.300" borderWidth="2px" boxShadow="md">
              <Card.Body>
                <Stack gap="2">
                  <Text fontSize="sm" color="purple.700" fontWeight="medium">
                    Gesamtfortschritt
                  </Text>
                  <HStack gap="2">
                    <Text fontSize="3xl" fontWeight="bold" color="purple.800">
                      {Math.abs(weightStats.change).toFixed(1)}
                    </Text>
                    <Text fontSize="lg" color="purple.600" fontWeight="medium">
                      kg
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="purple.600">
                    {weightStats.change < 0 ? "Abnahme" : weightStats.change > 0 ? "Zunahme" : "Unverändert"}
                  </Text>
                </Stack>
              </Card.Body>
            </Card.Root>
          </SimpleGrid>
        )}

        {/* Tabs für verschiedene Metriken */}
        <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value as MetricType)} colorPalette="green">
          <Tabs.List>
            <Tabs.Trigger value="weight">Gewicht</Tabs.Trigger>
            <Tabs.Trigger value="circumference">Umfang</Tabs.Trigger>
            <Tabs.Trigger value="training">Training</Tabs.Trigger>
          </Tabs.List>

          {/* Gewicht Tab */}
          <Tabs.Content value="weight">
            <Stack gap="4" mt="4">
              {/* Eingabeformular */}
              <Card.Root>
                <Card.Body>
                  <Stack gap="4">
                    <Heading size="sm" color="green.800">
                      Neues Gewicht eintragen
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Gewicht (kg)
                        </Text>
                        <NumberInput.Root
                          value={weightForm.value}
                          onValueChange={(e) => setWeightForm({ ...weightForm, value: e.value })}
                          min={0}
                          step={0.1}
                        >
                          <NumberInput.Input placeholder="z.B. 75.5" />
                        </NumberInput.Root>
                      </Stack>
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Datum
                        </Text>
                        <Input
                          type="date"
                          value={weightForm.date}
                          onChange={(e) => setWeightForm({ ...weightForm, date: e.target.value })}
                          colorPalette="green"
                        />
                      </Stack>
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Notizen (optional)
                        </Text>
                        <Input
                          placeholder="z.B. Nach dem Training"
                          value={weightForm.notes}
                          onChange={(e) => setWeightForm({ ...weightForm, notes: e.target.value })}
                          colorPalette="green"
                        />
                      </Stack>
                    </SimpleGrid>
                    <Button colorPalette="green" onClick={handleAddWeight} disabled={!weightForm.value}>
                      <HStack gap="2">
                        <Plus size={20} />
                        <Text>Hinzufügen</Text>
                      </HStack>
                    </Button>
                  </Stack>
                </Card.Body>
              </Card.Root>

              {/* Diagramm */}
              {weightEntries.length > 0 && (
                <Card.Root>
                  <Card.Body>
                    <Stack gap="4">
                      <Heading size="sm" color="green.800">
                        Gewichtsverlauf
                      </Heading>
                      <LineChart
                        data={weightEntries
                          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                          .map((e) => ({ date: e.date, value: e.value }))}
                        width={800}
                        height={300}
                        color="#22c55e"
                        label="Gewichtsverlauf"
                        unit=" kg"
                      />
                    </Stack>
                  </Card.Body>
                </Card.Root>
              )}

              {/* Einträge Liste */}
              {weightEntries.length > 0 && (
                <Card.Root>
                  <Card.Body>
                    <Stack gap="2">
                      <Heading size="sm" color="green.800">
                        Einträge
                      </Heading>
                      <Stack gap="2">
                        {weightEntries
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((entry) => (
                            <Card.Root key={entry.id} borderColor="green.200" _hover={{ borderColor: "green.400", boxShadow: "sm" }} transition="all 0.2s">
                              <Card.Body>
                                <HStack justify="space-between">
                                  <HStack gap="4">
                                    <Box
                                      bg="green.100"
                                      borderRadius="full"
                                      p="2"
                                      display="flex"
                                      alignItems="center"
                                      justifyContent="center"
                                    >
                                      <Text fontSize="lg" fontWeight="bold" color="green.700">
                                        {entry.value.toFixed(1)}
                                      </Text>
                                    </Box>
                                    <VStack align="flex-start" gap="0">
                                      <Text fontSize="sm" fontWeight="semibold" color="green.800">
                                        {entry.value.toFixed(1)} kg
                                      </Text>
                                      <Text fontSize="xs" color="green.600">
                                        {formatDate(entry.date)}
                                      </Text>
                                    </VStack>
                                    {entry.notes && (
                                      <Badge colorPalette="green" variant="subtle">
                                        {entry.notes}
                                      </Badge>
                                    )}
                                  </HStack>
                                  <Button
                                    size="xs"
                                    variant="ghost"
                                    colorPalette="red"
                                    onClick={() => handleDelete(entry.id)}
                                  >
                                    <Trash size={16} />
                                  </Button>
                                </HStack>
                              </Card.Body>
                            </Card.Root>
                          ))}
                      </Stack>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              )}
            </Stack>
          </Tabs.Content>

          {/* Umfang Tab */}
          <Tabs.Content value="circumference">
            <Stack gap="4" mt="4">
              {/* Eingabeformular */}
              <Card.Root>
                <Card.Body>
                  <Stack gap="4">
                    <Heading size="sm" color="green.800">
                      Neuen Umfang eintragen
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 4 }} gap="4">
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Körperteil
                        </Text>
                        <Select.Root
                          collection={bodyPartCollection}
                          value={[circumferenceForm.bodyPart]}
                          onValueChange={(e) =>
                            setCircumferenceForm({ ...circumferenceForm, bodyPart: (e.value[0] || "waist") as CircumferenceEntry["bodyPart"] })
                          }
                          colorPalette="green"
                        >
                          {Object.entries(bodyPartLabels).map(([value, label]) => (
                            <Select.Item key={value} item={value}>
                              {label}
                            </Select.Item>
                          ))}
                        </Select.Root>
                      </Stack>
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Umfang (cm)
                        </Text>
                        <NumberInput.Root
                          value={circumferenceForm.value}
                          onValueChange={(e) => setCircumferenceForm({ ...circumferenceForm, value: e.value })}
                          min={0}
                          step={0.1}
                        >
                          <NumberInput.Input placeholder="z.B. 85.0" />
                        </NumberInput.Root>
                      </Stack>
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Datum
                        </Text>
                        <Input
                          type="date"
                          value={circumferenceForm.date}
                          onChange={(e) => setCircumferenceForm({ ...circumferenceForm, date: e.target.value })}
                          colorPalette="green"
                        />
                      </Stack>
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Notizen (optional)
                        </Text>
                        <Input
                          placeholder="Optional"
                          value={circumferenceForm.notes}
                          onChange={(e) => setCircumferenceForm({ ...circumferenceForm, notes: e.target.value })}
                          colorPalette="green"
                        />
                      </Stack>
                    </SimpleGrid>
                    <Button
                      colorPalette="green"
                      onClick={handleAddCircumference}
                      disabled={!circumferenceForm.value}
                    >
                      <HStack gap="2">
                        <Plus size={20} />
                        <Text>Hinzufügen</Text>
                      </HStack>
                    </Button>
                  </Stack>
                </Card.Body>
              </Card.Root>

              {/* Diagramme für jeden Körperteil */}
              {Object.keys(circumferenceByPart).length > 0 && (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                  {Object.entries(circumferenceByPart).map(([bodyPart, entries]) => (
                    <Card.Root key={bodyPart}>
                      <Card.Body>
                        <Stack gap="4">
                          <Heading size="sm" color="green.800">
                            {bodyPartLabels[bodyPart as CircumferenceEntry["bodyPart"]]}
                          </Heading>
                          <LineChart
                            data={entries
                              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                              .map((e) => ({ date: e.date, value: e.value }))}
                            width={400}
                            height={200}
                            color="#22c55e"
                            label={bodyPartLabels[bodyPart as CircumferenceEntry["bodyPart"]]}
                            unit=" cm"
                          />
                        </Stack>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </SimpleGrid>
              )}

              {/* Einträge Liste */}
              {circumferenceEntries.length > 0 && (
                <Card.Root>
                  <Card.Body>
                    <Stack gap="2">
                      <Heading size="sm" color="green.800">
                        Einträge
                      </Heading>
                      <Stack gap="2">
                        {circumferenceEntries
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((entry) => (
                            <Card.Root key={entry.id} borderColor="green.200">
                              <Card.Body>
                                <HStack justify="space-between">
                                  <HStack gap="4">
                                    <VStack align="flex-start" gap="0">
                                      <Text fontSize="sm" fontWeight="medium" color="green.800">
                                        {bodyPartLabels[entry.bodyPart]}: {entry.value.toFixed(1)} cm
                                      </Text>
                                      <Text fontSize="xs" color="green.600">
                                        {formatDate(entry.date)}
                                      </Text>
                                    </VStack>
                                    {entry.notes && (
                                      <Text fontSize="xs" color="green.600">
                                        {entry.notes}
                                      </Text>
                                    )}
                                  </HStack>
                                  <Button
                                    size="xs"
                                    variant="ghost"
                                    colorPalette="red"
                                    onClick={() => handleDelete(entry.id)}
                                  >
                                    <Trash size={16} />
                                  </Button>
                                </HStack>
                              </Card.Body>
                            </Card.Root>
                          ))}
                      </Stack>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              )}
            </Stack>
          </Tabs.Content>

          {/* Training Tab */}
          <Tabs.Content value="training">
            <Stack gap="4" mt="4">
              {/* Eingabeformular */}
              <Card.Root>
                <Card.Body>
                  <Stack gap="4">
                    <Heading size="sm" color="green.800">
                      Neues Training eintragen
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap="4">
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Übung
                        </Text>
                        <Input
                          placeholder="z.B. Bankdrücken"
                          value={trainingForm.exercise}
                          onChange={(e) => setTrainingForm({ ...trainingForm, exercise: e.target.value })}
                          colorPalette="green"
                        />
                      </Stack>
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Gewicht (kg)
                        </Text>
                        <NumberInput.Root
                          value={trainingForm.weight}
                          onValueChange={(e) => setTrainingForm({ ...trainingForm, weight: e.value })}
                          min={0}
                          step={2.5}
                        >
                          <NumberInput.Input placeholder="z.B. 80" />
                        </NumberInput.Root>
                      </Stack>
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Wiederholungen
                        </Text>
                        <NumberInput.Root
                          value={trainingForm.reps}
                          onValueChange={(e) => setTrainingForm({ ...trainingForm, reps: e.value })}
                          min={0}
                        >
                          <NumberInput.Input placeholder="z.B. 10" />
                        </NumberInput.Root>
                      </Stack>
                      <Stack gap="2">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Datum
                        </Text>
                        <Input
                          type="date"
                          value={trainingForm.date}
                          onChange={(e) => setTrainingForm({ ...trainingForm, date: e.target.value })}
                          colorPalette="green"
                        />
                      </Stack>
                    </SimpleGrid>
                    <Button
                      colorPalette="green"
                      onClick={handleAddTraining}
                      disabled={!trainingForm.exercise || !trainingForm.weight}
                    >
                      <HStack gap="2">
                        <Plus size={20} />
                        <Text>Hinzufügen</Text>
                      </HStack>
                    </Button>
                  </Stack>
                </Card.Body>
              </Card.Root>

              {/* Diagramme für jede Übung */}
              {Object.keys(trainingByExercise).length > 0 && (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                  {Object.entries(trainingByExercise).map(([exercise, entries]) => (
                    <Card.Root key={exercise}>
                      <Card.Body>
                        <Stack gap="4">
                          <Heading size="sm" color="green.800">
                            {exercise}
                          </Heading>
                          <LineChart
                            data={entries
                              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                              .map((e) => ({ date: e.date, value: e.weight || e.value }))}
                            width={400}
                            height={200}
                            color="#22c55e"
                            label={exercise}
                            unit=" kg"
                          />
                        </Stack>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </SimpleGrid>
              )}

              {/* Einträge Liste */}
              {trainingEntries.length > 0 && (
                <Card.Root>
                  <Card.Body>
                    <Stack gap="2">
                      <Heading size="sm" color="green.800">
                        Einträge
                      </Heading>
                      <Stack gap="2">
                        {trainingEntries
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((entry) => (
                            <Card.Root key={entry.id} borderColor="green.200">
                              <Card.Body>
                                <HStack justify="space-between">
                                  <HStack gap="4">
                                    <VStack align="flex-start" gap="0">
                                      <Text fontSize="sm" fontWeight="medium" color="green.800">
                                        {entry.exercise}
                                      </Text>
                                      <Text fontSize="xs" color="green.600">
                                        {entry.weight ? `${entry.weight} kg` : ""}
                                        {entry.reps ? ` × ${entry.reps} Wdh.` : ""}
                                        {entry.sets ? ` (${entry.sets} Sätze)` : ""} - {formatDate(entry.date)}
                                      </Text>
                                    </VStack>
                                    {entry.notes && (
                                      <Text fontSize="xs" color="green.600">
                                        {entry.notes}
                                      </Text>
                                    )}
                                  </HStack>
                                  <Button
                                    size="xs"
                                    variant="ghost"
                                    colorPalette="red"
                                    onClick={() => handleDelete(entry.id)}
                                  >
                                    <Trash size={16} />
                                  </Button>
                                </HStack>
                              </Card.Body>
                            </Card.Root>
                          ))}
                      </Stack>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              )}
            </Stack>
          </Tabs.Content>
        </Tabs.Root>
      </Stack>
    </Section>
  );
}
