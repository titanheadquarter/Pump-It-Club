import { NextRequest, NextResponse } from "next/server";
import { fatSecretClient } from "../../../utils/fatsecret-client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "0");
  const maxResults = parseInt(searchParams.get("max_results") || "20");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const data = await fatSecretClient.searchRecipes(query, page, maxResults);
    console.log("[Recipes Search] Response:", JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[Recipes Search] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to search recipes" },
      { status: 500 }
    );
  }
}
