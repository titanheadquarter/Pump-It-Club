"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Box, Spinner, Text, Stack } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import type { CourseModule } from "@/app/api/course/modules/route";

/**
 * Modul-Route leitet direkt zum ersten Video weiter (keine Zwischenübersicht).
 * Flow: Übersicht → Klick Modul → Video-Player (erstes Video).
 */
export default function ModuleRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const moduleId = params.moduleId as string;

  useEffect(() => {
    fetch("/api/course/modules")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load modules");
        return res.json();
      })
      .then((data: { modules: CourseModule[] }) => {
        const module = data.modules?.find((m) => m.id === moduleId);
        if (module?.videos?.length) {
          const firstVideoId = module.videos[0].id;
          router.replace(`/app/free/lerne-die-grundlagen/video/${firstVideoId}`);
        } else {
          router.replace("/app/free/lerne-die-grundlagen");
        }
      })
      .catch((err) => {
        console.error("[module-redirect] error:", err);
        setError("Modul nicht gefunden");
        router.replace("/app/free/lerne-die-grundlagen");
      });
  }, [moduleId, router]);

  if (error) {
    return (
      <Section header>
        <Box py="8" textAlign="center">
          <Text color="gray.600">{error}</Text>
        </Box>
      </Section>
    );
  }

  return (
    <Section header>
      <Stack align="center" py="12">
        <Spinner size="lg" color="green.500" />
        <Text color="gray.600">Modul wird geladen...</Text>
      </Stack>
    </Section>
  );
}
