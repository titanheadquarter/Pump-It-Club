"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Heading,
  Text,
  Card,
  Button,
  Stack,
  Box,
  HStack,
  VStack,
  Progress,
  Input,
  Tabs,
} from "@chakra-ui/react";
import { Link } from "@/components/ui/link";
import { Section } from "@/components/layout/section";
import { VimeoPlayer } from "@/components/ui/mainpage/vimeo-player";
import {
  modules,
  getAllLessons,
  getModuleById,
  getLessonById,
  calculateProgress,
  type Module,
  type Lesson,
} from "./data";
import {
  ArrowLeft,
  Play,
  VideoCamera,
  CheckCircle,
  Paperclip,
  X,
} from "@phosphor-icons/react";

interface Note {
  id: string;
  lessonId: string;
  content: string;
  timestamp: number; // in Sekunden
  createdAt: string;
}

export default function LerneDieGrundlagen() {
  const searchParams = useSearchParams();
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState("");
  const [videoTimestamp, setVideoTimestamp] = useState(0);

  // Lade gespeicherte Daten aus localStorage
  useEffect(() => {
    const savedCompleted = localStorage.getItem("completedLessons");
    if (savedCompleted) {
      setCompletedLessons(new Set(JSON.parse(savedCompleted)));
    }

    const savedNotes = localStorage.getItem("courseNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Lade Module und Lektion aus URL-Parametern
  useEffect(() => {
    const moduleParam = searchParams.get("module");
    const lessonParam = searchParams.get("lesson");

    if (moduleParam && lessonParam) {
      const module = getModuleById(moduleParam);
      const lesson = getLessonById(lessonParam);
      
      if (module && lesson && module.lessons.some((l) => l.id === lessonParam)) {
        setSelectedModuleId(moduleParam);
        setSelectedLessonId(lessonParam);
      }
    }
  }, [searchParams]);

  // Speichere completed lessons
  useEffect(() => {
    if (completedLessons.size > 0) {
      localStorage.setItem("completedLessons", JSON.stringify(Array.from(completedLessons)));
    }
  }, [completedLessons]);

  // Speichere Notizen
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("courseNotes", JSON.stringify(notes));
    }
  }, [notes]);

  const selectedModule = selectedModuleId ? getModuleById(selectedModuleId) : null;
  const selectedLesson = selectedLessonId ? getLessonById(selectedLessonId) : null;
  const allLessons = getAllLessons();

  // Berechne Gesamtfortschritt
  const overallProgress = useMemo(() => {
    return calculateProgress(allLessons.map((l) => ({
      ...l,
      completed: completedLessons.has(l.id),
    })));
  }, [completedLessons]);

  // Berechne Modul-Fortschritt
  const moduleProgress = useMemo(() => {
    if (!selectedModule) return 0;
    const moduleLessons = selectedModule.lessons.map((l) => ({
      ...l,
      completed: completedLessons.has(l.id),
    }));
    return calculateProgress(moduleLessons);
  }, [selectedModule, completedLessons]);

  const handleLessonClick = (lessonId: string, moduleId: string) => {
    setSelectedLessonId(lessonId);
    setSelectedModuleId(moduleId);
  };

  const handleCompleteLesson = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  };

  const handleAddNote = () => {
    if (!currentNote.trim() || !selectedLessonId) return;

    const newNote: Note = {
      id: Date.now().toString(),
      lessonId: selectedLessonId,
      content: currentNote,
      timestamp: videoTimestamp,
      createdAt: new Date().toISOString(),
    };

    setNotes([...notes, newNote]);
    setCurrentNote("");
    setVideoTimestamp(0);
  };

  const handleTimestampClick = () => {
    // In einer echten Implementierung würde man hier den aktuellen Video-Timestamp abrufen
    // Für jetzt setzen wir einen Beispielwert
    setVideoTimestamp(Math.floor(Math.random() * 300)); // Beispiel: 0-300 Sekunden
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter((n) => n.id !== noteId));
  };

  const formatTimestamp = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDuration = (minutes: number): string => {
    return `${minutes} Min.`;
  };

  const lessonNotes = notes.filter((n) => n.lessonId === selectedLessonId);

  // Übersichtsansicht
  if (!selectedModule || !selectedLesson) {
    return (
      <Section header>
        <Stack gap="6">
          <Stack gap="2">
            <Heading>Lerne die Grundlagen</Heading>
            <Text color="green.700">
              Hier lernst du die wichtigsten Grundlagen für ein erfolgreiches Training und eine
              ausgewogene Ernährung.
            </Text>
          </Stack>

          {/* Gesamtfortschritt */}
          <Card.Root>
            <Card.Body>
              <Stack gap="4">
                <HStack justify="space-between">
                  <Text fontSize="sm" fontWeight="medium" color="green.700">
                    KURSINHALT
                  </Text>
                  <Text fontSize="sm" color="green.600">
                    {allLessons.length} Lektionen
                  </Text>
                </HStack>
                <Stack gap="2">
                  <HStack justify="space-between">
                    <Text fontSize="sm" color="green.700">
                      Gesamtfortschritt
                    </Text>
                    <Text fontSize="sm" color="green.600" fontWeight="medium">
                      {overallProgress}%
                    </Text>
                  </HStack>
                  <Progress.Root value={overallProgress} colorPalette="green" size="sm">
                    <Progress.Track>
                      <Progress.Range />
                    </Progress.Track>
                  </Progress.Root>
                </Stack>
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Module */}
          <Stack gap="4">
            {modules.map((module) => {
              const moduleLessons = module.lessons.map((l) => ({
                ...l,
                completed: completedLessons.has(l.id),
              }));
              const progress = calculateProgress(moduleLessons);
              const completedCount = moduleLessons.filter((l) => l.completed).length;

              return (
                <Card.Root
                  key={module.id}
                  cursor="pointer"
                  onClick={() => {
                    setSelectedModuleId(module.id);
                    setSelectedLessonId(module.lessons[0].id);
                  }}
                  borderColor="green.200"
                  _hover={{
                    borderColor: "green.400",
                    boxShadow: "md",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                >
                  <Card.Body>
                    <Stack gap="3">
                      <HStack justify="space-between">
                        <Heading size="md" color="green.800">
                          {module.title}
                        </Heading>
                        <HStack gap="2">
                          <Text fontSize="sm" color="green.600" fontWeight="medium">
                            {completedCount}/{module.lessons.length}
                          </Text>
                          <Text fontSize="sm" color="green.600" fontWeight="bold">
                            {progress}%
                          </Text>
                        </HStack>
                      </HStack>
                      <Progress.Root value={progress} colorPalette="green" size="sm">
                        <Progress.Track>
                          <Progress.Range />
                        </Progress.Track>
                      </Progress.Root>
                      <HStack justify="space-between">
                        <Text fontSize="sm" color="green.700">
                          {module.lessons.length} Lektionen
                        </Text>
                        <Button
                          size="xs"
                          variant="ghost"
                          colorPalette="green"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedModuleId(module.id);
                            setSelectedLessonId(module.lessons[0].id);
                          }}
                        >
                          Öffnen →
                        </Button>
                      </HStack>
                    </Stack>
                  </Card.Body>
                </Card.Root>
              );
            })}
          </Stack>
        </Stack>
      </Section>
    );
  }

  // Detailansicht mit Video
  return (
    <Section header>
      <Stack gap="6">
        {/* Header */}
        <Stack gap="2">
          <Button
            variant="ghost"
            colorPalette="green"
            size="sm"
            leftIcon={<ArrowLeft size={16} />}
            onClick={() => {
              setSelectedModuleId(null);
              setSelectedLessonId(null);
            }}
          >
            Zurück zur Übersicht
          </Button>
          <Heading size="lg" color="green.800">
            {selectedModule.title.toUpperCase()}
          </Heading>
        </Stack>

        {/* Kursinhalt mit Progress */}
        <Card.Root>
          <Card.Body>
            <Stack gap="4">
              <HStack justify="space-between">
                <Text fontSize="sm" fontWeight="medium" color="green.700">
                  KURSINHALT
                </Text>
                <Text fontSize="sm" color="green.600">
                  {selectedModule.lessons.length} Lektionen
                </Text>
              </HStack>
              <Stack gap="2">
                <HStack justify="space-between">
                  <Text fontSize="sm" color="green.700">
                    Fortschritt
                  </Text>
                  <Text fontSize="sm" color="green.600" fontWeight="medium">
                    {moduleProgress}%
                  </Text>
                </HStack>
                <Progress.Root value={moduleProgress} colorPalette="green" size="sm">
                  <Progress.Track>
                    <Progress.Range />
                  </Progress.Track>
                </Progress.Root>
              </Stack>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Hauptinhalt: Lektionsliste + Video */}
        <HStack align="flex-start" gap="6" flexDirection={{ base: "column", lg: "row" }}>
          {/* Lektionsliste */}
          <Box flex="1" minW={{ base: "full", lg: "300px" }}>
            <Card.Root>
              <Card.Body>
                <Stack gap="4">
                  <Text fontSize="sm" fontWeight="bold" color="green.700" textTransform="uppercase">
                    LEKTIONSINHALT
                  </Text>
                  <Stack gap="2">
                    {selectedModule.lessons.map((lesson) => {
                      const isSelected = lesson.id === selectedLessonId;
                      const isCompleted = completedLessons.has(lesson.id);

                      return (
                        <Box
                          key={lesson.id}
                          p="3"
                          borderRadius="md"
                          bg={isSelected ? "green.50" : "transparent"}
                          border="1px solid"
                          borderColor={isSelected ? "green.300" : "green.200"}
                          cursor="pointer"
                          onClick={() => handleLessonClick(lesson.id, selectedModule.id)}
                          _hover={{
                            bg: "green.50",
                            borderColor: "green.300",
                          }}
                          transition="all 0.2s"
                        >
                          <HStack gap="2" justify="space-between">
                            <HStack gap="2" flex="1">
                              {isCompleted ? (
                                <CheckCircle size={20} color="#22c55e" weight="fill" />
                              ) : isSelected ? (
                                <Play size={20} color="#22c55e" weight="fill" />
                              ) : (
                                <VideoCamera size={20} color="#22c55e" />
                              )}
                              <VStack align="flex-start" gap="0" flex="1">
                                <Text
                                  fontSize="sm"
                                  fontWeight={isSelected ? "semibold" : "normal"}
                                  color={isSelected ? "green.800" : "green.700"}
                                >
                                  {lesson.title}
                                </Text>
                                <Text fontSize="xs" color="green.600">
                                  {formatDuration(lesson.duration)}
                                </Text>
                              </VStack>
                            </HStack>
                            {isSelected && (
                              <Button
                                size="xs"
                                variant="ghost"
                                colorPalette="green"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCompleteLesson(lesson.id);
                                }}
                              >
                                {isCompleted ? "Als unvollständig markieren" : "Als erledigt markieren"}
                              </Button>
                            )}
                          </HStack>
                        </Box>
                      );
                    })}
                  </Stack>
                </Stack>
              </Card.Body>
            </Card.Root>
          </Box>

          {/* Video Player */}
          <Box flex="2" minW={{ base: "full", lg: "600px" }}>
            <Card.Root>
              <Card.Body>
                <Stack gap="4">
                  <VimeoPlayer videoId={selectedLesson.videoId} />
                </Stack>
              </Card.Body>
            </Card.Root>
          </Box>
        </HStack>

        {/* Notizen-Sektion */}
        <Card.Root>
          <Card.Body>
            <Stack gap="4">
              <Tabs.Root defaultValue="notes" colorPalette="green">
                <Tabs.List>
                  <Tabs.Trigger value="notes">Notizen</Tabs.Trigger>
                  <Tabs.Trigger value="attachments">Anhänge</Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="notes">
                  <Stack gap="4" mt="4">
                    <Heading size="sm" color="green.800">
                      Neue Notiz erstellen
                    </Heading>
                    <HStack gap="2">
                      <Input
                        placeholder="Schreibe deine Gedanken hier..."
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                        colorPalette="green"
                        flex="1"
                      />
                      <Button
                        variant="outline"
                        colorPalette="green"
                        onClick={handleTimestampClick}
                      >
                        Zeitstempel: {formatTimestamp(videoTimestamp)}
                      </Button>
                      <Button colorPalette="green" onClick={handleAddNote} disabled={!currentNote.trim()}>
                        Hinzufügen
                      </Button>
                    </HStack>

                    {lessonNotes.length > 0 ? (
                      <Stack gap="2" mt="4">
                        <Text fontSize="sm" fontWeight="medium" color="green.700">
                          Deine Notizen ({lessonNotes.length})
                        </Text>
                        {lessonNotes.map((note) => (
                          <Card.Root key={note.id} borderColor="green.200">
                            <Card.Body>
                              <Stack gap="2">
                                <HStack justify="space-between">
                                  <HStack gap="2">
                                    <Text fontSize="xs" color="green.600" fontWeight="medium">
                                      {formatTimestamp(note.timestamp)}
                                    </Text>
                                  </HStack>
                                  <HStack gap="2">
                                    <Text fontSize="xs" color="green.600">
                                      {new Date(note.createdAt).toLocaleDateString("de-DE", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      })}
                                    </Text>
                                    <Button
                                      size="xs"
                                      variant="ghost"
                                      colorPalette="red"
                                      onClick={() => handleDeleteNote(note.id)}
                                    >
                                      <X size={14} />
                                    </Button>
                                  </HStack>
                                </HStack>
                                <Text fontSize="sm" color="green.800">
                                  {note.content}
                                </Text>
                              </Stack>
                            </Card.Body>
                          </Card.Root>
                        ))}
                      </Stack>
                    ) : (
                      <Box mt="4" p="4" bg="green.50" borderRadius="md" border="1px solid" borderColor="green.200">
                        <Text fontSize="sm" color="green.700" textAlign="center">
                          Noch keine Notizen für diese Lektion.
                        </Text>
                      </Box>
                    )}
                  </Stack>
                </Tabs.Content>

                <Tabs.Content value="attachments">
                  <Stack gap="4" mt="4">
                    <Text fontSize="sm" color="green.700">
                      Hier kannst du später Anhänge zu dieser Lektion hinzufügen.
                    </Text>
                  </Stack>
                </Tabs.Content>
              </Tabs.Root>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Section>
  );
}
