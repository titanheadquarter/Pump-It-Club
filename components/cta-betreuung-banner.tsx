"use client";

import { Box, Heading, Text, VStack, Button, HStack } from "@chakra-ui/react";
import { Link } from "@/components/ui/link";
import { ArrowRight } from "@phosphor-icons/react";

export function CtaBetreuungBanner() {
  return (
    <Box
      w="full"
      py={{ base: 6, md: 8 }}
      px={{ base: 4, md: 6 }}
      borderRadius="xl"
      bg="gray.50"
      border="1px solid"
      borderColor="green.200"
      boxShadow="0 4px 24px rgba(34, 197, 94, 0.08)"
    >
      <VStack gap={{ base: 3, md: 4 }} textAlign="center" maxWidth="640px" mx="auto">
        {/* Badge */}
        <Box
          as="span"
          display="inline-block"
          px={3}
          py={1.5}
          borderRadius="full"
          bg="green.100"
          color="green.700"
          fontSize="2xs"
          fontWeight="bold"
          letterSpacing="wider"
          textTransform="uppercase"
          border="1px solid"
          borderColor="green.300"
        >
          Persönliche Begleitung
        </Box>

        {/* Überschrift */}
        <Heading as="h2" size="lg" fontWeight="extrabold" lineHeight="shorter">
          Bereit für deine{" "}
          <Text
            as="span"
            color="green.500"
            className="bebas-neue-regular"
            textDecoration="underline"
            textDecorationColor="green.500"
            style={{ fontSize: "1.4em", marginTop: "-0.2em", display: "inline-block" }}
          >
            1:1 Betreuung
          </Text>
          ?
        </Heading>

        {/* Subline */}
        <Text fontSize={{ base: "sm", md: "md" }} color="gray.700" fontWeight="medium">
          Individueller Trainings- & Ernährungsplan, wöchentliche Check-ins und maximale Ergebnisse in 16 Wochen.
        </Text>

        {/* CTA Button */}
        <Link href="/kontakt" mt={2}>
          <Button
            size="lg"
            borderRadius="full"
            bg="green.500"
            color="white"
            border="2px solid"
            borderColor="green.600"
            boxShadow="md"
            _hover={{ bg: "green.600", transform: "scale(1.03)" }}
            _active={{ transform: "scale(0.98)" }}
            transition="all 0.2s"
          >
            <HStack gap={2}>
              <Text>Jetzt unverbindlich anfragen</Text>
              <ArrowRight size={20} weight="bold" />
            </HStack>
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}
