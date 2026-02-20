"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Stack,
  Icon,
  Avatar,
  SimpleGrid,
  Card,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import {
  CheckCircle,
  LinkedinLogo,
  InstagramLogo,
  GlobeSimple,
  PlayCircle,
} from "@phosphor-icons/react/dist/ssr";
import { Star } from "@phosphor-icons/react";
import { Link } from "@/components/ui/link";

const cardStyle = {
  red: {
    borderColor: "red.200",
    bg: "rgba(254, 202, 202, 0.4)",
    shadow: "0 8px 32px rgba(220, 38, 38, 0.15)",
    valueColor: "red.600",
    labelColor: "red.800",
  },
  green: {
    borderColor: "green.200",
    bg: "rgba(187, 247, 208, 0.4)",
    shadow: "0 8px 32px rgba(34, 197, 94, 0.15)",
    valueColor: "green.600",
    labelColor: "green.800",
  },
};

const reviews = [
  {
    name: "Max Mustermann",
    role: "Unternehmer",
    avatar: "https://bit.ly/dan-abramov",
    videoHeadline: "So hat Max",
    videoHighlight: "sein Ziel erreicht",
    videoSubline: "Sein Transformations-Video in 90 Sekunden.",
    mainHeading: "Von wenig Energie zu Topform & mentaler Klarheit",
    successCards: [
      { value: "-8 kg", label: "Fett in 12 Wo.", ...cardStyle.red },
      { value: "+30%", label: "Energie", ...cardStyle.green },
      { value: "100%", label: "Mentale Klarheit", ...cardStyle.green },
    ],
    checks: ["Muskelaufbau & Fettabbau", "Mehr Energie & Schlaf", "Mentale Klarheit"],
    ergebnisseLabel: "Seine Ergebnisse",
    vorher: "Müde durch den Alltag, wenig Zeit für Training, Körper und Kopf nicht im Einklang.",
  },
  {
    name: "Sarah Klein",
    role: "Marketing-Leiterin",
    avatar: "https://bit.ly/sage-adebayo",
    videoHeadline: "Sarahs Weg:",
    videoHighlight: "12 Wochen Transformation",
    videoSubline: "Von Erschöpfung zu mehr Power im Job.",
    mainHeading: "Endlich wieder Energie – im Büro und im Gym",
    successCards: [
      { value: "-6 kg", label: "Fett", ...cardStyle.red },
      { value: "+40%", label: "Energie", ...cardStyle.green },
      { value: "3x", label: "Training/Woche", ...cardStyle.green },
    ],
    checks: ["Körperfett reduziert", "Besserer Schlaf", "Fester Trainingsrhythmus"],
    ergebnisseLabel: "Ihre Ergebnisse",
    vorher: "Ständig erschöpft, kein Sport, Gewicht stieg. Job und Gesundheit liefen auseinander.",
  },
  {
    name: "Thomas Weber",
    role: "Geschäftsführer",
    avatar: "https://bit.ly/ryan-florence",
    videoHeadline: "Thomas nach",
    videoHighlight: "16 Wochen Coaching",
    videoSubline: "Körper und Business im Einklang.",
    mainHeading: "Rückenschmerzen weg, mehr Fokus im Alltag",
    successCards: [
      { value: "-10 kg", label: "Fett", ...cardStyle.red },
      { value: "+5 kg", label: "Muskeln", ...cardStyle.green },
      { value: "0", label: "Rückenschmerzen", ...cardStyle.green },
    ],
    checks: ["Keine Schmerzen mehr", "Mehr Kraft & Ausdauer", "Klarer Kopf"],
    ergebnisseLabel: "Seine Ergebnisse",
    vorher: "Rückenprobleme, Übergewicht, Stress. Keine Zeit für sich genommen.",
  },
  {
    name: "Lisa Hoffmann",
    role: "Selbstständige Beraterin",
    avatar: "https://bit.ly/code-beast",
    videoHeadline: "Lisa:",
    videoHighlight: "Von Plan A zu Ergebnis A",
    videoSubline: "Wie sie Training in den Alltag integriert hat.",
    mainHeading: "Weniger Chaos, mehr Struktur – körperlich und mental",
    successCards: [
      { value: "-5 kg", label: "in 12 Wo.", ...cardStyle.red },
      { value: "+50%", label: "Wohlbefinden", ...cardStyle.green },
      { value: "4x", label: "Training/Woche", ...cardStyle.green },
    ],
    checks: ["Konstantes Training", "Mehr Selbstvertrauen", "Struktur im Alltag"],
    ergebnisseLabel: "Ihre Ergebnisse",
    vorher: "Unregelmäßig trainiert, Ernährung nebenbei. Fühlte mich unsicher im Körper.",
  },
];

