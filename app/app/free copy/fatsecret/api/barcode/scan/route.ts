import { NextRequest, NextResponse } from "next/server";
import { fatSecretClient, FEATURES } from "../../../utils/fatsecret-client";

export async function POST(request: NextRequest) {
  if (!FEATURES.BARCODE) {
    return NextResponse.json(
      { error: "Barcode scanning is an Add-On feature" },
      { status: 403 }
    );
  }

  try {
    const { barcode } = await request.json();

    if (!barcode) {
      return NextResponse.json(
        { error: "Barcode is required" },
        { status: 400 }
      );
    }

    const data = await fatSecretClient.execute("food.find_id_for_barcode", { barcode });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to scan barcode" },
      { status: 500 }
    );
  }
}
