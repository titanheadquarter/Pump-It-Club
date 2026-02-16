"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Heading,
  Text,
  Card,
  Button,
  Stack,
  Box,
  HStack,
  VStack,
  Input,
  Textarea,
  Tabs,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import {
  Plus,
  MagnifyingGlass,
  ThumbsUp,
  Eye,
  ChatCircle,
  CheckCircle,
  Clock,
} from "@phosphor-icons/react";
import {
  type FAQQuestion,
  type UserQuestion,
  type FAQAnswer,
  initialFAQs,
  categoryLabels,
  formatDate,
} from "./data";
import { FaqItem } from "@/components/ui/handyapp/faq-item";

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQQuestion[]>(initialFAQs);
  const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([]);
  const [activeTab, setActiveTab] = useState<"faq" | "forum" | "ask">("faq");
  const [selectedCategory, setSelectedCategory] = useState<FAQQuestion["category"] | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    category: "allgemein" as FAQQuestion["category"],
    description: "",
  });

  // Lade gespeicherte Fragen aus localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userQuestions");
    if (saved) {
      setUserQuestions(JSON.parse(saved));
    }
  }, []);

  // Speichere Fragen in localStorage
  useEffect(() => {
    if (userQuestions.length > 0) {
      localStorage.setItem("userQuestions", JSON.stringify(userQuestions));
    }
  }, [userQuestions]);

  // Filtere FAQs nach Kategorie und Suche
  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [faqs, selectedCategory, searchQuery]);

  // Filtere User-Fragen
  const filteredUserQuestions = useMemo(() => {
    let filtered = userQuestions;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((q) => q.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((q) => q.question.toLowerCase().includes(query));
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [userQuestions, selectedCategory, searchQuery]);

  const handleAskQuestion = () => {
    if (!newQuestion.question.trim()) return;

    const question: UserQuestion = {
      id: Date.now().toString(),
      question: newQuestion.question,
      category: newQuestion.category,
      author: "Du", // In einer echten App würde hier der echte Benutzername stehen
      createdAt: new Date().toISOString(),
      answers: [],
      views: 0,
      status: "open",
    };

    setUserQuestions([...userQuestions, question]);
    setNewQuestion({ question: "", category: "allgemein", description: "" });
    setActiveTab("forum");
  };

  const handleAddAnswer = (questionId: string, answer: string) => {
    if (!answer.trim()) return;

    const newAnswer: FAQAnswer = {
      id: Date.now().toString(),
      questionId,
      answer,
      author: "Du",
      createdAt: new Date().toISOString(),
      helpful: 0,
    };

    setUserQuestions(
      userQuestions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [...q.answers, newAnswer],
            status: "answered" as const,
          };
        }
        return q;
      })
    );
  };

  const handleHelpful = (questionId: string, answerId: string) => {
    setUserQuestions(
      userQuestions.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map((a) =>
              a.id === answerId ? { ...a, helpful: a.helpful + 1 } : a
            ),
          };
        }
        return q;
      })
    );
  };

  const categories: (FAQQuestion["category"] | "all")[] = [
    "all",
    "allgemein",
    "training",
    "ernaehrung",
    "app",
    "account",
  ];

  return (
    <Section header>
      <Stack gap="6">
        <Stack gap="2">
          <Heading>FAQ & Forum</Heading>
          <Text color="green.700">
            Finde Antworten auf häufige Fragen oder stelle deine eigene Frage in unserem Forum.
          </Text>
        </Stack>

        {/* Suche und Filter */}
        <Card.Root>
          <Card.Body>
            <Stack gap="4">
              <HStack gap="2">
                <Box position="relative" flex="1">
                  <HStack position="absolute" left="3" top="50%" transform="translateY(-50%)" zIndex="1" pointerEvents="none">
                    <MagnifyingGlass size={20} color="#6b7280" />
                  </HStack>
                  <Input
                    placeholder="Suche nach Fragen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    colorPalette="green"
                    pl="10"
                  />
                </Box>
              </HStack>

              <HStack gap="2" flexWrap="wrap">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={selectedCategory === cat ? "solid" : "outline"}
                    colorPalette="green"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === "all" ? "Alle" : categoryLabels[cat]}
                  </Button>
                ))}
              </HStack>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Tabs */}
        <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value as typeof activeTab)} colorPalette="green">
          <Tabs.List>
            <Tabs.Trigger value="faq">
              FAQ ({filteredFAQs.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="forum">
              Forum ({filteredUserQuestions.length})
            </Tabs.Trigger>
            <Tabs.Trigger value="ask">Frage stellen</Tabs.Trigger>
          </Tabs.List>

          {/* FAQ Tab */}
          <Tabs.Content value="faq">
            <Stack gap="4" mt="4">
              {filteredFAQs.length > 0 ? (
                <Card.Root>
                  <Card.Body p="0">
                    <Stack gap="0">
                      {filteredFAQs.map((faq) => (
                        <Box key={faq.id} borderBottom="1px solid" borderColor="green.100" lastChild={{ borderBottom: "none" }}>
                          <Box p="4">
                            <Stack gap="3">
                              <HStack justify="space-between" align="start">
                                <HStack gap="2" flex="1">
                                  <Badge colorPalette="green" variant="subtle">
                                    {categoryLabels[faq.category]}
                                  </Badge>
                                  {faq.tags?.map((tag) => (
                                    <Badge key={tag} variant="outline" colorPalette="gray" size="sm">
                                      {tag}
                                    </Badge>
                                  ))}
                                </HStack>
                                <HStack gap="3" fontSize="xs" color="green.600">
                                  <HStack gap="1">
                                    <Eye size={14} />
                                    <Text>{faq.views}</Text>
                                  </HStack>
                                  <HStack gap="1">
                                    <ThumbsUp size={14} />
                                    <Text>{faq.helpful}</Text>
                                  </HStack>
                                </HStack>
                              </HStack>
                              <FaqItem question={faq.question} answer={faq.answer} />
                            </Stack>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Card.Body>
                </Card.Root>
              ) : (
                <Card.Root>
                  <Card.Body>
                    <Text color="green.600" textAlign="center">
                      Keine Fragen gefunden. Versuche es mit anderen Suchbegriffen.
                    </Text>
                  </Card.Body>
                </Card.Root>
              )}
            </Stack>
          </Tabs.Content>

          {/* Forum Tab */}
          <Tabs.Content value="forum">
            <Stack gap="4" mt="4">
              {filteredUserQuestions.length > 0 ? (
                <Stack gap="4">
                  {filteredUserQuestions.map((question) => (
                    <Card.Root key={question.id} borderColor="green.200">
                      <Card.Body>
                        <Stack gap="4">
                          {/* Frage Header */}
                          <Stack gap="2">
                            <HStack justify="space-between" align="start">
                              <VStack align="flex-start" gap="1" flex="1">
                                <HStack gap="2" flexWrap="wrap">
                                  <Badge
                                    colorPalette={
                                      question.status === "answered"
                                        ? "green"
                                        : question.status === "closed"
                                        ? "gray"
                                        : "orange"
                                    }
                                    variant="subtle"
                                  >
                                    {question.status === "answered" && (
                                      <HStack gap="1">
                                        <CheckCircle size={12} />
                                        <Text>Beantwortet</Text>
                                      </HStack>
                                    )}
                                    {question.status === "open" && (
                                      <HStack gap="1">
                                        <Clock size={12} />
                                        <Text>Offen</Text>
                                      </HStack>
                                    )}
                                    {question.status === "closed" && <Text>Geschlossen</Text>}
                                  </Badge>
                                  <Badge colorPalette="blue" variant="subtle">
                                    {categoryLabels[question.category]}
                                  </Badge>
                                </HStack>
                                <Heading size="md" color="green.800">
                                  {question.question}
                                </Heading>
                                <HStack gap="3" fontSize="xs" color="green.600">
                                  <Text>von {question.author}</Text>
                                  <Text>•</Text>
                                  <Text>{formatDate(question.createdAt)}</Text>
                                  <Text>•</Text>
                                  <HStack gap="1">
                                    <Eye size={12} />
                                    <Text>{question.views}</Text>
                                  </HStack>
                                  <Text>•</Text>
                                  <HStack gap="1">
                                    <ChatCircle size={12} />
                                    <Text>{question.answers.length} Antworten</Text>
                                  </HStack>
                                </HStack>
                              </VStack>
                            </HStack>
                          </Stack>

                          {/* Antworten */}
                          {question.answers.length > 0 && (
                            <Stack gap="3" pl="4" borderLeft="2px solid" borderColor="green.200">
                              {question.answers.map((answer) => (
                                <Box key={answer.id} p="3" bg="green.50" borderRadius="md">
                                  <Stack gap="2">
                                    <HStack justify="space-between">
                                      <HStack gap="2" fontSize="xs" color="green.600">
                                        <Text fontWeight="medium">{answer.author}</Text>
                                        <Text>•</Text>
                                        <Text>{formatDate(answer.createdAt)}</Text>
                                      </HStack>
                                      <Button
                                        size="xs"
                                        variant="ghost"
                                        colorPalette="green"
                                        onClick={() => handleHelpful(question.id, answer.id)}
                                      >
                                        <HStack gap="1">
                                          <ThumbsUp size={14} />
                                          <Text>{answer.helpful}</Text>
                                        </HStack>
                                      </Button>
                                    </HStack>
                                    <Text fontSize="sm" color="green.800">
                                      {answer.answer}
                                    </Text>
                                  </Stack>
                                </Box>
                              ))}
                            </Stack>
                          )}

                          {/* Antwort hinzufügen */}
                          <Box p="3" bg="green.50" borderRadius="md" border="1px dashed" borderColor="green.300">
                            <Stack gap="2">
                              <Textarea
                                placeholder="Deine Antwort..."
                                colorPalette="green"
                                rows={3}
                                resize="vertical"
                              />
                              <Button
                                size="sm"
                                colorPalette="green"
                                onClick={(e) => {
                                  const textarea = e.currentTarget.parentElement?.querySelector("textarea") as HTMLTextAreaElement;
                                  if (textarea?.value.trim()) {
                                    handleAddAnswer(question.id, textarea.value);
                                    textarea.value = "";
                                  }
                                }}
                              >
                                <HStack gap="2">
                                  <ChatCircle size={16} />
                                  <Text>Antworten</Text>
                                </HStack>
                              </Button>
                            </Stack>
                          </Box>
                        </Stack>
                      </Card.Body>
                    </Card.Root>
                  ))}
                </Stack>
              ) : (
                <Card.Root>
                  <Card.Body>
                    <VStack gap="2">
                      <Text color="green.600" textAlign="center">
                        Noch keine Fragen im Forum.
                      </Text>
                      <Button
                        colorPalette="green"
                        onClick={() => setActiveTab("ask")}
                      >
                        <HStack gap="2">
                          <Plus size={20} />
                          <Text>Erste Frage stellen</Text>
                        </HStack>
                      </Button>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              )}
            </Stack>
          </Tabs.Content>

          {/* Frage stellen Tab */}
          <Tabs.Content value="ask">
            <Stack gap="4" mt="4">
              <Card.Root>
                <Card.Body>
                  <Stack gap="4">
                    <Heading size="sm" color="green.800">
                      Neue Frage stellen
                    </Heading>

                    <Stack gap="2">
                      <Text fontSize="sm" fontWeight="medium" color="green.700">
                        Kategorie
                      </Text>
                      <SimpleGrid columns={{ base: 2, md: 5 }} gap="2">
                        {(["allgemein", "training", "ernaehrung", "app", "account"] as const).map((cat) => (
                          <Button
                            key={cat}
                            size="sm"
                            variant={newQuestion.category === cat ? "solid" : "outline"}
                            colorPalette="green"
                            onClick={() => setNewQuestion({ ...newQuestion, category: cat })}
                          >
                            {categoryLabels[cat]}
                          </Button>
                        ))}
                      </SimpleGrid>
                    </Stack>

                    <Stack gap="2">
                      <Text fontSize="sm" fontWeight="medium" color="green.700">
                        Deine Frage *
                      </Text>
                      <Input
                        placeholder="z.B. Wie oft sollte ich trainieren?"
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                        colorPalette="green"
                      />
                    </Stack>

                    <Stack gap="2">
                      <Text fontSize="sm" fontWeight="medium" color="green.700">
                        Zusätzliche Details (optional)
                      </Text>
                      <Textarea
                        placeholder="Beschreibe deine Frage genauer..."
                        value={newQuestion.description}
                        onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
                        colorPalette="green"
                        rows={4}
                        resize="vertical"
                      />
                    </Stack>

                    <Button
                      colorPalette="green"
                      onClick={handleAskQuestion}
                      disabled={!newQuestion.question.trim()}
                    >
                      <HStack gap="2">
                        <Plus size={20} />
                        <Text>Frage stellen</Text>
                      </HStack>
                    </Button>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </Stack>
          </Tabs.Content>
        </Tabs.Root>
      </Stack>
    </Section>
  );
}
