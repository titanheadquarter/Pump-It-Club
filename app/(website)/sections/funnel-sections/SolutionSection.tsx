"use client";

import { Box, Heading, Text, VStack, Card, CardBody, Image, Flex } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";

export function SolutionSection() {
  const solutionCards = [
    {
      imageSrc: "/hero-funnel/problems/erschoepft.png",
      title: "Energie & Erholung",
      subheading: "Dein Körper läuft wieder auf Vollgas",
      text: "Mit unserem Programm bekommst du deine Energie zurück. Schlaf, Regeneration und gezieltes Training bringen dich in die beste Form – ohne Kaffee-Flatrate.",
    },
    {
      imageSrc: "/hero-funnel/problems/dick.png",
      title: "Körper & Form",
      subheading: "Du siehst endlich das Ergebnis",
      text: "Wir geben dir das System: Training, Ernährung und Mindset. In 12 Wochen siehst du den Unterschied – und fühlst dich so, wie du dich immer vorgestellt hast.",
    },
    {
      imageSrc: "/hero-funnel/problems/schmerzen.png",
      title: "Klarheit & Fokus",
      subheading: "Kopf und Körper im Einklang",
      text: "Wenn dein Körper stark ist, folgt der Geist. Mehr mentale Klarheit, bessere Entscheidungen und weniger Chaos – weil du endlich das richtige Fundament hast.",
    },
  ];

  return (
    <Section pt={8} pb={12} style={{ paddingInline: "0 !important" }} id="solutions-section">
      <VStack gap={5} textAlign="center" mx="auto">
        <VStack gap={2}>
          <Text fontSize="xs" fontWeight="bold" letterSpacing="wider" color="green.600" textTransform="uppercase">
            Die Lösung
          </Text>
          <Heading as="h2" size="xl" fontWeight="extrabold" color="gray.800" lineHeight="tight">
            So drehst du es um.
          </Heading>
          <Text fontSize="md" color="gray.600">
            Mit dem richtigen System wird alles besser – Energie, Körper und Kopf.
          </Text>
        </VStack>
        {/* Gespiegelt: Scroll von rechts nach links (RTL), Wischen anders herum als Problem */}
        <Box
          width="100vw"
          maxW="100vw"
          marginLeft="calc(50% - 50vw)"
          overflowX="auto"
          overflowY="hidden"
          pb={3}
          pr={0}
          className="problem-cards-scroll"
          dir="rtl"
        >
          <Flex gap={4} width="max-content" minW="min-content" pl={0} pr={{ base: 4, md: 6 }} dir="rtl">
            {solutionCards.map((card, index) => (
              <Card.Root
                key={index}
                flexShrink={0}
                w={{ base: "280px", sm: "320px" }}
                dir="ltr"
                overflow="hidden"
                borderRadius="lg"
                border="1px solid"
                borderColor="green.200"
                bg="rgba(187, 247, 208, 0.4)"
                backdropFilter="blur(12px)"
                boxShadow="0 8px 32px rgba(34, 197, 94, 0.15)"
                _hover={{
                  boxShadow: "0 12px 40px rgba(34, 197, 94, 0.2)",
                  transform: "translateY(-4px)",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Box position="relative" height="180px" width="full">
                  <Image src={card.imageSrc} alt={card.title} objectFit="cover" width="full" height="full" />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    p={3}
                    bgGradient="linear(to-t, blackAlpha.800, transparent)"
                    color="white"
                  >
                    <Heading as="h3" size="sm" fontWeight="bold">
                      {card.title}
                    </Heading>
                  </Box>
                </Box>
                <Card.Body p={5} textAlign="left">
                  <Text fontWeight="semibold" color="gray.800" mt={1} fontSize="sm">
                    {card.subheading}
                  </Text>
                  <Text fontSize="xs" color="gray.600" lineHeight="tall">
                    {card.text}
                  </Text>
                </Card.Body>
              </Card.Root>
            ))}
          </Flex>
        </Box>
      </VStack>
    </Section>
  );
}
