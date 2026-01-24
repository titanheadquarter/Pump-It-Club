"use client";

import { Box, HStack, VStack, Text, chakra } from "@chakra-ui/react";

interface DownloadButtonProps {
  store: "apple" | "google";
  href?: string;
}

export const DownloadButton = ({
  store,
  href = "#",
}: DownloadButtonProps) => {
  const isApple = store === "apple";

  return (
    <chakra.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      display="inline-block"
    >
      <Box
        bg="black"
        color="white"
        px={{ base: 6, md: 8 }}
        py={{ base: 4, md: 5 }}
        borderRadius="lg"
        transition="all 0.3s ease"
        _hover={{
          bg: "gray.800",
          transform: "translateY(-2px)",
        }}
        minW={{ base: "200px", md: "220px" }}
      >
        <HStack gap={3} justify="center">
          {isApple ? (
            <>
              <Text fontSize="2xl">🍎</Text>
              <VStack gap={0} align="start">
                <Text fontSize="xs" lineHeight="1">
                  DOWNLOAD ON THE
                </Text>
                <Text fontSize="lg" fontWeight="bold" lineHeight="1">
                  App Store
                </Text>
              </VStack>
            </>
          ) : (
            <>
              <Text fontSize="2xl">▶</Text>
              <VStack gap={0} align="start">
                <Text fontSize="xs" lineHeight="1">
                  GET IT ON
                </Text>
                <Text fontSize="lg" fontWeight="bold" lineHeight="1">
                  Google Play
                </Text>
              </VStack>
            </>
          )}
        </HStack>
      </Box>
    </chakra.a>
  );
};
