"use client";

import {
  Box,
  VStack,
  Button,
  Input,
  Steps,
  RadioGroup,
  ButtonGroup,
  VisuallyHidden,
  Flex,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useState } from "react";
import { projectConfig } from "@/config";

const beschreibungItems = [
  { label: "A) Angestellter/ Fachkraft", value: "angestellter" },
  { label: "B) Führungskraft/ Geschäftsinhaber", value: "fuehrungskraft" },
  { label: "C) Selbstständiger/ Unternehmer", value: "selbststaendig" },
];

const investitionItems = [
  { label: "A) Ich bin bereit, viel für meine Gesundheit zu investieren um meine Ziele zu erreichen.", value: "viel-investieren" },
  { label: "B) Ich ziehe preisgünstige Optionen für meine Gesundheit vor.", value: "preisguenstig" },
  { label: "C) Ich möchte kein Geld in meine Gesundheit investieren.", value: "kein-investment" },
];

const wichtigkeitItems = [
  { label: "A) Sehr wichtig", value: "sehr-wichtig" },
  { label: "B) Wichtig", value: "wichtig" },
  { label: "C) Aktuell nicht wichtig", value: "nicht-wichtig" },
];

const formSteps = [
  { title: "Beruf", description: "Was beschreibt dich am besten?" },
  { title: "Investition", description: "Einstellung zu Investitionen" },
  { title: "Ziel", description: "Wichtigkeit deines Ziels" },
  { title: "Deine Daten", description: "Kontakt für das Erstgespräch" },
];

const buildFunnelQueryString = (formData: Record<string, string>) => {
  const params = new URLSearchParams();
  if (formData.name) params.set("name", encodeURIComponent(formData.name));
  if (formData.email) params.set("email", encodeURIComponent(formData.email));
  if (formData.telefon) params.set("telefon", encodeURIComponent(formData.telefon));
  if (formData.beschreibung) params.set("beschreibung", encodeURIComponent(formData.beschreibung));
  if (formData.investition) params.set("investition", encodeURIComponent(formData.investition));
  if (formData.wichtigkeit) params.set("wichtigkeit", encodeURIComponent(formData.wichtigkeit));
  return params.toString() ? `?${params.toString()}` : "";
};

