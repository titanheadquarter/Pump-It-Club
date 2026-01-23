"use client";

import {
  Box,
  Stack,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
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
  imageSrc = "/macher.webp",
  imageAlt = "Felix - Gründer von PumpItClub",
  secondImageSrc = "/macher2.webp",
  secondImageAlt = "Felix - Gründer von PumpItClub",
  achievements,
  missionText,
}: MeetTheFounderSectionProps) => {
  return (
    <Section size="lg">
      {/* MATCHED: Same container width as Hero Section - 900px */}
      <Box maxW="900px" mx="auto" w="full">
        <VStack gap={{ base: 6, md: 8 }} align="stretch" w="full">
          {/* Header - Immer ganz oben, auch auf Mobile */}
          <VStack gap={{ base: 4, md: 6 }} align="stretch" w="full" order={{ base: 1, lg: 0 }}>
            {/* Sektions-Überschrift */}
            <Text
              fontSize="xs"
              fontWeight="600"
              letterSpacing="0.1em"
              textTransform="uppercase"
              color="fg.muted"
              opacity={0.8}
            >
              MEET THE FOUNDER
            </Text>

            {/* Hauptüberschrift mit blauem Rahmen */}
            <Box
              border="2px solid"
              borderColor="primary.solid"
              borderRadius="l2"
              p={{ base: 4, md: 6 }}
              bg="primary.solid/5"
              position="relative"
              _before={{
                content: '""',
                position: "absolute",
                inset: "-2px",
                borderRadius: "l2",
                bg: "primary.solid/20",
                filter: "blur(8px)",
                zIndex: -1,
              }}
            >
              <Heading
                as="h2"
                size={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="700"
                color="fg"
                textAlign="center"
              >
                Hi, Ich bin Felix
              </Heading>
            </Box>
          </VStack>

          {/* Desktop: Bilder links, Content rechts | Mobile: Bilder nach Header, Content danach */}
          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 6, md: 8, lg: 12 }}
            align={{ base: "stretch", lg: "stretch" }}
            w="full"
            order={{ base: 2, lg: 0 }}
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
      </Box>
    </Section>
  );
};