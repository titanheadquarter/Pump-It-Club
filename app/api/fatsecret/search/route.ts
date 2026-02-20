import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = "139fbdf690aa4f36a7ab1e5099b5f58e";
const CLIENT_SECRET = "2b00f304676c4110a94420123ac13141";
const API_BASE_URL = "https://platform.fatsecret.com/rest";

/**
 * Holt ein OAuth 2.0 Access Token (Server-Side)
 */
async function getAccessToken(): Promise<string> {
  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  
  // Basic + Localization + Barcode für deutsche Ergebnisse und Scans
  let response = await fetch("https://oauth.fatsecret.com/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: "grant_type=client_credentials&scope=basic localization barcode",
  });

  // Fallback auf basic + barcode falls localization nicht verfügbar
  if (!response.ok) {
    response = await fetch("https://oauth.fatsecret.com/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials&scope=basic barcode",
    });
  }

  // Finaler Fallback auf nur basic
  if (!response.ok) {
    response = await fetch("https://oauth.fatsecret.com/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials&scope=basic",
    });
  }

  if (!response.ok) {
    throw new Error(`Token request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Proxy für FatSecret Food Search
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const maxResults = searchParams.get("max_results") || "20";

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();
    
    // foods.search mit deutscher Region/Sprache
    const params = new URLSearchParams({
      method: "foods.search",
      search_expression: query,
      max_results: maxResults,
      format: "json",
      region: "DE",
      language: "de",
    });

    const response = await fetch(`${API_BASE_URL}/server.api?${params.toString()}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("FatSecret API Error:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      return NextResponse.json(
        { error: `Food search failed: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("FatSecret Search Response:", JSON.stringify(data, null, 2));
    
    // FatSecret API kann verschiedene Response-Strukturen zurückgeben
    // Prüfe ob es ein Error-Objekt ist
    if (data.error) {
      return NextResponse.json(
        { error: data.error.description || data.error.message || "Unknown error" },
        { status: 400 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error searching foods:", error);
    return NextResponse.json(
      { error: "Failed to search foods", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
