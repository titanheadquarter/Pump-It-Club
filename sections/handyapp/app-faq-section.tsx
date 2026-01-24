"use client";

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { FaqItem } from "@/components/ui/handyapp/faq-item";

export const AppFaqSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const faqs = [
    {
      question: "Was macht Pump It Club besonders?",
      answer: "Pump It Club vereint alle Bereiche, die für deinen Erfolg im Gym ausschlaggebend sind, übersichtlich in einer App. Mit einer intuitiven Benutzeroberfläche, die sowohl Experten als auch Anfängern eine optimale Nutzung ermöglicht. Unsere umfangreiche Lebensmitteldatenbank mit Millionen Einträgen, individuelle Trainingsplanung und progressives Tracking machen Pump It Club zur umfassendsten Fitness-App auf dem Markt.",
    },
    {
      question: "Welche Ziele verfolgt Pump It Club?",
      answer: "Unser Ziel ist es, dir dabei zu helfen, deine Fitnessziele zu erreichen. Durch strukturierte Trainingspläne, präzises Ernährungstracking und eine umfangreiche Lebensmitteldatenbank unterstützen wir dich auf deinem Weg zu deinem Traumkörper. Wir glauben daran, dass jeder die Möglichkeit haben sollte, seine Fitnessziele zu erreichen - unabhängig vom Erfahrungsstand.",
    },
    {
      question: "Ist die Pump It Club App kostenpflichtig?",
      answer: "Die Pump It Club App bietet sowohl kostenlose als auch Premium-Funktionen. Du kannst mit der kostenlosen Version starten und bei Bedarf auf Premium upgraden, um Zugang zu allen erweiterten Features zu erhalten. Die kostenlose Version bietet bereits Zugang zu grundlegenden Features wie Ernährungstagebuch, Basis-Trainingspläne und der Community.",
    },
    {
      question: "Für wen ist die Pump It Club App geeignet?",
      answer: "Die App ist für alle geeignet, die ihre Fitnessziele erreichen möchten - ob Anfänger oder Fortgeschrittene. Die intuitive Benutzeroberfläche macht es einfach, Trainingspläne zu erstellen, Ernährung zu tracken und Fortschritte zu überwachen. Egal ob du abnehmen, Muskeln aufbauen oder einfach fitter werden möchtest - Pump It Club unterstützt dich dabei.",
    },
    {
      question: "Kann ich meine Daten exportieren?",
      answer: "Ja, du kannst alle deine Daten jederzeit exportieren. Deine Trainingspläne, Ernährungstagebücher und Fortschrittsdaten können im CSV-Format heruntergeladen werden. Deine Privatsphäre und Datenkontrolle sind uns wichtig.",
    },
    {
      question: "Funktioniert die App offline?",
      answer: "Viele Funktionen der App funktionieren offline. Du kannst deine Trainingspläne einsehen, Übungen nachschlagen und deine Mahlzeiten tracken. Die Synchronisation mit der Cloud erfolgt automatisch, sobald du wieder online bist.",
    },
  ];

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
          <VStack gap={{ base: 4, md: 5 }} align="stretch">
            {/* Section Header */}
            <VStack
              gap={{ base: 3, md: 4 }}
              textAlign="center"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(30px)'}
              transition="all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            >
              <Text
                fontSize={{ base: "xs", sm: "sm" }}
                color="fg.muted"
                textTransform="uppercase"
                letterSpacing="wider"
                fontWeight="medium"
              >
                HÄUFIG GESTELLTE FRAGEN
              </Text>
              
              <Heading
                as="h2"
                fontSize={{ base: '1.5rem', sm: '1.8rem', md: '2.2rem', lg: '2.8rem', xl: '3.2rem' }}
                fontWeight="700"
                color="gray.800"
                lineHeight="1.1"
                textAlign="center"
                letterSpacing="tighter"
                maxW="4xl"
                mx="auto"
              >
                Du hast Fragen zur Pump It Club App?
              </Heading>
            </VStack>

            {/* FAQ Items */}
            <Box
              w="full"
              maxW="3xl"
              mx="auto"
              opacity={isLoaded ? 1 : 0}
              transform={isLoaded ? 'translateY(0)' : 'translateY(50px)'}
              transition="all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.4s"
            >
              <VStack gap={0} align="stretch">
                {faqs.map((faq, index) => (
                  <FaqItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Section>
  );
};
