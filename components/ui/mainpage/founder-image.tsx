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
      {/* Glasmorph Container für beide Bilder */}
      <Box
        position="relative"
        w="full"
        p={{ base: "4", md: "6" }}
        bg="bg.panel/30"
        backdropFilter="blur(20px) saturate(180%)"
        borderRadius="l3"
        border="2px solid"
        borderColor="border.emphasized/30"
        _before={{
          content: '""',
          position: "absolute",
          inset: "-20px",
          borderRadius: "l3",
          bg: "gray.500/20",
          filter: "blur(40px)",
          zIndex: -1,
        }}
      >
        <VStack gap={{ base: "4", md: "6" }} align="stretch" w="full">
          {/* Erstes Bild */}
          <Box
            position="relative"
            w="full"
            borderRadius="l2"
            overflow="hidden"
            aspectRatio={{ base: "16/10", md: "16/10", lg: "16/12" }}
            bg="bg.subtle"
            boxShadow="lg"
            minH="250px"
            maxH="400px"
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
            {/* Subtle overlay */}
            <Box
              position="absolute"
              inset="0"
              bg="linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 100%)"
              pointerEvents="none"
            />
          </Box>

          {/* Zweites Bild (falls vorhanden) */}
          {secondImageSrc && (
            <Box
              position="relative"
              w="full"
              borderRadius="l2"
              overflow="hidden"
              aspectRatio={{ base: "16/10", md: "16/10", lg: "16/12" }}
              bg="bg.subtle"
              boxShadow="lg"
              minH="250px"
              maxH="400px"
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
              {/* Subtle overlay */}
              <Box
                position="absolute"
                inset="0"
                bg="linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.05) 100%)"
                pointerEvents="none"
              />
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
};
