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
        // Parallax-Offset: bewegt sich mit 20% der Scroll-Geschwindigkeit (weniger aggressive)
        const parallaxOffset = (elementCenter - viewportCenter) * 0.2;
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
      maxW={{ base: "280px", sm: "320px", md: "350px", lg: "400px" }}
      mx="auto"
      borderRadius="2xl"
      overflow="visible"  // Changed from hidden to visible
      transform={`translateY(${scrollY}px)`}
      transition="transform 0.1s ease-out"

    >
      <AspectRatio ratio={aspectRatio} w="full" position="relative">
        <Box
          w="full"
          h="full"
         
          overflow="hidden"
         
          p={1.5} // Small padding to create phone frame effect
        >
          <Box
            w="full"
            h="full"
           
            overflow="hidden"
            position="relative"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 400px"
              style={{
                objectFit: "contain",  // Changed from "cover" to "contain" - shows full image!
                objectPosition: "center center",
                width: "100%",
                height: "100%",
              }}
             
            />
          </Box>
        </Box>
      </AspectRatio>
    </Box>
  );
};