"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Card,
  VStack,
  HStack,
  SimpleGrid,
  Stat,
  Badge,
  Button,
  Spinner,
} from "@chakra-ui/react";
import {
  Question,
  Dumbbell,
  ChatCircle,
  Eye,
  ThumbsUp,
  Users,
} from "@phosphor-icons/react";

interface Stats {
  faqs: {
    total: number;
    published: number;
    draft: number;
    totalLikes: number;
    totalComments: number;
    totalViews: number;
  };
  trainingPlans: {
    total: number;
  };
  comments: {
    total: number;
    recent: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        // Lade FAQ-Statistiken
        const faqResponse = await fetch("/api/faq");
        const faqData = faqResponse.ok ? await faqResponse.json() : { faqs: [] };

        // Berechne FAQ-Stats
        const faqs = faqData.faqs || [];
        const publishedFaqs = faqs.filter((faq: any) => faq.is_published);
        const totalLikes = faqs.reduce((sum: number, faq: any) => sum + (faq.like_count || 0), 0);
        const totalComments = faqs.reduce((sum: number, faq: any) => sum + (faq.comment_count || 0), 0);
        const totalViews = faqs.reduce((sum: number, faq: any) => sum + (faq.view_count || 0), 0);

        // Lade Trainingsplan-Stats (vereinfacht)
        const trainingResponse = await fetch("/api/training-plans");
        const trainingData = trainingResponse.ok ? await trainingResponse.json() : { plans: [] };

        // Lade Kommentar-Stats (vereinfacht - nur Video-Kommentare)
        // Hier könnten wir eine separate API-Route für Admin-Stats erstellen

        setStats({
          faqs: {
            total: faqs.length,
            published: publishedFaqs.length,
            draft: faqs.length - publishedFaqs.length,
            totalLikes,
            totalComments,
            totalViews,
          },
          trainingPlans: {
            total: trainingData.plans?.length || 0,
          },
          comments: {
            total: 0, // Vereinfacht
            recent: 0, // Vereinfacht
          },
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <VStack gap={4} py={8}>
        <Spinner size="lg" color="green.500" />
        <Text>Lade Dashboard...</Text>
      </VStack>
    );
  }

  if (!stats) {
    return (
      <VStack gap={4} py={8}>
        <Text>Fehler beim Laden der Statistiken</Text>
      </VStack>
    );
  }

  return (
    <Stack gap={8}>
      <VStack gap={2} align="start">
        <Heading size="lg">Dashboard</Heading>
        <Text color="gray.600">
          Übersicht über dein Pump-It-Club Admin-Panel
        </Text>
      </VStack>

      {/* Quick Actions */}
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        <Card.Root>
          <Card.Body>
            <VStack gap={3} align="start">
              <HStack gap={2}>
                <Question size={20} color="var(--chakra-colors-green-500)" />
                <Text fontWeight="medium">FAQ verwalten</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Erstelle und bearbeite häufig gestellte Fragen
              </Text>
              <Button as="a" href="/admin/faq" size="sm" colorPalette="green">
                FAQ bearbeiten
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body>
            <VStack gap={3} align="start">
              <HStack gap={2}>
                <Dumbbell size={20} color="var(--chakra-colors-green-500)" />
                <Text fontWeight="medium">Trainingspläne</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Verwalte Trainingspläne und Übungen
              </Text>
              <Button as="a" href="/admin/training" size="sm" colorPalette="green">
                Pläne bearbeiten
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>

        <Card.Root>
          <Card.Body>
            <VStack gap={3} align="start">
              <HStack gap={2}>
                <ChatCircle size={20} color="var(--chakra-colors-green-500)" />
                <Text fontWeight="medium">Kommentare</Text>
              </HStack>
              <Text fontSize="sm" color="gray.600">
                Moderiere Video-Kommentare und antworte
              </Text>
              <Button as="a" href="/admin/comments" size="sm" colorPalette="green">
                Kommentare verwalten
              </Button>
            </VStack>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>

      {/* Statistics */}
      <VStack gap={6} align="stretch">
        <Heading size="md">Statistiken</Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          {/* FAQ Stats */}
          <Card.Root>
            <Card.Body>
              <VStack gap={4} align="start">
                <HStack gap={2}>
                  <Question size={20} color="var(--chakra-colors-green-500)" />
                  <Text fontWeight="medium">FAQs</Text>
                </HStack>

                <SimpleGrid columns={2} gap={3} w="full">
                  <Stat.Root>
                    <Stat.Label fontSize="sm">Gesamt</Stat.Label>
                    <Stat.Value fontSize="2xl">{stats.faqs.total}</Stat.Value>
                  </Stat.Root>

                  <Stat.Root>
                    <Stat.Label fontSize="sm">Veröffentlicht</Stat.Label>
                    <Stat.Value fontSize="2xl" color="green.500">
                      {stats.faqs.published}
                    </Stat.Value>
                  </Stat.Root>

                  <Stat.Root>
                    <Stat.Label fontSize="sm">Likes</Stat.Label>
                    <Stat.Value fontSize="lg">{stats.faqs.totalLikes}</Stat.Value>
                  </Stat.Root>

                  <Stat.Root>
                    <Stat.Label fontSize="sm">Kommentare</Stat.Label>
                    <Stat.Value fontSize="lg">{stats.faqs.totalComments}</Stat.Value>
                  </Stat.Root>
                </SimpleGrid>

                <HStack gap={2}>
                  <Badge colorPalette="gray" variant="subtle">
                    {stats.faqs.draft} Entwürfe
                  </Badge>
                </HStack>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Training Plans Stats */}
          <Card.Root>
            <Card.Body>
              <VStack gap={4} align="start">
                <HStack gap={2}>
                  <Dumbbell size={20} color="var(--chakra-colors-green-500)" />
                  <Text fontWeight="medium">Trainingspläne</Text>
                </HStack>

                <Stat.Root>
                  <Stat.Label fontSize="sm">Anzahl</Stat.Label>
                  <Stat.Value fontSize="3xl">{stats.trainingPlans.total}</Stat.Value>
                </Stat.Root>

                <Text fontSize="sm" color="gray.600">
                  Aktive Trainingsprogramme
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Comments Stats */}
          <Card.Root>
            <Card.Body>
              <VStack gap={4} align="start">
                <HStack gap={2}>
                  <ChatCircle size={20} color="var(--chakra-colors-green-500)" />
                  <Text fontWeight="medium">Kommentare</Text>
                </HStack>

                <Stat.Root>
                  <Stat.Label fontSize="sm">Video-Kommentare</Stat.Label>
                  <Stat.Value fontSize="3xl">{stats.comments.total}</Stat.Value>
                </Stat.Root>

                <Text fontSize="sm" color="gray.600">
                  Zu moderierende Kommentare
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </VStack>

      {/* Recent Activity (Placeholder) */}
      <Card.Root>
        <Card.Body>
          <VStack gap={4} align="start">
            <Heading size="sm">Letzte Aktivitäten</Heading>
            <VStack gap={2} align="start" w="full">
              <Text fontSize="sm" color="gray.600">
                • Neue FAQ hinzugefügt: "Wie funktioniert das Tracking?"
              </Text>
              <Text fontSize="sm" color="gray.600">
                • Trainingsplan aktualisiert: "Anfänger Programm v2"
              </Text>
              <Text fontSize="sm" color="gray.600">
                • 3 neue Kommentare bei Video "Ernährung Basics"
              </Text>
            </VStack>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Stack>
  );
}