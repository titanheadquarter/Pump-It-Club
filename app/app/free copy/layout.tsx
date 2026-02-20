"use client";

import { Box } from "@chakra-ui/react";
import { Sidebar } from "@/components/layout/sidebar";
import ProtectedRoute from "@/components/auth/protect-route";

export default function FreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute plansWithAccess="free">
      <Sidebar />
      <Box
        as="main"
        ml={{ base: "0", md: "250px" }}
        px={{ base: "4", md: "6" }}
        py="6"
        minH="100vh"
      >
        {children}
      </Box>
    </ProtectedRoute>
  );
}
