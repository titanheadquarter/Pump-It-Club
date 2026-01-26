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
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { Link } from "@/components/ui/link";
import {
  GraduationCap,
  ChartLineUp,
  Trophy,
  ArrowRight,
  DeviceMobile,
  Star,
  ListBullets,
  Users,
} from "@phosphor-icons/react";

interface StatisticCardProps {
  value: string;
  label: string;
}

const StatisticCard = ({ value, label }: StatisticCardProps) => {
  return (
    <Box
      bg="rgba(255, 255, 255, 0.9)"
      backdropFilter="blur(20px) saturate(180%)"
      borderRadius="xl"
      border="1px solid"
      borderColor="black"
      p={{ base: "3", md: "4" }}
      position="relative"
      transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      overflow="hidden"
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
        transform: "translateY(-4px) scale(1.02)",
        borderColor: "rgba(34, 197, 94, 0.3)"
      }}
    >
      <VStack gap={{ base: "2", md: "3" }} align="center">
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="900"
          lineHeight="1"
          css={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {value}
        </Text>
        <Text
          fontSize={{ base: "xs", sm: "sm" }}
          color="gray.600"
          textTransform="uppercase"
          textAlign="center"
          letterSpacing="wider"
          lineHeight="tall"
          fontWeight="medium"
        >
          {label}
        </Text>
      </VStack>
    </Box>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref?: string;
  featured?: boolean;
}

