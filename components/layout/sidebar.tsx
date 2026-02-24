"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Stack,
  Button,
  useBreakpointValue,
  Text,
  HStack,
  VStack,
  Collapsible,
  Progress,
} from "@chakra-ui/react";
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Link } from "@/components/ui/link";
import { VideoCamera } from "@phosphor-icons/react";

const navigationItems = [
  { href: "/app/free/trainingsplaene", label: "Trainingspläne" },
  { href: "/app/free/mein-trainingsplan", label: "Mein Trainingsplan" },
  { href: "/app/free/unsere-app", label: "Unsere App" },
  { href: "/app/free/kundenstimmen", label: "Kundenstimmen" },
  { href: "/app/free/faq", label: "FAQ" },
];


const CourseNavigationButton = () => {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/app/free/lerne-die-grundlagen");

  return (
    <Link href="/app/free/lerne-die-grundlagen">
      <Button
        w="full"
        justifyContent="flex-start"
        variant={isActive ? "solid" : "ghost"}
        colorPalette="green"
        bg={isActive ? "green.500" : "transparent"}
        color={isActive ? "white" : "green.700"}
        _hover={{
          bg: isActive ? "green.600" : "green.100",
          color: isActive ? "white" : "green.800",
        }}
        transition="all 0.2s"
      >
        <HStack gap="2">
          <VideoCamera size={16} />
          <Text>Lerne die Grundlagen</Text>
        </HStack>
      </Button>
    </Link>
  );
};


const SidebarContent = () => {
  const pathname = usePathname();

  return (
    <Box
      as="nav"
      w="full"
      h="full"
      bg="green.50"
      borderRight="1px solid"
      borderColor="green.200"
      p="4"
    >
      <Stack gap="2" w="full">
        {/* Dashboard - immer an erster Position */}
        <Link href="/app/free/dashboard" w="full">
          <Button
            w="full"
            justifyContent="flex-start"
            variant={pathname === "/app/free/dashboard" ? "solid" : "ghost"}
            colorPalette="green"
            bg={pathname === "/app/free/dashboard" ? "green.500" : "transparent"}
            color={pathname === "/app/free/dashboard" ? "white" : "green.700"}
            _hover={{
              bg: pathname === "/app/free/dashboard" ? "green.600" : "green.100",
              color: pathname === "/app/free/dashboard" ? "white" : "green.800",
            }}
            transition="all 0.2s"
          >
            Dashboard
          </Button>
        </Link>

        {/* Lerne die Grundlagen */}
        <CourseNavigationButton />

        {/* Restliche Navigation Items */}
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} w="full">
              <Button
                w="full"
                justifyContent="flex-start"
                variant={isActive ? "solid" : "ghost"}
                colorPalette="green"
                bg={isActive ? "green.500" : "transparent"}
                color={isActive ? "white" : "green.700"}
                _hover={{
                  bg: isActive ? "green.600" : "green.100",
                  color: isActive ? "white" : "green.800",
                }}
                transition="all 0.2s"
              >
                {item.label}
              </Button>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
};

export const Sidebar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (isMobile) {
    return (
      <DrawerRoot>
        <DrawerTrigger asChild>
          <Button
            position="fixed"
            top="20"
            left="4"
            zIndex="docked"
            colorPalette="green"
            variant="solid"
            size="sm"
          >
            <List size={20} />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerCloseTrigger />
          <DrawerBody p="0">
            <SidebarContent />
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    );
  }

  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      w="250px"
      h="100vh"
      overflowY="auto"
    >
      <SidebarContent />
    </Box>
  );
};
