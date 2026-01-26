"use client";

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Stack,
  VStack,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { FounderImage } from "@/components/ui/mainpage/founder-image";
import { FounderContent } from "@/components/ui/mainpage/founder-content";

interface MeetTheFounderSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  secondImageSrc?: string;
  secondImageAlt?: string;
  achievements?: string[];
  missionText?: string;
}

export const MeetTheFounderSection = ({
  imageSrc = "/landingpage/VorherNachher.webp",
  imageAlt = "Felix - Gründer von PumpItClub",
  secondImageSrc = "/landingpage/macher2.webp",
  secondImageAlt = "Felix - Gründer von PumpItClub",
  achievements,
  missionText,
}: MeetTheFounderSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Section size="lg">
      <Box
        position="relative"
        overflow="hidden"
        mt={{ base: "-1px", sm: "-2px", md: "-3px", lg: "-4px" }}
      >
        {/* Same container structure as Hero Section */}
        <Container 
          maxW="6xl" 
          py={{ base: 2, sm: 2, md: 2, lg: 2 }} 
          px={{ base: 4, sm: 6, md: 8 }}
          position="relative" 
          zIndex={1}
        >
          <VStack gap={{ base: 3, sm: 4, md: 5, lg: 6 }} align="stretch">
            {/* Header with Hero-style animations */}
            <VStack
              gap={{ base: 4, md: 5 }}
              textAlign="center"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
              transition="all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            >
              

              {/* H2 Heading - kleiner als Hero */}
              <Heading
                as="h2"
                fontSize={{ base: '1.5rem', sm: '1.8rem', md: '2.2rem', lg: '2.8rem', xl: '3.2rem' }}
                fontWeight="700"
                color="gray.800"
                lineHeight="1.1"
                textAlign="center"
                letterSpacing="tighter"
                maxW="4xl"
                position="relative"
              >
                Hi, Ich bin{' '}
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
                      animation: isLoaded ? 'scaleX 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s forwards' : undefined
                    },
                    '@keyframes scaleX': {
                      'to': { transform: 'scaleX(1)' }
                    }
                  }}
                >
                  Felix
                </Text>
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
                Dein persönlicher Fitness Coach für{' '}
                <Text as="span" color="green.600" fontWeight="bold">echte Transformationen</Text>
              </Heading>
            </VStack>

            {/* Content Grid with animations */}
            <Stack
              direction={{ base: "column", lg: "row" }}
              gap={{ base: 3, md: 4, lg: 5 }}
              align={{ base: "stretch", lg: "stretch" }}
              w="full"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(50px)'}
              transition="all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s"
            >
              <FounderImage 
                imageSrc={imageSrc} 
                imageAlt={imageAlt}
                secondImageSrc={secondImageSrc}
                secondImageAlt={secondImageAlt}
              />
              <FounderContent 
                achievements={achievements} 
                missionText={missionText} 
              />
            </Stack>
          </VStack>
        </Container>
      </Box>
    </Section>
  );
};