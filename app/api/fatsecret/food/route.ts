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
 * Proxy für FatSecret Food Nutrition Info
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const foodId = searchParams.get("food_id");

    if (!foodId) {
      return NextResponse.json(
        { error: "food_id parameter is required" },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();
    
    // food.get.v5 mit deutscher Region/Sprache
    const foodUrl = new URL(`${API_BASE_URL}/server.api`);
    foodUrl.searchParams.append("method", "food.get.v5");
    foodUrl.searchParams.append("food_id", foodId);
    foodUrl.searchParams.append("format", "json");
    foodUrl.searchParams.append("region", "DE");
    foodUrl.searchParams.append("language", "de");

    const response = await fetch(foodUrl.toString(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
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
        { error: `Food nutrition request failed: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("FatSecret Food Response:", JSON.stringify(data, null, 2));
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching food nutrition:", error);
    return NextResponse.json(
      { error: "Failed to fetch food nutrition", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
