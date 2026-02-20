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
import { List, CaretDown, Play, VideoCamera, CheckCircle } from "@phosphor-icons/react";
import { modules, calculateProgress, type Module, type Lesson } from "@/app/app/free/lerne-die-grundlagen/data";

const navigationItems = [
  { href: "/app/free/ernaehrungsplan", label: "Ernährungsplan" },
  { href: "/app/free/mein-ernaehrungsplan", label: "Mein Ernährungsplan" },
  { href: "/app/free/trainingsplaene", label: "Trainingspläne" },
  { href: "/app/free/mein-trainingsplan", label: "Mein Trainingsplan" },
  { href: "/app/free/unsere-app", label: "Unsere App" },
  { href: "/app/free/faq", label: "FAQ" },
  { href: "/app/free/fortschritt-tracker", label: "Fortschritt-Tracker" },
  { href: "/app/free/fatsecret", label: "FatSecret API" },
];

const ModuleDrawerButton = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname === "/app/free/lerne-die-grundlagen";

  return (
    <DrawerRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="start">
      <DrawerTrigger asChild>
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
          Lerne die Grundlagen
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Lerne die Grundlagen</DrawerTitle>
        </DrawerHeader>
        <DrawerCloseTrigger />
        <DrawerBody p="0">
          <ModuleDrawerContent onClose={() => setIsOpen(false)} />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

const ModuleDrawerContent = ({ onClose }: { onClose?: () => void }) => {
  const router = useRouter();
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [openModules, setOpenModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    const savedCompleted = localStorage.getItem("completedLessons");
    if (savedCompleted) {
      setCompletedLessons(new Set(JSON.parse(savedCompleted)));
    }
  }, []);

  const handleModuleToggle = (moduleId: string) => {
    setOpenModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const handleLessonClick = (moduleId: string, lessonId: string) => {
    // Navigiere zur Lektion mit URL-Parametern
    router.push(`/app/free/lerne-die-grundlagen?module=${moduleId}&lesson=${lessonId}`);
    // Schließe den Drawer nach dem Klick
    if (onClose) {
      onClose();
    }
  };

  return (
    <Stack gap="2" p="4">
      <Text fontSize="sm" fontWeight="bold" color="green.700" textTransform="uppercase" mb="2">
        Lerne die Grundlagen
      </Text>
      {modules.map((module) => {
        const moduleLessons = module.lessons.map((l) => ({
          ...l,
          completed: completedLessons.has(l.id),
        }));
        const progress = calculateProgress(moduleLessons);
        const isOpen = openModules.has(module.id);

        return (
          <Collapsible.Root
            key={module.id}
            open={isOpen}
            onOpenChange={(details) => {
              handleModuleToggle(module.id);
            }}
          >
            <Box
              border="1px solid"
              borderColor="green.200"
              borderRadius="md"
              overflow="hidden"
            >
              <Collapsible.Trigger asChild>
                <Button
                  w="full"
                  justifyContent="space-between"
                  variant="ghost"
                  colorPalette="green"
                  p="3"
                  h="auto"
                  _hover={{ bg: "green.50" }}
                >
                  <VStack align="flex-start" gap="1" flex="1">
                    <Text fontSize="sm" fontWeight="semibold" color="green.800" textAlign="left">
                      {module.title}
                    </Text>
                    <HStack gap="2" w="full">
                      <Progress.Root value={progress} colorPalette="green" size="xs" flex="1">
                        <Progress.Track>
                          <Progress.Range />
                        </Progress.Track>
                      </Progress.Root>
                      <Text fontSize="xs" color="green.600" minW="40px">
                        {progress}%
                      </Text>
                    </HStack>
                  </VStack>
                  <CaretDown
                    size={16}
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                </Button>
              </Collapsible.Trigger>

              <Collapsible.Content>
                <Box p="2" bg="green.50" borderTop="1px solid" borderColor="green.200">
                  <Stack gap="1">
                    {module.lessons.map((lesson) => {
                      const isCompleted = completedLessons.has(lesson.id);
                      return (
                        <Button
                          key={lesson.id}
                          w="full"
                          justifyContent="flex-start"
                          variant="ghost"
                          colorPalette="green"
                          size="sm"
                          onClick={() => handleLessonClick(module.id, lesson.id)}
                          _hover={{ bg: "green.100" }}
                          p="2"
                          h="auto"
                        >
                          <HStack gap="2" w="full">
                            {isCompleted ? (
                              <CheckCircle size={16} color="#22c55e" weight="fill" />
                            ) : (
                              <VideoCamera size={16} color="#22c55e" />
                            )}
                            <VStack align="flex-start" gap="0" flex="1">
                              <Text fontSize="xs" color="green.800" textAlign="left">
                                {lesson.title}
                              </Text>
                              <Text fontSize="xs" color="green.600">
                                {lesson.duration} Min.
                              </Text>
                            </VStack>
                          </HStack>
                        </Button>
                      );
                    })}
                  </Stack>
                </Box>
              </Collapsible.Content>
            </Box>
          </Collapsible.Root>
        );
      })}
    </Stack>
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

        {/* Lerne die Grundlagen Drawer Button */}
        <ModuleDrawerButton />

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
