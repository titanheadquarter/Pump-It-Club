"use client";

import {
  Center,
  Container,
  Box,
} from "@chakra-ui/react";
import { Link } from "@/components/ui/link";
import { Image } from "@/components/ui/image";

export const Navbar = ({ type }: { type: "website" | "app" }) => {
  console.log(type);
  return (
    <Center
      as="header"
      position="fixed"
      zIndex="docked"
      top={{ base: "4", md: "6" }}
      left="0"
      right="0"
      w="100vw"
      maxW="100vw"
      px={{ base: "4", md: "6" }}
      overflowX="hidden"
    >
      <Container maxW={{ base: "full", md: "1100px" }} w="full" px="0" mx="auto">
        <Box
          w="full"
          px="4"
          py="3"
          boxShadow="0 2px 12px -2px rgba(0, 0, 0, 0.08), 0 4px 24px -4px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset"
          background="bg.panel/70"
          backdropFilter="blur(20px) saturate(200%)"
          border="1px solid"
          borderColor="border.emphasized/50"
          borderRadius="l3"
          overflow="hidden"
        >
          {/* Perfect Logo Centering */}
          <Center 
            w="full" 
            h="full" 
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Link 
              href="/"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src="/logo.webp"
                alt="PumpItClub Logo"
                width={200}
                height={50}
                style={{
                  height: "30px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Link>
          </Center>
        </Box>
      </Container>
    </Center>
  );
};