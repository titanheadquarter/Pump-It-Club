import { Box, Heading, Text, VStack, Button, Image } from "@chakra-ui/react";
import { Section } from "@/components/layout/section";
import { Link } from "@/components/ui/link";

export function Hero2() {
  return (
    <Section pt={20} pb={20} bg="white">
      <VStack spacing={8} textAlign="center" maxWidth="900px" mx="auto">
        <Heading as="h1" size="2xl" fontWeight="extrabold" lineHeight="shorter">
          Die KI-gestützte <Text as="span" color="green.500">Performance-Optimierung</Text> für deinen Erfolg.
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Supercharge deine körperliche und mentale Performance mit einem maßgeschneiderten Plan.
          Transformiere deinen Körper und Geist – wissenschaftlich fundiert und ohne Kompromisse.
        </Text>
        <Button
          as={Link}
          href="#kostenloses-erstgespräch"
          bg="green.500"
          color="white"
          size="lg"
          _hover={{ bg: "green.600" }}
          mt={4}
        >
          Jetzt kostenloses Erstgespräch vereinbaren
        </Button>
        <Box mt={10} width="full">
          {/* Hier würde das Bild aus dem zweiten Screenshot platziert. 
             Da ich keine direkten Bilddateien erstellen kann, füge ich einen Platzhalter ein. */}
          {/* <Image src="/path/to/your/screenshot-image.png" alt="KI-gestützte Plattform" objectFit="cover" borderRadius="lg" shadow="xl" /> */}
          <Box
            bg="gray.100"
            height="400px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="lg"
            shadow="xl"
            fontSize="xl"
            color="gray.500"
          >
            Bildplatzhalter für KI-gestützte Plattform
          </Box>
        </Box>
      </VStack>
    </Section>
  );
}
