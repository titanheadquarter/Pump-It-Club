"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Heading,
  Text,
  Card,
  Stack,
  Box,
  HStack,
  VStack,
  Badge,
  SimpleGrid,
  Separator,
  Collapsible,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { ArrowLeft, Calendar, Barbell, Clock, Target, CaretDown, CaretUp } from "@phosphor-icons/react";
import { useAuth } from "@/components/provider/auth-provider";
import { useCollapsibleContext } from "@chakra-ui/react";

function CollapsibleCaret({ iconColor }: { iconColor: string }) {
  const { open } = useCollapsibleContext();
  return (
    <Box color={iconColor}>
      {open ? <CaretUp size={20} /> : <CaretDown size={20} />}
    </Box>
  );
}

interface TrainingPlan {
  id: string;
  slug: string;
  name: string;
  gender: string | null;
  description: string;
  structure: {
    days: {
      key: string;
      label: string;
      exercises: {
        name: string;
        sets: {
          type: string;
          reps: string;
          rest: string;
        }[];
      }[];
    }[];
  };
}

export default function TrainingsplanDetail() {
  const { planId } = useParams();
  const router = useRouter();
  const { getAccessToken } = useAuth();
  const [plan, setPlan] = useState<TrainingPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(`/api/training-plans/${planId}`);
        if (!response.ok) {
          router.push("/app/free/trainingsplan");
          return;
        }
        const data = await response.json();
        const foundPlan = data.plan;

        if (foundPlan && foundPlan.structure?.days) {
          setPlan(foundPlan);
        } else {
          router.push("/app/free/trainingsplan");
        }
      } catch (error) {
        console.error("Error loading plan:", error);
        router.push("/app/free/trainingsplan");
      } finally {
        setLoading(false);
      }
    };

    if (planId) {
      fetchPlan();
    }
  }, [planId, router]);

  const handleAssignPlan = async () => {
    const token = getAccessToken();
    if (!token) {
      alert("Bitte melden Sie sich an, um einen Trainingsplan zuzuweisen.");
      return;
    }

    setAssigning(true);
    try {
      const response = await fetch("/api/training-plans/assign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ planId }),
      });

      if (response.ok) {
        alert("Trainingsplan erfolgreich zugewiesen!");
        router.push("/app/free/mein-trainingsplan");
      } else {
        const error = await response.json();
        alert(`Fehler: ${error.error}`);
      }
    } catch (error) {
      console.error("Error assigning plan:", error);
      alert("Fehler beim Zuweisen des Plans");
    } finally {
      setAssigning(false);
    }
  };

  if (loading) {
    return (
      <Section header>
        <Stack gap="4" align="center" py="12">
          <Text>Lade Trainingsplan...</Text>
        </Stack>
      </Section>
    );
  }

  if (!plan) {
    return (
      <Section header>
        <Stack gap="4" align="center" py="12">
          <Text>Trainingsplan nicht gefunden</Text>
          <Button onClick={() => router.push("/app/free/trainingsplan")}>
            Zurück zur Übersicht
          </Button>
        </Stack>
      </Section>
    );
  }

  const colorPalette = plan.gender === "male" ? "blue" : "pink";
  const borderColor = `${colorPalette}.200`;
  const bgLight = `${colorPalette}.50`;
  const textMuted = `${colorPalette}.700`;
  const iconColor = `${colorPalette}.600`;

  return (
    <Section header>
      <Stack gap="6">
        {/* Header */}
        <Stack gap="4">
          <Button
            variant="ghost"
            alignSelf="flex-start"
            colorPalette={colorPalette}
            onClick={() => router.push("/app/free/trainingsplan")}
          >
            <HStack gap="2">
              <ArrowLeft size={16} />
              <Text>Zurück zur Übersicht</Text>
            </HStack>
          </Button>

          <Stack gap="2">
            <HStack gap="3" align="center">
              <Heading size="xl" color={textMuted}>
                {plan.name}
              </Heading>
              {plan.gender && (
                <Badge colorPalette={colorPalette} variant="solid">
                  {plan.gender === "male" ? "Für Männer" : "Für Frauen"}
                </Badge>
              )}
            </HStack>
            <Text fontSize="lg" color={textMuted}>
              {plan.description}
            </Text>
          </Stack>

          <Button
            colorPalette={colorPalette}
            size="lg"
            onClick={handleAssignPlan}
            loading={assigning}
            loadingText="Wird zugewiesen..."
          >
            Diesen Trainingsplan wählen
          </Button>
        </Stack>

        <Separator borderColor={borderColor} />

        {/* Trainingsplan Details */}
        <Stack gap="6">
          <HStack gap="4" align="center">
            <Box color={iconColor}>
              <Calendar size={24} />
            </Box>
            <Text fontSize="xl" fontWeight="bold" color={textMuted}>
              {plan.structure?.days?.length ?? 0} Trainingstage pro Woche
            </Text>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
            {(plan.structure?.days ?? []).map((day, dayIndex) => (
              <Card.Root
                key={day.key}
                size="lg"
                bg={bgLight}
                borderColor={borderColor}
                borderWidth="1px"
                _hover={{ borderColor: `${colorPalette}.400` }}
              >
                <Card.Header>
                  <HStack justify="space-between" align="center">
                    <Heading size="md" color={textMuted}>
                      {day.label}
                    </Heading>
                    <Badge colorPalette={colorPalette} variant="subtle">
                      Tag {dayIndex + 1}
                    </Badge>
                  </HStack>
                </Card.Header>
                <Card.Body>
                  <Stack gap="2">
                    {day.exercises.map((exercise, exerciseIndex) => (
                      <Collapsible.Root
                        key={exerciseIndex}
                        defaultOpen={false}
                        borderWidth="1px"
                        borderColor={borderColor}
                        borderRadius="md"
                        overflow="hidden"
                        bg="white"
                        _hover={{ borderColor: `${colorPalette}.300` }}
                      >
                        <Collapsible.Trigger asChild>
                          <Box
                            as="button"
                            w="full"
                            textAlign="left"
                            p="3"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            gap="2"
                            cursor="pointer"
                            _hover={{ bg: `${colorPalette}.50` }}
                            transition="background 0.2s"
                          >
                            <HStack gap="2" flex="1" minW="0">
                              <Box color={iconColor} flexShrink={0}>
                                <Barbell size={16} />
                              </Box>
                              <Text fontWeight="medium" color={textMuted} lineClamp={1} title={exercise.name}>
                                {exercise.name}
                              </Text>
                            </HStack>
                            <CollapsibleCaret iconColor={iconColor} />
                          </Box>
                        </Collapsible.Trigger>
                        <Collapsible.Content>
                          <Box p="3" pt="0" borderTopWidth="1px" borderColor={borderColor}>
                            <VStack gap="2" align="stretch">
                              {exercise.sets.map((set, setIndex) => (
                                <HStack
                                  key={setIndex}
                                  justify="space-between"
                                  fontSize="sm"
                                  py="1"
                                >
                                  <Text color={textMuted}>{set.type}</Text>
                                  <HStack gap="4">
                                    <HStack gap="1">
                                      <Box color={iconColor}>
                                        <Target size={12} />
                                      </Box>
                                      <Text>{set.reps}</Text>
                                    </HStack>
                                    <HStack gap="1">
                                      <Box color={iconColor}>
                                        <Clock size={12} />
                                      </Box>
                                      <Text>{set.rest}</Text>
                                    </HStack>
                                  </HStack>
                                </HStack>
                              ))}
                            </VStack>
                          </Box>
                        </Collapsible.Content>
                      </Collapsible.Root>
                    ))}
                  </Stack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </Stack>

        {/* Footer */}
        <Stack gap="4" align="center" py="6">
          <Text fontSize="lg" textAlign="center" color={textMuted}>
            Bereit für diesen Trainingsplan? Wähle ihn aus und starte deine Fitness-Reise!
          </Text>
          <Button
            colorPalette={colorPalette}
            size="lg"
            onClick={handleAssignPlan}
            loading={assigning}
            loadingText="Wird zugewiesen..."
          >
            Trainingsplan zuweisen
          </Button>
        </Stack>
      </Stack>
    </Section>
  );
}