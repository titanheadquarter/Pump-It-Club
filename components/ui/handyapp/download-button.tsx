"use client";

import { Box, chakra } from "@chakra-ui/react";
import { Image } from "@/components/ui/image";

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
        position="relative"
        borderRadius="lg"
        overflow="hidden"
        transition="all 0.3s ease"
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "0 8px 25px -4px rgba(0, 0, 0, 0.3)"
        }}
        minW={{ base: "160px", md: "180px" }}
        h={{ base: "48px", md: "54px" }}
      >
        <Image
          src={
            isApple 
              ? "/applandingpage/app-store-black.webp"  // Platzhalter für Apple Badge
              : "/applandingpage/google-play-black.webp" // Platzhalter für Google Badge
          }
          alt={
            isApple 
              ? "Download on the App Store" 
              : "Get it on Google Play"
          }
          fill
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
          sizes="(max-width: 768px) 160px, 180px"
        />
      </Box>
    </chakra.a>
  );
};