export function LeadFormSection() {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telefon: "",
    beschreibung: "",
    investition: "",
    wichtigkeit: "",
  });

  const totalSteps = 4;
  const canGoNext = () => {
    if (formStep === 0) return !!formData.beschreibung;
    if (formStep === 1) return !!formData.investition;
    if (formStep === 2) return !!formData.wichtigkeit;
    return true;
  };

  const handleNextStep = () => {
    if (formStep < totalSteps - 1) {
      setFormStep((s) => s + 1);
      const queryString = buildFunnelQueryString(formData);
      if (queryString) window.history.replaceState({}, "", window.location.pathname + queryString);
    }
  };

  const handlePrevStep = () => {
    if (formStep > 0) setFormStep((s) => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Bitte fülle alle erforderlichen Felder aus.");
      return;
    }
    if (typeof window !== "undefined" && window.Outseta?.auth?.open) {
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      const registrationDefaults = {
        Person: {
          Email: formData.email.trim(),
          FirstName: firstName,
          LastName: lastName,
        },
      };
      const planUid = projectConfig.auth.plans.freeFunnelKurs.uid;
      window.Outseta.auth.open({
        planUid,
        state: "register",
        registrationDefaults,
      });
      const queryString = buildFunnelQueryString(formData);
      if (queryString) window.history.replaceState({}, "", window.location.pathname + queryString);
    } else {
      alert("Outseta ist nicht verfügbar. Bitte lade die Seite neu.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Flex
      id="lead-form"
      as="section"
      minH="100vh"
      w="full"
      align="center"
      justify="center"
      bg="gray.50"
      py={{ base: 8, md: 12 }}
      px={4}
    >
      <Box
        width="full"
        maxWidth="700px"
        textAlign="left"
        bg="white"
        p={{ base: 5, md: 8 }}
        borderRadius="xl"
        shadow="xl"
        border="1px solid"
        borderColor="gray.200"
      >
        <form onSubmit={handleSubmit}>
          <Steps.Root
            count={totalSteps}
            step={formStep}
            onStepChange={(e) => setFormStep(e.step)}
            size="sm"
            colorPalette="green"
          >
            <Steps.List mb={6}>
              {formSteps.map((s, index) => (
                <Steps.Item key={index} index={index} title={s.title}>
                  <Steps.Indicator />
                  <VisuallyHidden>
                    <Steps.Title>{s.title}</Steps.Title>
                  </VisuallyHidden>
                  <Steps.Separator />
                </Steps.Item>
              ))}
            </Steps.List>

            <Steps.Content index={0}>
              <Field label="Was beschreibt dich am besten?" required mb={6}>
                <RadioGroup.Root
                  value={formData.beschreibung}
                  onValueChange={(e) => handleInputChange("beschreibung", e.value)}
                  colorPalette="green"
                  size="lg"
                  variant="outline"
                >
                  <VStack gap={3} align="stretch">
                    {beschreibungItems.map((item) => (
                      <RadioGroup.Item
                        key={item.value}
                        value={item.value}
                        borderWidth="2px"
                        borderColor="gray.300"
                        _checked={{ borderColor: "green.500", bg: "green.50" }}
                        borderRadius="lg"
                        px={4}
                        py={3}
                      >
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator borderWidth="2px" borderColor="gray.400" _checked={{ borderColor: "green.500", bg: "green.500" }} />
                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </VStack>
                </RadioGroup.Root>
              </Field>
            </Steps.Content>

            <Steps.Content index={1}>
              <Field
                label="Wie ist deine Einstellung zu Investitionen in dich und deine Gesundheit?"
                required
                mb={6}
              >
                <RadioGroup.Root
                  value={formData.investition}
                  onValueChange={(e) => handleInputChange("investition", e.value)}
                  colorPalette="green"
                  size="lg"
                  variant="outline"
                >
                  <VStack gap={3} align="stretch">
                    {investitionItems.map((item) => (
                      <RadioGroup.Item
                        key={item.value}
                        value={item.value}
                        borderWidth="2px"
                        borderColor="gray.300"
                        _checked={{ borderColor: "green.500", bg: "green.50" }}
                        borderRadius="lg"
                        px={4}
                        py={3}
                      >
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator borderWidth="2px" borderColor="gray.400" _checked={{ borderColor: "green.500", bg: "green.500" }} />
                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </VStack>
                </RadioGroup.Root>
              </Field>
            </Steps.Content>

            <Steps.Content index={2}>
              <Field
                label="Wie wichtig ist es dir, in den nächsten 6 Monaten dein Ziel zu erreichen?"
                required
                mb={6}
              >
                <RadioGroup.Root
                  value={formData.wichtigkeit}
                  onValueChange={(e) => handleInputChange("wichtigkeit", e.value)}
                  colorPalette="green"
                  size="lg"
                  variant="outline"
                >
                  <VStack gap={3} align="stretch">
                    {wichtigkeitItems.map((item) => (
                      <RadioGroup.Item
                        key={item.value}
                        value={item.value}
                        borderWidth="2px"
                        borderColor="gray.300"
                        _checked={{ borderColor: "green.500", bg: "green.50" }}
                        borderRadius="lg"
                        px={4}
                        py={3}
                      >
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator borderWidth="2px" borderColor="gray.400" _checked={{ borderColor: "green.500", bg: "green.500" }} />
                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </VStack>
                </RadioGroup.Root>
              </Field>
            </Steps.Content>

            <Steps.Content index={3}>
              <VStack gap={5} align="stretch" mb={6}>
                <Field label="Name" required>
                  <Input
                    placeholder="Dein Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px var(--chakra-colors-green-500)" }}
                  />
                </Field>
                <Field label="Email" required>
                  <Input
                    type="email"
                    placeholder="deine@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px var(--chakra-colors-green-500)" }}
                  />
                </Field>
                <Field label="Telefonnummer">
                  <Input
                    type="tel"
                    placeholder="+49 123 456789"
                    value={formData.telefon}
                    onChange={(e) => handleInputChange("telefon", e.target.value)}
                    size="lg"
                    borderRadius="lg"
                    borderColor="gray.300"
                    _focus={{ borderColor: "green.500", boxShadow: "0 0 0 1px var(--chakra-colors-green-500)" }}
                  />
                </Field>
              </VStack>
            </Steps.Content>

            <ButtonGroup size="sm" gap={2} mt={4} flexDirection={{ base: "column", sm: "row" }}>
              {formStep < totalSteps - 1 && (
                <Button
                  type="button"
                  variant="outline"
                  colorPalette="gray"
                  size="sm"
                  onClick={handlePrevStep}
                  flex={1}
                  py={2}
                  fontSize="sm"
                >
                  Zurück
                </Button>
              )}
              {formStep < totalSteps - 1 ? (
                <Button
                  type="button"
                  bg="green.500"
                  color="white"
                  size="sm"
                  flex={formStep === 0 ? 1 : 2}
                  onClick={handleNextStep}
                  disabled={!canGoNext()}
                  _hover={{ bg: "green.600" }}
                  py={2}
                  fontSize="sm"
                >
                  Weiter
                </Button>
              ) : (
                <Button
                  type="submit"
                  width="full"
                  size="lg"
                  bg="linear-gradient(135deg, var(--chakra-colors-green-500) 0%, var(--chakra-colors-green-600) 100%)"
                  color="white"
                  fontWeight="bold"
                  fontSize={{ base: "md", md: "lg" }}
                  py={6}
                  px={8}
                  borderRadius="xl"
                  boxShadow="0 4px 14px 0 rgba(34, 197, 94, 0.4)"
                  _hover={{
                    bg: "linear-gradient(135deg, var(--chakra-colors-green-600) 0%, var(--chakra-colors-green-700) 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px 0 rgba(34, 197, 94, 0.5)",
                  }}
                  _active={{ transform: "translateY(0)" }}
                  transition="all 0.2s ease"
                >
                  Kostenloses Erstgespräch buchen
                </Button>
              )}
            </ButtonGroup>
          </Steps.Root>
        </form>
      </Box>
    </Flex>
  );
}
