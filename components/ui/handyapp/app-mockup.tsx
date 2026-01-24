"use client";

import { useState, useEffect, useRef } from "react";
import { Box, AspectRatio } from "@chakra-ui/react";
import { Image } from "@/components/ui/image";

interface AppMockupProps {
  imageSrc?: string;
  imageAlt?: string;
  aspectRatio?: number;
}

export const AppMockup = ({
  imageSrc = "/macher.webp",
  imageAlt = "App Screenshot",
  aspectRatio = 9 / 16,
}: AppMockupProps) => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const elementTop = rect.top;
        const windowHeight = window.innerHeight;
        
        // Parallax-Effekt: Bild bewegt sich langsamer als Scroll
        // Berechne die Position relativ zum Viewport
        const elementCenter = elementTop + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        // Parallax-Offset: bewegt sich mit 30% der Scroll-Geschwindigkeit
        const parallaxOffset = (elementCenter - viewportCenter) * 0.3;
        setScrollY(parallaxOffset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      ref={containerRef}
      position="relative"
      w="full"
      borderRadius="xl"
      overflow="hidden"
      transform={`translateY(${scrollY}px)`}
      transition="transform 0.1s ease-out"
    >
      <AspectRatio ratio={aspectRatio} w="full" position="relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
          style={{
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </AspectRatio>
    </Box>
  );
};
