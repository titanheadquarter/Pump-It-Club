"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Card,
  VStack,
  HStack,
  Button,
  Table,
  Badge,
  IconButton,
  Input,
  Textarea,
  Select,
  Switch,
  FormControl,
  FormLabel,
  Spinner,
  Alert,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Plus,
  Pencil,
  Trash,
  Eye,
  EyeSlash,
} from "@phosphor-icons/react";

interface FAQ {
  id: string;
  slug: string;
  title: string;
  content: string;
  summary?: string;
  category_id?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  comment_count: number;
  like_count: number;
  view_count: number;
  faq_categories?: {
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    category_id: "",
    slug: "",
    is_published: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Lade alle FAQs (inkl. nicht veröffentlichte)
      const faqResponse = await fetch("/api/faq");
      const faqData = faqResponse.ok ? await faqResponse.json() : { faqs: [] };

      // Lade Kategorien
      const catResponse = await fetch("/api/faq/categories");
      const catData = catResponse.ok ? await catResponse.json() : { categories: [] };

      setFaqs(faqData.faqs || []);
      setCategories(catData.categories || []);
    } catch (err) {
      console.error("Error loading data:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingFaq(null);
    setFormData({
      title: "",
      content: "",
      summary: "",
      category_id: "",
      slug: "",
      is_published: false,
    });
    setFaqModalOpen(true);
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      title: faq.title,
      content: faq.content,
      summary: faq.summary || "",
      category_id: faq.category_id || "",
      slug: faq.slug,
      is_published: faq.is_published,
    });
    setFaqModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        ...formData,
        category_id: formData.category_id || null,
      };

      let response;
      if (editingFaq) {
        response = await fetch(`/api/faq/${editingFaq.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch("/api/faq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }

      if (response.ok) {
        await loadData();
        setFaqModalOpen(false);
      } else {
        const error = await response.json();
        setError(error.message || "Fehler beim Speichern");
      }
    } catch (err) {
      console.error("Save error:", err);
      setError("Fehler beim Speichern");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("FAQ wirklich löschen?")) return;

    try {
      const response = await fetch(`/api/faq/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadData();
      } else {
        setError("Fehler beim Löschen");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError("Fehler beim Löschen");
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  if (loading) {
    return (
      <VStack gap={4} py={8}>
        <Spinner size="lg" color="green.500" />
        <Text>Lade FAQs...</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Fehler</Alert.Title>
          <Alert.Description>Fehler: {error}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Stack gap={6}>
      <VStack gap={2} align="start">
        <Heading size="lg">FAQ Verwaltung</Heading>
        <Text color="gray.600">
          Erstelle und verwalte häufig gestellte Fragen
        </Text>
      </VStack>

      {/* Header Actions */}
      <HStack justify="space-between">
        <Text fontSize="sm" color="gray.600">
          {faqs.length} FAQs insgesamt
        </Text>
        <Button onClick={handleCreate} colorPalette="green">
          <HStack gap={2}>
            <Plus size={16} />
            <Text>Neue FAQ</Text>
          </HStack>
        </Button>
      </HStack>

      {/* FAQ Table */}
      <Card.Root>
        <Card.Body p={0}>
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Titel</Table.ColumnHeader>
                <Table.ColumnHeader>Kategorie</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Stats</Table.ColumnHeader>
                <Table.ColumnHeader>Aktionen</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {faqs.map((faq) => (
                <Table.Row key={faq.id}>
                  <Table.Cell>
                    <VStack align="start" gap={1}>
                      <Text fontWeight="medium" noOfLines={1}>
                        {faq.title}
                      </Text>
                      <Text fontSize="xs" color="gray.600" noOfLines={1}>
                        {faq.slug}
                      </Text>
                    </VStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="subtle" colorPalette="blue">
                      {faq.faq_categories?.name || "Keine"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      variant="subtle"
                      colorPalette={faq.is_published ? "green" : "gray"}
                    >
                      {faq.is_published ? "Veröffentlicht" : "Entwurf"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={3}>
                      <HStack gap={1}>
                        <Eye size={14} />
                        <Text fontSize="xs">{faq.view_count}</Text>
                      </HStack>
                      <HStack gap={1}>
                        <Text fontSize="xs">👍 {faq.like_count}</Text>
                      </HStack>
                      <HStack gap={1}>
                        <Text fontSize="xs">💬 {faq.comment_count}</Text>
                      </HStack>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={1}>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(faq)}
                        aria-label="Bearbeiten"
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorPalette="red"
                        onClick={() => handleDelete(faq.id)}
                        aria-label="Löschen"
                      >
                        <Trash size={16} />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card.Body>
      </Card.Root>

      {/* Create/Edit Dialog */}
      <DialogRoot open={faqModalOpen} onOpenChange={(e) => !e.open && setFaqModalOpen(false)}>
        <DialogContent maxW="lg">
          <DialogHeader>
            <DialogTitle>
              {editingFaq ? "FAQ bearbeiten" : "Neue FAQ erstellen"}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack gap={4} align="stretch">
              <FormControl>
                <FormLabel>Titel</FormLabel>
                <Input
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="FAQ Titel eingeben"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Slug</FormLabel>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="URL-freundlicher Slug"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Kategorie</FormLabel>
                <Select
                  value={formData.category_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                >
                  <option value="">Keine Kategorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Zusammenfassung (optional)</FormLabel>
                <Textarea
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Kurze Zusammenfassung der FAQ"
                  rows={2}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Inhalt</FormLabel>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Detaillierte Antwort auf die FAQ"
                  rows={6}
                />
              </FormControl>

              <FormControl>
                <HStack justify="space-between">
                  <FormLabel mb={0}>Veröffentlicht</FormLabel>
                  <Switch
                    checked={formData.is_published}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                  />
                </HStack>
              </FormControl>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <HStack gap={3}>
              <Button variant="outline" onClick={() => setFaqModalOpen(false)}>
                Abbrechen
              </Button>
              <Button colorPalette="green" onClick={handleSave}>
                {editingFaq ? "Aktualisieren" : "Erstellen"}
              </Button>
            </HStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Stack>
  );
}