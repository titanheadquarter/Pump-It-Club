"use client";

import { Box, Heading, Text, VStack, Button, HStack, Circle, SimpleGrid, Card } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { Image } from "@/components/ui/image";
import { Star, CaretDown } from "@phosphor-icons/react";

export function Hero1() {
  return (
    <Section pt={{ base: 20, md: 28 }} pb={{ base: 12, md: 16 }} bg="gray.50">
      <VStack gap={{ base: 4, md: 6 }} textAlign="center" maxWidth="800px" mx="auto">
        {/* Badge - kompakt */}
        <Box
          as="span"
          display="inline-block"
          px={3}
          py={1.5}
          borderRadius="full"
          bg="green.100"
          color="green.700"
          fontSize="2xs"
          fontWeight="bold"
          letterSpacing="wider"
          textTransform="uppercase"
          border="1px solid"
          borderColor="green.300"
        >
          Für Unternehmer, Manager & High Performer
        </Box>
        {/* Hauptüberschrift */}
        <Heading as="h1" size="2xl" fontWeight="extrabold" lineHeight="shorter" position="relative">
          Es wird Zeit für deine{" "}
          <Text
            as="span"
            color="green.500"
            className="bebas-neue-regular"
            textDecoration="underline"
            textDecorationColor="green.500"
            style={{ fontSize: "1.8em", marginTop: "-0.35em", display: "inline-block", position: "relative", zIndex: 1 }}
          >
            Veränderung
          </Text>
        </Heading>
        {/* Subheadline */}
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold" lineHeight="shorter" color="black.800" mb={{ base: 2, md: 3 }}>
          In 16 Wochen{" "}
          <Text as="span" color="green.600" fontWeight="bold" textDecoration="underline" textDecorationColor="green.600">
            garantiere
          </Text>{" "}
          ich dir:
        </Text>

        {/* Portrait mit grüner Border */}
        <Box
          position="relative"
          minW="240px"
          maxH="480px"
          borderRadius="xl"
          overflow="hidden"
          border="1.5px solid"
          borderColor="black.200"
          boxShadow="0 8px 32px rgba(70, 70, 70, 0.15)"
        >
          <Image
          scale={1.125}
          top={"-25px"}
            src="/hero-funnel/personal/Vorher Nachher .jpg"
            alt="Porträt"
            width={280}
            height={350}
            style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
          />
        </Box>

        {/* Results Cards - überlappen das Bild minimal */}
        <SimpleGrid
          columns={3}
          gap={4}
          mb={{ base: 4, md: 5 }}
          maxW="500px"
          mx="auto"
          mt={{ base: -8, md: -8 }}
          position="relative"
          zIndex={1}
        >


          {/* Card 1: -10 kg Fett - Rotes Glassmorph */}
          <Card.Root
            borderRadius="lg"
            border="1px solid"
            borderColor="red.200"
            overflow="hidden"
            bg="rgba(254, 202, 202, 0.4)"
            backdropFilter="blur(12px)"
            boxShadow="0 8px 32px rgba(220, 38, 38, 0.15)"
          >
            <Card.Body textAlign="center" py={3} px={2}>
              <VStack gap={0.5}>
                <Text fontSize="3xl" fontWeight="bold" color="red.600" lineHeight="1">
                  -16
                </Text>
                <Text fontSize="xs" fontWeight="semibold" color="red.800">
                  kg Fett
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            borderRadius="lg"
            border="1px solid"
            borderColor="green.200"
            overflow="hidden"
            bg="rgba(187, 247, 208, 0.4)"
            backdropFilter="blur(12px)"
            boxShadow="0 8px 32px rgba(34, 197, 94, 0.15)"
          >
            <Card.Body textAlign="center" py={3} px={2}>
              <VStack gap={0.5}>
                <Text fontSize="3xl" fontWeight="bold" color="green.600" lineHeight="1">
                  +6kg
                </Text>
                <Text fontSize="xs" fontWeight="semibold" color="green.800">
                   Muskeln
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>

          {/* Card 2: +5 kg Muskeln - Grünes Glassmorph */}
          <Card.Root
            borderRadius="lg"
            border="1px solid"
            borderColor="green.200"
            overflow="hidden"
            bg="rgba(187, 247, 208, 0.4)"
            backdropFilter="blur(12px)"
            boxShadow="0 8px 32px rgba(34, 197, 94, 0.15)"
          >
            <Card.Body textAlign="center" py={3} px={2}>
              <VStack gap={0.5}>
                <Text fontSize="3xl" fontWeight="bold" color="green.600" lineHeight="1">
                  +80%
                </Text>
                <Text fontSize="xs" fontWeight="semibold" color="green.800">
                  Wohlbefinden
                </Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* Social Proof: PB oben, Sterne darunter, Text unten - nah an den Cards */}
        <VStack gap={1.5} mt={{ base: 2, md: 3 }}>
          {/* Überlappende Profilbilder - oben */}
          <HStack gap={-3} justify="center">
            {[1, 2, 3, 4, 5].map((i) => (
              <Circle
                key={i}
                size="36px"
                bg="gray.300"
                border="2px solid white"
                boxShadow="md"
                position="relative"
                zIndex={5 - i}
              >
                <Text fontSize="xs" color="gray.600" fontWeight="bold">
                  {i}
                </Text>
              </Circle>
            ))}
          </HStack>
          {/* Sterne ausgefüllt - unter den PB */}
          <HStack gap={0.5}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} color="var(--chakra-colors-yellow-400)" weight="fill" />
            ))}
          </HStack>
          {/* Text darunter */}
          <Text fontSize="sm" color="gray.700" fontWeight="medium">
            25+ Zufriedene Kunden
          </Text>
          <Text fontSize={{ base: "xl", md: "xl" }} color="gray.800" fontWeight="bold" textAlign="center" lineHeight="1em" mt={5}>
            Sichere dir jetzt dein{" "}
            <Text as="span" className="bebas-neue-regular" color="green.600" textDecoration="underline" textDecorationColor="green.600" style={{ fontSize: "1.6em" }} display="block">
              kostenloses
            </Text>
             Video-Training
          </Text>
          {/* Animierter Pfeil als Button – scrollt zum Lead-Formular */}
          <Button
            type="button"
            mt={6}
            p={3}
            size="lg"
            borderRadius="full"
            bg="green.500"
            color="white"
            border="2px solid"
            borderColor="green.600"
            boxShadow="md"
            className="arrow-bounce-down"
            _hover={{ bg: "green.600", transform: "scale(1.05)" }}
            _active={{ transform: "scale(0.98)" }}
            transition="all 0.2s"
            onClick={() => {
              document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Zum Formular scrollen"
          >
            Zum Video-Training <CaretDown size={28} color="white" weight="bold" />
          </Button>
        </VStack>

       
      </VStack>
    </Section>
  );
}
