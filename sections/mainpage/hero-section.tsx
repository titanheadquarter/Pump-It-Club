"use client";

import {
  Box,
  Stack,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
  Circle,
  AspectRatio,
  IconButton,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { VimeoPlayer } from "@/components/ui/mainpage/vimeo-player";
import { HeroCard } from "@/components/ui/mainpage/hero-card";
import { useState, useRef, useEffect } from "react";
import {
  User,
  ForkKnife,
  Clock,
  CheckCircle,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";

interface PricingOption {
  title: string;
  description?: string;
  features?: string[];
  buttonText?: string;
  recommended?: boolean;
}

interface HeroSectionProps {
  videoId?: string;
  heading?: string;
  subheading?: string;
  pricingOptions?: PricingOption[];
  infoTexts?: Array<{
    heading: string;
    content: string;
  }>;
}

export const HeroSection = ({
  videoId,
  heading = "Deine Transformation startet hier",
  subheading,
  pricingOptions = [
    {
      title: "Zum Freekurs",
      recommended: false,
    },
    {
      title: "Zur 1zu1 Beratung",
      description: "Erhalte deinen maßgeschneiderten Plan in nur 30 Minuten",
      recommended: true,
    },
  ],
  infoTexts = [],
}: HeroSectionProps) => {
  const [selectedPlan, setSelectedPlan] = useState<number>(
    pricingOptions.findIndex((opt) => opt.recommended) || 0
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    checkScrollability();
    container.addEventListener("scroll", checkScrollability);
    window.addEventListener("resize", checkScrollability);
    
    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [infoTexts.length]);

  return (
    <Section
      header
      size="lg"
      bg="bg.subtle"
      overflowX="hidden"
      maxW="100vw"
    >
      <VStack gap={{ base: "8", md: "12", lg: "16" }} position="relative">
        {/* Subtiler Hintergrund-Gradient */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          height="60%"
          bg="linear-gradient(180deg, primary.solid/3 0%, transparent 100%)"
          pointerEvents="none"
          zIndex={0}
        />

        {/* H1 Überschrift */}
        <VStack
          gap={{ base: "2", md: "3" }}
          textAlign="center"
          w="full"
          maxW="3xl"
          mx="auto"
          px={{ base: "4", md: "0" }}
          position="relative"
          zIndex={1}
        >
          <Heading
            as="h1"
            textStyle={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="600"
            lineHeight="1.1"
            letterSpacing="-0.02em"
            color="fg"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "1px",
              bg: "linear-gradient(90deg, transparent, primary.solid/30, transparent)",
              borderRadius: "full",
              animation: "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            css={{
              "@keyframes fadeIn": {
                "0%": { opacity: 0, transform: "translateX(-50%) scaleX(0)" },
                "100%": { opacity: 1, transform: "translateX(-50%) scaleX(1)" },
              },
            }}
          >
            {heading.includes("Deine Transformation") ? (
              <>
                <Box as="span" color="fg">Deine </Box>
                <Box
                  as="span"
                  position="relative"
                  display="inline-block"
                  px="1"
                >
                  {/* Shadow Layer - Glow Effekt */}
                  <Box
                    position="absolute"
                    bottom="-6px"
                    left="-4px"
                    right="-4px"
                    height="12px"
                    bg="rgba(34, 197, 94, 0.3)"
                    borderRadius="full"
                    filter="blur(10px)"
                    zIndex={0}
                    pointerEvents="none"
                  />
                  {/* Shadow Layer - Weicher Glow */}
                  <Box
                    position="absolute"
                    bottom="-4px"
                    left="-2px"
                    right="-2px"
                    height="8px"
                    bg="rgba(34, 197, 94, 0.2)"
                    borderRadius="full"
                    filter="blur(6px)"
                    zIndex={0}
                    pointerEvents="none"
                  />
                  {/* Unterstreichung */}
                  <Box
                    position="absolute"
                    bottom="-2px"
                    left="0"
                    right="0"
                    height="2px"
                    bg="rgba(34, 197, 94, 0.6)"
                    borderRadius="full"
                    zIndex={0}
                    pointerEvents="none"
                  />
                  {/* Text mit Text Shadow */}
                  <Box
                    as="span"
                    color="success.solid"
                    fontWeight="600"
                    position="relative"
                    zIndex={1}
                    css={{
                      textShadow: "0 0 24px rgba(34, 197, 94, 0.5), 0 0 48px rgba(34, 197, 94, 0.3), 0 2px 12px rgba(34, 197, 94, 0.4)",
                    }}
                  >
                    Transformation
                  </Box>
                </Box>
                <Box as="span" color="fg"> startet hier</Box>
              </>
            ) : (
              heading
            )}
          </Heading>
          {subheading && (
            <Text
              color="fg.muted"
              textStyle={{ base: "sm", md: "md" }}
              maxW="2xl"
              lineHeight="1.6"
              opacity={0.85}
            >
              {subheading}
            </Text>
          )}
        </VStack>

        {/* Layout: Video links, Cards rechts */}
        <Stack
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "6", md: "8", lg: "10" }}
          w="full"
          align={{ base: "stretch", lg: "stretch" }}
          position="relative"
          zIndex={1}
        >
          {/* Video - Links / Mobile: Oben */}
          <Box
            flex="1"
            order={{ base: 1, lg: 1 }}
            w="full"
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              inset: "-8px",
              borderRadius: "l3",
              bg: "linear-gradient(135deg, primary.solid/5, transparent, primary.solid/5)",
              zIndex: -1,
              opacity: 0,
              transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            _hover={{
              _before: {
                opacity: 1,
              },
            }}
          >
            <VimeoPlayer videoId={videoId} />
          </Box>

          {/* Pricing Carousel - Rechts / Mobile: Unten */}
          <Box
            flex="1"
            order={{ base: 2, lg: 2 }}
            w="full"
            position="relative"
            hideBelow="lg"
          >
            <AspectRatio ratio={16 / 9} w="full">
              <Box
                position="relative"
                w="full"
                h="full"
                overflow="visible"
                borderRadius="l3"
              >
                {/* Carousel Container */}
                <Box
                  position="relative"
                  w="full"
                  h="full"
                  overflow="hidden"
                  borderRadius="l3"
                  bg="bg.panel/30"
                  backdropFilter="blur(20px) saturate(180%)"
                  border="1px solid"
                  borderColor="border.emphasized/50"
                  boxShadow="0 1px 12px -2px rgba(0, 0, 0, 0.06), 0 2px 24px -4px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(255, 255, 255, 0.04) inset"
                  _before={{
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "l3",
                    bg: "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 50%)",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                  _after={{
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "l3",
                    bg: "radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.03) 0%, transparent 50%)",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                >
                  {/* Cards Container mit Transform - Beide Cards immer teilweise sichtbar */}
                  <Box
                    display="flex"
                    w="calc(200% + 1rem)"
                    h="full"
                    transform={`translateX(calc(-${selectedPlan * 50}% - ${selectedPlan * 0.5}rem))`}
                    transition="transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                    gap="4"
                    px="4"
                  >
                    {pricingOptions.map((option, index) => {
                      const isActive = selectedPlan === index;
                      
                      return (
                        <Box
                          key={index}
                          w="calc(50% - 0.5rem)"
                          h="full"
                          flexShrink={0}
                          p={{ base: "4", md: "6" }}
                          display="flex"
                          flexDirection="column"
                          transform={isActive ? "scale(1)" : "scale(0.92)"}
                          opacity={isActive ? 1 : 0.7}
                          transition="all 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                          zIndex={isActive ? 3 : 2}
                          cursor="pointer"
                          onClick={() => !isActive && setSelectedPlan(index)}
                        >
                          <HeroCard
                            title={option.title}
                            description={option.description}
                            features={option.features}
                            buttonText={option.buttonText}
                            selected={isActive}
                            recommended={option.recommended}
                            onSelect={() => setSelectedPlan(index)}
                            h="full"
                            highlightGreen={index === 1}
                          />
                        </Box>
                      );
                    })}
                  </Box>

                  {/* Navigation Pfeile - Immer sichtbar für bessere UX */}
                  <IconButton
                    position="absolute"
                    left="3"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={10}
                    size="lg"
                    variant="solid"
                    bg="bg.panel/90"
                    backdropFilter="blur(24px) saturate(200%)"
                    border="1px solid"
                    borderColor="border.emphasized/60"
                    color="fg"
                    borderRadius="full"
                    boxShadow="0 4px 16px -2px rgba(0, 0, 0, 0.12), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(selectedPlan === 0 ? pricingOptions.length - 1 : selectedPlan - 1);
                    }}
                    _hover={{
                      bg: "bg.panel/95",
                      transform: "translateY(-50%) scale(1.1)",
                      boxShadow: "0 6px 24px -2px rgba(0, 0, 0, 0.16), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset",
                    }}
                    transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                    aria-label="Vorherige Option"
                  >
                    <CaretLeft size={24} weight="bold" />
                  </IconButton>

                  <IconButton
                    position="absolute"
                    right="3"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={10}
                    size="lg"
                    variant="solid"
                    bg="bg.panel/90"
                    backdropFilter="blur(24px) saturate(200%)"
                    border="1px solid"
                    borderColor="border.emphasized/60"
                    color="fg"
                    borderRadius="full"
                    boxShadow="0 4px 16px -2px rgba(0, 0, 0, 0.12), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlan(selectedPlan === pricingOptions.length - 1 ? 0 : selectedPlan + 1);
                    }}
                    _hover={{
                      bg: "bg.panel/95",
                      transform: "translateY(-50%) scale(1.1)",
                      boxShadow: "0 6px 24px -2px rgba(0, 0, 0, 0.16), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset",
                    }}
                    transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                    aria-label="Nächste Option"
                  >
                    <CaretRight size={24} weight="bold" />
                  </IconButton>

                  {/* Dots Indikatoren - Immer sichtbar */}
                  <HStack
                    position="absolute"
                    bottom="4"
                    left="50%"
                    transform="translateX(-50%)"
                    gap="2.5"
                    zIndex={10}
                    bg="bg.panel/60"
                    backdropFilter="blur(16px) saturate(180%)"
                    px="3"
                    py="2"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="border.emphasized/40"
                    boxShadow="0 2px 8px -2px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(255, 255, 255, 0.06) inset"
                  >
                    {pricingOptions.map((_, index) => (
                      <Circle
                        key={index}
                        size="2.5"
                        bg={selectedPlan === index ? "primary.solid" : "fg.muted/50"}
                        cursor="pointer"
                        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                        onClick={() => setSelectedPlan(index)}
                        _hover={{
                          bg: selectedPlan === index ? "primary.solid" : "fg.muted/70",
                          transform: "scale(1.3)",
                        }}
                        boxShadow={
                          selectedPlan === index
                            ? "0 0 12px -2px primary.solid/60"
                            : "none"
                        }
                      />
                    ))}
                  </HStack>
                </Box>
              </Box>
            </AspectRatio>
          </Box>

          {/* Mobile: Pricing Cards - Unten */}
          <Box
            w="full"
            order={{ base: 2, lg: 2 }}
            hideFrom="lg"
          >
            <VStack gap={{ base: "4", md: "5" }} align="stretch">
              {pricingOptions.map((option, index) => (
                <HeroCard
                  key={index}
                  title={option.title}
                  description={option.description}
                  features={option.features}
                  buttonText={option.buttonText}
                  selected={selectedPlan === index}
                  recommended={option.recommended}
                  onSelect={() => setSelectedPlan(index)}
                />
              ))}
            </VStack>
          </Box>
        </Stack>

        {/* Infotexte - Desktop: Neues Design, Mobile: Slider */}
        {infoTexts.length > 0 && (
          <Box w="full" maxW="6xl" mx="auto">
            {/* Desktop: Horizontales Timeline-Design */}
            <Box hideBelow="lg" position="relative">
              <HStack
                gap="0"
                align="stretch"
                position="relative"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: "1px",
                  bg: "linear-gradient(90deg, transparent, primary.solid/15, primary.solid/10, primary.solid/15, transparent)",
                  transform: "translateY(-50%)",
                  zIndex: 0,
                }}
              >
                {infoTexts.map((info, index) => {
                  const icons = [<User key="user" />, <ForkKnife key="fork" />, <Clock key="clock" />];
                  const icon = icons[index % icons.length] || <CheckCircle key="check" />;
                  const isLast = index === infoTexts.length - 1;
                  
                  return (
                    <Box key={index} flex="1" position="relative" zIndex={1}>
                      <VStack gap="4" align="center">
                        <Circle
                          size="16"
                          bg="bg.panel/70"
                          backdropFilter="blur(24px) saturate(200%)"
                          border="1.5px solid"
                          borderColor="primary.solid/30"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          boxShadow="0 2px 12px -2px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(255, 255, 255, 0.08) inset"
                          transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                          position="relative"
                          _after={{
                            content: '""',
                            position: "absolute",
                            inset: "-4px",
                            borderRadius: "full",
                            bg: "primary.solid/5",
                            opacity: 0,
                            transition: "opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                            zIndex: -1,
                          }}
                          _hover={{
                            transform: "scale(1.05)",
                            borderColor: "primary.solid/50",
                            boxShadow: "0 4px 20px -2px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(255, 255, 255, 0.12) inset",
                            _after: {
                              opacity: 1,
                            },
                            "& > *": {
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <Box
                            color="primary.solid"
                            fontSize="28px"
                            transition="transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                          >
                            {icon}
                          </Box>
                        </Circle>
                        <VStack gap="2" align="center" textAlign="center" px="4">
                          <Heading
                            as="h3"
                            textStyle="xl"
                            fontWeight="600"
                            letterSpacing="-0.01em"
                          >
                            {info.heading}
                          </Heading>
                          <Text
                            color="fg.muted"
                            textStyle="sm"
                            lineHeight="1.6"
                            maxW="200px"
                          >
                            {info.content}
                          </Text>
                        </VStack>
                      </VStack>
                    </Box>
                  );
                })}
              </HStack>
            </Box>

            {/* Mobile: Slider */}
            <Box hideFrom="lg" w="full" position="relative">
              {/* Fade Indicators */}
              {canScrollLeft && (
                <Box
                  position="absolute"
                  left="0"
                  top="0"
                  bottom="0"
                  w="40px"
                  bg="linear-gradient(to right, bg.subtle, transparent)"
                  zIndex={2}
                  pointerEvents="none"
                />
              )}
              {canScrollRight && (
                <Box
                  position="absolute"
                  right="0"
                  top="0"
                  bottom="0"
                  w="40px"
                  bg="linear-gradient(to left, bg.subtle, transparent)"
                  zIndex={2}
                  pointerEvents="none"
                />
              )}
              
              {/* Scroll Hint */}
              <HStack
                justify="center"
                gap="1.5"
                mb="4"
                opacity={0.4}
              >
                <Circle size="1.5" bg="fg.muted/40" />
                <Circle size="1.5" bg="fg.muted/60" />
                <Circle size="1.5" bg="fg.muted/40" />
              </HStack>

              <Box
                ref={scrollContainerRef}
                display="flex"
                gap="4"
                overflowX="auto"
                overflowY="hidden"
                scrollSnapType="x mandatory"
                px="4"
                css={{
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
                pb="2"
              >
                {infoTexts.map((info, index) => {
                  const icons = [<User key="user" />, <ForkKnife key="fork" />, <Clock key="clock" />];
                  const icon = icons[index % icons.length] || <CheckCircle key="check" />;
                  
                  return (
                    <Box
                      key={index}
                      minW="calc(100vw - 3rem)"
                      scrollSnapAlign="start"
                      flexShrink={0}
                      px="1"
                    >
                      <Box
                        position="relative"
                        p="6"
                        bg="bg.panel/50"
                        backdropFilter="blur(20px) saturate(200%)"
                        borderRadius="l3"
                        border="1px solid"
                        borderColor="border.emphasized/60"
                        boxShadow="0 2px 12px -2px rgba(0, 0, 0, 0.06), 0 4px 24px -4px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset"
                        h="full"
                      >
                        <VStack gap="4" align="center" textAlign="center">
                          <Circle
                            size="14"
                            bg="primary.solid/15"
                            border="1px solid"
                            borderColor="primary.solid/30"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            boxShadow="0 2px 8px -2px primary.solid/20"
                          >
                            <Box color="primary.solid" fontSize="24px">
                              {icon}
                            </Box>
                          </Circle>
                          <VStack gap="1.5">
                            <Heading
                              as="h3"
                              textStyle="lg"
                              fontWeight="600"
                            >
                              {info.heading}
                            </Heading>
                            <Text
                              color="fg.muted"
                              textStyle="sm"
                              lineHeight="1.6"
                            >
                              {info.content}
                            </Text>
                          </VStack>
                        </VStack>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        )}
      </VStack>
    </Section>
  );
};
