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
        {/* H4 - Intro text with Hero typography */}
        <Heading
          as="h4"
          fontSize={{ base: "md", md: "lg" }}
          color="gray.700"
          fontWeight="medium"
          lineHeight="tall"
          textAlign={{ base: "center", lg: "left" }}
        >
          Einleitung
        </Heading>
        
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="gray.600"
          lineHeight="tall"
          textAlign={{ base: "center", lg: "left" }}
        >
          Fitness ist meine lebenslange Leidenschaft und meine Berufung. Mein Antrieb ist es, Menschen ganzheitlich zu transformieren, dich körperlich stärker und mental selbstbewusster zu machen. Es erfüllt mich, anderen zu helfen, ihre Grenzen zu verschieben und die beste Version ihrer selbst zu entdecken.{' '}
          <Text as="span" color="green.600" fontWeight="bold">Dafür lebe ich.</Text>
        </Text>

        {/* H5 - Achievements section with Hero-style card */}
        <Box
          bg="rgba(255, 255, 255, 0.9)"
          backdropFilter="blur(20px) saturate(180%)"
          borderRadius="xl"
          border="1px solid"
          borderColor="rgba(0, 0, 0, 0.2)"
          p={{ base: "4", md: "5" }}
          position="relative"
          transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          overflow="hidden"
          boxShadow="0 4px 16px -2px rgba(0, 0, 0, 0.05), 0 6px 32px -4px rgba(0, 0, 0, 0.03)"
          css={{
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '-1px',
              borderRadius: 'xl',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)',
              filter: 'blur(4px)',
              zIndex: -1,
              opacity: 0.8
            }
          }}
          _hover={{
            transform: "translateY(-2px)",
            borderColor: "rgba(34, 197, 94, 0.3)",
            boxShadow: "0 8px 25px -4px rgba(0, 0, 0, 0.08), 0 12px 50px -8px rgba(0, 0, 0, 0.04), 0 0 15px -4px rgba(34, 197, 94, 0.2)"
          }}
        >
          <Heading
            as="h5"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="700"
            color="gray.800"
            textAlign="center"
            mb={{ base: "4", md: "5" }}
            css={{
              background: 'linear-gradient(135deg, #6BC01F 0%, #5AA019 50%, #4F9017 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            3 Jahre später...
          </Heading>

          {/* Achievements list with Hero-style icons */}
          <VStack gap={{ base: "3", md: "4" }} align="stretch">
            {achievements.map((achievement, index) => (
              <HStack key={index} gap="3" align="flex-start">
                <Box
                  color="green.500"
                  mt="0.5"
                  flexShrink={0}
                  css={{
                    filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.3))'
                  }}
                >
                  <CheckCircle size={18} weight="fill" />
                </Box>
                <Text
                  fontSize={{ base: "sm", md: "md" }}
                  color="gray.600"
                  lineHeight="tall"
                  flex="1"
                >
                  {achievement}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* H6 - Mission statement with Hero glow effect */}
        <Box
          bg="rgba(255, 255, 255, 0.95)"
          backdropFilter="blur(20px) saturate(180%)"
          borderRadius="xl"
          border="2px solid"
          borderColor="green.200"
          p={{ base: "5", md: "6" }}
          position="relative"
          transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          boxShadow="0 4px 16px -2px rgba(34, 197, 94, 0.1), 0 6px 32px -4px rgba(34, 197, 94, 0.05)"
          css={{
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: '-3px',
              borderRadius: 'xl',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.15) 50%, rgba(21, 128, 61, 0.1) 100%)',
              filter: 'blur(6px)',
              zIndex: -1,
              animation: 'pulseGlow 4s ease-in-out infinite'
            },
            '@keyframes pulseGlow': {
              '0%, 100%': { 
                opacity: 0.7,
                transform: 'scale(1)'
              },
              '50%': { 
                opacity: 1,
                transform: 'scale(1.02)'
              }
            }
          }}
        >
          <Heading
            as="h6"
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="700"
            color="gray.800"
            textAlign="center"
            lineHeight="tall"
          >
            <Text 
              as="span"
              css={{
                background: 'linear-gradient(135deg, #6BC01F 0%, #5AA019 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 8px rgba(107, 192, 31, 0.3))'
              }}
            >
              UNSERE MISSION:
            </Text>{' '}
            anderen zeigen, wie sie strukturiert und professionell ihre eigene{' '}
            <Text as="span" color="#6BC01F" fontWeight="bold">Fitness-Transformation</Text>{' '}
            starten können!
          </Heading>
        </Box>

        {/* Social Media Links with Hero-style effects */}
        <HStack gap="4" mt={{ base: "4", md: "6" }} justify={{ base: "center", lg: "flex-start" }}>
          {/* Instagram Link with green theme */}
          <chakra.a
            href="https://instagram.com/pumpitclub"
            target="_blank"
            rel="noopener noreferrer"
            w="12"
            h="12"
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.9)"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray.600"
            transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            boxShadow="0 2px 8px -2px rgba(0, 0, 0, 0.1)"
            _hover={{
              bg: "rgba(228, 64, 95, 0.1)",
              borderColor: "#E4405F",
              color: "#E4405F",
              transform: "translateY(-2px) scale(1.05)",
              boxShadow: "0 4px 16px -4px rgba(228, 64, 95, 0.3), 0 0 20px -4px rgba(228, 64, 95, 0.2)",
            }}
          >
            <InstagramLogo size={24} weight="fill" />
          </chakra.a>

          {/* LinkedIn Link with green theme */}
          <chakra.a
            href="https://linkedin.com/in/pumpitclub"
            target="_blank"
            rel="noopener noreferrer"
            w="12"
            h="12"
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.9)"
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="gray.600"
            transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            boxShadow="0 2px 8px -2px rgba(0, 0, 0, 0.1)"
            _hover={{
              bg: "rgba(0, 119, 181, 0.1)",
              borderColor: "#0077B5",
              color: "#0077B5",
              transform: "translateY(-2px) scale(1.05)",
              boxShadow: "0 4px 16px -4px rgba(0, 119, 181, 0.3), 0 0 20px -4px rgba(0, 119, 181, 0.2)",
            }}
          >
            <LinkedinLogo size={24} weight="fill" />
          </chakra.a>
        </HStack>
      </VStack>
    </Box>
  );
};