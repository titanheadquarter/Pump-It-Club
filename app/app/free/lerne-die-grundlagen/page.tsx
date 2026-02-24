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
  Spinner,
  Alert,
  SimpleGrid,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { Link } from "@/components/ui/link";
import { useAuth } from "@/components/provider/auth-provider";
import type { CourseModule } from "@/app/api/course/modules/route";
import { CircularProgressChart } from "@/components/ui/circular-progress-chart";
import { Play } from "@phosphor-icons/react";

export default function LerneDieGrundlagen() {
  const { getAccessToken, user } = useAuth();
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [progress, setProgress] = useState<Record<string, { watched_seconds: number; completed: boolean; last_watched_at: string }>>({});
  const [loadingModules, setLoadingModules] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Module laden
  useEffect(() => {
    fetch("/api/course/modules")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load modules");
        return res.json();
      })
      .then((data: { modules: CourseModule[] }) => {
        setModules(data.modules ?? []);
        setLoadingModules(false);
      })
      .catch((err) => {
        console.error("[course-home] modules error:", err);
        setError("Fehler beim Laden der Module");
        setLoadingModules(false);
      });
  }, []);

  // Fortschritt laden (inkl. verzögerter Retry falls Token anfangs noch nicht da)
  useEffect(() => {
    let cancelled = false;

    const loadProgress = () => {
      const token = getAccessToken();
      if (!token) {
        setLoadingProgress(false);
        return;
      }

      setLoadingProgress(true);
      fetch("/api/course/progress", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          if (cancelled) return;
          if (!res.ok) throw new Error("Failed to load progress");
          return res.json();
        })
        .then((data: { progress: { video_id: string; watched_seconds: number; completed: boolean; last_watched_at: string }[] }) => {
          if (cancelled) return;
          const progressMap: Record<string, { watched_seconds: number; completed: boolean; last_watched_at: string }> = {};
          (data.progress ?? []).forEach((p) => {
            const videoId = String(p.video_id ?? "").trim().toLowerCase();
            if (!videoId) return;
            progressMap[videoId] = {
              watched_seconds: Number(p.watched_seconds) || 0,
              completed: Boolean(p.completed),
              last_watched_at: p.last_watched_at ?? "",
            };
          });
          setProgress(progressMap);
          setLoadingProgress(false);
        })
        .catch((err) => {
          if (!cancelled) {
            console.error("[course-home] progress error:", err);
            setLoadingProgress(false);
          }
        });
    };

    loadProgress();

    // Retry nach 1,5s und 3s falls Token anfangs null war (z. B. Outseta lädt noch)
    const t1 = setTimeout(loadProgress, 1500);
    const t2 = setTimeout(loadProgress, 3000);

    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [getAccessToken, user]);

  // Berechne Modul-Fortschritt basierend auf Video-Fortschritten
  const moduleProgress = useMemo(() => {
    return modules.map((module) => {
      const moduleVideos = module.videos;
      if (moduleVideos.length === 0) return { ...module, progress: 0, completedCount: 0, totalCount: 0 };

      const videoProgresses = moduleVideos.map(video => {
        const videoId = String(video?.id ?? "").trim().toLowerCase();
        const videoProgress = videoId ? progress[videoId] : undefined;
        if (!videoProgress) return 0; // Video noch nicht angesehen

        const watchedSeconds = Number(videoProgress.watched_seconds) || 0;
        const durationMinutes = Number(video?.duration) || 0;
        const totalSeconds = durationMinutes * 60; // duration ist in Minuten
        if (totalSeconds <= 0) return 0;

        const videoProgressPercent = Math.min(Math.round((watchedSeconds / totalSeconds) * 100), 100);
        return videoProgressPercent;
      });

      // Durchschnitt aller Video-Fortschritte
      const totalProgress = videoProgresses.reduce((sum, pct) => sum + pct, 0);
      const progressPercent = Math.round(totalProgress / moduleVideos.length);

      // completedCount = Videos mit >=90% Fortschritt
      const completedCount = videoProgresses.filter(pct => pct >= 90).length;

      return {
        ...module,
        progress: progressPercent,
        completedCount,
        totalCount: moduleVideos.length,
        totalDuration: moduleVideos.reduce((sum, v) => sum + (Number(v.duration) || 0), 0),
      };
    });
  }, [modules, progress]);

  if (loadingModules || loadingProgress) {
    return (
      <Section header>
        <Stack align="center" py="12">
          <Spinner size="lg" color="teal.500" />
          <Text color="gray.600">Lade Kurs-Module...</Text>
        </Stack>
      </Section>
    );
  }

  if (error) {
    return (
      <Section header>
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Fehler</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      </Section>
    );
  }

  return (
    <Section header>
      <Stack gap="6">
        <Stack gap="2">
          <Heading>Lerne die Grundlagen</Heading>
          <Text color="gray.600">
            Entdecke unsere Videoreihe zu den Grundlagen des Kraftsports. Die Kurse sind in drei Module unterteilt.
          </Text>
        </Stack>

        {/* Module Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
          {moduleProgress.map((module) => (
            <Card.Root
              key={module.id}
              bg="rgba(5, 150, 105, 0.06)"
              backdropFilter="blur(12px)"
              borderWidth="1px"
              borderColor="rgba(5, 150, 105, 0.25)"
              shadow="sm"
              _hover={{ shadow: "lg", borderColor: "rgba(5, 150, 105, 0.4)" }}
            >
              <Card.Body>
                <Stack gap="4">
                  <HStack justify="space-between" align="flex-start">
                    <Stack gap="1">
                      <Text fontSize="sm" fontWeight="bold" color="gray.800" textTransform="uppercase">
                        {module.title}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {module.completedCount} von {module.totalCount} Videos abgeschlossen
                      </Text>
                    </Stack>
                    <CircularProgressChart
                      progress={module.progress}
                      size={88}
                      color="#059669"
                      strokeWidth={5}
                    />
                  </HStack>

                  <VStack align="flex-start" gap="2">
                    <HStack gap="2" align="center" color="gray.500">
                      <Play size={16} />
                      <Text fontSize="sm">
                        {module.totalCount} Videos
                      </Text>
                    </HStack>
                  </VStack>

                  <Link
                    href={module.videos[0] ? `/app/free/lerne-die-grundlagen/video/${module.videos[0].id}` : `/app/free/lerne-die-grundlagen`}
                  >
                    <Button colorPalette="green" w="full" size="sm" disabled={!module.videos[0]}>
                      <HStack gap="2">
                        <Play size={16} />
                        <Text>Modul starten</Text>
                      </HStack>
                    </Button>
                  </Link>
                </Stack>
              </Card.Body>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Stack>
    </Section>
  );
}