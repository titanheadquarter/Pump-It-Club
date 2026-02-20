"use client";

import { Stack, VStack, Heading, Text } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { FounderImage } from "@/components/ui/mainpage/founder-image";
import { FounderContent } from "@/components/ui/mainpage/founder-content";

interface MeetTheFounderSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  secondImageSrc?: string;
  secondImageAlt?: string;
  achievements?: string[];
  missionText?: string;
}

export const MeetTheFounderSection = ({
  imageSrc = "/landingpage/VorherNachher.webp",
  imageAlt = "Felix - Gründer von PumpItClub",
  secondImageSrc = "/landingpage/macher2.webp",
  secondImageAlt = "Felix - Gründer von PumpItClub",
  achievements,
  missionText,
}: MeetTheFounderSectionProps) => {
  return (
    <Section pt={{ base: 12, md: 16 }} pb={{ base: 12, md: 20 }} bg="gray.50">
      <VStack gap={{ base: 6, md: 8 }} align="stretch" maxW="6xl" mx="auto">
        {/* Section Label – wie andere Funnel-Sections */}
        <Text
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="wider"
          color="green.600"
          textTransform="uppercase"
          textAlign="center"
        >
          Über den Gründer
        </Text>

        {/* Headline – einheitliche Funnel-Typografie */}
        <VStack gap={2} textAlign="center">
          <Heading
            as="h2"
            size={{ base: "xl", md: "2xl" }}
            fontWeight="extrabold"
            color="gray.800"
            lineHeight="tight"
          >
            Hi, ich bin{" "}
            <Text as="span" color="green.600" textDecoration="underline" textDecorationColor="green.500">
              Felix
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" maxW="2xl" lineHeight="tall">
            Dein persönlicher Fitness-Coach für{" "}
            <Text as="span" color="green.600" fontWeight="bold">
              echte Transformationen
            </Text>
          </Text>
        </VStack>

        {/* Content: Bild(er) + Text – mobile: Spalte, desktop: Zeile */}
        <Stack
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 6, md: 8 }}
          align={{ base: "stretch", lg: "stretch" }}
          w="full"
        >
          <FounderImage
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            secondImageSrc={secondImageSrc}
            secondImageAlt={secondImageAlt}
          />
          <FounderContent achievements={achievements} missionText={missionText} />
        </Stack>
      </VStack>
    </Section>
  );
};