import { NextRequest, NextResponse } from "next/server";
import { fatSecretClient } from "../../../utils/fatsecret-client";

/**
 * GET /api/fatsecret/recipes/recommended
 * 
 * Holt fitness-optimierte Rezeptempfehlungen:
 * - Hoher Proteinanteil (25%+)
 * - Niedriger Fettanteil (max 35%)
 * - Moderate Kalorien (max 600 kcal)
 * 
 * Query-Parameter:
 * - query: Suchbegriff zur Filterung (optional)
 * - max_results: Anzahl der Ergebnisse (Standard: 3)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || undefined;
    const maxResults = parseInt(searchParams.get("max_results") || "3");

    const data = await fatSecretClient.getRecommendedRecipes(query, maxResults);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[Recommended Recipes] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch recommended recipes" },
      { status: 500 }
    );
  }
}
