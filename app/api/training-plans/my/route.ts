import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { getOutsetaUidFromRequest } from "@/lib/course-auth";

export async function GET(request: NextRequest) {
  try {
    // Get Outseta UID from JWT
    const uidResult = await getOutsetaUidFromRequest(request);
    if (uidResult instanceof NextResponse) {
      return uidResult;
    }
    const { uid } = uidResult;

    const supabase = createServerClient();

    // Get user's assigned plan
    const { data: assignment, error: assignmentError } = await supabase
      .from("user_training_plan_assignment")
      .select(`
        training_plan_id,
        assigned_at,
        training_plans (
          id,
          slug,
          name,
          gender,
          description,
          structure
        )
      `)
      .eq("outseta_user_uid", uid)
      .single();

    if (assignmentError && assignmentError.code !== "PGRST116") { // PGRST116 = no rows
      console.error("[training-plans/my] Database error:", assignmentError);
      return NextResponse.json(
        { error: "Datenbank-Fehler" },
        { status: 500 }
      );
    }

    const plan = assignment?.training_plans || null;

    return NextResponse.json({ plan });
  } catch (error) {
    console.error("[training-plans/my] Unexpected error:", error);
    return NextResponse.json(
      { error: "Interner Server-Fehler" },
      { status: 500 }
    );
  }
}