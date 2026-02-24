import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ planId: string }> }
) {
  try {
    const { planId } = await params;
    if (!planId) {
      return NextResponse.json(
        { error: "planId erforderlich" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    const { data: plan, error } = await supabase
      .from("training_plans")
      .select("id, slug, name, gender, description, structure")
      .eq("id", planId)
      .single();

    if (error || !plan) {
      return NextResponse.json(
        { error: "Trainingsplan nicht gefunden" },
        { status: 404 }
      );
    }

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("[training-plans/[planId]] Unexpected error:", error);
    return NextResponse.json(
      { error: "Interner Server-Fehler" },
      { status: 500 }
    );
  }
}
