import { NextRequest, NextResponse } from "next/server";
import { fatSecretClient, FEATURES } from "../../../utils/fatsecret-client";

export async function GET(request: NextRequest) {
  if (!FEATURES.PREMIER) {
    return NextResponse.json(
      { error: "Autocomplete is a Premier feature" },
      { status: 403 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const data = await fatSecretClient.autocomplete(query);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch autocomplete suggestions" },
      { status: 500 }
    );
  }
}
