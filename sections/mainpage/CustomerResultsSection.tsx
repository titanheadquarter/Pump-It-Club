"use client";

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Stack,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Badge,
  AspectRatio,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { Image } from "@/components/ui/image";
import NextImage from "next/image";
import { Star, Trophy, TrendUp, Users } from "@phosphor-icons/react";
import { HeroCard } from "@/components/ui/mainpage/hero-card";


interface CustomerResultProps {
  beforeImageSrc: string;
  afterImageSrc: string;
  customerName: string;
  timeframe: string;
  achievement: string;
  testimonial?: string;
  beforeAlt?: string;
  afterAlt?: string;
  imageOnLeft?: boolean;
}

const CustomerResult = ({
  beforeImageSrc,
  afterImageSrc,
  customerName,
  timeframe,
  achievement,
  testimonial,
  beforeAlt,
  afterAlt,
  imageOnLeft = true,
}: CustomerResultProps) => {
  const ImageSection = () => (
    <Box
      flex="1"
      position="relative"
      w="full"
      display="flex"
      alignItems="center"
    >
      {/* Glasmorph Container für Bilder */}
      <Box
        position="relative"
        w="full"
        p={{ base: "3", md: "4" }}
        bg="white"
        backdropFilter="blur(20px) saturate(180%)"
        borderRadius="l3"
        border="1px solid"
        borderColor="black"
        overflow="hidden"
 
      >
        <SimpleGrid
          columns={2}
          gap={{ base: "3", md: "4" }}
          w="full"
        >
          {/* BEFORE Image */}
          <VStack gap="2" align="stretch">
            <Text
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wider"
              color="fg.muted"
              textAlign="center"
            >
              VORHER
            </Text>
            <AspectRatio
              ratio={3/4}
              w="full"
              borderRadius="l2"
              overflow="hidden"
              bg="bg.subtle"
              border="1px solid"
              borderColor="black"
              transition="all 0.3s ease"
              position="relative"
              minH="200px"
              _hover={{
                transform: "scale(1.02)",
                borderColor: "border.emphasized/50",
              }}
            >
              <NextImage
                src={beforeImageSrc}
                alt={beforeAlt || `${customerName} - Vorher`}
                fill
                sizes="(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 30vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
            </AspectRatio>
          </VStack>

          {/* AFTER Image */}
          <VStack gap="2" align="stretch">
            <HStack justify="center" gap="1">
              <Text
                fontSize="xs"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
                color="success.solid"
                textAlign="center"
              >
                NACHHER
              </Text>
              <Trophy size={14} weight="fill" color="success.solid" />
            </HStack>
            <AspectRatio
              ratio={3/4}
              w="full"
              borderRadius="l2"
              overflow="hidden"
              bg="bg.subtle"
              border="1px solid"
              borderColor="black"
              transition="all 0.3s ease"
              position="relative"
              minH="200px"
              css={{
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: '-1px',
                  borderRadius: 'l2',
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)',
                  filter: 'blur(2px)',
                  zIndex: -1
                }
              }}
              _hover={{
                transform: "scale(1.02)",
                borderColor: "success.solid/60"
              }}
            >
              <NextImage
                src={afterImageSrc}
                alt={afterAlt || `${customerName} - Nachher`}
                fill
                sizes="(max-width: 768px) 45vw, (max-width: 1024px) 25vw, 30vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
            </AspectRatio>
          </VStack>
        </SimpleGrid>
      </Box>
    </Box>
  );

  const TextSection = () => (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      p={{ base: "3", md: "4", lg: "5" }}
    >
      <VStack gap={{ base: "2", md: "2.5" }} align="start" w="full">
        <VStack gap="2" align="start" w="full">
              <Heading
                as="h3"
                fontSize={{ base: "xl", md: "2xl", lg: "2.5xl" }}
                fontWeight="700"
                color="fg"
                lineHeight="shorter"
              >
            {customerName}
          </Heading>
          <HStack gap="3" align="center" flexWrap="wrap">
            <Badge
              bg="success.solid/10"
              color="success.solid"
              px={3}
              py={1}
              borderRadius="md"
              fontSize="sm"
              fontWeight="semibold"
            >
              {timeframe}
            </Badge>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="fg.muted"
              fontWeight="medium"
            >
              {achievement}
            </Text>
          </HStack>
        </VStack>

        {testimonial && (
          <Box
            borderLeft="4px solid"
            borderColor="success.solid"
            pl={{ base: "4", md: "6" }}
            py="2"
            bg="success.solid/5"
            borderRadius="md"
            w="full"
          >
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="fg"
              lineHeight="tall"
              fontStyle="italic"
            >
              "{testimonial}"
            </Text>
          </Box>
        )}

       
      </VStack>
    </Box>
  );

  return (
    <Box w="full" position="relative">
      <Stack
        direction={{ base: "column", lg: imageOnLeft ? "row" : "row-reverse" }}
        gap={{ base: "2.5", md: "3", lg: "4" }}
        align="stretch"
        w="full"
      >
        <ImageSection />
        <TextSection />
      </Stack>
    </Box>
  );
};