const FeatureCard = ({
  icon,
  title,
  description,
  linkText,
  linkHref = "#",
  featured = false
}: FeatureCardProps) => {
  return (
    <Box
      position="relative"
      bg="rgba(255, 255, 255, 0.95)"
      backdropFilter="blur(20px) saturate(180%)"
      borderRadius="xl"
      border="1px solid"
      borderColor={featured ? "black" : "black"}
      p={{ base: "4", md: "5" }}
      h="full"
      display="flex"
      flexDirection="column"
      transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      overflow="hidden"
      css={{
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: featured ? '-3px' : '-1px',
          borderRadius: 'xl',
          background: featured
            ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.15) 50%, rgba(21, 128, 61, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)',
          filter: 'blur(6px)',
          zIndex: -1,
          opacity: featured ? 1 : 0.6,
          animation: featured ? 'pulseGlow 4s ease-in-out infinite' : undefined
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
      _hover={{
        transform: "translateY(-6px)",
        borderColor: featured ? "green.300" : "rgba(34, 197, 94, 0.3)"
      }}
    >
      {/* Featured badge */}


      <VStack gap={{ base: "4", md: "5" }} align="flex-start" flex="1">
        {/* Icon Box with Hero-style glow */}
        <Box
          w={{ base: "14", md: "16" }}
          h={{ base: "14", md: "16" }}
          bg="rgba(34, 197, 94, 0.1)"
          borderRadius="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="1px solid"
          borderColor="black"
          transition="all 0.3s ease"
          _groupHover={{
            borderColor: "rgba(34, 197, 94, 0.4)"
          }}
        >
          <Box
            color="green.500"
          >
            {icon}
          </Box>
        </Box>

        {/* Title as H4/H5/H6 depending on hierarchy */}
        <Heading
          as="h4"
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="700"
          color="gray.800"
          lineHeight="shorter"
        >
          {title}
        </Heading>

        {/* Description */}
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="gray.600"
          lineHeight="tall"
          flex="1"
        >
          {description}
        </Text>

       
      </VStack>
    </Box>
  );
};

export const HandyappSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const statistics = [
    {
      value: "50k+",
      label: "Downloads",
    },
    {
      value: "4.8★",
      label: "App Store Rating",
    },
    {
      value: "100+",
      label: "Features",
    },
    {
      value: "25k+",
      label: "Aktive Nutzer",
    },
  ];

  const features = [
    {
      icon: <GraduationCap size={32} weight="fill" />,
      title: "Einsteiger-Coaching für deinen ersten Schritt",
      description: "Du bist neu im Fitness-Bereich oder warst lange nicht mehr aktiv? Unser Einsteiger-Coaching führt dich Schritt für Schritt an deine Ziele heran. Mit individuellen Trainingsplänen, Ernährungsberatung und persönlicher Betreuung legst du das perfekte Fundament für deinen langfristigen Erfolg.",
      linkText: "Ich bin Anfänger",
      linkHref: "#",
      featured: false,
    },
    {
      icon: <ChartLineUp size={32} weight="fill" />,
      title: "Premium Personal Coaching für maximale Ergebnisse",
      description: "Du willst ernsthafte Fortschritte und brauchst professionelle Unterstützung? Unser Premium Coaching bietet dir 1:1 Betreuung, wöchentliche Check-ins, angepasste Trainings- und Ernährungspläne sowie direkten Zugang zu deinem Personal Coach. Erreiche deine Ziele schneller und nachhaltiger als je zuvor.",
      linkText: "Ich will Premium Coaching",
      linkHref: "#",
      featured: false,
    },
    {
      icon: <Trophy size={32} weight="fill" />,
      title: "Exklusive Fitness-App für Coaching-Kunden",
      description: "Als Coaching-Kunde erhältst du exklusiven Zugang zu unserer Fitness-App. Tracke deine Fortschritte, erhalte personalisierte Trainingspläne, nutze das Ernährungstagebuch und bleibe in direktem Kontakt mit deinem Coach. Die perfekte Ergänzung zu deiner persönlichen Betreuung.",
      linkText: "Mehr zur App erfahren",
      linkHref: "#",
      featured: false,
    },
  ];

  return (
    <Section size="lg">
      <Box
        position="relative"
        overflow="hidden"
      >
        {/* Same container structure as Hero Section */}
        <Container
          maxW="6xl"
          py={{ base: 2, sm: 2, md: 2, lg: 2 }}
          px={{ base: 4, sm: 6, md: 8 }}
          position="relative"
          zIndex={1}
        >
          <VStack gap={{ base: 4, sm: 5, md: 6, lg: 8 }} w="full">
            {/* Header with Hero-style animations */}
            <VStack
              gap={{ base: 3, md: 4 }}
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
                maxW="4xl"
              >
                Meine{' '}
                <Text
                  as="span"
                  position="relative"
                  display="inline-block"
                  css={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: { base: '-2px', md: '-4px', lg: '-6px' },
                      left: 0,
                      right: 0,
                      height: { base: '2px', md: '3px', lg: '4px' },
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      borderRadius: '9999px',
                      transform: 'scaleX(0)',
                      animation: isLoaded ? 'scaleX 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s forwards' : undefined
                    },
                    '@keyframes scaleX': {
                      'to': { transform: 'scaleX(1)' }
                    }
                  }}
                >
                  Beratung
                </Text>{' '}
                deckt alle Bereiche ab, ohne verzicht auf Qualität
              </Heading>

              {/* H3 Subheading */}
              <Heading
                as="h3"
                fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                color="gray.600"
                fontWeight="medium"
                maxW="2xl"
                lineHeight="tall"
              >
                Fang endlich an{' '}
                <Text as="span" color="green.600" fontWeight="bold">DEINE ZIELE</Text>{' '}
                zu erreichen              </Heading>
            </VStack>

            {/* Statistics Section with staggered animation */}
            <SimpleGrid
              columns={{ base: 2, md: 4 }}
              gap={{ base: 2, md: 3 }}
              w="full"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(40px)'}
              transition="all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s"
            >
              {statistics.map((stat, index) => (
                <StatisticCard
                  key={index}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </SimpleGrid>

            {/* Feature Cards with animations */}
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap={{ base: 3, md: 4 }}
              w="full"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(50px)'}
              transition="all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s"
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  linkText={feature.linkText}
                  linkHref={feature.linkHref}
                  featured={feature.featured}
                />
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </Section>
  );
};