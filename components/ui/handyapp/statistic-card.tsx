"use client";

import { useState, useEffect, useRef } from "react";
import { Box, VStack, Text } from "@chakra-ui/react";

interface StatisticCardProps {
  value: string;
  label: string;
  startValue?: number;
  endValue?: number;
  suffix?: string;
  decimals?: number;
}

export const StatisticCard = ({ 
  value, 
  label, 
  startValue,
  endValue,
  suffix = "",
  decimals = 0
}: StatisticCardProps) => {
  const [count, setCount] = useState(startValue || 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animationComplete || !endValue) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animationComplete && !isAnimating) {
            setIsAnimating(true);
            
            // Count-up animation über 2 Sekunden
            const duration = 2000; 
            const startTime = Date.now();
            const start = startValue || 0;
            const end = endValue;

            const animate = () => {
              const now = Date.now();
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing function für smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const current = start + (end - start) * easeOutQuart;
              
              setCount(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                // Animation fertig - Counter bleibt permanent beim Endwert
                setCount(end);
                setIsAnimating(false);
                setAnimationComplete(true);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [animationComplete, isAnimating, endValue, startValue]);

  // Enhanced format function with proper number formatting
  const formatValue = () => {
    // If we have animated values and animation has started, use the count
    if (endValue && (isAnimating || animationComplete)) {
      let formatted;
      
      if (decimals > 0) {
        // For decimal values like 4.8 - use German decimal formatting
        formatted = count.toFixed(decimals).replace('.', ',');
      } else {
        // For integers with comma formatting like 20,000
        formatted = Math.round(count).toLocaleString('de-DE');
      }
      
      return formatted + suffix;
    }
    // Fallback to static value only if no animation is set up
    return value;
  };

  return (
    <Box
      ref={cardRef}
      bg="rgba(255, 255, 255, 0.95)"
      backdropFilter="blur(20px) saturate(180%)"
      borderRadius="xl"
      border="1px solid"
      borderColor="black"
      p={{ base: "4", md: "5" }}
      position="relative"
      transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      overflow="hidden"
      boxShadow="0 4px 16px -2px rgba(0, 0, 0, 0.05), 0 6px 32px -4px rgba(0, 0, 0, 0.03), 0 0 0 0.5px rgba(255, 255, 255, 0.9) inset"
      css={{
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '-1px',
          borderRadius: 'xl',
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.08) 100%)',
          filter: 'blur(6px)',
          zIndex: -1,
          opacity: 0.8
        }
      }}
      _hover={{
        transform: "translateY(-6px) scale(1.03)",
        borderColor: "rgba(34, 197, 94, 0.3)",
        boxShadow: "0 8px 25px -4px rgba(0, 0, 0, 0.08), 0 12px 50px -8px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(255, 255, 255, 0.95) inset, 0 0 20px -4px rgba(34, 197, 94, 0.2)"
      }}
    >
      <VStack gap={{ base: "2", md: "3" }} align="center">
        <Text
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          fontWeight="900"
          lineHeight="1"
          css={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.3))'
          }}
        >
          {formatValue()}
        </Text>
        <Text
          fontSize={{ base: "xs", sm: "sm" }}
          color="gray.600"
          textTransform="uppercase"
          textAlign="center"
          letterSpacing="wider"
          lineHeight="tall"
          fontWeight="medium"
        >
          {label}
        </Text>
      </VStack>
    </Box>
  );
};