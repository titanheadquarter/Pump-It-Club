"use client";

import { Box, Heading, Text, VStack, Card, CardBody, Image, Flex } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";

export function ProblemSection() {
  const problemCards = [
    {
      imageSrc: "/hero-funnel/problems/erschoepft.png",
      title: "Chronische Erschöpfung",
      subheading: "Du gibst 100% – aber dein Körper streikt",
      text: "Du startest müde in den Tag und kämpfst dich durch, obwohl du eigentlich Vollgas geben willst. Kaffee ist dein bester Freund – aber keine Lösung.",
    },
    
    {
      imageSrc: "/hero-funnel/problems/dick.png",
      title: "Unzufrieden mit deinem Körper",
      subheading: "Du weißt, da ist mehr drin",
      text: "Im Spiegel siehst du nicht das, was du dir vorstellst. Du hast das Potenzial – aber kein System, das dich dorthin bringt.",
    },
    {
      imageSrc: "/hero-funnel/problems/schmerzen.png",
      title: "Mentales Chaos",
      subheading: "Zu viele Baustellen, zu wenig Klarheit",
      text: "Im Kopf läuft alles gleichzeitig. Entscheidungen kosten dich doppelt so viel Kraft wie nötig – weil dein Geist genauso überlastet ist wie dein Terminkalender.",
    },
    
  ];

  return (
    <Section pt={12} pb={8} style={{ paddingInline: "0 !important" }} id="problem-section">
      <VStack gap={5} textAlign="center" mx="auto">
        <VStack gap={2}>
          <Text fontSize="xs" fontWeight="bold" letterSpacing="wider" color="red.500" textTransform="uppercase">
            Das Problem
          </Text>
          <Heading as="h2" size="xl" fontWeight="extrabold" color="gray.800" lineHeight="tight">
            Kennst du das?
          </Heading>
          <Text fontSize="md" color="gray.600">
            Du bist nicht zu schwach – du hast einfach das falsche System.
          </Text>
        </VStack>
        {/* Horizontal scrollbare Cards – rechts bis Viewport, Cards werden abgeschnitten */}
        <Box
          width="100vw"
          maxW="100vw"
          marginLeft="calc(50% - 50vw)"
          overflowX="auto"
          overflowY="hidden"
          pb={3}
          pr={0}
          className="problem-cards-scroll"
        >
          <Flex gap={4} width="max-content" minW="min-content" pl={{ base: 4, md: 6 }} pr={0}>
            {problemCards.map((card, index) => (
              <Card.Root
                key={index}
                flexShrink={0}
                w={{ base: "280px", sm: "320px" }}
                overflow="hidden"
                borderRadius="lg"
                border="1px solid"
                borderColor="red.200"
                bg="rgba(254, 202, 202, 0.4)"
                backdropFilter="blur(12px)"
                boxShadow="0 8px 32px rgba(220, 38, 38, 0.05)"
                _hover={{
                  boxShadow: "0 12px 40px rgba(220, 38, 38, 0.1)",
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
