"use client";

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { StatisticCard } from "@/components/ui/handyapp/statistic-card";
import { Button } from "@/components/ui/button";
import { VimeoPlayer } from "@/components/ui/mainpage/vimeo-player";
import { ArrowRight, CheckCircle, Download, Play } from "@phosphor-icons/react";

export const AppHeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const statistics = [
    {
      value: "20,000+",
      label: "DOWNLOADS",
      startValue: 0,
      endValue: 20000,      // ✅ Fixed: Number instead of string
      suffix: "+",
    },
    {
      value: "100+",
      label: "AKTIVE COACHINGS",
      startValue: 0,
      endValue: 100,
      suffix: "+",
    },
    {
      value: "4.8 / 5",
      label: "BEWERTUNG",
      startValue: 0,
      endValue: 4.8,
      suffix: " / 5",
      decimals: 1,
    },
  ];

  const features = [
    "Ernährungstagebuch mit Millionen Lebensmitteln",
    "Individuelle Trainingspläne erstellen", 
    "Progressives Trainingstagebuch",
    "Kalorienrechner mit präziser Formel",
    "Barcode-Scan für schnelles Tracking",
    "Community mit über 20.000 Mitgliedern"
  ];

  return (
    <>
      <Box
        minH="100vh"
        // Enhanced gradient with better color transitions
        bg="linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 25%, #2d3e2d 50%, #4a6741 70%, #e8f5e8 90%, #ffffff 100%)"
        position="relative"
        overflow="hidden"
        pb="0"
        mb={{ base: "-1px", sm: "-2px", md: "-3px", lg: "-4px" }}
        css={{
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.08) 0%, transparent 50%)',
            opacity: 0.7
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="rgba(255,255,255,0.02)"%3E%3Ccircle cx="20" cy="20" r="1"/%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          },
          '@keyframes pulseGlow': {
            '0%, 100%': { 
              boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)',
              transform: 'scale(1)'
            },
            '50%': { 
              boxShadow: '0 6px 30px rgba(34, 197, 94, 0.6)',
              transform: 'scale(1.02)'
            }
          },
          '@keyframes scaleX': {
            'to': { transform: 'scaleX(1)' }
          }
        }}
      >
        <Container
          maxW="7xl"
          py={{ base: 20, sm: 24, md: 28, lg: 32 }}
          pb={{ base: 12, sm: 20, md: 24, lg: 24 }}
          px={{ base: 4, sm: 6, md: 8 }}
          position="relative"
          zIndex={1}
        >
          <VStack gap={{ base: 6, sm: 8, md: 10, lg: 12 }} align="stretch">
            {/* Enhanced Header with Badge */}
            <VStack
              gap={{ base: 3, md: 4 }}
              textAlign="center"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
              transition="all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            >
             
            </VStack>

            {/* Desktop & Mobile Layout */}
            <Stack
              direction={{ base: "column", lg: "row" }}
              gap={{ base: 8, sm: 10, md: 12, lg: 16 }}
              align={{ base: "stretch", lg: "center" }}
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(40px)'}
              transition="all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s"
            >
              {/* Enhanced Video Section */}
              <Box
                flex={{ base: "1", lg: "1.2" }}
                w="full"
                maxW={{ base: "full", sm: "xl", md: "2xl", lg: "none" }}
                mx={{ base: "auto", lg: 0 }}
                position="relative"
              >
                {/* Video Wrapper with Glow */}
                <Box
                  position="relative"
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="0 20px 60px -12px rgba(0, 0, 0, 0.25), 0 8px 30px -6px rgba(0, 0, 0, 0.1)"
                  transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                  _hover={{
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 25px 80px -12px rgba(0, 0, 0, 0.3), 0 12px 40px -6px rgba(0, 0, 0, 0.15), 0 0 40px -8px rgba(34, 197, 94, 0.2)"
                  }}
                  css={{
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-2px',
                      borderRadius: '2xl',
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)',
                      filter: 'blur(6px)',
                      zIndex: -1,
                      opacity: 0.6
                    }
                  }}
                >
                  <VimeoPlayer videoId="123456789" />
                </Box>
              </Box>

              {/* Enhanced Content Section */}
              <Box
                flex={{ base: "1", lg: "1" }}
                w="full"
              >
                <VStack gap={{ base: 5, sm: 6, md: 7 }} align={{ base: "center", lg: "start" }} textAlign={{ base: "center", lg: "left" }}>
                  {/* H1 Main Heading */}
                  <Heading
                    as="h1"
                    fontSize={{ base: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem', xl: '4rem' }}
                    fontWeight="900"
                    color="white"
                    lineHeight="1.1"
                    letterSpacing="tighter"
                    maxW="5xl"
                    css={{
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(34, 197, 94, 0.2)'
                    }}
                  >
                    Alles was du für deinen{' '}
                    <Text
                      as="span"
                      position="relative"
                      display="inline-block"
                      css={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.5))',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: { base: '-3px', md: '-4px', lg: '-6px' },
                          left: 0,
                          right: 0,
                          height: { base: '2px', md: '3px', lg: '4px' },
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          borderRadius: '9999px',
                          transform: 'scaleX(0)',
                          boxShadow: '0 0 10px #22c55e',
                          animation: isLoaded ? 'scaleX 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.2s forwards' : undefined
                        }
                      }}
                    >
                      Traumkörper
                    </Text>
                    {' '}benötigst,{' '}
                    <Text as="span" color="green.300">
                      übersichtlich in einer App!
                    </Text>
                  </Heading>

                  {/* H2 Description */}
                  <Heading
                    as="h2"
                    fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                    color="gray.200"
                    lineHeight="tall"
                    maxW="2xl"
                    fontWeight="medium"
                    opacity={0.9}
                  >
                    Mit Pump It Club hast du deine Ernährung, dein Training und deinen Fortschritt immer im Blick.{' '}
                    <Text as="span" color="green.300" fontWeight="semibold">
                      Erreiche deine Ziele schneller und effizienter
                    </Text>{' '}
                    mit der App, die alles vereint.
                  </Heading>

                  {/* H3 Features Section */}
                  <VStack gap={{ base: 3, md: 4 }} align="stretch" w="full">
                    <Heading
                      as="h3"
                      fontSize={{ base: 'sm', md: 'md' }}
                      color="green.300"
                      fontWeight="semibold"
                      textTransform="uppercase"
                      letterSpacing="wide"
                      opacity={0.9}
                    >
                      Top Features:
                    </Heading>
                    
                    <VStack gap={{ base: 2, md: 3 }} align={{ base: "center", lg: "start" }} w="full">
                      {features.slice(0, 3).map((feature, index) => (
                        <HStack key={index} gap={3} align="start" w="full" justify={{ base: "center", lg: "start" }}>
                          <Box 
                            color="green.400" 
                            mt={0.5} 
                            flexShrink={0}
                            css={{
                              filter: 'drop-shadow(0 0 6px rgba(34, 197, 94, 0.4))'
                            }}
                          >
                            <CheckCircle size={20} weight="fill" />
                          </Box>
                          <Text
                            fontSize={{ base: "sm", sm: "md", md: "lg" }}
                            color="gray.200"
                            lineHeight="tall"
                            fontWeight="medium"
                          >
                            {feature}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>

                  {/* Enhanced CTA Buttons */}
                  <HStack 
                    gap={{ base: 3, md: 4 }} 
                    justify={{ base: "center", lg: "start" }} 
                    flexWrap="wrap" 
                    w="full"
                    pt={{ base: 2, md: 4 }}
                  >
                    {/* Primary CTA */}
                    <Button
                      size={{ base: "md", sm: "lg", md: "xl" }}
                      px={{ base: 6, md: 8 }}
                      py={{ base: 3, md: 4 }}
                      
                      transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                      css={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        boxShadow: '0 8px 25px -4px rgba(34, 197, 94, 0.4), 0 0 20px -4px rgba(34, 197, 94, 0.2)',
                        _hover: {
                          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                          transform: 'translateY(-3px) scale(1.02)',
                          boxShadow: '0 12px 35px -4px rgba(34, 197, 94, 0.5), 0 0 30px -4px rgba(34, 197, 94, 0.3)',
                        },
                        _active: {
                          transform: 'translateY(-1px) scale(1.01)',
                        }
                      }}
                    >
                      Jetzt herunterladen
                    </Button>

                    {/* Secondary CTA */}
                    <Button
                      size={{ base: "md", sm: "lg", md: "xl" }}
                      px={{ base: 6, md: 8 }}
                      py={{ base: 3, md: 4 }}
                      
                      transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                      css={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        boxShadow: '0 8px 25px -4px rgba(34, 197, 94, 0.4), 0 0 20px -4px rgba(34, 197, 94, 0.2)',
                        _hover: {
                          background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                          transform: 'translateY(-3px) scale(1.02)',
                          boxShadow: '0 12px 35px -4px rgba(34, 197, 94, 0.5), 0 0 30px -4px rgba(34, 197, 94, 0.3)',
                        },
                        _active: {
                          transform: 'translateY(-1px) scale(1.01)',
                        }
                      }}
                    >
                      Zum Kurs
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </Container>
      </Box>

      {/* Enhanced Statistics Section */}
      <Box
        position="relative"
        overflow="hidden"
        bg="white"
        css={{
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 0%, rgba(34, 197, 94, 0.04) 0%, transparent 50%)',
          }
        }}
      >
        <Container
          maxW="7xl"
          py={{ base: 6, sm: 8, md: 10 }}
          px={{ base: 4, sm: 6, md: 8 }}
          position="relative"
          zIndex={1}
        >
          <VStack gap={{ base: 4, md: 6 }}>
            {/* H4 Statistics Header */}
            <Heading
              as="h4"
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.700"
              fontWeight="semibold"
              textAlign="center"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(20px)'}
              transition="all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s"
            >
              Vertraue auf{' '}
              <Text as="span" color="green.600" fontWeight="bold">
                bewährte Ergebnisse
              </Text>
            </Heading>

            <SimpleGrid
              columns={{ base: 1, sm: 3 }}
              gap={{ base: 4, md: 6 }}
              w="full"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
              transition="all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s"
            >
              {statistics.map((stat, index) => (
                <StatisticCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  startValue={stat.startValue}
                  endValue={stat.endValue}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </>
  );
};