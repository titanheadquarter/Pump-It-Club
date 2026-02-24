"use client";

import { VStack, Box } from "@chakra-ui/react";
import { CtaBetreuungBanner } from "@/components/cta-betreuung-banner";
import { CustomerReviewSection } from "@/app/(website)/sections/funnel-sections/CustomerReviewSection";
import { getVideoUrl } from "../lerne-die-grundlagen/data";

const clientVideoKeys = [
  "CLIENT/Emre.mp4",
  "CLIENT/Kaan.mp4",
  "CLIENT/Markus.mp4",
  "CLIENT/Sumit.mp4",
];

const clientVideoSrcs = clientVideoKeys.map(key => getVideoUrl(key));

export default function KundenstimmenPage() {
  return (
    <VStack gap={{ base: 8, md: 12 }} alignItems="stretch" w="full" minH="100vh">
      <Box w="full" px={{ base: 4, md: 6 }}>
        <CtaBetreuungBanner />
      </Box>
      <Box w="full">
        <CustomerReviewSection clientVideoSrcs={clientVideoSrcs} />
      </Box>
      <Box w="full" px={{ base: 4, md: 6 }}>
        <CtaBetreuungBanner />
      </Box>
    </VStack>
  );
}