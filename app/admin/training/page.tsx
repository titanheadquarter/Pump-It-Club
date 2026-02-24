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
  Dumbbell,
  Users,
} from "@phosphor-icons/react";

interface TrainingPlan {
  id: string;
  slug: string;
  name: string;
  gender: string | null;
  description: string;
  exercises?: any[]; // Vereinfacht
}

export default function AdminTraining() {
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trainingModalOpen, setTrainingModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TrainingPlan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    gender: "",
    description: "",
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/training-plans");
      const data = response.ok ? await response.json() : { plans: [] };

      setPlans(data.plans || []);
    } catch (err) {
      console.error("Error loading plans:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      slug: "",
      gender: "",
      description: "",
    });
    setTrainingModalOpen(true);
  };

  const handleEdit = (plan: TrainingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      slug: plan.slug,
      gender: plan.gender || "",
      description: plan.description,
    });
    setTrainingModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        ...formData,
        gender: formData.gender || null,
      };

      // Hier würde normalerweise eine Admin-API-Route verwendet werden
      // Für jetzt simulieren wir das Speichern
      console.log("Saving training plan:", data);

      // Simuliere erfolgreiches Speichern
      await new Promise(resolve => setTimeout(resolve, 1000));

      await loadPlans();
      setTrainingModalOpen(false);
    } catch (err) {
      console.error("Save error:", err);
      setError("Fehler beim Speichern");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Trainingsplan wirklich löschen?")) return;

    try {
      // Hier würde normalerweise eine Admin-API-Route verwendet werden
      console.log("Deleting training plan:", id);

      // Simuliere erfolgreiches Löschen
      await new Promise(resolve => setTimeout(resolve, 500));

      await loadPlans();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Fehler beim Löschen");
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  if (loading) {
    return (
      <VStack gap={4} py={8}>
        <Spinner size="lg" color="green.500" />
        <Text>Lade Trainingspläne...</Text>
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
        <Heading size="lg">Trainingsplan Verwaltung</Heading>
        <Text color="gray.600">
          Erstelle und verwalte Trainingspläne für deine Mitglieder
        </Text>
      </VStack>

      {/* Header Actions */}
      <HStack justify="space-between">
        <Text fontSize="sm" color="gray.600">
          {plans.length} Trainingspläne insgesamt
        </Text>
        <Button onClick={handleCreate} colorPalette="green">
          <HStack gap={2}>
            <Plus size={16} />
            <Text>Neuer Plan</Text>
          </HStack>
        </Button>
      </HStack>

      {/* Training Plans Table */}
      <Card.Root>
        <Card.Body p={0}>
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>Name</Table.ColumnHeader>
                <Table.ColumnHeader>Geschlecht</Table.ColumnHeader>
                <Table.ColumnHeader>Slug</Table.ColumnHeader>
                <Table.ColumnHeader>Beschreibung</Table.ColumnHeader>
                <Table.ColumnHeader>Aktionen</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {plans.map((plan) => (
                <Table.Row key={plan.id}>
                  <Table.Cell>
                    <VStack align="start" gap={1}>
                      <Text fontWeight="medium" noOfLines={1}>
                        {plan.name}
                      </Text>
                    </VStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="subtle" colorPalette="purple">
                      {plan.gender === "male" ? "Männer" :
                       plan.gender === "female" ? "Frauen" : "Alle"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="xs" color="gray.600">
                      {plan.slug}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text fontSize="sm" noOfLines={2}>
                      {plan.description}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={1}>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(plan)}
                        aria-label="Bearbeiten"
                      >
                        <Pencil size={16} />
                      </IconButton>
                      <IconButton
                        size="sm"
                        variant="ghost"
                        colorPalette="red"
                        onClick={() => handleDelete(plan.id)}
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
      <DialogRoot open={trainingModalOpen} onOpenChange={(e) => !e.open && setTrainingModalOpen(false)}>
        <DialogContent maxW="lg">
          <DialogHeader>
            <DialogTitle>
              {editingPlan ? "Trainingsplan bearbeiten" : "Neuer Trainingsplan"}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack gap={4} align="stretch">
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Name
                </Text>
                <Input
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Trainingsplan Name"
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Slug
                </Text>
                <Input
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="URL-freundlicher Slug"
                />
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Zielgruppe
                </Text>
                <Select
                  value={formData.gender}
                  onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="">Alle</option>
                  <option value="male">Männer</option>
                  <option value="female">Frauen</option>
                </Select>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Beschreibung
                </Text>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Beschreibe den Trainingsplan"
                  rows={4}
                />
              </Box>
            </VStack>
          </DialogBody>
          <DialogFooter>
            <HStack gap={3}>
              <Button variant="outline" onClick={() => setTrainingModalOpen(false)}>
                Abbrechen
              </Button>
              <Button colorPalette="green" onClick={handleSave}>
                {editingPlan ? "Aktualisieren" : "Erstellen"}
              </Button>
            </HStack>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Stack>
  );
}