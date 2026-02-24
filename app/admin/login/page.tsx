"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Card,
  VStack,
  HStack,
  Alert,
} from "@chakra-ui/react";
import { Shield, Lock } from "@phosphor-icons/react";

const ADMIN_USER = "root";
const ADMIN_PASS = "root";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Einfache hardcoded Authentifizierung
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Session in localStorage speichern
      const session = {
        loggedIn: true,
        timestamp: Date.now(),
        username: username,
      };
      localStorage.setItem("admin_session", JSON.stringify(session));

      // Redirect zum Dashboard
      router.push("/admin");
    } else {
      setError("Ungültige Anmeldedaten");
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center" p={4}>
      <Card.Root maxW="400px" w="full">
        <Card.Body>
          <VStack gap={6}>
            {/* Header */}
            <VStack gap={2} textAlign="center">
              <HStack justify="center">
                <Shield size={32} color="var(--chakra-colors-green-500)" />
              </HStack>
              <Heading size="lg">Admin Login</Heading>
              <Text color="gray.600" fontSize="sm">
                Pump-It-Club Admin-Panel
              </Text>
            </VStack>

            {/* Login Form */}
            <Box as="form" onSubmit={handleLogin} w="full">
              <VStack gap={4}>
                {error && (
                  <Alert.Root status="error" size="sm">
                    <Alert.Indicator />
                    <Alert.Content>
                      <Alert.Description>{error}</Alert.Description>
                    </Alert.Content>
                  </Alert.Root>
                )}

                <Stack gap={3} w="full">
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Benutzername
                    </Text>
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Benutzername eingeben"
                      required
                    />
                  </Box>

                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={2}>
                      Passwort
                    </Text>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Passwort eingeben"
                      required
                    />
                  </Box>
                </Stack>

                <Button
                  type="submit"
                  w="full"
                  colorPalette="green"
                  loading={loading}
                  disabled={loading}
                >
                  <HStack gap={2}>
                    <Lock size={16} />
                    <Text>Anmelden</Text>
                  </HStack>
                </Button>
              </VStack>
            </Box>

            {/* Info */}
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Verwende die Standard-Anmeldedaten für den Zugriff.
            </Text>
          </VStack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}