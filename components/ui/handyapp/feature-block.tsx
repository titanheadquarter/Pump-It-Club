"use client";

import { Stack, VStack, Heading, Text, Box } from "@chakra-ui/react";
import { AppMockup } from "./app-mockup";
import { FeatureItem } from "./feature-item";

interface Feature {
  title: string;
  description: string;
}

interface FeatureBlockProps {
  title: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
  imageSrc?: string;
  imageAlt?: string;
  imageOnLeft?: boolean;
}

export const FeatureBlock = ({
  title,
  subtitle,
  description,
  features,
  imageSrc,
  imageAlt,
  imageOnLeft = false,
}: FeatureBlockProps) => {
  return (
    <Stack
      direction={{ base: "column", lg: imageOnLeft ? "row" : "row-reverse" }}
      gap={{ base: 4, md: 5, lg: 6 }}
      align={{ base: "stretch", lg: "center" }}
      w="full"
    >
      {/* Text Content */}
      <Box flex="1" w="full">
        <VStack gap={{ base: 4, md: 5 }} align="start" w="full">
          {subtitle && (
            <Text
              fontSize={{ base: "xs", sm: "sm" }}
              color="fg.muted"
              textTransform="uppercase"
              letterSpacing="wider"
              fontWeight="medium"
            >
              {subtitle}
            </Text>
          )}
          
          <Heading
            as="h3"
            fontSize={{ base: "xl", md: "2xl", lg: "2.5rem" }}
            fontWeight="700"
            color="gray.800"
            lineHeight="shorter"
          >
            {title}
          </Heading>

          {description && (
            <Text
              fontSize={{ base: "sm", md: "md" }}
              color="gray.600"
              lineHeight="tall"
            >
              {description}
            </Text>
          )}

          {features.length > 0 && (
            <VStack gap={{ base: 4, md: 5 }} align="stretch" w="full" mt={2}>
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </VStack>
          )}
        </VStack>
      </Box>

      {/* Image/Mockup */}
      <Box flex="1" w="full" maxW={{ base: "250px", sm: "300px", md: "350px", lg: "400px" }} mx={{ base: "auto", lg: 0 }}>
        <AppMockup
          imageSrc={imageSrc}
          imageAlt={imageAlt || title}
          aspectRatio={9 / 16}
        />
      </Box>
    </Stack>
  );
};
