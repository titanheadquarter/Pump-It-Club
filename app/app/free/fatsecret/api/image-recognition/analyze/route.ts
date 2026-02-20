import { NextRequest, NextResponse } from "next/server";
import { fatSecretClient, FEATURES } from "../../../utils/fatsecret-client";

export async function POST(request: NextRequest) {
  if (!FEATURES.IMAGE_RECOGNITION) {
    return NextResponse.json(
      { error: "Image Recognition is an Add-On feature" },
      { status: 403 }
    );
  }

  try {
    const { image_base64 } = await request.json();

    if (!image_base64) {
      return NextResponse.json(
        { error: "Image data (base64) is required" },
        { status: 400 }
      );
    }

    // Achtung: Große Payloads können Probleme bereiten
    const data = await fatSecretClient.execute("image.recognition.v2", { image_base64 });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to analyze image" },
      { status: 500 }
    );
  }
}
