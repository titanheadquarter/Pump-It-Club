"use client";

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { DownloadButton } from "@/components/ui/handyapp/download-button";

export const AppDownloadSection = () => {
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
      >
        <Container
          maxW="6xl"
          py={{ base: 3, sm: 4, md: 5, lg: 6 }}
          px={{ base: 4, sm: 6, md: 8 }}
          position="relative"
          zIndex={1}
        >
          <VStack gap={{ base: 4, md: 5 }} align="center">
            {/* Section Header */}
            <VStack
              gap={{ base: 3, md: 4 }}
              textAlign="center"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
              transition="all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            >
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
                Pump It Club jetzt herunterladen
              </Heading>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.600"
                lineHeight="tall"
                maxW="2xl"
              >
                Starte noch heute deine Transformation. Die App ist kostenlos verfügbar und bietet dir alle Tools, die du für deinen Erfolg brauchst.
              </Text>
            </VStack>

            {/* Download Buttons */}
            <HStack
              gap={{ base: 4, md: 6 }}
              flexWrap="wrap"
              justify="center"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(50px)'}
              transition="all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s"
            >
              <DownloadButton store="apple" />
              <DownloadButton store="google" />
            </HStack>

            {/* Disclaimer */}
            <Text
              fontSize={{ base: "xs", sm: "sm" }}
              color="fg.muted"
              textAlign="center"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
              transition="all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.6s"
            >
              * Verfügbar für iOS und Android-Geräte
            </Text>
          </VStack>
        </Container>
      </Box>
    </Section>
  );
};
