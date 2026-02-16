"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Badge,
  Stack,
  Table,
  Separator,
  Select,
  SimpleGrid,
  VStack,
  createListCollection,
  NativeSelect
} from "@chakra-ui/react";

interface FoodDetailCardProps {
  food: any;
  isPremier?: boolean;
}

export const FoodDetailCard = ({ food, isPremier }: FoodDetailCardProps) => {
  const [selectedServingId, setSelectedServingId] = useState<string>("");

  if (!food) return null;

  // Robust servings parsing
  let servings: any[] = [];
  if (food.servings) {
    if (food.servings.serving) {
      servings = Array.isArray(food.servings.serving) 
        ? food.servings.serving 
        : [food.servings.serving];
    } else if (Array.isArray(food.servings)) {
      servings = food.servings;
    } else if (typeof food.servings === "object") {
       servings = [food.servings];
    }
  }

  // Initial serving selection
  useEffect(() => {
    // Nur setzen, wenn wir servings haben und noch KEINE ID ausgewählt ist
    if (servings.length > 0 && selectedServingId === "") {
       // 1. is_default, 2. serving_id=0, 3. first
       // parseInt(s.is_default) === 1 ist sicherer, da FatSecret manchmal Strings sendet
       const def = servings.find((s: any) => parseInt(s.is_default) === 1) 
                 || servings.find((s: any) => s.serving_id === "0" || s.serving_id === 0)
                 || servings[0];
       
       if (def && def.serving_id) {
           setSelectedServingId(def.serving_id.toString());
       }
    }
  }, [food, servings, selectedServingId]); // Abhängigkeit von 'food' ist wichtig!

  // Wenn food sich ändert, müssen wir die servings neu berechnen, das passiert oben im render.
  // Aber selectedServingId muss zurückgesetzt werden, wenn ein NEUES food geladen wird.
  // Das machen wir am besten mit einem separaten Effect oder Key auf der Component.
  // Hier im Effect prüfen wir nur auf leere ID.
  
  // Workaround: Wenn die aktuelle selectedServingId nicht in den neuen Servings ist, resetten.
  const currentServing = servings.find(s => s.serving_id?.toString() === selectedServingId) || servings[0];
  
  // Fallback: Falls beim Rendern keine ID passt (z.B. nach Food-Wechsel), nimm das erste Serving visuell,
  // und update den State im nächsten Tick (via Effect oben, wenn wir selectedServingId leeren würden).
  // Besser: Wir nutzen 'key={food.food_id}' in der Parent Component (page.tsx), 
  // dann wird diese Component komplett neu gemountet und der State resettet sich automatisch!
  
  // Helper
  const getVal = (val: any) => (val ? parseFloat(val) : 0);
  const formatVal = (val: any, unit: string = "g") => `${getVal(val).toLocaleString("de-DE")} ${unit}`;

  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} bg="white" boxShadow="sm">
      <Stack gap={6}>
        {/* Header */}
        <Box>
          <Heading size="lg" color="green.700" mb={1}>
            {food.food_name}
          </Heading>
          <Text color="gray.500" fontSize="sm">
            {food.brand_name ? `${food.brand_name} • ` : ""}
            {food.food_type === "Brand" ? "Markenprodukt" : "Allgemein"}
          </Text>
        </Box>

        <Separator />

        {/* Serving Selector */}
        <Box>
           <Text fontSize="sm" fontWeight="bold" mb={2}>Portionsgröße wählen:</Text>
           <NativeSelect.Root size="sm" width="300px">
             <NativeSelect.Field 
                value={selectedServingId}
                onChange={(e) => setSelectedServingId(e.target.value)}
             >
               {servings.map((item) => (
                 <option key={item.serving_id} value={item.serving_id?.toString()}>
                   {item.serving_description} ({item.metric_serving_amount} {item.metric_serving_unit})
                 </option>
               ))}
             </NativeSelect.Field>
             <NativeSelect.Indicator />
           </NativeSelect.Root>
        </Box>

        {/* Main Macros */}
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} p={4} bg="gray.50" borderRadius="md">
            <VStack align="center">
                <Text fontSize="2xl" fontWeight="bold" color="blue.600">{getVal(currentServing?.calories).toFixed(0)}</Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">Kalorien (kcal)</Text>
            </VStack>
            <VStack align="center">
                <Text fontSize="xl" fontWeight="bold" color="green.600">{formatVal(currentServing?.protein)}</Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">Protein</Text>
            </VStack>
             <VStack align="center">
                <Text fontSize="xl" fontWeight="bold" color="orange.600">{formatVal(currentServing?.carbohydrate)}</Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">Kohlenhydrate</Text>
            </VStack>
             <VStack align="center">
                <Text fontSize="xl" fontWeight="bold" color="red.600">{formatVal(currentServing?.fat)}</Text>
                <Text fontSize="xs" color="gray.500" textTransform="uppercase">Fett</Text>
            </VStack>
        </SimpleGrid>

        {/* Detailed Nutrients Table */}
        <Box>
          <Heading size="sm" mb={3} color="gray.700">
            Detaillierte Nährwerte 
            <Text as="span" fontWeight="normal" fontSize="xs" ml={2} color="gray.500">
              (pro {currentServing?.serving_description || "Portion"})
            </Text>
          </Heading>
          <Table.Root size="sm" variant="outline" striped>
            <Table.Body>
              <Table.Row>
                <Table.Cell fontWeight="bold">Energie</Table.Cell>
                <Table.Cell textAlign="right">{getVal(currentServing?.calories)} kcal</Table.Cell>
                <Table.Cell color="gray.400" fontSize="xs">({(getVal(currentServing?.calories) * 4.184).toFixed(0)} kJ)</Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell fontWeight="bold">Fett</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.fat)}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell pl={8}>davon gesättigte Fettsäuren</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.saturated_fat)}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell pl={8}>davon mehrfach ungesättigte</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.polyunsaturated_fat)}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell pl={8}>davon einfach ungesättigte</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.monounsaturated_fat)}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell pl={8}>davon Transfette</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.trans_fat)}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell fontWeight="bold">Cholesterin</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.cholesterol, "mg")}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell fontWeight="bold">Kohlenhydrate</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.carbohydrate)}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell pl={8}>davon Zucker</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.sugar)}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell pl={8}>davon zugesetzter Zucker</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.added_sugars)}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell fontWeight="bold">Ballaststoffe</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.fiber)}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell fontWeight="bold">Eiweiß (Protein)</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.protein)}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell fontWeight="bold">Salz / Natrium</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.sodium, "mg")}</Table.Cell>
                 <Table.Cell color="gray.400" fontSize="xs">Salz ca. {(getVal(currentServing?.sodium) * 2.5 / 1000).toFixed(2)} g</Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell fontWeight="bold">Kalium</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.potassium, "mg")}</Table.Cell>
                 <Table.Cell></Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Box>

        {/* Vitamins & Minerals Section */}
         <Box>
          <Heading size="sm" mb={3} color="gray.700">Vitamine & Mineralstoffe</Heading>
           <Table.Root size="sm" variant="outline" striped>
            <Table.Body>
               <Table.Row>
                <Table.Cell>Vitamin A</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.vitamin_a, "µg")}</Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell>Vitamin C</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.vitamin_c, "mg")}</Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell>Vitamin D</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.vitamin_d, "µg")}</Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell>Calcium</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.calcium, "mg")}</Table.Cell>
              </Table.Row>
               <Table.Row>
                <Table.Cell>Eisen</Table.Cell>
                <Table.Cell textAlign="right">{formatVal(currentServing?.iron, "mg")}</Table.Cell>
              </Table.Row>
            </Table.Body>
           </Table.Root>
         </Box>
      </Stack>
    </Box>
  );
};

