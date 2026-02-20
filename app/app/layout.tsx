"use client";

import { Box } from "@chakra-ui/react";
import ProtectedRoute from "@/components/auth/protect-route";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <Box as="main">{children}</Box>
    </ProtectedRoute>
  );
}
