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
  useToast,
  Spinner,
  Alert,
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
import { FaqItem } from "@/components/ui/handyapp/faq-item";
import { useAuth } from "@/components/provider/auth-provider";

// Types für die API
interface FAQ {
  id: string;
  slug: string;
  title: string;
  content: string;
  summary?: string;
  category_id?: string;
  is_published: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
  comment_count: number;
  like_count: number;
  view_count: number;
  faq_categories?: {
    name: string;
    slug: string;
  };
  profiles?: {
    full_name?: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

interface UserQuestion {
  id: string;
  question: string;
  category: string;
  author: string;
  createdAt: string;
  answers: { id: string; answer: string; author: string; createdAt: string; helpful: number; isAccepted: boolean }[];
  views: number;
  status: "open" | "answered" | "closed";
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([]);
  const [activeTab, setActiveTab] = useState<"faq" | "forum" | "ask">("faq");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    category: "allgemein",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();
  const { getAccessToken } = useAuth();

  // Lade FAQs und Kategorien von der API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Lade FAQs
        const faqResponse = await fetch("/api/faq?published=true");
        if (!faqResponse.ok) {
          throw new Error("Failed to load FAQs");
        }
        const faqData = await faqResponse.json();
        setFaqs(faqData.faqs || []);

        // Lade Kategorien
        const catResponse = await fetch("/api/faq/categories");
        if (!catResponse.ok) {
          throw new Error("Failed to load categories");
        }
        const catData = await catResponse.json();
        setCategories(catData.categories || []);

      } catch (err) {
        console.error("Error loading data:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Lade gespeicherte Fragen aus localStorage (für Demo-Zwecke)
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

  // Erstelle Kategorie-Mapping
  const categoryLabels = useMemo(() => {
    const labels: Record<string, string> = { all: "Alle" };
    categories.forEach(cat => {
      labels[cat.slug] = cat.name;
    });
    return labels;
  }, [categories]);

  // Erstelle Kategorie-Array für Filter-Buttons
  const categoryOptions = useMemo(() => {
    return ["all", ...categories.map(cat => cat.slug)];
  }, [categories]);

  // Filtere FAQs nach Kategorie und Suche
  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((faq) => faq.faq_categories?.slug === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.title.toLowerCase().includes(query) ||
          faq.content.toLowerCase().includes(query) ||
          faq.summary?.toLowerCase().includes(query)
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


  if (loading) {
    return (
      <Section header>
        <Stack gap="6">
          <Stack gap="2">
            <Heading>FAQ & Forum</Heading>
            <Text color="green.700">
              Finde Antworten auf häufige Fragen oder stelle deine eigene Frage in unserem Forum.
            </Text>
          </Stack>
          <VStack gap="4" py="8">
            <Spinner size="lg" color="green.500" />
            <Text color="gray.600">Lade FAQs...</Text>
          </VStack>
        </Stack>
      </Section>
    );
  }

  if (error) {
    return (
      <Section header>
        <Stack gap="6">
          <Stack gap="2">
            <Heading>FAQ & Forum</Heading>
            <Text color="green.700">
              Finde Antworten auf häufige Fragen oder stelle deine eigene Frage in unserem Forum.
            </Text>
          </Stack>
          <Alert.Root status="error">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Fehler</Alert.Title>
              <Alert.Description>Fehler beim Laden der FAQs: {error}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </Stack>
      </Section>
    );
  }

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
                {categoryOptions.map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={selectedCategory === cat ? "solid" : "outline"}
                    colorPalette="green"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {categoryLabels[cat]}
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
                                    {faq.faq_categories?.name || "Allgemein"}
                                  </Badge>
                                </HStack>
                                <HStack gap="3" fontSize="xs" color="green.600">
                                  <HStack gap="1">
                                    <Eye size={14} />
                                    <Text>{faq.view_count}</Text>
                                  </HStack>
                                  <HStack gap="1">
                                    <ThumbsUp size={14} />
                                    <Text>{faq.like_count}</Text>
                                  </HStack>
                                  <HStack gap="1">
                                    <ChatCircle size={14} />
                                    <Text>{faq.comment_count}</Text>
                                  </HStack>
                                </HStack>
                              </HStack>
                              <FaqItem question={faq.title} answer={faq.content} />
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
                        {categories.map((cat) => (
                          <Button
                            key={cat.slug}
                            size="sm"
                            variant={newQuestion.category === cat.slug ? "solid" : "outline"}
                            colorPalette="green"
                            onClick={() => setNewQuestion({ ...newQuestion, category: cat.slug })}
                          >
                            {cat.name}
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
