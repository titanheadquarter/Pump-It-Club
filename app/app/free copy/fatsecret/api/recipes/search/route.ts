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
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to search recipes" },
      { status: 500 }
    );
  }
}
