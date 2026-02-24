"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Heading,
  Text,
  Card,
  Button,
  Stack,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { Link } from "@/components/ui/link";
import { CtaBetreuungBanner } from "@/components/cta-betreuung-banner";
import { Play, ArrowRight, Barbell } from "@phosphor-icons/react";
import { useAuth } from "@/components/provider/auth-provider";
import type { CourseModule } from "@/app/api/course/modules/route";
import { CircularProgressChart } from "@/components/ui/circular-progress-chart";
// Define types for API response
interface TrainingPlan {
  id: string;
  slug: string;
  name: string;
  gender: string | null;
  description: string;
}

export default function Dashboard() {
  const [courseModules, setCourseModules] = useState<CourseModule[]>([]);
  const [courseProgressMap, setCourseProgressMap] = useState<Record<string, { watched_seconds: number; completed: boolean; last_watched_at: string }>>({});
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
  const { getAccessToken } = useAuth();

  // Kurs: Module von API
  useEffect(() => {
    fetch("/api/course/modules")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { modules: CourseModule[] }) => setCourseModules(data.modules ?? []))
      .catch(() => setCourseModules([]));
  }, []);

  // Trainingspläne von API
  useEffect(() => {
    fetch("/api/training-plans")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { plans: TrainingPlan[] }) => setTrainingPlans(data.plans ?? []))
      .catch(() => setTrainingPlans([]));
  }, []);

  useEffect(() => {
    const token = getAccessToken();
    if (!token) return;
    fetch("/api/course/progress", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: { progress: { video_id: string; watched_seconds: number; completed: boolean; last_watched_at: string }[] }) => {
        const map: Record<string, { watched_seconds: number; completed: boolean; last_watched_at: string }> = {};
        (data.progress ?? []).forEach((p) => {
          map[p.video_id] = {
            watched_seconds: p.watched_seconds,
            completed: p.completed,
            last_watched_at: p.last_watched_at
          };
        });
        setCourseProgressMap(map);
      })
      .catch(() => {});
  }, [getAccessToken]);

  const allVideos = useMemo(
    () => courseModules.flatMap((m) => m.videos),
    [courseModules]
  );

  // Filtere Trainingspläne: nur je 1 Plan pro Geschlecht
  const featuredTrainingPlans = useMemo(() => {
    const malePlan = trainingPlans.find(plan => plan.slug === 'ok-uk-mann');
    const femalePlan = trainingPlans.find(plan => plan.slug === 'ok-uk-frau');
    return [malePlan, femalePlan].filter(Boolean);
  }, [trainingPlans]);

  const moduleProgress = useMemo(() => {
    return courseModules.map((module) => {
      const moduleVideos = module.videos;
      if (moduleVideos.length === 0)
        return { ...module, progress: 0, completedCount: 0, totalCount: 0 };

      const videoProgresses = moduleVideos.map(video => {
        const videoProgress = courseProgressMap[video.id];
        if (!videoProgress) return 0; // Video noch nicht angesehen

        const watchedSeconds = videoProgress.watched_seconds;
        const totalSeconds = video.duration * 60; // duration ist in Minuten
        const videoProgressPercent = Math.min(Math.round((watchedSeconds / totalSeconds) * 100), 100);

        return videoProgressPercent;
      });

      // Durchschnitt aller Video-Fortschritte
      const totalProgress = videoProgresses.reduce((sum, progress) => sum + progress, 0);
      const progress = Math.round(totalProgress / moduleVideos.length);

      // Für Abwärtskompatibilität: completedCount als Videos mit >=90% Fortschritt
      const completedCount = videoProgresses.filter(p => p >= 90).length;

      return {
        ...module,
        progress,
        completedCount,
        totalCount: moduleVideos.length,
      };
    });
  }, [courseModules, courseProgressMap]);

  return (
    <Section header>
      <Stack gap="6">
        <Stack gap="2">
          <Heading>Dashboard</Heading>
          <Text color="green.700">
            Willkommen zurück! Hier ist deine Übersicht über Kurs und Trainingspläne.
          </Text>
        </Stack>

        {/* 1:1 CTA Banner */}
        <CtaBetreuungBanner />

        {/* Kursübersicht */}
        {moduleProgress.length > 0 && (
          <Card.Root
            bg="rgba(5, 150, 105, 0.06)"
            backdropFilter="blur(12px)"
            borderWidth="1px"
            borderColor="rgba(5, 150, 105, 0.25)"
            shadow="sm"
          >
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between" align="center" flexWrap="wrap" gap="2">
                  <Heading size="md" color="gray.800">
                    Kursübersicht
                  </Heading>
                  <Link href="/app/free/lerne-die-grundlagen">
                    <Button size="sm" colorPalette="green">
                      <HStack gap="2">
                        <Play size={16} />
                        <Text>Zum Video-Kurs</Text>
                      </HStack>
                    </Button>
                  </Link>
                </HStack>

                <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
                  {moduleProgress.map((module) => (
                    <Card.Root
                      key={module.id}
                      bg="rgba(5, 150, 105, 0.04)"
                      backdropFilter="blur(8px)"
                      borderWidth="1px"
                      borderColor="rgba(5, 150, 105, 0.2)"
                      _hover={{ borderColor: "rgba(5, 150, 105, 0.4)", shadow: "md" }}
                    >
                      <Card.Body>
                        <Stack gap="4">
                          <HStack justify="space-between" align="flex-start">
                            <Stack gap="1">
                              <Text fontSize="sm" fontWeight="bold" color="gray.800" textTransform="uppercase">
                                {module.title}
                              </Text>
                              <Text fontSize="xs" color="gray.600">
                                {module.completedCount} von {module.totalCount} Videos
                              </Text>
                            </Stack>
                            <Link href={module.videos[0] ? `/app/free/lerne-die-grundlagen/video/${module.videos[0].id}` : `/app/free/lerne-die-grundlagen`}>
                              <Button size="xs" variant="ghost" colorPalette="green">
                                <ArrowRight size={16} />
                              </Button>
                            </Link>
                          </HStack>

                          <Stack gap="3" align="center">
                            <CircularProgressChart
                              progress={module.progress}
                              size={88}
                              color="#059669"
                              strokeWidth={5}
                            />
                            <Link href={module.videos[0] ? `/app/free/lerne-die-grundlagen/video/${module.videos[0].id}` : `/app/free/lerne-die-grundlagen`}>
                              <Button size="sm" variant="outline" colorPalette="green" w="full">
                                Modul öffnen
                              </Button>
                            </Link>
                          </Stack>
                        </Stack>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </SimpleGrid>

                <Text fontSize="sm" color="gray.600">
                  Insgesamt {allVideos.length} Videos im Kurs „Lerne die Grundlagen”.
                </Text>
              </Stack>
            </Card.Body>
          </Card.Root>
        )}

        {/* Trainingsplan-Übersicht (3 Pläne, jeweils für Mann und Frau) */}
        <Card.Root
          bg="rgba(59, 130, 246, 0.06)"
          backdropFilter="blur(12px)"
          borderWidth="1px"
          borderColor="rgba(59, 130, 246, 0.25)"
          shadow="sm"
        >
          <Card.Body>
            <Stack gap="4">
              <HStack justify="space-between" align="center" flexWrap="wrap" gap="2">
                <Heading size="md" color="gray.800">
                  Trainingsplan-Übersicht
                </Heading>
                <Link href="/app/free/trainingsplan">
                  <Button size="sm" colorPalette="blue">
                    <HStack gap="2">
                      <Barbell size={16} />
                      <Text>Plan wählen / Mein Plan</Text>
                    </HStack>
                  </Button>
                </Link>
              </HStack>

              <Text fontSize="sm" color="gray.600">
                Entdecke unsere beliebtesten Trainingspläne – individuell abgestimmt auf Männer und Frauen.
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                {featuredTrainingPlans.map((plan: TrainingPlan) => {
                  const isMale = plan.gender === 'male';
                  const bgColor = isMale ? 'rgba(59, 130, 246, 0.04)' : 'rgba(236, 72, 153, 0.04)'; // blau für Männer, pink für Frauen
                  const borderColor = isMale ? 'rgba(59, 130, 246, 0.2)' : 'rgba(236, 72, 153, 0.2)';
                  const hoverBorderColor = isMale ? 'rgba(59, 130, 246, 0.4)' : 'rgba(236, 72, 153, 0.4)';
                  const buttonColor = isMale ? 'blue' : 'pink';

                  return (
                    <Card.Root
                      key={plan.id}
                      bg={bgColor}
                      backdropFilter="blur(8px)"
                      borderWidth="1px"
                      borderColor={borderColor}
                      _hover={{ borderColor: hoverBorderColor, shadow: "md" }}
                    >
                    <Card.Body>
                      <Stack gap="3">
                        <HStack justify="space-between" align="flex-start">
                          <Text fontSize="sm" fontWeight="bold" color="gray.800">
                            {plan.name}
                          </Text>
                          <Text as="span"
                            fontSize="2xs"
                            fontWeight="bold"
                            color={isMale ? "blue.600" : "pink.600"}
                            bg={isMale ? "blue.100" : "pink.100"}
                            px="2"
                            py="0.5"
                            borderRadius="md"
                          >
                            {isMale ? 'Männer' : 'Frauen'}
                          </Text>
                        </HStack>
                        <Text fontSize="xs" color="gray.600">
                          {plan.description}
                        </Text>
                        <Link href={`/app/free/trainingsplan/${plan.id}`} w="full">
                          <Button size="sm" variant="outline" colorPalette={buttonColor} w="full">
                            Details ansehen
                          </Button>
                        </Link>
                      </Stack>
                    </Card.Body>
                  </Card.Root>
                  );
                })}
              </SimpleGrid>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Section>
  );
}
