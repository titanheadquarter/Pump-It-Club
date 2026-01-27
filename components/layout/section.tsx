import { Box, type BoxProps, Container } from "@chakra-ui/react";
import type React from "react";

export interface SectionProps extends BoxProps {
  children?: React.ReactNode;
  header?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Section = ({ header, size = "md", ...props }: SectionProps) => {
  const { ...rootProps } = props;
  const paddingY = {
    sm: {
      base: "2",
      md: "4",
    },
    md: {
      base: "8",
      md: "12",
    },
    lg: {
      base: "12",
      md: "16",
    },
  };
  if (header) {
    const topPadding = (size: "sm" | "md" | "lg") => {
      const conversion = {
        sm: {
          base: "112px",
          md: "120px",
        },
        md: {
          base: "136px",
          md: "152px",
        },
        lg: {
          base: "152px",
          md: "160px",
          lg: "140px",
        },
      } as const;

      return conversion[size];
    };

    return (
      <Box as="header" w="full" maxW="100vw" overflowX="hidden" {...rootProps}>
        <Container maxW={{ base: "full", md: "6xl", lg: "7xl" }} w="full" px={{ base: "4", md: "6" }}>
          <Box
            pt={{
              base: topPadding(size).base,
              md: topPadding(size).md,
              lg: size === "lg" ? "140px" : topPadding(size).md,
            }}
            pb={{ base: paddingY[size].base, md: paddingY[size].md }}
            w="full"
            overflowX="hidden"
          >
            {props.children}
          </Box>
        </Container>
      </Box>
    );
  }
  return (
    <Box as="section" w="full" maxW="100vw" overflowX="hidden" {...rootProps}>
      <Container maxW={{ base: "full", md: "6xl", lg: "7xl" }} w="full" px={{ base: "4", md: "6" }}>
        <Box py={{ base: paddingY[size].base, md: paddingY[size].md }} w="full" overflowX="hidden">
          {props.children}
        </Box>
      </Container>
    </Box>
  );
};
