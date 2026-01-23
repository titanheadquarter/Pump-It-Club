"use client";

import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  AspectRatio,
  Grid,
  GridItem
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { VimeoPlayer } from "@/components/ui/mainpage/vimeo-player";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "@phosphor-icons/react";

interface PricingOption {
  title: string;
  description?: string;
  price?: string;
  features?: string[];
  buttonText?: string;
  recommended?: boolean;
  variant?: 'primary' | 'secondary';
}

interface HeroSectionProps {
  videoId?: string;
  heading?: string;
  subheading?: string;
  pricingOptions?: PricingOption[];
}

const SimpleCard = ({ option }: { option: PricingOption }) => (
  <Box
    bg="bg.panel/60"
    border="2px solid"
    borderColor="border.emphasized/30"
    borderRadius="xl"
    p={{ base: 4, md: 6 }}
    h="full"
    position="relative"
    transition="all 0.3s ease"
    boxShadow={option.recommended 
      ? "0 0 0 1px rgba(34, 197, 94, 0.2), 0 0 20px rgba(34, 197, 94, 0.15), 0 8px 25px -5px rgba(0, 0, 0, 0.1)"
      : "0 8px 25px -5px rgba(0, 0, 0, 0.1)"
    }
    _hover={{
      transform: "translateY(-2px)",
      borderColor: option.recommended ? "success.solid/40" : "border.emphasized/50",
      boxShadow: option.recommended 
        ? "0 0 0 1px rgba(34, 197, 94, 0.3), 0 0 25px rgba(34, 197, 94, 0.2), 0 12px 35px -5px rgba(0, 0, 0, 0.15)"
        : "0 8px 25px -5px rgba(0, 0, 0, 0.15)"
    }}
  >
    <VStack align="stretch" gap={{ base: 3, md: 4 }} h="full">
      {/* Header */}
      <VStack align="start" gap={2}>
        <Heading 
          as="h3" 
          size={{ base: "md", md: "lg" }}
          color="fg"
          fontWeight="700"
        >
          {option.title}
        </Heading>
        
        {option.price && (
          <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="fg">
            {option.price}
          </Text>
        )}
        
        {option.description && (
          <Text color="fg.muted" fontSize="sm" lineHeight="tall">
            {option.description}
          </Text>
        )}
      </VStack>

      {/* Features */}
      {option.features && option.features.length > 0 && (
        <VStack align="start" gap={2} flex="1">
          {option.features.map((feature, index) => (
            <HStack key={index} align="start" gap={2}>
              <CheckCircle 
                size={16} 
                weight="fill" 
                color="#6b7280"
              />
              <Text fontSize="sm" color="fg.muted" lineHeight="tall">
                {feature}
              </Text>
            </HStack>
          ))}
        </VStack>
      )}

      {/* Button */}
      <Button
        w="full"
        size={{ base: "md", md: "lg" }}
        bg={option.recommended ? "success.solid" : "bg.panel"}
        color={option.recommended ? "white" : "fg"}
        border="1px solid"
        borderColor={option.recommended ? "success.solid" : "border.emphasized"}
        _hover={{
          bg: option.recommended ? "success.solid" : "bg.panel",
          transform: "translateY(-1px)",
          boxShadow: option.recommended 
            ? "0 4px 12px -2px rgba(34, 197, 94, 0.3)"
            : "0 4px 12px -2px rgba(0, 0, 0, 0.1)"
        }}
        transition="all 0.3s ease"
      >
        {option.buttonText || `Zu ${option.title}`}
      </Button>
    </VStack>
  </Box>
);

