"use client";

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Stack,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { Image } from "@/components/ui/image";
import { CheckCircle } from "@phosphor-icons/react";

interface PhaseProps {
  phaseNumber: number;
  title: string;
  description: string;
  features: string[];
  imageSrc?: string;
  imageAlt?: string;
  imageOnLeft?: boolean;
}

const PhaseCard = ({
  phaseNumber,
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  imageOnLeft = false,
}: PhaseProps) => {
  return (
    <Box
      w="full"
      bg="white"
      backdropFilter="blur(20px) saturate(180%)"
      borderRadius="l3"
      border="1px solid"
      borderColor="black"
      p={{ base: "4", md: "5", lg: "6" }}
      position="relative"
      transition="all 0.3s ease"
      overflow="hidden"
      _hover={{
        borderColor: "primary.solid/50"
      }}
    >
      <Stack
        direction={{ base: "column", lg: imageOnLeft ? "row" : "row-reverse" }}
        gap={{ base: "3", md: "4", lg: "5" }}
        align={{ base: "stretch", lg: "center" }}
        w="full"
      >
        {/* Text Content */}
        <Box flex="1" w="full">
          <VStack gap={{ base: "2.5", md: "3" }} align="start" w="full">
            <Badge
              bg="white"
              color="primary.solid"
              px={3}
              py={1}
              borderRadius="md"
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              PHASE {phaseNumber}
            </Badge>

            <Heading
              as="h3"
              fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
              fontWeight="700"
              color="fg"
              lineHeight="shorter"
            >
              {title}
            </Heading>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="fg.muted"
              lineHeight="tall"
            >
              {description}
            </Text>

            <VStack gap="2" align="start" w="full" mt="2">
              {features.map((feature, index) => (
                <HStack key={index} gap="3" align="start">
                  <Box
                    color="primary.solid"
                    mt="0.5"
                    flexShrink={0}
                  >
                    <CheckCircle size={18} weight="fill" />
                  </Box>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="fg"
                    lineHeight="tall"
                    flex="1"
                  >
                    {feature}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </Box>

        {/* Image */}
        <Box
          flex="1"
          w="full"
          minH={{ base: "200px", md: "250px", lg: "300px" }}
          maxH={{ base: "250px", md: "300px", lg: "350px" }}
          borderRadius="l2"
          overflow="hidden"
          bg="bg.subtle"
          border="1px solid"
          borderColor="black"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt || `Phase ${phaseNumber} Bild`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
            />
          ) : (
            <Text
              fontSize="sm"
              color="fg.muted"
              textAlign="center"
              px="4"
            >
              Bild Platzhalter Phase {phaseNumber}
            </Text>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

interface ProcessSectionProps {
  phases?: Array<{
    title: string;
    description: string;
    features: string[];
    imageSrc?: string;
    imageAlt?: string;
  }>;
}

export const ProcessSection = ({
  phases = [
    {
      title: "Umfassender Checkup Call, um DIE richtige Strategie für DICH zu finden",
      description: "Wir analysieren deinen aktuellen Stand, deine Ziele und deinen Alltag um die beste Strategie für dich zu finden. Für werden dich zusammen zu deinem Traumkörper führen.",
      features: [
        "Fokus auf dich und deine Ziele",
        "Strategien wirklich verstehen",
        "Pläne an deinen Alltag angepasst"
      ],
      imageSrc: "/landingpage/landingpage.webp",
      imageAlt: "Video-Training und Online-Learning Phase 1",
    },
    {
      title: "Weekly Calls und Arschtritte!",
      description: "Wenn du den geschmiedeten Plan NICHT umsetzt, dann brauchst du dich nicht wundern, wenn du nichts erreicht. Mit mir an deiner Seite, wird das aber kein Problem mehr sein!",
      features: [
        "Du wirst es schaffen",
        "Wir kommen deinem Ziel entgegen",
        "Ich bin immer für dich erreichbar"
      ],
      imageSrc: "/applandingpage/phase-2-mentoring.webp",
      imageAlt: "Live-Mentoring und persönliche Betreuung Phase 2",
    },
    {
      title: "Traumbody erreicht. Strategie entwickeln, damit dein Körper langfristig so bleibt",
    description: "Du bist an deinem ersten Ziel! Wir entwickeln eine Strategie, damit dein Körper langfristig so bleibt und du deine nächsten Ziele erreichst.",
      features: [
        "Konstanz & Kontrolle",
        "Mehr Freiheit durch Ergebnisse",
        "Klarer Weg zu deinem Ziel"
      ],
      imageSrc: "/applandingpage/phase-3-mastery.webp",
      imageAlt: "Trading Mastery und Ergebnisse Phase 3",
    }
  ]
}: ProcessSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section size="lg" bg="blackAlpha.900">
      <Container
        maxW="7xl"
        py={{ base: 2, sm: 2, md: 2, lg: 2 }}
        px={{ base: 4, sm: 6, md: 8 }}
        position="relative"
        zIndex={1}
      >
        <VStack gap={{ base: 4, md: 5, lg: 6 }} align="stretch" w="full">
          {/* Header */}
          <VStack
            gap={{ base: 3, md: 4 }}
            textAlign="center"
            opacity={isLoaded ? 1 : 0}
            transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
            transition="all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          >
            <Badge
              bg="primary.solid/20"
              color="primary.solid"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
            >
              DEIN WEG ZUM ERFOLG
            </Badge>

            <Heading
              as="h2"
              fontSize={{ base: "1.5rem", md: "2rem", lg: "2.5rem", xl: "3rem" }}
              fontWeight="700"
              color="white"
              lineHeight="shorter"
              maxW="4xl"
            >
              So funktioniert deine Transformation
            </Heading>

            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="white"
              maxW="2xl"
              lineHeight="tall"
            >
              In drei klaren Phasen begleiten wir dich von den Grundlagen bis zum Meister
            </Text>
          </VStack>

          {/* Phases */}
          <VStack
            gap={{ base: 4, md: 5, lg: 6 }}
            w="full"
            opacity={isLoaded ? 1 : 0}
            transform={isLoaded ? 'translateY(0)' : 'translateY(50px)'}
            transition="all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s"
          >
            {phases.map((phase, index) => (
              <PhaseCard
                key={index}
                phaseNumber={index + 1}
                title={phase.title}
                description={phase.description}
                features={phase.features}
                imageSrc={phase.imageSrc}
                imageAlt={phase.imageAlt}
                imageOnLeft={index % 2 === 0}
              />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Section>
  );
};