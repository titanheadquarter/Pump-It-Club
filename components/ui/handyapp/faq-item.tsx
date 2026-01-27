"use client";

import { useState } from "react";
import { Box, Heading, Text, HStack } from "@chakra-ui/react";
import { CaretDown } from "@phosphor-icons/react";

interface FaqItemProps {
  question: string;
  answer: string;
}

export const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      borderBottom="1px solid"
      borderColor="border.muted"
      py={{ base: 4, md: 5 }}
    >
      <Box
        as="button"
        w="full"
        onClick={() => setIsOpen(!isOpen)}
        textAlign="left"
        _hover={{
          color: "green.600"
        }}
        transition="color 0.2s"
        cursor="pointer"
      >
        <HStack justify="space-between" align="start" gap={4}>
          <Heading
            as="h4"
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="600"
            color="gray.800"
            lineHeight="tall"
            flex="1"
          >
            {question}
          </Heading>
          <Box
            transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
            transition="transform 0.2s"
            color="gray.600"
            flexShrink={0}
            mt={0.5}
          >
            <CaretDown size={20} weight="bold" />
          </Box>
        </HStack>
      </Box>
      
      {isOpen && (
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="gray.600"
          lineHeight="tall"
          mt={4}
          pt={4}
          borderTop="1px solid"
          borderColor="border.subtle"
        >
          {answer}
        </Text>
      )}
    </Box>
  );
};
