import {
  Box,
  Card,
  Stack,
  VStack,
  HStack,
  Text,
  Badge,
  Float,
  Circle,
  type BoxProps,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "@phosphor-icons/react";

interface HeroCardProps extends BoxProps {
  title: string;
  description?: string;
  features?: string[];
  buttonText?: string;
  selected?: boolean;
  recommended?: boolean;
  highlightGreen?: boolean;
  onSelect?: () => void;
}

export const HeroCard = ({
  title,
  description,
  features = [],
  buttonText,
  selected = false,
  recommended = false,
  highlightGreen = false,
  onSelect,
  ...rest
}: HeroCardProps) => {

  return (
    <Box
      position="relative"
      w="full"
      h="full"
      {...rest}
      overflow="hidden"
    >
      <Card.Root
        bg="bg.panel/40"
        backdropFilter="blur(20px) saturate(180%)"
        border="1px solid"
        borderColor={
          selected
            ? "primary.solid/60"
            : "border.emphasized/60"
        }

        borderRadius="l2"
        overflow="hidden"
        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        position="relative"
        display="flex"
        flexDirection="column"
        h="full"
        w="full"
        _hover={{
          borderColor: selected
            ? "primary.solid/70"
            : "border.emphasized/70",
          boxShadow:
            selected && highlightGreen
              ? "0 0 0 0.5px rgba(255, 255, 255, 0.05) inset"
              : selected
              ? "0 4px 16px -2px rgba(0, 0, 0, 0.08), 0 6px 32px -4px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset, 0 0 40px -4px rgba(34, 197, 94, 0.3), 0 0 56px -8px rgba(34, 197, 94, 0.2)"
              : "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(255, 255, 255, 0.04) inset",
        }}
      >
        <Card.Body 
          py={{ base: "5", md: "6" }} 
          px={{ base: "2", md: "3" }}
          flex="1"
          display="flex"
          flexDirection="column"
          w="full"
        >
          <VStack gap={{ base: "4", md: "5" }} align="stretch" flex="1" w="full">
            {/* Header mit Radio Button */}
            <HStack gap={{ base: "3", md: "4" }} align="flex-start" w="full">
              <Box mt="0.5" pointerEvents="none" position="relative" flexShrink={0}>
                <Circle
                  size={{ base: "4", md: "5" }}
                  border="0.5px solid"
                  borderColor={
                    selected ? "primary.solid/70" : "border.muted/50"
                  }
                  bg={
                    selected
                      ? "primary.solid"
                      : "transparent"
                  }
                  position="relative"
                  transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                  boxShadow={
                    selected
                      ? "0 0 0 1px primary.solid/15, 0 0 8px -2px primary.solid/20"
                      : "none"
                  }
                  filter={selected ? "blur(0.5px)" : "none"}
                  _before={
                    selected
                      ? {
                          content: '""',
                          position: "absolute",
                          inset: "-3px",
                          borderRadius: "full",
                          bg: "primary.solid/8",
                          filter: "blur(4px)",
                          zIndex: -1,
                        }
                      : undefined
                  }
                >
                  {selected && (
                    <Circle
                      size="1.5"
                      bg="white"
                      position="absolute"
                      inset="0"
                      m="auto"
                      filter="blur(0.5px)"
                    />
                  )}
                </Circle>
              </Box>
              <VStack gap="1" align="flex-start" flex="1" w="full">
                <Text 
                  fontWeight="600" 
                  textStyle={{ base: "lg", md: "xl" }} 
                  letterSpacing="-0.01em" 
                  color={highlightGreen ? "success.solid" : "fg"}
                  transition="color 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                  w="full"
                >
                  {title}
                </Text>
                {description && (
                  <Text 
                    textStyle={{ base: "sm", md: "md" }} 
                    color="fg.muted" 
                    lineHeight="1.6"
                    opacity={0.85}
                    w="full"
                  >
                    {description}
                  </Text>
                )}
              </VStack>
            </HStack>

            {/* Features Liste */}
            {features.length > 0 && (
              <VStack gap={{ base: "2.5", md: "3" }} align="stretch" mt={{ base: "2", md: "3" }} w="full">
                {features.map((feature, index) => (
                  <HStack key={index} gap="2.5" align="flex-start" w="full">
                    <Box
                      color={highlightGreen ? "success.solid" : selected ? "primary.solid" : "fg.muted"}
                      mt="0.5"
                      flexShrink={0}
                      transition="color 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                    >
                      <CheckCircle size={18} weight="fill" />
                    </Box>
                    <Text 
                      textStyle={{ base: "sm", md: "sm" }} 
                      color="fg.muted" 
                      lineHeight="1.6"
                      opacity={0.9}
                      flex="1"
                    >
                      {feature}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            )}
          </VStack>

          {/* Button am unteren Rand */}
          {buttonText && (
            <Box mt={{ base: "5", md: "6" }} pt={{ base: "4", md: "5" }} borderTop="1px solid" borderColor="border.muted/30" w="full">
              <Button
                w="full"
                size="lg"
                onClick={onSelect}
                bg={
                  highlightGreen
                    ? selected
                      ? "success.solid"
                      : "success.solid/10"
                    : selected
                    ? "primary.solid"
                    : "bg.panel/60"
                }
                color={
                  highlightGreen
                    ? selected
                      ? "white"
                      : "success.solid"
                    : selected
                    ? "white"
                    : "fg"
                }
                border="1px solid"
                borderColor={
                  highlightGreen
                    ? selected
                      ? "success.solid"
                      : "success.solid/40"
                    : selected
                    ? "primary.solid"
                    : "border.emphasized/50"
                }
                backdropFilter="blur(16px)"
                boxShadow={
                  highlightGreen
                    ? selected
                      ? "0 1px 6px -2px rgba(0, 0, 0, 0.04), 0 2px 12px -4px rgba(0, 0, 0, 0.03), 0 0 0 0.5px rgba(255, 255, 255, 0.08) inset, 0 0 16px -4px rgba(107, 192, 31, 0.2)"
                      : "0 1px 4px -2px rgba(0, 0, 0, 0.03), 0 0 0 0.5px rgba(255, 255, 255, 0.04) inset, 0 0 8px -4px rgba(107, 192, 31, 0.1)"
                    : selected
                    ? "0 1px 6px -2px rgba(0, 0, 0, 0.04), 0 2px 12px -4px rgba(0, 0, 0, 0.03), 0 0 0 0.5px rgba(255, 255, 255, 0.08) inset"
                    : "0 1px 4px -2px rgba(0, 0, 0, 0.03), 0 0 0 0.5px rgba(255, 255, 255, 0.04) inset"
                }
                transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                _hover={{
                  transform: "translateY(-1px)",
                  bg: highlightGreen
                    ? selected
                      ? "success.solid"
                      : "success.solid/15"
                    : selected
                    ? "primary.solid"
                    : "bg.panel/80",
                  borderColor: highlightGreen
                    ? selected
                      ? "success.solid"
                      : "success.solid/60"
                    : selected
                    ? "primary.solid"
                    : "border.emphasized/70",
                  boxShadow: highlightGreen
                    ? selected
                      ? "0 2px 10px -2px rgba(0, 0, 0, 0.06), 0 4px 20px -4px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(255, 255, 255, 0.12) inset, 0 0 20px -4px rgba(107, 192, 31, 0.25)"
                      : "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(255, 255, 255, 0.06) inset, 0 0 12px -4px rgba(107, 192, 31, 0.15)"
                    : selected
                    ? "0 2px 10px -2px rgba(0, 0, 0, 0.06), 0 4px 20px -4px rgba(0, 0, 0, 0.04), 0 0 0 0.5px rgba(255, 255, 255, 0.12) inset"
                    : "0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(255, 255, 255, 0.06) inset",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
              >
                {buttonText}
              </Button>
            </Box>
          )}
        </Card.Body>
      </Card.Root>
    </Box>
  );
};
