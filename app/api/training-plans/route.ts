import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const supabase = createServerClient();

    const { data: plans, error } = await supabase
      .from("training_plans")
      .select("id, slug, name, gender, description")
      .order("name");

    if (error) {
      console.error("[training-plans] Database error:", error);
      return NextResponse.json(
        { error: "Datenbank-Fehler" },
        { status: 500 }
      );
    }

    return NextResponse.json({ plans: plans || [] });
  } catch (error) {
    console.error("[training-plans] Unexpected error:", error);
    return NextResponse.json(
      { error: "Interner Server-Fehler" },
      { status: 500 }
    );
  }
}