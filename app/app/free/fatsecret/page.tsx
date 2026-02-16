"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Tabs,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Spinner,
  Badge,
} from "@chakra-ui/react";
import { FoodSearchForm } from "./components/FoodSearchForm";
import { FoodDetailCard } from "./components/FoodDetailCard";
import { RecipeDetailCard } from "./components/RecipeDetailCard";
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
  const [recommendedRecipes, setRecommendedRecipes] = useState<any[]>([]);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  // Lade empfohlene Rezepte beim Wechsel zum Rezepte-Tab
  useEffect(() => {
    if (activeTab === "recipes" && recommendedRecipes.length === 0) {
      loadRecommendedRecipes();
    }
  }, [activeTab]);

  const loadRecommendedRecipes = async (query?: string) => {
    setIsLoadingRecommended(true);
    try {
      const queryParam = query ? `&query=${encodeURIComponent(query)}` : "";
      const res = await fetch(`/app/free/fatsecret/api/recipes/recommended?max_results=3${queryParam}`);
      const data = await res.json();
      
      if (data.recipes?.recipe) {
        const recipes = Array.isArray(data.recipes.recipe) 
          ? data.recipes.recipe 
          : [data.recipes.recipe];
        setRecommendedRecipes(recipes);
      } else {
        setRecommendedRecipes([]);
      }
    } catch (error) {
      console.error("Failed to load recommended recipes:", error);
      setRecommendedRecipes([]);
    } finally {
      setIsLoadingRecommended(false);
    }
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError("");
    setSelectedFood(null);
    setCurrentSearchQuery(query);
    
    // Bei Rezepte-Suche: Aktualisiere auch die Empfehlungen passend zum Suchbegriff
    if (activeTab === "recipes" && query.trim()) {
      loadRecommendedRecipes(query);
    }
    
    try {
      const endpoint = activeTab === "recipes" 
        ? "/app/free/fatsecret/api/recipes/search" 
        : "/app/free/fatsecret/api/foods/search";
        
      const res = await fetch(`${endpoint}?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Search failed");
      
      // Debug: Log the API response
      console.log("API Response:", JSON.stringify(data, null, 2));
      
      // Normalize results
      let results = [];
      
      if (activeTab === "recipes") {
        // recipes.search.v3 gibt: { recipes: { recipe: [...] } }
        // Manchmal auch: { recipes: { recipe: {...} } } bei einem Ergebnis
        console.log("Recipes data:", data.recipes);
        console.log("Full response keys:", Object.keys(data));
        
        if (data.recipes?.recipe) {
          results = Array.isArray(data.recipes.recipe) 
            ? data.recipes.recipe 
            : [data.recipes.recipe];
        } else if (data.recipes && !data.recipes.recipe) {
          // Keine Rezepte gefunden
          console.log("No recipes found in response. Total:", data.recipes.total_results);
        } else if (data.error) {
          throw new Error(data.error.message || "API Error");
        }
        
        console.log("Parsed recipe results:", results.length);
      } else {
        // foods.search gibt: { foods: { food: [...] } }
        if (data.foods?.food) {
          const foodData = data.foods.food;
          results = Array.isArray(foodData) ? foodData : [foodData];
        }
      }
      
      setSearchResults(results);
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
         if (detailData.food) {
           setSelectedFood(detailData.food);
         } else {
           setError("Produktdetails konnten nicht geladen werden");
         }
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
                        _hover={{ bg: "green.50", borderColor: "green.300" }}
                        onClick={() => handleSelect(food.food_id)}
                        transition="all 0.2s"
                    >
                      <Text fontWeight="bold" color="gray.800">{food.food_name}</Text>
                      {food.brand_name && (
                        <Text fontSize="xs" color="green.600" fontWeight="medium">{food.brand_name}</Text>
                      )}
                      {food.food_description && (
                        <Text fontSize="sm" color="gray.600" mt={2}>{food.food_description}</Text>
                      )}
                      <Text fontSize="xs" color="gray.400" mt={2}>Klicken für Details</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              )}
              
              {selectedFood && <FoodDetailCard key={selectedFood.food_id || selectedFood.recipe_id} food={selectedFood} isPremier={true} />}
            </VStack>
          )}

          {activeTab === "recipes" && (
             <VStack gap={6}>
              {/* Unsere Empfehlung - Fitness-optimierte Rezepte */}
              {!selectedFood && (
                <Box w="full" bg="gradient-to-r" bgGradient="linear(to-r, green.50, blue.50)" p={5} borderRadius="lg" borderWidth="1px" borderColor="green.200">
                  <HStack mb={4} gap={3}>
                    <Text fontSize="2xl">💪</Text>
                    <Box flex={1}>
                      <Heading size="md" color="green.700">
                        {currentSearchQuery 
                          ? `Fitness-Empfehlungen für "${currentSearchQuery}"` 
                          : "Unsere Empfehlung"}
                      </Heading>
                      <Text fontSize="sm" color="gray.600">
                        High Protein, Low Fat - perfekt für deine Fitnessziele
                      </Text>
                    </Box>
                    <Badge colorPalette="green" px={3} py={1}>
                      Fitness
                    </Badge>
                  </HStack>
                  
                  {isLoadingRecommended ? (
                    <Box textAlign="center" py={6}>
                      <Spinner size="lg" color="green.500" />
                      <Text mt={2} color="gray.500" fontSize="sm">Lade Empfehlungen...</Text>
                    </Box>
                  ) : recommendedRecipes.length > 0 ? (
                    <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                      {recommendedRecipes.map((recipe: any) => {
                        const nutrition = recipe.recipe_nutrition || {};
                        const calories = parseFloat(nutrition.calories || 0);
                        const protein = parseFloat(nutrition.protein || 0);
                        const fat = parseFloat(nutrition.fat || 0);
                        const carbs = parseFloat(nutrition.carbohydrate || 0);
                        
                        // Berechne Protein-Prozent
                        const totalCals = protein * 4 + carbs * 4 + fat * 9;
                        const proteinPercent = totalCals > 0 ? Math.round((protein * 4 / totalCals) * 100) : 0;
                        
                        return (
                          <Box 
                            key={recipe.recipe_id} 
                            p={4} 
                            bg="white"
                            borderRadius="md" 
                            borderWidth="1px"
                            borderColor="green.200"
                            cursor="pointer"
                            _hover={{ 
                              transform: "translateY(-2px)", 
                              boxShadow: "md",
                              borderColor: "green.400" 
                            }}
                            onClick={() => handleSelect(recipe.recipe_id)}
                            transition="all 0.2s"
                          >
                            {/* Fitness Badge */}
                            <HStack mb={2}>
                              <Badge colorPalette="green" fontSize="xs">
                                {proteinPercent}% Protein
                              </Badge>
                              <Badge colorPalette="blue" fontSize="xs">
                                {calories.toFixed(0)} kcal
                              </Badge>
                            </HStack>
                            
                            <Text fontWeight="bold" color="gray.800" noOfLines={2} mb={2}>
                              {recipe.recipe_name}
                            </Text>
                            
                            {recipe.recipe_description && (
                              <Text fontSize="xs" color="gray.500" noOfLines={2} mb={3}>
                                {recipe.recipe_description}
                              </Text>
                            )}
                            
                            {/* Makros */}
                            <SimpleGrid columns={3} gap={2} fontSize="xs" textAlign="center" bg="gray.50" p={2} borderRadius="sm">
                              <Box>
                                <Text fontWeight="bold" color="green.600">{protein.toFixed(0)}g</Text>
                                <Text color="gray.500">Protein</Text>
                              </Box>
                              <Box>
                                <Text fontWeight="bold" color="orange.500">{carbs.toFixed(0)}g</Text>
                                <Text color="gray.500">Carbs</Text>
                              </Box>
                              <Box>
                                <Text fontWeight="bold" color="red.500">{fat.toFixed(0)}g</Text>
                                <Text color="gray.500">Fett</Text>
                              </Box>
                            </SimpleGrid>
                          </Box>
                        );
                      })}
                    </SimpleGrid>
                  ) : (
                    <Text color="gray.500" textAlign="center" py={4}>
                      Keine Empfehlungen verfügbar
                    </Text>
                  )}
                </Box>
              )}

              {/* Suchfeld */}
              <FoodSearchForm onSearch={handleSearch} />
              {isLoading && <Spinner size="xl" />}
              
               {!selectedFood && searchResults.length > 0 && (
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} w="full">
                  {searchResults.map((recipe: any) => {
                    // Parse nutrition from API
                    const nutrition = recipe.recipe_nutrition || {};
                    
                    // Bestimme das Icon basierend auf Rezeptname/Beschreibung
                    const recipeText = `${recipe.recipe_name} ${recipe.recipe_description}`.toLowerCase();
                    const getRecipeIcon = () => {
                      if (recipeText.includes("chicken") || recipeText.includes("hähnchen") || recipeText.includes("huhn")) 
                        return { icon: "🐔", label: "Hähnchen" };
                      if (recipeText.includes("beef") || recipeText.includes("rind") || recipeText.includes("steak")) 
                        return { icon: "🐄", label: "Rind" };
                      if (recipeText.includes("pork") || recipeText.includes("schwein") || recipeText.includes("bacon")) 
                        return { icon: "🐷", label: "Schwein" };
                      if (recipeText.includes("fish") || recipeText.includes("salmon") || recipeText.includes("tuna") || recipeText.includes("fisch")) 
                        return { icon: "🐟", label: "Fisch" };
                      if (recipeText.includes("shrimp") || recipeText.includes("seafood") || recipeText.includes("garnelen")) 
                        return { icon: "🦐", label: "Meeresfrüchte" };
                      if (recipeText.includes("vegan")) 
                        return { icon: "🌱", label: "Vegan" };
                      if (recipeText.includes("vegetarian") || recipeText.includes("vegetarisch") || recipeText.includes("veggie")) 
                        return { icon: "🥬", label: "Vegetarisch" };
                      if (recipeText.includes("salad") || recipeText.includes("salat")) 
                        return { icon: "🥗", label: "Salat" };
                      if (recipeText.includes("soup") || recipeText.includes("suppe")) 
                        return { icon: "🍲", label: "Suppe" };
                      if (recipeText.includes("pasta") || recipeText.includes("spaghetti") || recipeText.includes("nudeln")) 
                        return { icon: "🍝", label: "Pasta" };
                      if (recipeText.includes("cake") || recipeText.includes("dessert") || recipeText.includes("kuchen")) 
                        return { icon: "🍰", label: "Dessert" };
                      return { icon: "🍽️", label: "Gericht" };
                    };
                    
                    const recipeIcon = getRecipeIcon();
                    
                    // Übersetze den Rezeptnamen
                    const translateRecipeName = (name: string) => {
                      const translations: Record<string, string> = {
                        "chicken": "Hähnchen", "baked": "Gebacken", "grilled": "Gegrillt",
                        "fried": "Gebraten", "roasted": "Geröstet", "soup": "Suppe",
                        "salad": "Salat", "pasta": "Pasta", "rice": "Reis",
                        "beef": "Rind", "pork": "Schwein", "fish": "Fisch",
                        "salmon": "Lachs", "vegetables": "Gemüse", "healthy": "Gesund",
                        "easy": "Einfach", "quick": "Schnell", "creamy": "Cremig",
                        "spicy": "Scharf", "sweet": "Süß", "with": "mit",
                        "and": "und", "the": "", "a": "", "an": "",
                        "breast": "Brust", "thigh": "Keule", "wing": "Flügel",
                        "steak": "Steak", "burger": "Burger", "sandwich": "Sandwich",
                        "wrap": "Wrap", "bowl": "Bowl", "casserole": "Auflauf",
                        "stew": "Eintopf", "curry": "Curry", "stir-fry": "Pfannengericht",
                        "garlic": "Knoblauch", "lemon": "Zitrone", "honey": "Honig",
                        "mushroom": "Pilz", "mushrooms": "Pilze", "cheese": "Käse",
                        "tomato": "Tomate", "onion": "Zwiebel", "pepper": "Paprika",
                      };
                      
                      let result = name;
                      for (const [eng, de] of Object.entries(translations)) {
                        const regex = new RegExp(`\\b${eng}\\b`, 'gi');
                        result = result.replace(regex, de);
                      }
                      return result.trim().replace(/\s+/g, ' ');
                    };
                    
                    const translatedName = translateRecipeName(recipe.recipe_name);
                    const translatedDesc = translateRecipeName(recipe.recipe_description || "");
                    
                    return (
                      <Box 
                          key={recipe.recipe_id} 
                          p={4} 
                          borderWidth="1px" 
                          borderRadius="md" 
                          cursor="pointer"
                          _hover={{ bg: "green.50", borderColor: "green.300" }}
                          onClick={() => handleSelect(recipe.recipe_id)}
                          transition="all 0.2s"
                      >
                        {/* Header mit Icon */}
                        <Box display="flex" alignItems="center" gap={3} mb={2}>
                          <Box 
                            fontSize="2xl" 
                            bg="gray.100" 
                            p={2} 
                            borderRadius="md"
                            title={recipeIcon.label}
                          >
                            {recipeIcon.icon}
                          </Box>
                          <Box flex={1}>
                            <Text fontWeight="bold" color="gray.800" noOfLines={2}>
                              {translatedName}
                            </Text>
                            <Text fontSize="xs" color="gray.500">{recipeIcon.label}</Text>
                          </Box>
                        </Box>
                        
                        {translatedDesc && (
                          <Text fontSize="sm" color="gray.600" noOfLines={2} mb={2}>
                            {translatedDesc}
                          </Text>
                        )}
                        
                        {/* Nutrition Summary */}
                        {nutrition.calories && (
                          <Box p={2} bg="gray.50" borderRadius="sm">
                            <SimpleGrid columns={4} gap={1} fontSize="xs" textAlign="center">
                              <Box>
                                <Text fontWeight="bold" color="blue.600">
                                  {parseFloat(nutrition.calories).toFixed(0)}
                                </Text>
                                <Text color="gray.500">kcal</Text>
                              </Box>
                              <Box>
                                <Text fontWeight="bold" color="green.600">
                                  {parseFloat(nutrition.protein || 0).toFixed(0)}g
                                </Text>
                                <Text color="gray.500">Prot</Text>
                              </Box>
                              <Box>
                                <Text fontWeight="bold" color="orange.600">
                                  {parseFloat(nutrition.carbohydrate || 0).toFixed(0)}g
                                </Text>
                                <Text color="gray.500">Carbs</Text>
                              </Box>
                              <Box>
                                <Text fontWeight="bold" color="red.600">
                                  {parseFloat(nutrition.fat || 0).toFixed(0)}g
                                </Text>
                                <Text color="gray.500">Fett</Text>
                              </Box>
                            </SimpleGrid>
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </SimpleGrid>
              )}
              
              {/* Recipe Detail Card */}
              {selectedFood && (
                <RecipeDetailCard key={selectedFood.recipe_id} recipe={selectedFood} />
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
