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

        {/* Hero-style CTA Link */}
        <Link
          href={linkHref}
          display="inline-flex"
          alignItems="center"
          gap="2"
          mt="auto"
          px={4}
          py={2}
          bg="rgba(34, 197, 94, 0.1)"
          borderRadius="lg"
          border="1px solid"
          borderColor="black"
          color="green.600"
          fontSize="sm"
          fontWeight="600"
          transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          _hover={{
            bg: "rgba(34, 197, 94, 0.15)",
            borderColor: "rgba(34, 197, 94, 0.3)",
            color: "green.700",
            transform: "translateX(4px)"
          }}
        >
          {linkText}
          <ArrowRight size={16} weight="bold" />
        </Link>
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
      title: "App-Einsteiger ohne Vorkenntnisse",
      description: "Perfekt für alle, die gerade erst mit Fitness-Apps starten. Intuitive Bedienung, klare Anleitungen und Schritt-für-Schritt-Guides führen dich durch deine ersten Workouts und helfen dir, gesunde Gewohnheiten zu entwickeln.",
      linkText: "Ich bin Anfänger",
      linkHref: "#",
      featured: false,
    },
    {
      icon: <ChartLineUp size={32} weight="fill" />,
      title: "Fortgeschrittene Nutzer, die den nächsten Level erreichen wollen",
      description: "Du kennst dich bereits mit Fitness-Apps aus, suchst aber nach neuen Herausforderungen und erweiterten Funktionen? Nutze unsere fortgeschrittenen Trainingspläne, detaillierte Analytics und personalisierte Empfehlungen, um deine Ziele schneller zu erreichen.",
      linkText: "Ich bin fortgeschritten",
      linkHref: "#",
      featured: true,
    },
    {
      icon: <Trophy size={32} weight="fill" />,
      title: "Power-User, die alle Funktionen optimal nutzen möchten",
      description: "Du willst das Maximum aus der App herausholen? Erfahrene Nutzer profitieren von unseren Premium-Features wie individuellen Trainingsplänen, Live-Coaching, Community-Challenges und exklusiven Inhalten, die deine Fitness-Reise auf die nächste Stufe bringen.",
      linkText: "Ich bin Power-User",
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
                Unsere{' '}
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
                  Handyapp
                </Text>{' '}
                eignet sich besonders für...
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
                Erhalte als Coaching-Kunde{' '}
                <Text as="span" color="green.600" fontWeight="bold">exklusiven Zugang</Text>{' '}
                zu unserer Premium-App
              </Heading>
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