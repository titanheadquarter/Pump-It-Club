// Konfiguration
const CLIENT_ID = process.env.FATSECRET_CLIENT_ID || "139fbdf690aa4f36a7ab1e5099b5f58e";
const CLIENT_SECRET = process.env.FATSECRET_CLIENT_SECRET || "2b00f304676c4110a94420123ac13141";
const API_BASE_URL = "https://platform.fatsecret.com/rest/server.api";
const TOKEN_URL = "https://oauth.fatsecret.com/connect/token";

// Edition Features Configuration
export const FEATURES = {
  PREMIER: process.env.FATSECRET_ENABLE_PREMIER === "true",
  BARCODE: process.env.FATSECRET_ENABLE_BARCODE === "true",
  IMAGE_RECOGNITION: process.env.FATSECRET_ENABLE_IMAGE === "true",
};

// Globales Token-Cache (überlebt zwischen Requests im selben Node.js Prozess)
let cachedToken: { token: string; expiresAt: number } | null = null;

interface FatSecretParams {
  [key: string]: string;
}

export class FatSecretClient {
  private consumerKey: string;
  private consumerSecret: string;

  constructor(key: string = CLIENT_ID, secret: string = CLIENT_SECRET) {
    this.consumerKey = key;
    this.consumerSecret = secret;
  }

