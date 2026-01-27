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
import { HeroSection } from "@/sections/mainpage/hero-section";
import { MeetTheFounderSection } from "@/sections/mainpage/meet-the-founder-section";
import { CustomerResultsSection } from "@/sections/mainpage/CustomerResultsSection";
import { HandyappSection } from "@/sections/mainpage/handyapp-section";
import { ProcessSection } from "@/sections/mainpage/process-section";
import { AppDownloadSection } from "@/sections/handyapp/app-download-section";
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
      <HeroSection
        heading="Deine Transformation startet hier"
        subheading="PumpItClub wurde geschaffen, damit du deine Fitnessziele erreichest."
        pricingOptions={[
          {
            title: "Zum Freekurs",
            description: "Starte jetzt kostenlos und erhalte sofortigen Zugang zu wertvollen Inhalten",
            features: [
              "Sofortiger Zugang nach Anmeldung",
              "Grundlagen-Training & Ernährungstipps",
              "Community-Zugang",
              "Erste Schritte zu deiner Transformation",
              "Sag nein zu Fettleibigkeit",
            ],
            buttonText: "Jetzt kostenlos starten",
            recommended: false,
          },
          {
            title: "Zur 1zu1 Beratung",
            description: "Erhalte deinen maßgeschneiderten Plan in nur 30 Minuten",
            features: [
              "Persönliche Analyse deiner Ziele",
              "Individueller Trainingsplan",
              "Maßgeschneiderter Ernährungsplan",
              "30 Minuten persönliches Coaching",
              "Follow-up Support",
            ],
            buttonText: "Jetzt Beratung buchen",
            recommended: true,
          },
        ]}
        infoTexts={[
          {
            heading: "Individuelles Coaching",
            content: "Persönliche Betreuung für deine Fitnessziele",
          },
          {
            heading: "Ernährungsplanung",
            content: "Maßgeschneiderte Pläne für deinen Lifestyle",
          },
          {
            heading: "24/7 Support",
            content: "Rund um die Uhr Unterstützung bei Fragen",
          },
        ]}
      />
      <MeetTheFounderSection />
      <CustomerResultsSection />
      <ProcessSection />
      <HandyappSection />
      <AppDownloadSection />
    
     
      
      
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
