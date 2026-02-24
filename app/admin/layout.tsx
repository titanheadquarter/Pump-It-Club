"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Stack,
  Separator,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  House,
  Question,
  Dumbbell,
  ChatCircle,
  SignOut,
  Shield,
} from "@phosphor-icons/react";

interface AdminSession {
  loggedIn: boolean;
  timestamp: number;
  username?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: House },
  { href: "/admin/faq", label: "FAQ Verwaltung", icon: Question },
  { href: "/admin/training", label: "Trainingspläne", icon: Dumbbell },
  { href: "/admin/comments", label: "Video Kommentare", icon: ChatCircle },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Session beim Laden prüfen
  useEffect(() => {
    const checkSession = () => {
      const stored = localStorage.getItem("admin_session");
      if (stored) {
        try {
          const parsedSession = JSON.parse(stored);
          // Prüfe ob Session noch gültig (24 Stunden)
          const isValid = Date.now() - parsedSession.timestamp < 24 * 60 * 60 * 1000;
          if (isValid && parsedSession.loggedIn) {
            setSession(parsedSession);
          } else {
            // Session abgelaufen
            localStorage.removeItem("admin_session");
            if (pathname !== "/admin/login") {
              router.push("/admin/login");
            }
          }
        } catch (error) {
          console.error("Invalid session data:", error);
          localStorage.removeItem("admin_session");
          if (pathname !== "/admin/login") {
            router.push("/admin/login");
          }
        }
      } else {
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      }
      setLoading(false);
    };

    checkSession();
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    setSession(null);
    router.push("/admin/login");
  };

  // Ladezustand
  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
        <Text>Lade Admin-Panel...</Text>
      </Box>
    );
  }

  // Keine Session - sollte bereits weitergeleitet worden sein
  if (!session) {
    return null;
  }

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box minH="100vh" bg="gray.50">
      <HStack align="stretch" spacing={0}>
        {/* Sidebar */}
        <Box
          w={isMobile ? "full" : "250px"}
          bg="white"
          borderRight="1px solid"
          borderColor="gray.200"
          position={isMobile ? "fixed" : "relative"}
          top={0}
          left={0}
          zIndex={10}
          h={isMobile ? "auto" : "100vh"}
          overflowY="auto"
        >
          <VStack align="stretch" spacing={0} h="full">
            {/* Header */}
            <Box p={6} borderBottom="1px solid" borderColor="gray.200">
              <HStack gap={3}>
                <Shield size={24} color="var(--chakra-colors-green-500)" />
                <VStack align="start" gap={0} spacing={0}>
                  <Heading size="sm">Admin Panel</Heading>
                  <Text fontSize="xs" color="gray.600">
                    Pump-It-Club
                  </Text>
                </VStack>
              </HStack>
            </Box>

            {/* Navigation */}
            <VStack align="stretch" flex={1} p={4} gap={2}>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Button
                    key={item.href}
                    as="a"
                    href={item.href}
                    variant={isActive ? "solid" : "ghost"}
                    colorPalette="green"
                    justifyContent="flex-start"
                    h={10}
                    px={3}
                  >
                    <HStack gap={3} w="full">
                      <Icon size={18} />
                      <Text fontSize="sm">{item.label}</Text>
                    </HStack>
                  </Button>
                );
              })}
            </VStack>

            <Separator />

            {/* User Info & Logout */}
            <Box p={4}>
              <VStack gap={3}>
                <VStack align="start" gap={0} spacing={0} w="full">
                  <Text fontSize="sm" fontWeight="medium">
                    {session.username || "Admin"}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Angemeldet
                  </Text>
                </VStack>

                <Button
                  size="sm"
                  variant="outline"
                  colorPalette="red"
                  w="full"
                  onClick={handleLogout}
                >
                  <HStack gap={2}>
                    <SignOut size={16} />
                    <Text>Abmelden</Text>
                  </HStack>
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} minH="100vh" overflow="auto">
          {/* Mobile Header */}
          {isMobile && (
            <Box
              p={4}
              bg="white"
              borderBottom="1px solid"
              borderColor="gray.200"
              position="sticky"
              top={0}
              zIndex={5}
            >
              <HStack justify="space-between" align="center">
                <Heading size="md">Admin Panel</Heading>
                <Button size="sm" variant="outline" onClick={handleLogout}>
                  <SignOut size={16} />
                </Button>
              </HStack>
            </Box>
          )}

          {/* Content */}
          <Box p={{ base: 4, md: 6 }}>
            {children}
          </Box>
        </Box>
      </HStack>
    </Box>
  );
}