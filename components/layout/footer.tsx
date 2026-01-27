"use client";

import React from "react"; // Added React import for Fragment
import {
  Container,
  HStack,
  VStack,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { LinkedinLogo, InstagramLogo } from "@phosphor-icons/react";
import NextImage from "next/image";
import { projectConfig } from "@/config";
import { Link } from "@/components/ui/link";

const Copyright = () => {
  return (
    <Text fontSize={{ base: "2xs", sm: "xs" }} color="gray.600" textAlign="center" opacity={0.8}>
      &copy; {new Date().getFullYear()} {projectConfig.general.name}. Alle Rechte vorbehalten.
    </Text>
  );
};

export const Footer = () => {
  const legalLinks = [
    { href: "/legal/privacy-policy", label: "Datenschutzerklärung" },
    { href: "/legal/terms-and-conditions", label: "AGB" },
    { href: "/legal/cookie-policy", label: "Cookie-Richtlinie" },
    { href: "/legal/imprint", label: "Impressum" },
  ];

  const socialLinks = [
    { 
      href: projectConfig.links.linkedin || "https://www.linkedin.com/", 
      icon: LinkedinLogo,
      label: "LinkedIn"
    },
    { 
      href: (projectConfig.links as any).instagram || "https://www.instagram.com/", 
      icon: InstagramLogo,
      label: "Instagram"
    },
  ];

  return (
    <Box
      as="footer"
      bg="white"
      py={{ base: 4, md: 5, lg: 6 }}
      mt="auto"
    >
      <Container maxW="6xl" px={{ base: 4, sm: 6, md: 8 }}>
        <VStack gap={{ base: 3, md: 4 }} align="stretch">
          {/* Logo and Social Links */}
          <Stack
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "flex-start" }}
            gap={{ base: 3, md: 4 }}
          >
            {/* Logo */}
            <Box>
              <Link href="/" display="inline-block">
                <Box
                  height="24px"
                  width="100px"
                  position="relative"
                >
                  <NextImage
                    src="/logo.webp"
                    alt={`${projectConfig.general.name} Logo`}
                    fill
                    sizes="100px"
                    style={{
                      objectFit: "contain",
                      objectPosition: "left center",
                    }}
                  />
                </Box>
              </Link>
            </Box>

            {/* Social Links */}
            <HStack gap={3}>
              {socialLinks.map(({ href, icon: Icon, label }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="gray.800"
                  _hover={{ color: "gray.600" }}
                  transition="color 0.2s"
                  aria-label={label}
                >
                  <Icon size={20} weight="regular" />
                </Link>
              ))}
            </HStack>
          </Stack>

          {/* Legal Links - In einer Reihe - FIXED: Added key to Fragment */}
          <HStack
            gap={{ base: 2, sm: 3, md: 4 }}
            justify="center"
            flexWrap="wrap"
          >
            {legalLinks.map(({ href, label }, index) => (
              <React.Fragment key={index}>
                {index > 0 && (
                  <Text color="gray.400" fontSize="xs" opacity={0.5}>
                    •
                  </Text>
                )}
                <Link
                  href={href}
                  fontSize={{ base: "2xs", sm: "xs" }}
                  color="gray.800"
                  _hover={{ color: "gray.600", textDecoration: "underline" }}
                  transition="color 0.2s"
                  whiteSpace="nowrap"
                >
                  {label}
                </Link>
              </React.Fragment>
            ))}
          </HStack>

          {/* Copyright */}
          <Copyright />
        </VStack>
      </Container>
    </Box>
  );
};