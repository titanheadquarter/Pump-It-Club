import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { getOutsetaUidFromRequest } from "@/lib/course-auth";

export async function POST(request: NextRequest) {
  try {
    // Get Outseta UID from JWT
    const uidResult = await getOutsetaUidFromRequest(request);
    if (uidResult instanceof NextResponse) {
      return uidResult;
    }
    const { uid } = uidResult;

    // Parse request body
    const body = await request.json();
    const { planId } = body;

    if (!planId) {
      return NextResponse.json(
        { error: "planId ist erforderlich" },
        { status: 400 }
      );
    }

    // Verify plan exists
    const supabase = createServerClient();
    const { data: plan, error: planError } = await supabase
      .from("training_plans")
      .select("id")
      .eq("id", planId)
      .single();

    if (planError || !plan) {
      return NextResponse.json(
        { error: "Trainingsplan nicht gefunden" },
        { status: 404 }
      );
    }

    // Assign plan to user (upsert)
    const { error: assignError } = await supabase
      .from("user_training_plan_assignment")
      .upsert(
        {
          outseta_user_uid: uid,
          training_plan_id: planId,
          assigned_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "outseta_user_uid",
        }
      );

    if (assignError) {
      console.error("[training-plans/assign] Database error:", assignError);
      return NextResponse.json(
        { error: "Fehler beim Zuweisen des Plans" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Trainingsplan erfolgreich zugewiesen"
    });
  } catch (error) {
    console.error("[training-plans/assign] Unexpected error:", error);
    return NextResponse.json(
      { error: "Interner Server-Fehler" },
      { status: 500 }
    );
  }
}