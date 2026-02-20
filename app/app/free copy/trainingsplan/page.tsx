"use client";

import { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Card,
  Button,
  SimpleGrid,
  Stack,
  Badge,
  List,
  For,
  Progress,
  Box,
  HStack,
  RadioGroup,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { Section } from "@/components/layout/section";
import { CheckCircle, Plus, Sparkle, ArrowRight, ArrowLeft, X, Trash } from "@phosphor-icons/react";
import { trainingPlans, type TrainingPlan } from "./data";

interface QuizAnswers {
  fitnessLevel: string;
  goal: string;
  timePerWeek: string;
  experience: string;
  focus: string;
}

const questions = [
  {
    id: "fitnessLevel",
    question: "Wie würdest du dein aktuelles Fitness-Level beschreiben?",
    options: [
      { value: "anfaenger", label: "Anfänger - Ich trainiere selten oder gar nicht" },
      { value: "fortgeschritten", label: "Fortgeschritten - Ich trainiere regelmäßig" },
      { value: "profi", label: "Profi - Ich trainiere intensiv und regelmäßig" },
    ],
  },
  {
    id: "goal",
    question: "Was ist dein Hauptziel?",
    options: [
      { value: "muskelaufbau", label: "Muskelaufbau" },
      { value: "abnehmen", label: "Abnehmen" },
      { value: "ausdauer", label: "Ausdauer verbessern" },
      { value: "kraft", label: "Kraft steigern" },
    ],
  },
  {
    id: "timePerWeek",
    question: "Wie viel Zeit kannst du pro Woche für Training investieren?",
    options: [
      { value: "2-3", label: "2-3 Stunden" },
      { value: "4-5", label: "4-5 Stunden" },
      { value: "6+", label: "6+ Stunden" },
    ],
  },
  {
    id: "experience",
    question: "Wie viel Erfahrung hast du mit Krafttraining?",
    options: [
      { value: "keine", label: "Keine Erfahrung" },
      { value: "wenig", label: "Wenig Erfahrung (unter 1 Jahr)" },
      { value: "mittel", label: "Mittlere Erfahrung (1-3 Jahre)" },
      { value: "viel", label: "Viel Erfahrung (3+ Jahre)" },
    ],
  },
  {
    id: "focus",
    question: "Auf welchen Bereich möchtest du dich fokussieren?",
    options: [
      { value: "ganzkoerper", label: "Ganzkörper" },
      { value: "oberkoerper", label: "Oberkörper" },
      { value: "unterkoerper", label: "Unterkörper" },
    ],
  },
];

const recommendPlan = (answers: QuizAnswers): string => {
  // Logik zur Plan-Empfehlung basierend auf Antworten
  if (answers.fitnessLevel === "anfaenger" || answers.experience === "keine" || answers.experience === "wenig") {
    return "1"; // Ganzkörper-Basis
  }
  
  if (answers.focus === "oberkoerper" || (answers.goal === "muskelaufbau" && answers.fitnessLevel === "fortgeschritten")) {
    return "2"; // Oberkörper-Fokus
  }
  
  if (answers.focus === "unterkoerper" || answers.goal === "abnehmen") {
    return "3"; // Beine & Po Power
  }
  
  // Standard: Ganzkörper-Basis
  return "1";
};

export default function Trainingsplan() {
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    fitnessLevel: "",
    goal: "",
    timePerWeek: "",
    experience: "",
    focus: "",
  });
  const [recommendedPlanId, setRecommendedPlanId] = useState<string | null>(null);

  const handleAddPlan = (planId: string) => {
    if (!selectedPlans.includes(planId)) {
      const newPlans = [...selectedPlans, planId];
      setSelectedPlans(newPlans);
      // Speichere in localStorage
      localStorage.setItem("assignedTrainingPlans", JSON.stringify(newPlans));
    }
  };

  const handleRemovePlan = (planId: string) => {
    const newPlans = selectedPlans.filter((id) => id !== planId);
    setSelectedPlans(newPlans);
    // Speichere in localStorage
    localStorage.setItem("assignedTrainingPlans", JSON.stringify(newPlans));
  };

  const handleResetAll = () => {
    if (confirm("Möchtest du wirklich alle Trainingspläne zurücksetzen? Alle zugewiesenen Pläne und Trainingstage werden gelöscht.")) {
      setSelectedPlans([]);
      localStorage.removeItem("assignedTrainingPlans");
      localStorage.removeItem("myTrainingDays");
    }
  };

  // Lade zugewiesene Pläne beim Mount
  useEffect(() => {
    const stored = localStorage.getItem("assignedTrainingPlans");
    if (stored) {
      setSelectedPlans(JSON.parse(stored));
    }
  }, []);

  const isPlanSelected = (planId: string) => selectedPlans.includes(planId);

  const handleAnswerChange = (questionId: keyof QuizAnswers, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Alle Fragen beantwortet - Plan empfehlen
      const recommended = recommendPlan(answers);
      setRecommendedPlanId(recommended);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartQuiz = () => {
    setIsDialogOpen(true);
    setCurrentStep(0);
    setAnswers({
      fitnessLevel: "",
      goal: "",
      timePerWeek: "",
      experience: "",
      focus: "",
    });
    setRecommendedPlanId(null);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setCurrentStep(0);
    setRecommendedPlanId(null);
  };

  const handleAddRecommendedPlan = () => {
    if (recommendedPlanId) {
      handleAddPlan(recommendedPlanId);
      handleCloseDialog();
    }
  };

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id as keyof QuizAnswers];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastStep = currentStep === questions.length - 1;
  const canProceed = currentAnswer !== "";

  const recommendedPlan = recommendedPlanId ? trainingPlans.find((p) => p.id === recommendedPlanId) : null;

  return (
    <Section header>
      <Stack gap="6">
        <Stack gap="2">
          <HStack justify="space-between" align="flex-start">
            <Stack gap="2" flex="1">
              <Heading>Trainingsplan</Heading>
              <Text color="green.700">
                Wähle einen oder mehrere Basis-Pläne aus, die zu deinen Zielen passen.
              </Text>
            </Stack>
            {selectedPlans.length > 0 && (
              <Button
                variant="outline"
                colorPalette="red"
                size="sm"
                onClick={handleResetAll}
              >
                <HStack gap="2">
                  <Trash size={16} />
                  <Text>Alle zurücksetzen</Text>
                </HStack>
              </Button>
            )}
          </HStack>
        </Stack>

        {/* CTA für 1:1 Betreuung und Quiz */}
        <Card.Root bg="green.50" borderColor="green.200" borderWidth="2px">
          <Card.Body>
            <Stack gap="4" direction={{ base: "column", md: "row" }} align={{ base: "stretch", md: "center" }}>
              <Stack gap="2" flex="1">
                <Heading size="md" color="green.800">
                  Finde deinen perfekten Plan
                </Heading>
                <Text color="green.700">
                  Beantworte 5 kurze Fragen und wir empfehlen dir den passenden Trainingsplan.
                </Text>
              </Stack>
              <Stack gap="2" direction={{ base: "column", sm: "row" }}>
                <Button
                  colorPalette="green"
                  variant="solid"
                  onClick={handleStartQuiz}
                  size="lg"
                >
                  <HStack gap="2">
                    <Sparkle size={20} />
                    <Text>Plan finden</Text>
                  </HStack>
                </Button>
                <Button
                  colorPalette="green"
                  variant="outline"
                  size="lg"
                >
                  1:1 Betreuung buchen
                </Button>
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          <For each={trainingPlans}>
            {(plan) => (
              <Card.Root
                key={plan.id}
                position="relative"
                borderColor={plan.recommended ? "green.500" : "border.emphasized"}
                borderWidth={plan.recommended ? "2px" : "1px"}
                _hover={{
                  borderColor: "green.400",
                  boxShadow: "0 8px 24px -4px rgba(34, 197, 94, 0.2)",
                }}
                transition="all 0.2s"
              >
                {plan.recommended && (
                  <Badge
                    position="absolute"
                    top="4"
                    right="4"
                    colorPalette="green"
                    variant="solid"
                    zIndex="1"
                  >
                    Empfohlen
                  </Badge>
                )}

                <Card.Body>
                  <Stack gap="4">
                    <Stack gap="2">
                      <Card.Title>{plan.title}</Card.Title>
                      <Card.Description color="green.700">
                        {plan.description}
                      </Card.Description>
                    </Stack>

                    <Stack gap="2" direction="row" flexWrap="wrap">
                      <Badge colorPalette="green" variant="subtle">
                        {plan.duration}
                      </Badge>
                      <Badge colorPalette="gray" variant="subtle">
                        {plan.difficulty}
                      </Badge>
                    </Stack>

                    <Stack gap="3">
                      <Text fontSize="sm" fontWeight="medium" color="green.800">
                        Übungen:
                      </Text>
                      <List.Root variant="plain" gap="2">
                        <For each={plan.exercises}>
                          {(exercise) => (
                            <List.Item key={exercise}>
                              <List.Indicator color="green.500">
                                <CheckCircle size={16} weight="fill" />
                              </List.Indicator>
                              <Text fontSize="sm" color="green.700">
                                {exercise}
                              </Text>
                            </List.Item>
                          )}
                        </For>
                      </List.Root>
                    </Stack>

                    <Button
                      colorPalette={isPlanSelected(plan.id) ? "red" : "green"}
                      variant="outline"
                      onClick={() => 
                        isPlanSelected(plan.id) 
                          ? handleRemovePlan(plan.id) 
                          : handleAddPlan(plan.id)
                      }
                    >
                      <HStack gap="2">
                        {isPlanSelected(plan.id) ? (
                          <>
                            <X size={20} />
                            <Text>Entfernen</Text>
                          </>
                        ) : (
                          <>
                            <Plus size={20} />
                            <Text>Zum Plan hinzufügen</Text>
                          </>
                        )}
                      </HStack>
                    </Button>
                  </Stack>
                </Card.Body>
              </Card.Root>
            )}
          </For>
        </SimpleGrid>

        {/* Quiz Dialog */}
        <DialogRoot open={isDialogOpen} onOpenChange={(e) => !e.open && handleCloseDialog()}>
          <DialogContent maxW="600px">
            <DialogHeader>
              <DialogTitle>Finde deinen perfekten Plan</DialogTitle>
            </DialogHeader>
            <DialogBody>
              {recommendedPlan ? (
                <Stack gap="6">
                  <Box textAlign="center" py="4">
                    <Text fontSize="lg" fontWeight="medium" color="green.800" mb="2">
                      Basierend auf deinen Antworten empfehlen wir dir:
                    </Text>
                    <Heading size="xl" color="green.600">
                      {recommendedPlan.title}
                    </Heading>
                  </Box>

                  <Card.Root borderColor="green.500" borderWidth="2px">
                    <Card.Body>
                      <Stack gap="4">
                        <Card.Description color="green.700">
                          {recommendedPlan.description}
                        </Card.Description>

                        <Stack gap="2" direction="row" flexWrap="wrap">
                          <Badge colorPalette="green" variant="subtle">
                            {recommendedPlan.duration}
                          </Badge>
                          <Badge colorPalette="gray" variant="subtle">
                            {recommendedPlan.difficulty}
                          </Badge>
                        </Stack>

                        <Stack gap="3">
                          <Text fontSize="sm" fontWeight="medium" color="green.800">
                            Übungen:
                          </Text>
                          <List.Root variant="plain" gap="2">
                            <For each={recommendedPlan.exercises}>
                              {(exercise) => (
                                <List.Item key={exercise}>
                                  <List.Indicator color="green.500">
                                    <CheckCircle size={16} weight="fill" />
                                  </List.Indicator>
                                  <Text fontSize="sm" color="green.700">
                                    {exercise}
                                  </Text>
                                </List.Item>
                              )}
                            </For>
                          </List.Root>
                        </Stack>
                      </Stack>
                    </Card.Body>
                  </Card.Root>
                </Stack>
              ) : (
                <Stack gap="6">
                  <Stack gap="2">
                    <HStack justify="space-between">
                      <Text fontSize="sm" color="green.700" fontWeight="medium">
                        Frage {currentStep + 1} von {questions.length}
                      </Text>
                      <Text fontSize="sm" color="green.600">
                        {Math.round(progress)}%
                      </Text>
                    </HStack>
                    <Progress.Root value={progress} colorPalette="green" size="sm">
                      <Progress.Track>
                        <Progress.Range />
                      </Progress.Track>
                    </Progress.Root>
                  </Stack>

                  <Stack gap="4">
                    <Heading size="md" color="green.800">
                      {currentQuestion.question}
                    </Heading>

                    <RadioGroup.Root
                      value={currentAnswer}
                      onValueChange={(e) => handleAnswerChange(currentQuestion.id as keyof QuizAnswers, e.value)}
                      colorPalette="green"
                      size="lg"
                    >
                      <Stack gap="3">
                        <For each={currentQuestion.options}>
                          {(option) => (
                            <RadioGroup.Item key={option.value} value={option.value}>
                              <RadioGroup.ItemHiddenInput />
                              <RadioGroup.ItemIndicator />
                              <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
                            </RadioGroup.Item>
                          )}
                        </For>
                      </Stack>
                    </RadioGroup.Root>
                  </Stack>
                </Stack>
              )}
            </DialogBody>
            <DialogFooter>
              {recommendedPlan ? (
                <Stack direction="row" gap="2" w="full">
                  <Button
                    variant="outline"
                    colorPalette="gray"
                    onClick={handleCloseDialog}
                    flex="1"
                  >
                    Schließen
                  </Button>
                  <Button
                    colorPalette={isPlanSelected(recommendedPlanId) ? "red" : "green"}
                    onClick={() => {
                      if (isPlanSelected(recommendedPlanId)) {
                        handleRemovePlan(recommendedPlanId);
                        handleCloseDialog();
                      } else {
                        handleAddRecommendedPlan();
                      }
                    }}
                    flex="1"
                  >
                    <HStack gap="2">
                      {isPlanSelected(recommendedPlanId) ? (
                        <>
                          <X size={20} />
                          <Text>Plan entfernen</Text>
                        </>
                      ) : (
                        <>
                          <Plus size={20} />
                          <Text>Plan hinzufügen</Text>
                        </>
                      )}
                    </HStack>
                  </Button>
                </Stack>
              ) : (
                <Stack direction="row" gap="2" w="full">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      colorPalette="gray"
                      onClick={handleBack}
                    >
                      <HStack gap="2">
                        <ArrowLeft size={20} />
                        <Text>Zurück</Text>
                      </HStack>
                    </Button>
                  )}
                  <Button
                    colorPalette="green"
                    onClick={handleNext}
                    disabled={!canProceed}
                    ml="auto"
                  >
                    <HStack gap="2">
                      <Text>{isLastStep ? "Plan anzeigen" : "Weiter"}</Text>
                      {!isLastStep && <ArrowRight size={20} />}
                    </HStack>
                  </Button>
                </Stack>
              )}
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </Stack>
    </Section>
  );
}
