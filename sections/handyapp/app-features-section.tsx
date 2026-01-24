"use client";

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { FeatureBlock } from "@/components/ui/handyapp/feature-block";
import { 
 
  Barbell, 
  Target, 
  TrendUp,
  Clock,
  Users,
  CheckCircle,
  Sparkle
} from "@phosphor-icons/react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

const FeatureCard = ({ icon, title, description, highlight = false }: FeatureCardProps) => {
  return (
    <Box
      position="relative"
      bg="rgba(255, 255, 255, 0.9)"
      backdropFilter="blur(20px) saturate(180%)"
      borderRadius="xl"
      border="1px solid"
      p={{ base: "6", md: "8" }}
      h="full"
      display="flex"
      flexDirection="column"
      transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      boxShadow={
        highlight 
          ? "0 8px 32px -4px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.9) inset"
          : "0 4px 16px -2px rgba(0, 0, 0, 0.05), 0 6px 32px -4px rgba(0, 0, 0, 0.03), 0 0 0 0.5px rgba(255, 255, 255, 0.8) inset"
      }
      css={{
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: highlight ? '-3px' : '-1px',
          borderRadius: 'xl',
          background: 'transparent',
          filter: 'blur(6px)',
          zIndex: -1,
          opacity: 0,
        }
      }}
      _hover={{
        transform: "translateY(-8px) scale(1.02)",
        boxShadow: highlight
          ? "0 16px 48px -8px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.95) inset"
          : "0 8px 25px -4px rgba(0, 0, 0, 0.08), 0 12px 50px -8px rgba(0, 0, 0, 0.04)"
      }}
    >
      {/* Featured Badge */}
      {highlight && (
        <Badge
          position="absolute"
          top="-12px"
          right="20px"
          bg="linear-gradient(135deg, #22c55e 0%, #16a34a 100%)"
          color="white"
          px={3}
          py={1}
          borderRadius="full"
          fontSize="xs"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wider"
          boxShadow="0 4px 12px rgba(34, 197, 94, 0.4)"
        >
          TOP
        </Badge>
      )}

      <VStack gap={{ base: "4", md: "5" }} align="stretch" h="full">
        {/* Icon */}
        <Box
          w={{ base: "16", md: "18" }}
          h={{ base: "16", md: "18" }}
          bg="rgba(34, 197, 94, 0.1)"
          borderRadius="2xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="none"
          boxShadow="0 4px 12px rgba(0, 0, 0, 0.08)"
          mx="auto"
          transition="all 0.3s ease"
          css={{
            '&:hover': {
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)'
            }
          }}
        >
          <Box 
            color="green.500"
            css={{
              filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))'
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* Content */}
        <VStack gap={{ base: "3", md: "4" }} align="stretch" flex="1">
          <Heading
            as="h5"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="700"
            color="gray.800"
            textAlign="center"
            lineHeight="shorter"
          >
            {title}
          </Heading>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="gray.600"
            lineHeight="tall"
            textAlign="center"
            flex="1"
          >
            {description}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export const AppFeaturesSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const quickFeatures = [
    {
      icon: <Barbell size={32} weight="fill" />,
      title: "Smart Nutrition",
      description: "Barcode-Scan, Makro-Tracking und intelligente Mahlzeitvorschläge für optimale Ernährung.",
      highlight: false,
    },
    {
      icon: <Barbell size={32} weight="fill" />,
      title: "Personal Training",
      description: "Individuelle Trainingspläne, 500+ Übungen und Timer für maximale Effizienz.",
      highlight: true,
    },
    {
      icon: <TrendUp size={32} weight="fill" />,
      title: "Progress Analytics",
      description: "Detaillierte Statistiken und Fortschrittstracking für messbare Erfolge.",
      highlight: false,
    }
  ];

  const features = [
        {
          title: "Ernährung",
          subtitle: "FEATURES",
          description: "Deine Ernährung ist der Grundstein für deinen Traumkörper. Mit Pump It Club hast du alle Tools, die du brauchst, um deine Ernährung optimal zu gestalten und deine Ziele zu erreichen.",
          features: [
            {
              title: "Ernährungstagebuch",
              description: "Das Fundament für deinen Traumkörper. Erhalte einen Überblick über deine Ernährung für deinen persönlichen Erfolg und finde eine ausgewogene und zielorientierte Ernährung, die du täglich tracken kannst.",
            },
            {
              title: "Bequem und schnell tracken",
              description: "Tracke deine konsumierten Lebensmittel via Barcode-Scan und erstelle individuelle Mahlzeiten für eine einfache und schnelle Erfassung. Spare Zeit und bleibe fokussiert auf deine Ziele.",
            },
            {
              title: "Kalorienrechner",
              description: "Dein Kalorienbedarf ist der entscheidende Faktor für Gewichtszunahme, -abnahme oder -erhalt. Mit unserer optimierten Formel kannst du ihn einfach und präzise bestimmen.",
            },
            {
              title: "Makronährstoff-Tracking",
              description: "Verfolge nicht nur Kalorien, sondern auch deine Makronährstoffe (Proteine, Kohlenhydrate, Fette) für eine optimale Nährstoffverteilung.",
            },
          ],
          imageSrc: "/macher.webp",
          imageAlt: "Ernährung Features",
          imageOnLeft: false,
        },
        {
          title: "Training",
          subtitle: "FEATURES",
          description: "Erstelle individuelle Trainingspläne, die perfekt auf deine Ziele abgestimmt sind. Von Krafttraining bis Cardio - alles in einer App.",
          features: [
            {
              title: "Individuelle Trainingspläne",
              description: "Entwerfe deine Trainingspläne so, wie sie individuell für dich wichtig sind. Ohne Vorgaben oder Einschränkungen bei der Übungsauswahl, denn es geht um deinen Erfolg!",
            },
            {
              title: "Übungsbibliothek",
              description: "Über 500+ detaillierte Übungsanleitungen mit Videos und Beschreibungen. Lerne die richtige Ausführung für maximale Ergebnisse.",
            },
            {
              title: "Trainings-Timer",
              description: "Integrierter Timer für Pausenzeiten und Supersätze. Bleibe fokussiert und optimiere deine Trainingszeit.",
            },
          ],
          imageSrc: "/macher.webp",
          imageAlt: "Training Features",
          imageOnLeft: true,
        },
  ];

  const benefits = [
    "Millionen von Lebensmitteln in der Datenbank",
    "Offline-Modus für Training ohne Internet",
    "Synchronisation zwischen allen Geräten",
    "Wöchentliche Challenges und Belohnungen"
  ];

  return (
    <Section size="lg">
      <Box
        bg="white"
        position="relative"
        overflow="hidden"
        
      >
        <Container
          maxW="7xl"
          py={{ base: 16, sm: 20, md: 24, lg: 28 }}
          px={{ base: 4, sm: 6, md: 8 }}
          position="relative"
          zIndex={1}
        >
          <VStack gap={{ base: 12, sm: 16, md: 20, lg: 24 }} align="stretch">
            {/* Enhanced Header */}
            <VStack
              gap={{ base: 5, md: 7 }}
              textAlign="center"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
              transition="all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            >
            
              
              <Heading
                as="h2"
                fontSize={{ base: '2rem', sm: '2.5rem', md: '3.2rem', lg: '4rem', xl: '4.5rem' }}
                fontWeight="900"
                color="gray.800"
                lineHeight="1.1"
                textAlign="center"
                letterSpacing="tighter"
                maxW="6xl"
                mx="auto"
                css={{
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))'
                }}
              >
                Die{' '}
                <Text
                  as="span"
                  position="relative"
                  display="inline-block"
                  css={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 15px rgba(34, 197, 94, 0.5))',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: { base: '-4px', md: '-6px', lg: '-8px' },
                      left: 0,
                      right: 0,
                      height: { base: '3px', md: '4px', lg: '5px' },
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      borderRadius: '9999px',
                      transform: 'scaleX(0)',
                      boxShadow: '0 0 15px #22c55e, 0 0 30px rgba(34, 197, 94, 0.4)',
                      animation: isLoaded ? 'scaleX 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s forwards' : undefined
                    },
                    '@keyframes scaleX': {
                      'to': { transform: 'scaleX(1)' }
                    }
                  }}
                >
                  ultimative
                </Text>{' '}
                Fitness-App
                <br />für deinen Erfolg
              </Heading>

              <Heading
                as="h3"
                fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
                color="gray.600"
                fontWeight="medium"
                maxW="4xl"
                lineHeight="tall"
                mx="auto"
              >
                Entdecke eine neue Dimension des Fitness-Trackings mit Features, die{' '}
                <Text as="span" color="green.600" fontWeight="bold">
                  wirklich einen Unterschied machen
                </Text>
              </Heading>
            </VStack>

            {/* Quick Feature Cards */}
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={{ base: 6, md: 8 }}
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(40px)'}
              transition="all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s"
            >
              {quickFeatures.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  highlight={feature.highlight}
                />
              ))}
            </SimpleGrid>

            {/* Main Features Section */}
            <VStack
              gap={{ base: 12, sm: 16, md: 20 }}
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(50px)'}
              transition="all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s"
            >
              {features.map((feature, index) => (
                <VStack 
                  key={index}
                  gap={{ base: 6, md: 8 }}
                  w="full"
                  opacity={isLoaded ? 1 : 0}
                  transform={isLoaded ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)'}
                  transition={`all 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${1.2 + index * 0.3}s`}
                >
                  <VStack gap={{ base: 3, md: 4 }} textAlign="center">
                    <Heading
                      as="h4"
                      fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                      fontWeight="800"
                      css={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 12px rgba(34, 197, 94, 0.4))'
                      }}
                    >
                      {feature.title} {feature.subtitle}
                    </Heading>
                    
                    <Heading
                      as="h5"
                      fontSize={{ base: "md", md: "lg", lg: "xl" }}
                      color="gray.600"
                      fontWeight="medium"
                      maxW="4xl"
                      lineHeight="tall"
                    >
                      {feature.description}
                    </Heading>
                  </VStack>

                  <FeatureBlock
                    title={feature.title}
                    subtitle={feature.subtitle}
                    description={feature.description}
                    features={feature.features}
                    imageSrc={feature.imageSrc}
                    imageAlt={feature.imageAlt}
                    imageOnLeft={feature.imageOnLeft}
                  />
                </VStack>
              ))}
            </VStack>

           
          </VStack>
        </Container>
      </Box>
    </Section>
  );
};