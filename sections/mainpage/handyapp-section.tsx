"use client";

import {
  Box,
  Stack,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
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
      bg="bg.panel"
      borderRadius="l2"
      p={{ base: "5", md: "6" }}
      border="1px solid"
      borderColor="border.emphasized"
      boxShadow="0 1px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)"
      transition="all 0.2s ease"
      _hover={{
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transform: "translateY(-2px)",
      }}
    >
      <VStack gap="2" align="center">
        <Text
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="700"
          color="primary.solid"
          lineHeight="1"
        >
          {value}
        </Text>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="fg.muted"
          textTransform="uppercase"
          textAlign="center"
          letterSpacing="0.05em"
          lineHeight="tall"
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
}

const FeatureCard = ({ icon, title, description, linkText, linkHref = "#" }: FeatureCardProps) => {
  return (
    <Box
      bg="bg.panel"
      borderRadius="l2"
      p={{ base: "5", md: "6" }}
      border="1px solid"
      borderColor="border.emphasized"
      boxShadow="0 1px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)"
      transition="all 0.2s ease"
      _hover={{
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transform: "translateY(-2px)",
      }}
      h="full"
      display="flex"
      flexDirection="column"
    >
      <VStack gap={{ base: "4", md: "5" }} align="flex-start" flex="1">
        {/* Icon Box */}
        <Box
          w={{ base: "12", md: "14" }}
          h={{ base: "12", md: "14" }}
          bg="primary.solid/10"
          borderRadius="l2"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 1px 2px -1px rgba(0, 0, 0, 0.1)"
        >
          <Box color="primary.solid">
            {icon}
          </Box>
        </Box>

        {/* Title */}
        <Heading
          as="h3"
          size="lg"
          fontWeight="700"
          color="fg"
        >
          {title}
        </Heading>

        {/* Description */}
        <Text
          fontSize="sm"
          color="fg.muted"
          lineHeight="tall"
          flex="1"
        >
          {description}
        </Text>

        {/* Call-to-Action Link */}
        <Link
          href={linkHref}
          color="primary.solid"
          fontWeight="600"
          fontSize="sm"
          display="flex"
          alignItems="center"
          gap="1"
          mt="auto"
          _hover={{
            color: "primary.solid",
            gap: "2",
          }}
          transition="gap 0.2s ease"
        >
          {linkText}
          <ArrowRight size={16} weight="bold" />
        </Link>
      </VStack>
    </Box>
  );
};

export const HandyappSection = () => {
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
      icon: <GraduationCap size={28} weight="fill" />,
      title: "App-Einsteiger ohne Vorkenntnisse",
      description: "Perfekt für alle, die gerade erst mit Fitness-Apps starten. Intuitive Bedienung, klare Anleitungen und Schritt-für-Schritt-Guides führen dich durch deine ersten Workouts und helfen dir, gesunde Gewohnheiten zu entwickeln.",
      linkText: "Ich bin Anfänger",
      linkHref: "#",
    },
    {
      icon: <ChartLineUp size={28} weight="fill" />,
      title: "Fortgeschrittene Nutzer, die den nächsten Level erreichen wollen",
      description: "Du kennst dich bereits mit Fitness-Apps aus, suchst aber nach neuen Herausforderungen und erweiterten Funktionen? Nutze unsere fortgeschrittenen Trainingspläne, detaillierte Analytics und personalisierte Empfehlungen, um deine Ziele schneller zu erreichen.",
      linkText: "Ich bin fortgeschritten",
      linkHref: "#",
    },
    {
      icon: <Trophy size={28} weight="fill" />,
      title: "Power-User, die alle Funktionen optimal nutzen möchten",
      description: "Du willst das Maximum aus der App herausholen? Erfahrene Nutzer profitieren von unseren Premium-Features wie individuellen Trainingsplänen, Live-Coaching, Community-Challenges und exklusiven Inhalten, die deine Fitness-Reise auf die nächste Stufe bringen.",
      linkText: "Ich bin Power-User",
      linkHref: "#",
    },
  ];

  return (
    <Section size="lg" bg="bg.subtle">
      <Box maxW="1100px" mx="auto" w="full">
        <VStack gap={{ base: "12", md: "16" }} w="full">
        {/* Statistics Section */}
        <SimpleGrid
          columns={{ base: 2, md: 4 }}
          gap={{ base: "4", md: "6" }}
          w="full"
        >
          {statistics.map((stat, index) => (
            <StatisticCard key={index} value={stat.value} label={stat.label} />
          ))}
        </SimpleGrid>

        {/* Features Section */}
        <VStack gap={{ base: "8", md: "12" }} w="full" align="stretch">
          {/* Main Heading */}
          <Heading
            as="h2"
            size={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="700"
            color="fg"
            textAlign="center"
            lineHeight="shorter"
          >
            Unsere Handyapp eignet sich besonders für ...
          </Heading>

          {/* Feature Cards */}
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={{ base: "6", md: "8" }}
            w="full"
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                linkText={feature.linkText}
                linkHref={feature.linkHref}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
      </Box>
    </Section>
  );
};
