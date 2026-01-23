"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  chakra,
} from "@chakra-ui/react";
import { CheckCircle, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react";

interface FounderContentProps {
  achievements?: string[];
  missionText?: string;
}

export const FounderContent = ({
  achievements = [
    "Vollzeit Fitnesscoach",
    "Vielen Menschen dabei geholfen ihre Körperlichen und Mentalen Grenzen zu überschreiten",
    "Über 220KG Kreuzheben",
    "Diverse Trainerzertifikate absolviert",
  ],
  missionText = "UNSERE MISSION: anderen zeigen, wie sie strukturiert und professionell ihre eigene Trading-Reise starten können!",
}: FounderContentProps) => {
  return (
    <Box
      flex="1"
      w="full"
      order={{ base: 2, lg: 2 }}
      maxW={{ base: "100%", lg: "none" }}
    >
      <VStack gap={{ base: "6", md: "8" }} align="stretch" w="full">
        {/* Einleitungstext */}
        <Text
          fontSize={{ base: "md", md: "sm" }}
          color="fg"
          lineHeight="tall"
          opacity={0.9}
        >
          Fitness ist meine lebenslange Leidenschaft und meine Berufung. Mein Antrieb ist es, Menschen ganzheitlich zu transformieren, dich körperlich stärker und mental selbstbewusster zu machen. Es erfüllt mich, anderen zu helfen, ihre Grenzen zu verschieben und die beste Version ihrer selbst zu entdecken. Dafür lebe ich.
        </Text>

        {/* "3 Jahre später..." Box */}
        <Box
          border="1.5px solid"
          borderColor="primary.solid"
          borderRadius="l2"
          p={{ base: "3", md: "4" }}
          bg="primary.solid/5"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            inset: "-1.5px",
            borderRadius: "l2",
            bg: "primary.solid/15",
            filter: "blur(6px)",
            zIndex: -1,
          }}
        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="700"
            color="fg"
            textAlign="center"
            mb={{ base: "4", md: "5" }}
          >
            3 Jahre später...
          </Text>

          {/* Checkliste */}
          <VStack gap={{ base: "3", md: "4" }} align="stretch">
            {achievements.map((achievement, index) => (
              <HStack key={index} gap="3" align="flex-start">
                <Box
                  color="primary.solid"
                  mt="0.5"
                  flexShrink={0}
                >
                  <CheckCircle size={16} weight="fill" />
                </Box>
                <Text
                  fontSize="sm"
                  color="fg.muted"
                  lineHeight="tall"
                  flex="1"
                >
                  {achievement}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Missionsstatement-Box */}
        <Box
          border="1.5px solid"
          borderColor="primary.solid"
          borderRadius="l2"
          p={{ base: "4", md: "5" }}
          bg="primary.solid/5"
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            inset: "-1.5px",
            borderRadius: "l2",
            bg: "primary.solid/15",
            filter: "blur(6px)",
            zIndex: -1,
          }}
        >
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="700"
            color="fg"
            textAlign="center"
            lineHeight="tall"
          >
            {missionText}
          </Text>
        </Box>

        {/* Social Media Links */}
        <HStack gap="4" mt={{ base: "4", md: "6" }}>
          {/* Instagram Link */}
          <chakra.a
            href="https://instagram.com/pumpitclub"
            target="_blank"
            rel="noopener noreferrer"
            w="12"
            h="12"
            borderRadius="full"
            bg="bg.panel"
            border="1px solid"
            borderColor="border.emphasized"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="fg"
            transition="all 0.3s ease"
            _hover={{
              bg: "rgba(228, 64, 95, 0.1)",
              borderColor: "#E4405F",
              color: "#E4405F",
              transform: "scale(1.05)",
              boxShadow: "0 0 20px -4px rgba(228, 64, 95, 0.3)",
            }}
          >
            <InstagramLogo size={24} weight="fill" />
          </chakra.a>

          {/* LinkedIn Link */}
          <chakra.a
            href="https://linkedin.com/in/pumpitclub"
            target="_blank"
            rel="noopener noreferrer"
            w="12"
            h="12"
            borderRadius="full"
            bg="bg.panel"
            border="1px solid"
            borderColor="border.emphasized"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="fg"
            transition="all 0.3s ease"
            _hover={{
              bg: "rgba(0, 119, 181, 0.1)",
              borderColor: "#0077B5",
              color: "#0077B5",
              transform: "scale(1.05)",
              boxShadow: "0 0 20px -4px rgba(0, 119, 181, 0.3)",
            }}
          >
            <LinkedinLogo size={24} weight="fill" />
          </chakra.a>
        </HStack>
      </VStack>
    </Box>
  );
};
