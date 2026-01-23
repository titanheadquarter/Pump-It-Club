import {
  Heading,
  Stack,
  VStack,
  Text,
  Card,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { generateMetadata } from "@/utils/metadata";
import { Link } from "@/components/ui/link";
import {
  ArrowSquareOut,
  UserCircle,
  CreditCard,
  Palette,
  EnvelopeSimple,
  Lifebuoy,
  Cube,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export const metadata = generateMetadata({
  title: "Home",
  description:
    "Deserunt veniam voluptate aliqua consectetur laboris voluptate est labore qui commodo.",
});

export default async function Page() {
  return (
    <>
      <Section
        header
        size="lg"
        bg="bg.subtle"
        borderBottom="1px solid"
        borderColor="border"
      >
        <VStack gap="10">
          <Stack gap="4" textAlign="center">
            <Heading
              as="h1"
              textStyle={{ base: "2xl", md: "5xl" }}
              maxW={{ md: "lg" }}
              mx="auto"
              lineHeight="tighter"
            >
              PumpItClub -
              Deine Transformation startet hier!
            </Heading>

            <Text color="fg.muted" textStyle="lg" maxW={{ md: "lg" }} mx="auto">
              Wir bei PumpItClub kümmern uns darum deine Ernährung und dein Fitness auf den besten Stand zu bringen. Ohne das du einschränkungen in deinem Leben hast
            </Text>
          </Stack>

          <Stack
            align="center"
            direction={{ base: "column", md: "row" }}
            gap="3"
          >
            <Link href="/docs">
              <Button size="xl">
                Loslegen <ArrowRight />
              </Button>
            </Link>
            <Link href="https://github.com">
              <Button variant="ghost" size="xl">
                GitHub <ArrowSquareOut />
              </Button>
            </Link>
          </Stack>
        </VStack>
      </Section>
      <Section size="lg" bg="bg">
        <VStack gap="12">
          <Stack gap="4" textAlign="center">
            <Heading
              as="h1"
              textStyle={{ base: "2xl", md: "4xl" }}
              maxW={{ md: "md" }}
              mx="auto"
              lineHeight="tighter"
            >
              Minimales Tooling mit leistungsstarken Funktionen
            </Heading>

            <Text color="fg.muted" textStyle="lg" maxW={{ md: "lg" }} mx="auto">
              Diese Software nutzt die Kernfunktionalität von Outseta, Next.js
              und Chakra UI, um Zeit zu sparen und sich auf Code zu konzentrieren,
              der wirklich wichtig ist.
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
            {features.map((feature) => (
              <Card.Root key={feature.title}>
                <Card.Body gap={{ base: "4", md: "6" }}>
                  <Icon size="2xl">{feature.icon}</Icon>
                  <Stack>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Description>{feature.description}</Card.Description>
                  </Stack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        </VStack>
      </Section>
    </>
  );
}

const features = [
  {
    icon: <UserCircle />,
    title: "Authentifizierung",
    description: "Sichere Anmeldung von Benutzern und Schutz von Seiten und Elementen",
  },
  {
    icon: <CreditCard />,
    title: "Zahlungen",
    description:
      "Einrichtung von Einmal-, Abonnement- oder Nutzungsabrechnungen für Einzelpersonen oder Teams",
  },
  {
    icon: <Palette />,
    title: "Theming",
    description:
      "Anpassbares Design, um das Aussehen und die Atmosphäre Ihrer App schnell zu ändern",
  },
  {
    icon: <EnvelopeSimple />,
    title: "E-Mail-Marketing",
    description:
      "Automatisierte E-Mails, Rundschreiben und Drip-Kampagnen zur Betreuung von Benutzern und Steigerung des Umsatzes",
  },
  {
    icon: <Lifebuoy />,
    title: "Support-Desk",
    description:
      "Integriertes Support-Ticket-System, um Kunden zufrieden zu stellen und sie zu binden",
  },
  {
    icon: <Cube />,
    title: "Design-System",
    description: "Komponentenbibliothek von Chakra UI zum Erstellen von allem, was Sie möchten",
  },
];
