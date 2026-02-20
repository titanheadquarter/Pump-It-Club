import { FunnelNavbar } from "@/components/layout/funnel-navbar";
import { FunnelFooter } from "@/components/layout/funnel-footer";
import { Box } from "@chakra-ui/react";

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FunnelNavbar />
      <Box as="main" overflowX="hidden" maxW="100vw">{children}</Box>
      <FunnelFooter />
    </>
  );
}
