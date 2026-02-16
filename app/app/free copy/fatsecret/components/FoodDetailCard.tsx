"use client";

import { Box, Heading, Text, Badge, Stack, Table, Separator } from "@chakra-ui/react";

interface FoodDetailCardProps {
  food: any; // Type strictly if possible
  isPremier?: boolean;
}

export const FoodDetailCard = ({ food, isPremier }: FoodDetailCardProps) => {
  if (!food) return null;

  // Normalisiere Servings
  const servings = Array.isArray(food.servings?.serving)
    ? food.servings.serving
    : [food.servings?.serving].filter(Boolean);

  const defaultServing = servings[0];

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      bg="white"
      boxShadow="sm"
    >
      <Stack gap={4}>
        <Box>
          <Heading size="md" color="green.700">
            {food.food_name}
          </Heading>
          <Text color="gray.500" fontSize="sm">
            {food.brand_name ? `${food.brand_name} • ` : ""}
            {food.food_type}
          </Text>
        </Box>

        <Separator />

        <Box>
          <Heading size="sm" mb={2}>
            Nährwerte (pro {defaultServing?.serving_description || "Portion"})
          </Heading>
          <Stack direction="row" gap={4} wrap="wrap">
            <Badge colorPalette="blue" p={2} borderRadius="md">
              Kalorien: {defaultServing?.calories || 0} kcal
            </Badge>
            <Badge colorPalette="green" p={2} borderRadius="md">
              Protein: {defaultServing?.protein || 0} g
            </Badge>
            <Badge colorPalette="orange" p={2} borderRadius="md">
              Kohlenhydrate: {defaultServing?.carbohydrate || 0} g
            </Badge>
            <Badge colorPalette="red" p={2} borderRadius="md">
              Fett: {defaultServing?.fat || 0} g
            </Badge>
          </Stack>
        </Box>

        {/* Premier Features: Mehr Details (wenn vorhanden/erlaubt) */}
        {isPremier && (
          <Box mt={2}>
            <Text fontWeight="bold" fontSize="sm" mb={1}>
              Detaillierte Nährwerte (Premier):
            </Text>
            <Table.Root size="sm" variant="simple">
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Zucker</Table.Cell>
                  <Table.Cell>{defaultServing?.sugar || "-"} g</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ballaststoffe</Table.Cell>
                  <Table.Cell>{defaultServing?.fiber || "-"} g</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Natrium</Table.Cell>
                  <Table.Cell>{defaultServing?.sodium || "-"} mg</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </Stack>
    </Box>
  );
};
