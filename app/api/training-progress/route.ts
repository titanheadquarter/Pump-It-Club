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

    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const supabase = createServerClient();

    let query = supabase
      .from("training_log")
      .select(`
        id,
        workout_date,
        day_key,
        exercise_name,
        set_index,
        reps_done,
        weight_kg,
        notes,
        logged_at,
        training_plans (
          id,
          name,
          slug
        )
      `)
      .eq("outseta_user_uid", uid)
      .order("workout_date", { ascending: false })
      .order("logged_at", { ascending: false });

    // Optional date filtering
    if (from) {
      query = query.gte("workout_date", from);
    }
    if (to) {
      query = query.lte("workout_date", to);
    }

    const { data: progress, error } = await query;

    if (error) {
      console.error("[training-progress] Database error:", error);
      return NextResponse.json(
        { error: "Datenbank-Fehler" },
        { status: 500 }
      );
    }

    return NextResponse.json({ progress: progress || [] });
  } catch (error) {
    console.error("[training-progress] Unexpected error:", error);
    return NextResponse.json(
      { error: "Interner Server-Fehler" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get Outseta UID from JWT
    const uidResult = await getOutsetaUidFromRequest(request);
    if (uidResult instanceof NextResponse) {
      return uidResult;
    }
    const { uid } = uidResult;

    // Parse request body - array of log entries
    const body = await request.json();
    const logEntries = Array.isArray(body) ? body : [body];

    if (logEntries.length === 0) {
      return NextResponse.json(
        { error: "Mindestens ein Trainingseintrag erforderlich" },
        { status: 400 }
      );
    }

    // Validate entries
    for (const entry of logEntries) {
      const { workoutDate, planId, dayKey, exerciseName, setIndex, repsDone } = entry;

      if (!workoutDate || !planId || !dayKey || !exerciseName || setIndex === undefined || repsDone === undefined) {
        return NextResponse.json(
          { error: "workoutDate, planId, dayKey, exerciseName, setIndex und repsDone sind erforderlich" },
          { status: 400 }
        );
      }
    }

    const supabase = createServerClient();

    // Prepare entries for insertion
    const entries = logEntries.map(entry => ({
      outseta_user_uid: uid,
      training_plan_id: entry.planId,
      workout_date: entry.workoutDate,
      day_key: entry.dayKey,
      exercise_name: entry.exerciseName,
      set_index: entry.setIndex,
      reps_done: entry.repsDone,
      weight_kg: entry.weightKg || null,
      notes: entry.notes || null,
    }));

    // Insert log entries
    const { data, error } = await supabase
      .from("training_log")
      .insert(entries)
      .select();

    if (error) {
      console.error("[training-progress] Database error:", error);
      return NextResponse.json(
        { error: "Fehler beim Speichern des Trainings" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${entries.length} Trainingseinträge gespeichert`,
      data
    });
  } catch (error) {
    console.error("[training-progress] Unexpected error:", error);
    return NextResponse.json(
      { error: "Interner Server-Fehler" },
      { status: 500 }
    );
  }
}