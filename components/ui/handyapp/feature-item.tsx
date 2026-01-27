"use client";

import { HStack, Text, Box } from "@chakra-ui/react";
import { CheckCircle } from "@phosphor-icons/react";

interface FeatureItemProps {
  title: string;
  description: string;
}

export const FeatureItem = ({ title, description }: FeatureItemProps) => {
  return (
    <Box>
      <HStack gap={3} align="start" mb={2}>
        <Box
          flexShrink={0}
          color="green.600"
          mt={0.5}
        >
          <CheckCircle size={24} weight="fill" />
        </Box>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="700"
          color="gray.800"
          lineHeight="shorter"
        >
          {title}
        </Text>
      </HStack>
      <Text
        fontSize={{ base: "sm", md: "md" }}
        color="gray.600"
        lineHeight="tall"
        pl={9}
      >
        {description}
      </Text>
    </Box>
  );
};
