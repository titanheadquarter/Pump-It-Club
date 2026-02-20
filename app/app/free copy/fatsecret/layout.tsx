import { Box, Heading, Container } from "@chakra-ui/react";
import { Sidebar } from "@/components/layout/sidebar";

export default function FatSecretLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  );
}
