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
        { error: "Recipe ID is required" },
        { status: 400 }
      );
    }

    const data = await fatSecretClient.getRecipe(id);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch recipe details" },
      { status: 500 }
    );
  }
}
