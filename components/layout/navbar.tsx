"use client";

import { usePathname } from "next/navigation";
import {
  Center,
  Container,
  Box,
  HStack,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "@/components/ui/link";
import { Image } from "@/components/ui/image";
import { DeviceMobile, ArrowLeft } from "@phosphor-icons/react";

export const Navbar = ({ type }: { type: "website" | "app" }) => {
  const pathname = usePathname();
  const isAppPage = pathname?.includes("/pumpitclubapp");
  const isMainPage = pathname === "/";
  const iconSize = useBreakpointValue({ base: 14, sm: 16, md: 18 }) || 16;

  return (
    <Center
      as="header"
      position="fixed"
      zIndex="docked"
      top={{ base: "4", sm: "6", md: "6" }}
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
          px={{ base: 3, sm: 4, md: 4 }}
          py={{ base: 2.5, sm: 3, md: 3 }}
          boxShadow="0 2px 12px -2px rgba(0, 0, 0, 0.08), 0 4px 24px -4px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset"
          background="white"
          backdropFilter="blur(20px) saturate(400%)"
          border="1px solid"
          borderColor="border.emphasized/50"
          borderRadius="l3"
          overflow="hidden"
        >
          <HStack
            w="full"
            justify="space-between"
            align="center"
            gap={{ base: 1, sm: 2, md: 3 }}
          >
            {/* Left: Page Switch Button */}
            <Box flexShrink={0} w={{ base: "60px", sm: "80px", md: "100px" }}>
              <Link href={isAppPage ? "/" : "/pumpitclubapp"}>
                <Button
                  size={{ base: "sm", sm: "md", md: "lg" }}
                  variant="ghost"
                  colorPalette="gray"
                  px={{ base: 1.5, sm: 3, md: 4 }}
                  py={{ base: 1.5, sm: 2, md: 2.5 }}
                  fontSize={{ base: "xs", sm: "sm", md: "md" }}
                  borderRadius="lg"
                  transition="all 0.3s ease"
                  w="full"
                  _hover={{
                    bg: "rgba(0, 0, 0, 0.05)",
                    transform: "translateY(-1px)",
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent={{ base: "center", sm: "flex-start" }}
                  gap={{ base: 0, sm: 1.5, md: 2 }}
                >
                  {isAppPage ? (
                    <>
                      
                      <Box 
                        as="span" 
                        display={{ base: "none", sm: "inline" }}
                        whiteSpace="nowrap"
                      >
                        Zur Website
                      </Box>
                    </>
                  ) : (
                    <>
                     
                      <Box 
                        as="span" 
                        display={{ base: "none", sm: "inline" }}
                        whiteSpace="nowrap"
                      >
                        Zur App
                      </Box>
                    </>
                  )}
                </Button>
              </Link>
            </Box>

            {/* Center: Logo */}
            <Center 
              flex="1"
              h="full" 
              display="flex"
              alignItems="center"
              justifyContent="center"
              minW="0"
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

            {/* Right: Login Button */}
            <Box flexShrink={0} w={{ base: "60px", sm: "80px", md: "100px" }}>
              <Link href="/login">
                <Button
                  size={{ base: "sm", sm: "md", md: "lg" }}
                  variant="outline"
                  colorPalette="gray"
                  px={{ base: 1.5, sm: 3, md: 4 }}
                  py={{ base: 1.5, sm: 2, md: 2.5 }}
                  fontSize={{ base: "xs", sm: "sm", md: "md" }}
                  borderRadius="lg"
                  bg="rgba(255, 255, 255, 0.9)"
                  backdropFilter="blur(20px) saturate(200%)"
                  border="1px solid"
                  borderColor="border.emphasized/50"
                  boxShadow="0 2px 12px -2px rgba(0, 0, 0, 0.08), 0 4px 24px -4px rgba(0, 0, 0, 0.06)"
                  transition="all 0.3s ease"
                  w="full"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.95)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 16px -2px rgba(0, 0, 0, 0.12), 0 8px 32px -4px rgba(0, 0, 0, 0.08)",
                  }}
                  display="flex"
                  alignItems="center"
                  justifyContent={{ base: "center", sm: "flex-end" }}
                >
                  Login
                </Button>
              </Link>
            </Box>
          </HStack>
        </Box>
      </Container>
    </Center>
  );
};
