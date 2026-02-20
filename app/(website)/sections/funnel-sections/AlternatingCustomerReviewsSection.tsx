"use client";

import { Box, Heading, Text, VStack, HStack, Stack, Icon, Flex, Avatar } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { CheckCircle, LinkedinLogo, InstagramLogo, GlobeSimple, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "@/components/ui/link";

const reviewsData = [
  {
    name: "Max Mustermann",
    title: "Erfolgreicher Unternehmer",
    avatarSrc: "https://bit.ly/dan-abramov", // Replace with actual avatar
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video URL
    heading: "Vom energielosen Alltag zu körperlicher Topform und mentaler Klarheit",
    preCollaboration: "Müdigkeit und Energiemangel prägten den Alltag. Trotz ambitionierter Ziele fehlte die Zeit und die Motivation für konsequentes Training. Der Körper entsprach nicht dem eigenen Anspruch, mentale Klarheit war oft getrübt.",
    results: [
      "Sichtbarer Muskelaufbau & 8 kg Fettabbau in 12 Wochen",
      "Steigerung der täglichen Energie um 30% und verbesserter Schlaf",
      "Gestärkte mentale Resilienz und klare Entscheidungsfindung im Business",
    ],
    socialLinks: [
      { icon: LinkedinLogo, href: "#" },
      { icon: InstagramLogo, href: "#" },
      { icon: GlobeSimple, href: "#" },
    ],
  },
  {
    name: "Anna Schmidt",
    title: "Startup Gründerin",
    avatarSrc: "https://bit.ly/kent-c-dodds", // Replace with actual avatar
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video URL
    heading: "Mein Business boomt – und mein Körper auch!",
    preCollaboration: "Als Startup-Gründerin war ich ständig unter Strom. Sport und gesunde Ernährung kamen zu kurz, was sich auf meine Konzentration und meine allgemeine Leistungsfähigkeit auswirkte.",
    results: [
      "Deutlich mehr Ausdauer und Fokus für lange Arbeitstage",
      "Gewichtsverlust von 5 kg und definiertere Figur",
      "Effektives Zeitmanagement für Training und Erholung",
    ],
    socialLinks: [
      { icon: LinkedinLogo, href: "#" },
      { icon: InstagramLogo, href: "#" },
    ],
  },
  {
    name: "Thomas Müller",
    title: "Erfahrener Manager",
    avatarSrc: "https://bit.ly/ryan-florence", // Replace with actual avatar
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video URL
    heading: "Zurück in Topform: Energie und Klarheit für meinen Führungsalltag",
    preCollaboration: "Jahrelanger Stress im Management hatte Spuren hinterlassen. Ich fühlte mich schlapp, unausgeglichen und meine Entscheidungsfähigkeit litt. Ich brauchte einen Neustart.",
    results: [
      "Nachhaltige Steigerung der körperlichen Fitness und Kraft",
      "Verbesserte Stressresistenz und mentale Stärke",
      "Klarere Prioritäten und bessere Work-Life-Balance",
    ],
    socialLinks: [
      { icon: LinkedinLogo, href: "#" },
      { icon: GlobeSimple, href: "#" },
    ],
  },
  {
    name: "Lena Becker",
    title: "Freiberufliche Designerin",
    avatarSrc: "https://bit.ly/code-beast", // Replace with actual avatar
    videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video URL
    heading: "Meine Kreativität sprudelt – dank neuer körperlicher Vitalität!",
    preCollaboration: "Als Designerin saß ich viel und bewegte mich wenig. Das führte zu Rückenschmerzen, Antriebslosigkeit und kreativen Blockaden. Ich wollte wieder voller Energie sein.",
    results: [
      "Signifikante Reduzierung von Rückenschmerzen",
      "Deutlich mehr Energie und kreative Impulse",
      "Entwicklung einer nachhaltigen Sportroutine",
    ],
    socialLinks: [
      { icon: InstagramLogo, href: "#" },
      { icon: GlobeSimple, href: "#" },
    ],
  },
];

export function AlternatingCustomerReviewsSection() {
  return (
    <Section pt={20} pb={20}>
      <VStack gap={20} maxWidth="1200px" mx="auto">
        {reviewsData.map((review, index) => (
          <Flex
            key={index}
            direction={{ base: "column", md: index % 2 === 0 ? "row" : "row-reverse" }}
            gap={10}
            alignItems="center"
            width="full"
          >
            {/* Video Player Placeholder */}
            <Box
              flex="1"
              width={{ base: "full", md: "50%" }}
              minHeight="300px" // Ensure minimum height for video box
              borderRadius="lg"
              overflow="hidden"
              shadow="lg"
              bg="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              position="relative"
            >
              {/* YouTube Embed Placeholder */}
              <Box as="iframe"
                src={review.videoSrc}
                width="full"
                height="full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Customer Testimonial"
                frameBorder="0"
              />
              {/* PlayCircle Overlay - if you want a custom play button */}
              {/* <Icon as={PlayCircle} boxSize="60px" color="whiteAlpha.800" position="absolute" /> */}
            </Box>

            {/* Review Content */}
            <VStack flex="1" width={{ base: "full", md: "50%" }} alignItems="flex-start" spacing={6}>
              {/* Stars */}
              <HStack spacing={1} color="yellow.400">
                <StarIcon fontSize="sm" /><StarIcon fontSize="sm" /><StarIcon fontSize="sm" /><StarIcon fontSize="sm" /><StarIcon fontSize="sm" />
              </HStack>

              {/* Reviewer Info */}
              <HStack spacing={4} alignItems="center">
                <Avatar.Root size="md">
                  <Avatar.Image src={review.avatarSrc} />
                  <Avatar.Fallback name={review.name} />
                </Avatar.Root>
                <VStack alignItems="flex-start" spacing={0}>
                  <Text fontWeight="bold" fontSize="lg">{review.name}</Text>
                  <Text fontSize="sm" color="gray.600">{review.title}</Text>
                </VStack>
              </HStack>

              {/* Main Review Heading */}
              <Heading as="h2" size="xl" fontWeight="bold" color="gray.800">
                {review.heading}
              </Heading>

              {/* Vor der Zusammenarbeit */}
              <VStack alignItems="flex-start" spacing={2}>
                <Heading as="h3" size="md" fontWeight="semibold" color="gray.700">Vor der Zusammenarbeit</Heading>
                <Text fontSize="md" color="gray.600">
                  {review.preCollaboration}
                </Text>
              </VStack>

              {/* Ergebnisse */}
              <VStack alignItems="flex-start" spacing={2}>
                <Heading as="h3" size="md" fontWeight="semibold" color="gray.700">Ergebnisse nach dem Coaching</Heading>
                <Stack spacing={1} alignItems="flex-start">
                  {review.results.map((result, resIndex) => (
                    <HStack key={resIndex}>
                      <Icon as={CheckCircle} color="green.500" />
                      <Text fontSize="md" color="gray.700">{result}</Text>
                    </HStack>
                  ))}
                </Stack>
              </VStack>

              {/* Social Media Links */}
              <HStack spacing={4} pt={4}>
                {review.socialLinks.map((social, socialIndex) => (
                  <Link key={socialIndex} href={social.href} textExternal>
                    <Icon as={social.icon} /> {social.icon.name}
                  </Link>
                ))}
              </HStack>
            </VStack>
          </Flex>
        ))}
      </VStack>
    </Section>
  );
}
