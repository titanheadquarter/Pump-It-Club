"use client";

import { useState } from "react";
import {
  Box,
  Heading,
  Tabs,
  VStack,
  Text,
  Grid,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { FoodSearchForm } from "./components/FoodSearchForm";
import { FoodDetailCard } from "./components/FoodDetailCard";
import { ImageUploader } from "./components/ImageUploader";
import { BarcodeScanner } from "./components/BarcodeScanner";
import { DiaryEntryForm } from "./components/DiaryEntryForm";
import { FEATURES } from "./utils/fatsecret-client"; // Importing client-side constants might be tricky if it uses process.env.
// Client-side process.env is usually empty unless prefixed NEXT_PUBLIC_.
// I will just mock the features enabled state or assume them enabled for the dashboard UI, or pass them as props/context.
// For now, I'll hardcode or fetch config.

const TABS = [
  { value: "foods", label: "Lebensmittel" },
  { value: "recipes", label: "Rezepte" },
  { value: "barcode", label: "Barcode (Add-On)" },
  { value: "image", label: "Foto (Add-On)" },
  { value: "diary", label: "Tagebuch" },
];

export default function FatSecretPage() {
  const [activeTab, setActiveTab] = useState("foods");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError("");
    setSelectedFood(null);
    try {
      const endpoint = activeTab === "recipes" 
        ? "/app/free/fatsecret/api/recipes/search" 
        : "/app/free/fatsecret/api/foods/search";
        
      const res = await fetch(`${endpoint}?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Search failed");
      
      // Normalize results
      let results = [];
      if (activeTab === "recipes") {
        results = data.recipes?.recipe || [];
      } else {
        results = data.foods?.food || [];
      }
      setSearchResults(Array.isArray(results) ? results : [results]);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = async (id: string) => {
    setIsLoading(true);
    try {
       const endpoint = activeTab === "recipes" 
        ? `/app/free/fatsecret/api/recipes/${id}` 
        : `/app/free/fatsecret/api/foods/${id}`;

      const res = await fetch(endpoint);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      // Structure depends on endpoint
      const item = activeTab === "recipes" ? data.recipe : data.food;
      setSelectedFood(item);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBarcodeScan = async (barcode: string) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/app/free/fatsecret/api/barcode/scan", {
        method: "POST",
        body: JSON.stringify({ barcode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      // If food_id is returned, fetch details
      if (data.food_id?.value) {
         const detailRes = await fetch(`/app/free/fatsecret/api/foods/${data.food_id.value}`);
         const detailData = await detailRes.json();
         setSelectedFood(detailData.food);
      } else {
        setError("Kein Produkt gefunden");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleImageAnalyze = async (base64: string) => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch("/app/free/fatsecret/api/image-recognition/analyze", {
            method: "POST",
            body: JSON.stringify({ image_base64: base64 }),
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.error);
        
        // Handle image results (likely a list of possibilities)
        // For simplicity, just show the first one or raw data
        // FatSecret Image API returns "food_name" and "probability"
        // We'll just display the raw JSON or a simple list for now as 'searchResults'
        if(data.prediction) {
             const predictions = Array.isArray(data.prediction) ? data.prediction : [data.prediction];
             // Transform to look like food search results
             setSearchResults(predictions.map((p: any) => ({
                 food_name: p.food_name,
                 food_id: p.food_id, // If available
                 food_type: `Probability: ${(parseFloat(p.probability) * 100).toFixed(0)}%`
             })));
        }
      } catch(e: any) {
          setError(e.message);
      } finally {
          setIsLoading(false);
      }
  }

  return (
    <VStack gap={8} align="stretch">
      <Heading color="green.700">Ernährungs-Datenbank (FatSecret)</Heading>

      <Tabs.Root value={activeTab} onValueChange={(e) => {
          setActiveTab(e.value);
          setSearchResults([]);
          setSelectedFood(null);
          setError("");
      }}>
        <Tabs.List>
          {TABS.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Box py={6}>
          {error && (
            <Box bg="red.100" color="red.700" p={4} borderRadius="md" mb={6}>
              {error}
            </Box>
          )}

          {activeTab === "foods" && (
            <VStack gap={6}>
              <FoodSearchForm onSearch={handleSearch} isPremier={true} />
              
              {isLoading && <Spinner size="xl" />}
              
              {!selectedFood && searchResults.length > 0 && (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="full">
                  {searchResults.map((food: any) => (
                    <Box 
                        key={food.food_id} 
                        p={4} 
                        borderWidth="1px" 
                        borderRadius="md" 
                        cursor="pointer"
                        _hover={{ bg: "green.50" }}
                        onClick={() => handleSelect(food.food_id)}
                    >
                      <Text fontWeight="bold">{food.food_name}</Text>
                      <Text fontSize="sm" color="gray.600">{food.food_description}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
              
              {selectedFood && <FoodDetailCard food={selectedFood} isPremier={true} />}
            </VStack>
          )}

          {activeTab === "recipes" && (
             <VStack gap={6}>
              <FoodSearchForm onSearch={handleSearch} />
              {isLoading && <Spinner size="xl" />}
              
               {!selectedFood && searchResults.length > 0 && (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="full">
                  {searchResults.map((recipe: any) => (
                    <Box 
                        key={recipe.recipe_id} 
                        p={4} 
                        borderWidth="1px" 
                        borderRadius="md" 
                        cursor="pointer"
                        _hover={{ bg: "green.50" }}
                        onClick={() => handleSelect(recipe.recipe_id)}
                    >
                      <Text fontWeight="bold">{recipe.recipe_name}</Text>
                      <Text fontSize="sm" color="gray.600">{recipe.recipe_description}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
              
              {/* Reuse FoodDetailCard or make RecipeCard - reusing for simplicity with some weirdness expected in rendering */}
              {selectedFood && (
                  <Box p={6} borderWidth="1px" borderRadius="lg" bg="white">
                      <Heading size="md">{selectedFood.recipe_name}</Heading>
                      <Text mt={2}>{selectedFood.recipe_description}</Text>
                      {/* Detailed recipe view would go here */}
                      <Text mt={4} fontStyle="italic">Rezept-Details (Zutaten, Schritte) hier implementieren...</Text>
                  </Box>
              )}
            </VStack>
          )}

          {activeTab === "barcode" && (
            <VStack gap={6} maxW="md" mx="auto">
              <BarcodeScanner onScan={handleBarcodeScan} />
               {isLoading && <Spinner />}
               {selectedFood && <FoodDetailCard food={selectedFood} />}
            </VStack>
          )}

          {activeTab === "image" && (
            <VStack gap={6} maxW="md" mx="auto">
               <ImageUploader onAnalyze={handleImageAnalyze} />
               {isLoading && <Spinner />}
                {!selectedFood && searchResults.length > 0 && (
                <VStack w="full" align="stretch">
                    <Text fontWeight="bold">Ergebnisse:</Text>
                    {searchResults.map((res: any, i) => (
                        <Box key={i} p={2} borderWidth="1px" borderRadius="md">
                            <Text>{res.food_name} ({res.food_type})</Text>
                        </Box>
                    ))}
                </VStack>
              )}
            </VStack>
          )}
          
          {activeTab === "diary" && (
              <DiaryEntryForm />
          )}
        </Box>
      </Tabs.Root>
    </VStack>
  );
}