  /**
   * Holt ein Access Token (mit globalem Caching)
   * 
   * Scopes:
   * - "basic" : Grundfunktionen (foods.search, food.get)
   * - "localization" : Ermöglicht region/language Parameter für deutsche Ergebnisse
   */
  private async getAccessToken(): Promise<string> {
    // Prüfe globales Cache (mit 60s Puffer)
    if (cachedToken && Date.now() < cachedToken.expiresAt - 60000) {
      return cachedToken.token;
    }

    const credentials = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString("base64");
    
    console.log("[FatSecret] Requesting new access token with localization scope...");

    // Versuche mit basic + localization für deutsche Ergebnisse
    let response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials&scope=basic localization barcode",
      cache: "no-store",
    });

    // Fallback auf basic + barcode, falls localization nicht verfügbar
    if (!response.ok) {
      console.warn("[FatSecret] Localization scope nicht verfügbar, versuche basic + barcode...");
      response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
        body: "grant_type=client_credentials&scope=basic barcode",
        cache: "no-store",
      });
    }

    // Fallback auf nur basic, falls barcode auch nicht verfügbar
    if (!response.ok) {
      console.warn("[FatSecret] Barcode scope nicht verfügbar, verwende nur basic...");
      response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${credentials}`,
        },
        body: "grant_type=client_credentials&scope=basic",
        cache: "no-store",
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[FatSecret] Token request failed:", response.status, errorText);
      throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Global cachen
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in * 1000),
    };
    
    console.log("[FatSecret] Token obtained, expires in", data.expires_in, "seconds");
    
    return cachedToken.token;
  }

  /**
   * Führt einen API Request aus (OAuth 2.0)
   */
  async execute(method: string, params: FatSecretParams = {}) {
    const token = await this.getAccessToken();

    // Parameter für den Request
    const requestParams = new URLSearchParams({
      ...params,
      method: method,
      format: "json",
    });

    try {
      // Bei OAuth 2.0 können wir GET oder POST nutzen. POST ist sicherer für lange Queries.
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: requestParams.toString(),
        next: { revalidate: 3600 }, // 1h Caching für die Daten
      });

      if (!response.ok) {
        // Bei 401 könnte das Token abgelaufen sein -> Retry Logic könnte hier hin
        throw new Error(`FatSecret API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        // Wenn food_id nicht gefunden wurde (Code 13), geben wir null zurück statt einen Error zu werfen
        if (data.error.code === "13" || data.error.code === 13) {
          console.warn(`[FatSecret] Item not found (${method}):`, params);
          return null;
        }
        throw new Error(`FatSecret API Error ${data.error.code}: ${data.error.message}`);
      }

      return data;
    } catch (error) {
      console.error(`FatSecret Request Failed (${method}):`, error);
      throw error;
    }
  }

  // --- Convenience Methoden ---

  /**
   * Sucht nach Lebensmitteln
   * 
   * Mit localization Scope können wir region/language für deutsche Ergebnisse nutzen.
   */
  async searchFoods(query: string, page: number = 0, maxResults: number = 20) {
    return this.execute("foods.search", {
      search_expression: query,
      page_number: page.toString(),
      max_results: maxResults.toString(),
      region: "DE",    // Deutsche Datenbank
      language: "de",  // Deutsche Sprache
    });
  }

  /**
   * Holt vollständige Nährwertdaten für ein Lebensmittel
   */
  async getFood(foodId: string) {
    return this.execute("food.get.v5", {
      food_id: foodId,
      region: "DE",
      language: "de",
    });
  }

  // Premier Feature - deaktiviert ohne Premier-Account
  async autocomplete(expression: string) {
    throw new Error("Autocomplete benötigt Premier-Account. Bitte upgraden Sie Ihren FatSecret-Account.");
  }

  /**
   * Holt empfohlene Rezepte für Fitness (hoher Proteinanteil, niedriger Fettanteil)
   * 
   * Nutzt die Makronährstoff-Filter der v3 API:
   * - protein_percentage.from/to
   * - fat_percentage.from/to
   * 
   * @param query - Optionaler Suchbegriff zur Filterung (z.B. "Hähnchen")
   * @param maxResults - Anzahl der Ergebnisse (Standard: 3)
   */
  async getRecommendedRecipes(query?: string, maxResults: number = 3) {
    try {
      const params: FatSecretParams = {
        max_results: maxResults.toString(),
        region: "DE",
        // Fitness-optimierte Filter:
        "protein_percentage.from": "25",  // Mindestens 25% Protein
        "fat_percentage.to": "35",        // Maximal 35% Fett
        "calories.to": "600",             // Maximal 600 kcal pro Portion
      };
      
      // Füge Suchbegriff hinzu, falls vorhanden
      if (query && query.trim()) {
        params.search_expression = query.trim();
        console.log(`[Recipes] Getting recommendations for "${query}"...`);
      }
      
      const result = await this.execute("recipes.search.v3", params);
      
      if (result.recipes?.recipe) {
        console.log(`[Recipes] Found ${result.recipes.total_results} recommended recipes`);
        return result;
      }
      
      // Fallback: Weniger strenge Filter
      console.log("[Recipes] No results with strict filters, trying relaxed...");
      const relaxedParams: FatSecretParams = {
        max_results: maxResults.toString(),
        region: "DE",
        "protein_percentage.from": "20",
        "fat_percentage.to": "45",
      };
      
      if (query && query.trim()) {
        relaxedParams.search_expression = query.trim();
      }
      
      return this.execute("recipes.search.v3", relaxedParams);
    } catch (error) {
      console.error("[Recipes] Failed to get recommendations:", error);
      throw error;
    }
  }

  /**
   * Sucht nach Rezepten (v3 API)
   * 
   * Nutzt region: "DE" für deutsche Rezepte.
   * Laut API Demo (https://platform.fatsecret.com/api-demo#recipe-api) ist Deutschland verfügbar.
   * 
   * Falls keine deutschen Ergebnisse, Fallback auf englische Suche mit Übersetzung.
   */
  async searchRecipes(query: string, page: number = 0, maxResults: number = 20) {
    try {
      // Versuche mit deutscher Region (v3 API)
      const result = await this.execute("recipes.search.v3", {
        search_expression: query,
        page_number: page.toString(),
        max_results: maxResults.toString(),
        region: "DE",  // Deutsche Rezepte
      });
      
      // Prüfe ob Ergebnisse vorhanden sind
      if (result.recipes?.total_results && parseInt(result.recipes.total_results) > 0) {
        console.log(`[Recipes] Found ${result.recipes.total_results} German results for "${query}"`);
        return result;
      }
      
      // Falls keine deutschen Ergebnisse, versuche US-Region mit Übersetzung
      console.log("[Recipes] No German results, trying US with translation...");
      const translatedQuery = this.translateToEnglish(query);
      
      return this.execute("recipes.search.v3", {
        search_expression: translatedQuery,
        page_number: page.toString(),
        max_results: maxResults.toString(),
        region: "US",  // US Datenbank als Fallback
      });
    } catch (error: any) {
      // Falls region Parameter einen Fehler verursacht (Missing scope), 
      // versuche ohne region mit Übersetzung
      if (error.message?.includes("scope") || error.message?.includes("region")) {
        console.log("[Recipes] Region not available, trying without region...");
        const translatedQuery = this.translateToEnglish(query);
        
        return this.execute("recipes.search", {
          search_expression: translatedQuery,
          page_number: page.toString(),
          max_results: maxResults.toString(),
        });
      }
      throw error;
    }
  }

  /**
   * Übersetzt häufige deutsche Lebensmittel-/Rezeptbegriffe ins Englische
   */
  private translateToEnglish(query: string): string {
    const translations: Record<string, string> = {
      // Fleisch
      "hähnchen": "chicken",
      "huhn": "chicken",
      "hühnchen": "chicken",
      "rind": "beef",
      "rindfleisch": "beef",
      "schwein": "pork",
      "schweinefleisch": "pork",
      "lamm": "lamb",
      "pute": "turkey",
      "truthahn": "turkey",
      "ente": "duck",
      "fisch": "fish",
      "lachs": "salmon",
      "thunfisch": "tuna",
      "garnelen": "shrimp",
      "hackfleisch": "ground meat",
      
      // Gemüse
      "kartoffel": "potato",
      "kartoffeln": "potatoes",
      "tomate": "tomato",
      "tomaten": "tomatoes",
      "zwiebel": "onion",
      "zwiebeln": "onions",
      "knoblauch": "garlic",
      "paprika": "pepper",
      "brokkoli": "broccoli",
      "spinat": "spinach",
      "karotte": "carrot",
      "karotten": "carrots",
      "möhren": "carrots",
      "gurke": "cucumber",
      "salat": "salad",
      "pilze": "mushrooms",
      "champignons": "mushrooms",
      "zucchini": "zucchini",
      "aubergine": "eggplant",
      "kürbis": "pumpkin",
      "erbsen": "peas",
      "bohnen": "beans",
      
      // Kohlenhydrate
      "reis": "rice",
      "nudeln": "pasta",
      "spaghetti": "spaghetti",
      "brot": "bread",
      "brötchen": "rolls",
      "hafer": "oats",
      "haferflocken": "oatmeal",
      
      // Milchprodukte
      "käse": "cheese",
      "milch": "milk",
      "joghurt": "yogurt",
      "quark": "cottage cheese",
      "sahne": "cream",
      "butter": "butter",
      "ei": "egg",
      "eier": "eggs",
      
      // Gerichte
      "suppe": "soup",
      "eintopf": "stew",
      "auflauf": "casserole",
      "pfanne": "pan",
      "ofen": "oven",
      "gebacken": "baked",
      "gegrillt": "grilled",
      "gebraten": "fried",
      "gesund": "healthy",
      "schnell": "quick",
      "einfach": "easy",
      "low carb": "low carb",
      "kalorienarm": "low calorie",
      "vegetarisch": "vegetarian",
      "vegan": "vegan",
      
      // Süßes
      "kuchen": "cake",
      "torte": "cake",
      "kekse": "cookies",
      "schokolade": "chocolate",
      "dessert": "dessert",
      "nachtisch": "dessert",
      "obst": "fruit",
      "apfel": "apple",
      "banane": "banana",
      "beeren": "berries",
      
      // Mahlzeiten
      "frühstück": "breakfast",
      "mittagessen": "lunch",
      "abendessen": "dinner",
      "snack": "snack",
    };

    let result = query.toLowerCase();
    
    // Ersetze alle gefundenen deutschen Begriffe
    for (const [german, english] of Object.entries(translations)) {
      // Verwende Wortgrenzen für genauere Ersetzung
      const regex = new RegExp(`\\b${german}\\b`, 'gi');
      result = result.replace(regex, english);
    }
    
    console.log(`[Recipe Search] Translated "${query}" -> "${result}"`);
    return result;
  }

  /**
   * Holt vollständige Rezept-Details (v2 API)
   * 
   * Gibt zurück: Nährwerte pro Portion, Zutaten mit food_id/serving_id,
   * Zubereitungsschritte, Bilder, Kategorien
   * 
   * Mit region Parameter für deutsche Rezepte
   */
  async getRecipe(recipeId: string) {
    return this.execute("recipe.get.v2", {
      recipe_id: recipeId,
      region: "DE",  // Deutsche Rezeptdetails
    });
  }
}

export const fatSecretClient = new FatSecretClient();
