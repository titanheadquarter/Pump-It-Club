"use client";

import { Box, VStack } from "@chakra-ui/react";
import { Image } from "@/components/ui/image";

interface FounderImageProps {
  imageSrc?: string;
  imageAlt?: string;
  secondImageSrc?: string;
  secondImageAlt?: string;
}

export const FounderImage = ({
  imageSrc = "/macher.webp",
  imageAlt = "Felix - Gründer von PumpItClub",
  secondImageSrc,
  secondImageAlt,
}: FounderImageProps) => {
  return (
    <Box
      flex="1"
      w="full"
      position="relative"
      order={{ base: 2, lg: 1 }}
    >
      {/* Hero-style Glassmorphism Container with Green Glow */}
      <Box
        position="relative"
        w="full"
        p={{ base: "3", md: "4" }}
        bg="rgba(255, 255, 255, 0.95)"
        backdropFilter="blur(20px) saturate(180%)"
        borderRadius="xl"
        border="1px solid"
        borderColor="rgb(0, 0, 0)"
        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        overflow="hidden"
        boxShadow="0 4px 16px -2px rgba(0, 0, 0, 0.05), 0 6px 32px -4px rgba(0, 0, 0, 0.03)"
        css={{
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '-2px',
            borderRadius: 'xl',
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.1) 50%, rgba(21, 128, 61, 0.05) 100%)',
            filter: 'blur(8px)',
            zIndex: -1,
            opacity: 0.7
          }
        }}
        _hover={{
          transform: "translateY(-4px)",
          borderColor: "rgba(34, 197, 94, 0.3)",
          boxShadow: "0 8px 25px -4px rgba(0, 0, 0, 0.08), 0 12px 50px -8px rgba(0, 0, 0, 0.04), 0 0 20px -4px rgba(34, 197, 94, 0.2)"
        }}
      >
        <VStack gap={{ base: "3", md: "4" }} align="stretch" w="full">
          {/* First Image with Hero-style effects */}
          <Box
            position="relative"
            w="full"
            borderRadius="lg"
            overflow="hidden"
            aspectRatio={{ base: "16/10", md: "16/10", lg: "16/12" }}
            bg="white"
            minH="250px"
            maxH="400px"
            transition="all 0.3s ease"
            border="1px solid"
            borderColor="rgb(0, 0, 0)"
            _hover={{
              transform: "scale(1.02)",
              borderColor: "rgba(34, 197, 94, 0.4)",
              boxShadow: "0 4px 20px -4px rgba(34, 197, 94, 0.3)"
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
              style={{
                objectFit: "cover",
                objectPosition: "center center",
                width: "100%",
                height: "100%",
              }}
            />
            
            {/* Subtle green overlay on hover */}
            <Box
              position="absolute"
              inset="0"
              bg="linear-gradient(45deg, transparent 0%, rgba(34, 197, 94, 0.05) 50%, transparent 100%)"
              opacity={0}
              transition="opacity 0.3s ease"
              pointerEvents="none"
              _groupHover={{ opacity: 1 }}
            />
          </Box>

          {/* Second Image with matching effects */}
          {secondImageSrc && (
            <Box
              position="relative"
              w="full"
              borderRadius="lg"
              overflow="hidden"
              aspectRatio={{ base: "16/10", md: "16/10", lg: "16/12" }}
              bg="gray.100"
              minH="250px"
              maxH="400px"
              transition="all 0.3s ease"
              border="1px solid"
              borderColor="rgba(0, 0, 0, 0.99)"
              _hover={{
                transform: "scale(1.02)",
                borderColor: "rgba(34, 197, 94, 0.4)",
                boxShadow: "0 4px 20px -4px rgba(34, 197, 94, 0.3)"
              }}
            >
              <Image
                src={secondImageSrc}
                alt={secondImageAlt || imageAlt}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  width: "100%",
                  height: "100%",
                }}
              />
              
              {/* Subtle green overlay on hover */}
              <Box
                position="absolute"
                inset="0"
                bg="linear-gradient(45deg, transparent 0%, rgba(34, 197, 94, 0.05) 50%, transparent 100%)"
                opacity={0}
                transition="opacity 0.3s ease"
                pointerEvents="none"
                _groupHover={{ opacity: 1 }}
              />
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
};