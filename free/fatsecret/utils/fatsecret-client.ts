import crypto from "crypto";

// Konfiguration (würde idealerweise aus Environment Variables kommen)
const CLIENT_ID = process.env.FATSECRET_CLIENT_ID || "139fbdf690aa4f36a7ab1e5099b5f58e";
const CLIENT_SECRET = process.env.FATSECRET_CLIENT_SECRET || "2b00f304676c4110a94420123ac13141";
const API_BASE_URL = "https://platform.fatsecret.com/rest/server.api";

// Edition Features Configuration
export const FEATURES = {
  PREMIER: process.env.FATSECRET_ENABLE_PREMIER === "true",
  BARCODE: process.env.FATSECRET_ENABLE_BARCODE === "true",
  IMAGE_RECOGNITION: process.env.FATSECRET_ENABLE_IMAGE === "true",
};

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
   * Generiert die OAuth 1.0a Signatur
   */
  private signRequest(
    method: string,
    url: string,
    params: FatSecretParams
  ): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join("&");

    const baseString = [
      method.toUpperCase(),
      encodeURIComponent(url),
      encodeURIComponent(sortedParams),
    ].join("&");

    const signingKey = `${encodeURIComponent(this.consumerSecret)}&`; // No token secret for 2-legged OAuth

    return crypto
      .createHmac("sha1", signingKey)
      .update(baseString)
      .digest("base64");
  }

  /**
   * Führt einen API Request aus
   */
  async execute(method: string, params: FatSecretParams = {}) {
    // 1. Basis-Parameter sammeln
    const requestParams: FatSecretParams = {
      ...params,
      method: method,
      format: "json",
      oauth_consumer_key: this.consumerKey,
      oauth_nonce: Math.random().toString(36).substring(2),
      oauth_signature_method: "HMAC-SHA1",
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
      oauth_version: "1.0",
    };

    // 2. Signatur generieren
    requestParams["oauth_signature"] = this.signRequest(
      "POST", // FatSecret empfiehlt POST für alle Requests
      API_BASE_URL,
      requestParams
    );

    // 3. Request senden
    // Parameter in den Body als Form-Data oder URL-Encoded
    const body = new URLSearchParams(requestParams).toString();

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
        next: { revalidate: 3600 }, // 1h Caching wie angefordert
      });

      if (!response.ok) {
        throw new Error(`FatSecret API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(`FatSecret API Error ${data.error.code}: ${data.error.message}`);
      }

      return data;
    } catch (error) {
      console.error(`FatSecret Request Failed (${method}):`, error);
      throw error;
    }
  }

  // --- Convenience Methoden ---

  async searchFoods(query: string, page: number = 0, maxResults: number = 20) {
    return this.execute("foods.search.v3", {
      search_expression: query,
      page_number: page.toString(),
      max_results: maxResults.toString(),
    });
  }

  async getFood(foodId: string) {
    return this.execute("food.get.v4", {
      food_id: foodId,
    });
  }

  // Premier Feature
  async autocomplete(expression: string) {
    if (!FEATURES.PREMIER) {
      throw new Error("Premier Feature 'Autocomplete' not enabled");
    }
    return this.execute("foods.autocomplete", {
      expression,
    });
  }

  async searchRecipes(query: string, page: number = 0, maxResults: number = 20) {
    return this.execute("recipes.search", {
      search_expression: query,
      page_number: page.toString(),
      max_results: maxResults.toString(),
    });
  }

  async getRecipe(recipeId: string) {
    return this.execute("recipe.get", {
      recipe_id: recipeId,
    });
  }
}

export const fatSecretClient = new FatSecretClient();
