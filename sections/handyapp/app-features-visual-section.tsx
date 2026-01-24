"use client";

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { AppMockup } from "@/components/ui/handyapp/app-mockup";
import { Sparkle, TrendUp } from "@phosphor-icons/react";

export const AppFeaturesVisualSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Section size="lg">
      <Box
        bg="white"
        position="relative"
        overflow="hidden"
        css={{
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.04) 0%, transparent 50%)',
            opacity: 0.6
          }
        }}
      >
        {/* COMPACT RESPONSIVE BREAKPOINTS */}
        <Container
          maxW="6xl"
          py={{ base: 8, sm: 12, md: 16, lg: 20 }}
          px={{ base: 4, sm: 6, md: 8 }}
          position="relative"
          zIndex={1}
        >
          <VStack gap={{ base: 6, sm: 8, md: 10, lg: 12 }} align="stretch">
            {/* Simplified Header */}
            <VStack
              gap={{ base: 3, md: 4 }}
              textAlign="center"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
              transition="all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            >
              {/* Simple Badge */}
              <Badge
                bg="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
                color="white"
                px={{ base: 3, sm: 4 }}
                py={2}
                borderRadius="full"
                fontSize={{ base: "xs", sm: "sm" }}
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
                boxShadow="0 4px 20px rgba(34, 197, 94, 0.4)"
              >
                📱 APP IM DETAIL
              </Badge>

              {/* H2 - Proper Responsive Sizes */}
              <Heading
                as="h2"
                fontSize={{ base: '1.6rem', sm: '2rem', md: '2.4rem', lg: '3rem', xl: '3.5rem' }}
                fontWeight="900"
                color="gray.800"
                lineHeight="1.1"
                textAlign="center"
                letterSpacing="tighter"
                maxW="4xl"
                mx="auto"
              >
                Sieh selbst, was{' '}
                <Text
                  as="span"
                  css={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.3))'
                  }}
                >
                  möglich ist
                </Text>
              </Heading>

              {/* H3 - Proper Responsive Sizes */}
              <Heading
                as="h3"
                fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                color="gray.600"
                fontWeight="medium"
                maxW="2xl"
                lineHeight="tall"
                mx="auto"
              >
                Erlebe die Power unserer App mit{' '}
                <Text as="span" color="green.600" fontWeight="bold">
                  intelligenten Features
                </Text>{' '}
                für maximale Effizienz
              </Heading>
            </VStack>

            {/* Clean Feature Showcase */}
            <Stack
              direction={{ base: "column", lg: "row" }}
              gap={{ base: 6, sm: 8, md: 10, lg: 12 }}
              align={{ base: "stretch", lg: "center" }}
              w="full"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(40px)'}
              transition="all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s"
            >
              {/* Left Text Block - Simplified */}
              <Box
                flex="1"
                w="full"
              >
                <Box
                  p={{ base: 4, sm: 5, md: 6 }}
                  bg="rgba(255, 255, 255, 0.9)"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="rgba(34, 197, 94, 0.15)"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)"
                  }}
                >
                  <VStack gap={{ base: 3, md: 4 }} align="stretch">
                    {/* Simple Icon */}
                    <HStack gap={2} justify={{ base: "center", lg: "start" }}>
                      <Box
                        p={2}
                        bg="rgba(34, 197, 94, 0.1)"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="rgba(34, 197, 94, 0.2)"
                      >
                        <Sparkle size={20} weight="fill" color="#22c55e" />
                      </Box>
                      <Badge
                        bg="green.100"
                        color="green.700"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        SMART DATABASE
                      </Badge>
                    </HStack>

                    {/* H4 - Proper Responsive */}
                    <Heading
                      as="h4"
                      fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                      fontWeight="700"
                      color="gray.800"
                      lineHeight="shorter"
                      textAlign={{ base: "center", lg: "left" }}
                      css={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Lebensmitteldatenbank
                    </Heading>

                    {/* H5 - Simple Description */}
                    <Text
                      fontSize={{ base: "sm", sm: "md" }}
                      color="gray.600"
                      lineHeight="tall"
                      textAlign={{ base: "center", lg: "left" }}
                    >
                      Millionen geprüfte Lebensmittel aus dem US-Amerikanischen- und dem DACH-Raum für{' '}
                      <Text as="span" color="green.600" fontWeight="bold">
                        perfektes Tracking deiner Ernährung
                      </Text>{' '}
                      auf dem Weg zu deiner Traumfigur.
                    </Text>
                  </VStack>
                </Box>
              </Box>

              {/* App Mockup - Clean & Simple */}
              <Box
                flex="0 0 auto"
                w="full"
                maxW={{ base: "200px", sm: "250px", md: "300px", lg: "350px" }}
                mx="auto"
                opacity={isLoaded ? 1 : 0}
                transform={isLoaded ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)'}
                transition="all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s"
              >
                <AppMockup
                  imageSrc="/macher.webp"
                  imageAlt="Pump It Club App"
                  aspectRatio={9 / 16}
                />
              </Box>

              {/* Right Text Block - Simplified */}
              <Box
                flex="1"
                w="full"
              >
                <Box
                  p={{ base: 4, sm: 5, md: 6 }}
                  bg="rgba(255, 255, 255, 0.9)"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="rgba(34, 197, 94, 0.15)"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.05)"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)"
                  }}
                >
                  <VStack gap={{ base: 3, md: 4 }} align="stretch">
                    {/* Simple Icon */}
                    <HStack gap={2} justify={{ base: "center", lg: "end" }} flexDirection={{ base: "row", lg: "row-reverse" }}>
                      <Box
                        p={2}
                        bg="rgba(34, 197, 94, 0.1)"
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="rgba(34, 197, 94, 0.2)"
                      >
                        <TrendUp size={20} weight="fill" color="#22c55e" />
                      </Box>
                      <Badge
                        bg="green.100"
                        color="green.700"
                        px={2}
                        py={1}
                        borderRadius="md"
                        fontSize="xs"
                        fontWeight="semibold"
                      >
                        PROGRESS TRACKING
                      </Badge>
                    </HStack>

                    {/* H4 - Proper Responsive */}
                    <Heading
                      as="h4"
                      fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                      fontWeight="700"
                      color="gray.800"
                      lineHeight="shorter"
                      textAlign={{ base: "center", lg: "right" }}
                      css={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      Progressives Trainings Tagebuch
                    </Heading>

                    {/* Simple Description */}
                    <Text
                      fontSize={{ base: "sm", sm: "md" }}
                      color="gray.600"
                      lineHeight="tall"
                      textAlign={{ base: "center", lg: "right" }}
                    >
                      Für unaufhaltsames Wachstum vergleicht das Progressive Trainings-Tagebuch deine letzte mit der aktuellen Einheit und liefert dir{' '}
                      <Text as="span" color="green.600" fontWeight="bold">
                        direktes Feedback zu deiner Performancesteigerung
                      </Text>.
                    </Text>
                  </VStack>
                </Box>
              </Box>
            </Stack>

            
          </VStack>
        </Container>
      </Box>
    </Section>
  );
};