interface CustomerResultsSectionProps {
  customers?: Array<{
    beforeImageSrc: string;
    afterImageSrc: string;
    customerName: string;
    timeframe: string;
    achievement: string;
    testimonial?: string;
  }>;
}

export const CustomerResultsSection = ({ 
  customers = [
    {
      beforeImageSrc: "/landingpage/kevinvorher.webp",
      afterImageSrc: "/landingpage/kevinnachher.webp", 
      customerName: "Kevin W.",
      timeframe: "24 Monate",
      achievement: "+15kg Muskeln",
      testimonial: "Ich habe mich immer geschämt, weil ich so dünn war. Jetzt bin ich stolz auf meinen Körper und fühle mich viel sicherer. Ich hätte nie gedacht, dass ich so schnell solche Ergebnisse sehen würde. Das Coaching war genau das, was ich brauchte."
    },

  ]
}: CustomerResultsSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCard, setSelectedCard] = useState<'free' | 'consultation'>('consultation')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Section size="lg">
      <Box
        position="relative"
        overflow="hidden"
      >
        {/* Same container structure as Hero Section */}
        <Container 
          maxW="7xl" 
          py={{ base: 2, sm: 2, md: 2, lg: 2 }} 
          px={{ base: 4, sm: 6, md: 8 }}
          position="relative" 
          zIndex={1}
        >
          <VStack gap={{ base: 4, sm: 5, md: 6, lg: 8 }} align="stretch">
            {/* Header with Hero-style animations */}
            <VStack
              gap={{ base: 4, md: 6 }}
              textAlign="center"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
              transition="all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            >
             

              {/* H2 Main Heading - kleiner als Hero */}
              <Heading
                as="h2"
                fontSize={{ base: '1.5rem', sm: '1.8rem', md: '2.2rem', lg: '2.8rem', xl: '3.2rem' }}
                fontWeight="700"
                color="gray.800"
                lineHeight="1.1"
                textAlign="center"
                letterSpacing="tighter"
                maxW="5xl"
              >
                Echte{' '}
                <Text
                  as="span"
                  position="relative"
                  display="inline-block"
                  css={{
                    background: 'linear-gradient(135deg, #6BC01F 0%, #5AA019 50%, #4F9017 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: { base: '-3px', md: '-6px', lg: '-8px' },
                      left: 0,
                      right: 0,
                      height: { base: '3px', md: '4px', lg: '6px' },
                      background: 'linear-gradient(135deg, #6BC01F 0%, #5AA019 100%)',
                      borderRadius: '9999px',
                      transform: 'scaleX(0)',
                      animation: isLoaded ? 'scaleX 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s forwards' : undefined
                    },
                    '@keyframes scaleX': {
                      'to': { transform: 'scaleX(1)' }
                    }
                  }}
                >
                  Transformationen
                </Text>
                <br />
                unserer Kunden
              </Heading>

              {/* H3 Subheading */}
              <Heading
                as="h3"
                fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                color="gray.600"
                fontWeight="medium"
                maxW="3xl"
                lineHeight="tall"
              >
                Sieh selbst, was mit dem richtigen Coaching und{' '}
                <Text as="span" color="#6BC01F" fontWeight="bold">echter Unterstützung</Text>{' '}
                möglich ist
              </Heading>
            </VStack>

            

            {/* Customer Results - Alternating Layout */}
            <VStack
              gap={{ base: 4, md: 5, lg: 6 }}
              w="full"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(50px)'}
              transition="all 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s"
            >
              {customers.map((customer, index) => (
                <CustomerResult
                  key={index}
                  beforeImageSrc={customer.beforeImageSrc}
                  afterImageSrc={customer.afterImageSrc}
                  customerName={customer.customerName}
                  timeframe={customer.timeframe}
                  achievement={customer.achievement}
                  testimonial={customer.testimonial}
                  imageOnLeft={index % 2 === 0}
                />
              ))}
            </VStack>

            {/* Hero Cards */}
            <Box maxW="4xl" mx="auto" w="full" mt={{ base: 3, md: 4 }}>
              <Heading
                as="h3"
                fontSize={{ base: "md", md: "lg" }}
                color="gray.800"
                fontWeight="bold"
                textAlign="center"
                mb={{ base: 3, md: 4 }}
                opacity={isLoaded ? 1 : 0}
                transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
                transition="all 1.1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s"
              >
                Wähle deinen Transformationsweg
              </Heading>

              <SimpleGrid
                columns={{ base: 1, md: 1, lg: 2 }}
                gap={{ base: 3, md: 4 }}
                w="full"
                opacity={isLoaded ? 1 : 0}
                transform={isLoaded ? 'translateY(0)' : 'translateY(50px)'}
                transition="all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s"
                alignItems="start"
              >
                <Box h={{ base: "auto", lg: "420px" }}>
                  <HeroCard
                    title="FREE KURS"
                    description="Deine ersten Schritte zur Transformation - komplett kostenlos"
                    features={[
                      "5 Video-Lektionen mit Grundlagen",
                      "Einsteigerfreundlicher Trainingsplan",
                      "Ernährungstipps für den Start",
                      "Community-Zugang mit 1000+ Mitgliedern",
                      "Sofortiger Zugang nach Anmeldung"
                    ]}
                    buttonText="JETZT KOSTENLOS STARTEN"
                    selected={selectedCard === 'free'}
                    onSelect={() => setSelectedCard('free')}
                    h="full"
                  />
                </Box>

                <Box
                  h={{ base: "auto", lg: "420px" }}
                  position="relative"
                  css={{
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '20px',
                      bottom: '20px',
                      left: '-8px',
                      width: '4px',
                      background: 'linear-gradient(180deg, transparent 0%, #22c55e 20%, #16a34a 50%, #15803d 80%, transparent 100%)',
                      borderRadius: '2px',
                      animation: 'pulseGlow 3s ease-in-out infinite',
                      zIndex: 1
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '20px',
                      bottom: '20px',
                      right: '-8px',
                      width: '4px',
                      background: 'linear-gradient(180deg, transparent 0%, #22c55e 20%, #16a34a 50%, #15803d 80%, transparent 100%)',
                      borderRadius: '2px',
                      animation: 'pulseGlow 3s ease-in-out infinite 0.5s',
                      zIndex: 1
                    }
                  }}
                >
                  <HeroCard
                    title="1:1 BERATUNG"
                    description="Dein persönlicher Transformationsplan in nur 30 Minuten"
                    features={[
                      "Persönliche 30min Video-Beratung",
                      "Individueller Trainingsplan",
                      "Maßgeschneiderter Ernährungsplan",
                      "WhatsApp-Support für 7 Tage",
                      "Erfolgsgarantie oder Geld zurück"
                    ]}
                    buttonText="BERATUNG JETZT BUCHEN"
                    selected={selectedCard === 'consultation'}
                    recommended={false}
                    highlightGreen={true}
                    onSelect={() => setSelectedCard('consultation')}
                    h="full"
                  />
                </Box>
              </SimpleGrid>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Section>
  );
};