export const HeroSection = ({
  videoId,
  heading = "Deine Transformation startet hier",
  subheading,
  pricingOptions = [
    {
      title: "Freekurs",
      description: "Starte kostenlos und erhalte sofortigen Zugang zu wertvollen Inhalten",
      features: [
        "Grundlagen-Training & Ernährungstipps",
        "Community-Zugang",
        "Erste Schritte zu deiner Transformation"
      ],
      buttonText: "Jetzt kostenlos starten",
      recommended: false,
      variant: 'secondary'
    },
    {
      title: "1zu1 Beratung",
      description: "Erhalte deinen maßgeschneiderten Plan in nur 30 Minuten",
      price: "47€",
      features: [
        "Persönliche Analyse deiner Situation",
        "Individueller Trainings- & Ernährungsplan",
        "Direkte Umsetzungshilfe"
      ],
      buttonText: "Beratung buchen",
      recommended: true,
      variant: 'primary'
    }
  ],
}: HeroSectionProps) => {
  return (
    <Section
      header
      size="lg"
      bg="bg.subtle"
      minH="100vh"
      display="flex"
      alignItems="center"
    >
      <Box maxW="900px" mx="auto" w="full">
        <VStack gap={{ base: 6, md: 8 }} w="full">
        
        {/* Header - Kompakter */}
        <VStack gap={3} textAlign="center" maxW="2xl" mx="auto">
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            fontWeight="700"
            lineHeight="shorter"
            color="fg"
          >
            {heading.includes("Deine Transformation") ? (
              <>
                Deine{" "}
                <Box 
                  as="span" 
                  color="success.solid" 
                  position="relative"
                  fontWeight="800"
                  css={{
                    textShadow: "0 0 15px rgba(34, 197, 94, 0.3)",
                    filter: "brightness(1.1)",
                  }}
                >
                  Transformation
                  {/* Simple green underline */}
                  <Box
                    position="absolute"
                    bottom="-2px"
                    left="0"
                    right="0"
                    h="3px"
                    bg="success.solid"
                    borderRadius="full"
                    opacity={0.8}
                  />
                </Box>
                {" "}startet hier
              </>
            ) : (
              heading
            )}
          </Heading>
          
          {subheading && (
            <Text
              color="fg.muted"
              fontSize={{ base: "sm", md: "md" }}
              maxW="xl"
              lineHeight="tall"
            >
              {subheading}
            </Text>
          )}
        </VStack>

        {/* Video + Cards Container mit Linien */}
        <Box w="full" position="relative" pt={{ base: 4, md: 6 }}>
          {/* Glasmorph Hintergrund - Innerhalb der Linien */}
          <Box
            position="absolute"
            top="0"
            left="calc((100% - 800px) / 2 - 60px)"
            right="calc((100% - 800px) / 2 - 60px)"
            bottom="11"
            bg="bg.panel/30"
            backdropFilter="blur(20px) saturate(180%)"
            borderRadius="l3"
            border="2px solid"
            borderColor="border.emphasized/30"
            zIndex={0}
            css={{
              "@media (max-width: 1000px)": {
                display: "none",
              },
            }}
            _before={{
              content: '""',
              position: "absolute",
              inset: "-20px",
              borderRadius: "l3",
              bg: "gray.500/20",
              filter: "blur(40px)",
              zIndex: -1,
            }}
          />

          {/* Rahmen-Linien: Von Mitte der Video-Seiten nach außen, dann nach unten */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            pointerEvents="none"
            zIndex={2}
            css={{
              "@media (max-width: 1000px)": {
                display: "none",
              },
            }}
          >
          
            
            {/* Linke Linie - Vertikaler Teil: nach unten */}
            
            


   
            
            
            
    
          </Box>

          {/* Video Section - Über dem Glasmorph */}
          <Box 
            w="full" 
            maxW="680px" 
            mx="auto" 
            position="relative"
            zIndex={3}
          >
            <AspectRatio 
              ratio={16/9}
              w="full"
              borderRadius="lg"
              overflow="visible"
              boxShadow="md"
            >
              <VimeoPlayer videoId={videoId} />
            </AspectRatio>
          </Box>

          {/* Cards Section - Über dem Glasmorph */}
          <Box 
            w="full" 
            maxW="700px" 
            mx="auto" 
            mt={{ base: 6, md: 8 }} 
            position="relative"
            zIndex={3}
          >
            <Grid
              templateColumns="1fr"
              gap={4}
              w="full"
              css={{
                "@media (min-width: 650px)": {
                  gridTemplateColumns: "1fr 1fr"
                }
              }}
            >
              {pricingOptions.map((option, index) => (
                <GridItem key={index}>
                  <SimpleCard option={option} />
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Box>

      </VStack>
      </Box>
    </Section>
  );
};