import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = "139fbdf690aa4f36a7ab1e5099b5f58e";
const CLIENT_SECRET = "2b00f304676c4110a94420123ac13141";

/**
 * Proxy für FatSecret OAuth 2.0 Token-Request
 * Verhindert CORS-Probleme durch Server-Side Request
 */
export async function POST(request: NextRequest) {
  try {
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
    
    const response = await fetch("https://oauth.fatsecret.com/connect/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials&scope=basic localization barcode",
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Token request failed: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching FatSecret access token:", error);
    return NextResponse.json(
      { error: "Failed to fetch access token", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
