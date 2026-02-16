import { NextRequest, NextResponse } from "next/server";
import { fatSecretClient } from "../../../utils/fatsecret-client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { error: "Food ID is required" },
        { status: 400 }
      );
    }

    const data = await fatSecretClient.getFood(id);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch food details" },
      { status: 500 }
    );
  }
}