function ReviewCard({
  review,
  index,
}: {
  review: (typeof reviews)[0];
  index: number;
}) {
  return (
    <VStack
      gap={{ base: 6, md: 8 }}
      alignItems="stretch"
      w="full"
      maxW="800px"
      mx="auto"
      textAlign={{ base: "center", md: "left" }}
      pt={index === 0 ? 0 : { base: 10, md: 14 }}
      borderTop={index === 0 ? "none" : "1px solid"}
      borderColor="gray.200"
    >
      {/* Video + Headline */}
      <VStack gap={3} alignItems="center" w="full">
        <Heading
          as="h2"
          size={{ base: "lg", md: "xl" }}
          fontWeight="extrabold"
          color="gray.800"
          lineHeight="tight"
          px={2}
        >
          {review.videoHeadline}{" "}
          <Text as="span" color="green.600">
            {review.videoHighlight}
          </Text>
        </Heading>
        <Text fontSize="sm" color="gray.600" maxW="320px">
          {review.videoSubline}
        </Text>
        <Box
          position="relative"
          w="full"
          maxW={{ base: "200px", sm: "240px" }}
          mx="auto"
          aspectRatio="9/16"
          borderRadius="xl"
          overflow="hidden"
          border="2px solid"
          borderColor="green.200"
          bg="gray.200"
          boxShadow="0 8px 32px rgba(34, 197, 94, 0.2)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack gap={2} color="gray.500">
            <Icon as={PlayCircle} boxSize={12} />
            <Text fontSize="xs" fontWeight="semibold">
              Video 9:16
            </Text>
          </VStack>
        </Box>
      </VStack>

      {/* Review Content */}
      <VStack
        gap={{ base: 4, md: 6 }}
        alignItems={{ base: "center", md: "flex-start" }}
        w="full"
      >
        <HStack gap={0.5}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={20}
              color="var(--chakra-colors-yellow-400)"
              weight="fill"
            />
          ))}
        </HStack>

        <HStack gap={3} alignItems="center" flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
          <Avatar.Root size="md">
            <Avatar.Image src={review.avatar} />
            <Avatar.Fallback name={review.name} />
          </Avatar.Root>
          <VStack alignItems={{ base: "center", md: "flex-start" }} gap={0} spacing={0}>
            <Text fontWeight="bold" fontSize="lg" color="gray.800">
              {review.name}
            </Text>
            <Text fontSize="sm" color="gray.600">
              {review.role}
            </Text>
          </VStack>
        </HStack>

        <Heading
          as="h3"
          size={{ base: "md", md: "lg" }}
          fontWeight="bold"
          color="gray.800"
          lineHeight="tight"
        >
          {review.mainHeading}
        </Heading>

        <VStack alignItems={{ base: "center", md: "flex-start" }} gap={3} w="full" mt={{ base: -2, md: -3 }}>
          <Heading as="h4" size="sm" fontWeight="semibold" color="gray.700">
            {review.ergebnisseLabel ?? "Seine Ergebnisse"}
          </Heading>
          <SimpleGrid
            columns={3}
            gap={3}
            w="full"
            maxW={{ base: "320px", sm: "400px" }}
            mx={{ base: "auto", md: "0" }}
          >
            {review.successCards.map((card, i) => (
              <Card.Root
                key={i}
                borderRadius="lg"
                border="1px solid"
                borderColor={card.borderColor}
                overflow="hidden"
                bg={card.bg}
                backdropFilter="blur(12px)"
                boxShadow={card.shadow}
              >
                <Card.Body textAlign="center" py={3} px={2}>
                  <VStack gap={0.5}>
                    <Text
                      fontSize={{ base: "2xl", sm: "3xl" }}
                      fontWeight="bold"
                      color={card.valueColor}
                      lineHeight="1"
                    >
                      {card.value}
                    </Text>
                    <Text fontSize="2xs" fontWeight="semibold" color={card.labelColor}>
                      {card.label}
                    </Text>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
          <Stack
            gap={1}
            alignItems={{ base: "center", md: "flex-start" }}
            w="full"
          >
            {review.checks.map((line, i) => (
              <HStack key={i} gap={2} flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
                <Icon as={CheckCircle} color="green.500" boxSize={4} />
                <Text fontSize="xs" color="gray.700">{line}</Text>
              </HStack>
            ))}
          </Stack>
        </VStack>

        <VStack alignItems={{ base: "center", md: "flex-start" }} gap={2} w="full">
          <Heading as="h4" size="sm" fontWeight="semibold" color="gray.700">
            Vorher
          </Heading>
          <Text fontSize="sm" color="gray.600" lineHeight="tall" textAlign={{ base: "center", md: "left" }}>
            {review.vorher}
          </Text>
        </VStack>

        <HStack gap={4} pt={2} flexWrap="wrap" justify={{ base: "center", md: "flex-start" }}>
          <Link href="#" textExternal fontSize="sm">
            <Icon as={LinkedinLogo} /> LinkedIn
          </Link>
          <Link href="#" textExternal fontSize="sm">
            <Icon as={InstagramLogo} /> Instagram
          </Link>
          <Link href="#" textExternal fontSize="sm">
            <Icon as={GlobeSimple} /> Webseite
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
}

export function CustomerReviewSection() {
  return (
    <Section pt={{ base: 12, md: 16 }} pb={{ base: 12, md: 20 }} bg="gray.50">
      <VStack gap={0} alignItems="stretch" w="full">
        <Text
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="wider"
          color="green.600"
          textTransform="uppercase"
          textAlign="center"
          pb={{ base: 4, md: 6 }}
        >
          Kundenstimmen
        </Text>

        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} index={index} />
        ))}
      </VStack>
    </Section>
  );
}
