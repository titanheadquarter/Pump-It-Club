"use client";

import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";

export const DiaryEntryForm = () => {
  return (
    <Box p={6} borderWidth="1px" borderRadius="md" bg="white">
      <Heading size="md" mb={4}>Tagebuch Eintrag</Heading>
      <Text fontSize="sm" color="gray.500" mb={4}>
        Um Einträge zu speichern, müsste hier eine User-Session (OAuth 3-Legged) verbunden werden.
        Dies ist eine Demo-Komponente.
      </Text>
      <VStack gap={4}>
        <Input placeholder="Mahlzeit (z.B. Frühstück)" disabled />
        <Input placeholder="Menge (g)" type="number" disabled />
        <Button disabled w="full">Speichern (Benötigt User-Login)</Button>
      </VStack>
    </Box>
  );
};
