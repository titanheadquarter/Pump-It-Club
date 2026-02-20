"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Box } from "@chakra-ui/react";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFunnelPage = pathname?.startsWith("/Funnel");

  if (isFunnelPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar type="website" />
      <Box as="main" overflowX="hidden" maxW="100vw">{children}</Box>
      <Footer />
    </>
  );
}
