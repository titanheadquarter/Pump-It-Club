/**
 * FatSecret Platform API Integration
 * 
 * Nutzt Next.js API Routes als Proxy, um CORS-Probleme zu vermeiden
 */

interface FoodSearchResult {
  food_id: string;
  food_name: string;
  food_type: string;
  brand_name?: string;
  food_description?: string;
}

interface FoodSearchResponse {
  foods: {
    food: FoodSearchResult[] | FoodSearchResult;
    total_results: number;
    max_results: number;
    page_number: number;
  };
}

interface FoodNutritionInfo {
  food_id: string;
  food_name: string;
  food_type: string;
  brand_name?: string;
  servings: {
    serving: Array<{
      serving_id: string;
      serving_description: string;
      serving_url: string;
      metric_serving_amount: string;
      metric_serving_unit: string;
      number_of_units: string;
      measurement_description: string;
      calories: string;
      carbohydrate: string;
      protein: string;
      fat: string;
      saturated_fat?: string;
      polyunsaturated_fat?: string;
      monounsaturated_fat?: string;
      cholesterol?: string;
      sodium?: string;
      potassium?: string;
      fiber?: string;
      sugar?: string;
    }>;
  };
}

/**
 * Sucht nach Lebensmitteln in der FatSecret Datenbank
 * Nutzt Next.js API Route als Proxy
 */
export async function searchFoods(query: string, maxResults: number = 20): Promise<FoodSearchResult[]> {
  try {
    const searchUrl = new URL("/api/fatsecret/search", window.location.origin);
    searchUrl.searchParams.append("query", query);
    searchUrl.searchParams.append("max_results", maxResults.toString());

    const response = await fetch(searchUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("API Error Response:", errorData);
      throw new Error(errorData.error || `Food search failed: ${response.statusText}`);
    }

    const data: any = await response.json();
    console.log("Raw API Response:", data);
    
    // FatSecret API gibt die Daten in verschiedenen Strukturen zurück
    // Prüfe verschiedene mögliche Strukturen
    
    // Struktur 1: { foods: { food: [...] } }
    if (data.foods?.food) {
      const foodData = data.foods.food;
      const foods = Array.isArray(foodData) ? foodData : [foodData];
      console.log("Normalized foods (structure 1):", foods);
      return foods;
    }
    
    // Struktur 2: { food: [...] } (direkt)
    if (data.food) {
      const foodData = data.food;
      const foods = Array.isArray(foodData) ? foodData : [foodData];
      console.log("Normalized foods (structure 2):", foods);
      return foods;
    }
    
    // Struktur 3: Array direkt
    if (Array.isArray(data)) {
      console.log("Normalized foods (structure 3 - array):", data);
      return data;
    }
    
    console.warn("Unknown response structure:", data);
    return [];
  } catch (error) {
    console.error("Error searching foods:", error);
    throw error;
  }
}

/**
 * Holt detaillierte Nährwertinformationen für ein Lebensmittel
 * Nutzt Next.js API Route als Proxy
 */
export async function getFoodNutrition(foodId: string): Promise<FoodNutritionInfo | null> {
  try {
    const foodUrl = new URL("/api/fatsecret/food", window.location.origin);
    foodUrl.searchParams.append("food_id", foodId);

    const response = await fetch(foodUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Food nutrition request failed: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.food) {
      return null;
    }

    const foodData = data.food as FoodNutritionInfo;
    
    // Normalisiere servings Array
    if (foodData.servings?.serving) {
      const servingData = foodData.servings.serving;
      foodData.servings.serving = Array.isArray(servingData) ? servingData : [servingData];
    }

    return foodData;
  } catch (error) {
    console.error("Error fetching food nutrition:", error);
    throw error;
  }
}

/**
 * Extrahiert Makros aus einem Serving
 */
export interface MacroInfo {
  calories: number;
  protein: number; // in g
  carbs: number; // in g
  fat: number; // in g
  servingDescription: string;
}

export function extractMacrosFromServing(serving: FoodNutritionInfo["servings"]["serving"][0]): MacroInfo {
  return {
    calories: parseFloat(serving.calories || "0"),
    protein: parseFloat(serving.protein || "0"),
    carbs: parseFloat(serving.carbohydrate || "0"),
    fat: parseFloat(serving.fat || "0"),
    servingDescription: serving.serving_description || serving.measurement_description || "1 Portion",
  };
}
