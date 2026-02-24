import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { getOutsetaUidFromRequest } from "@/lib/course-auth";

export const dynamic = "force-dynamic";

export type ProgressEntry = {
  video_id: string;
  watched_seconds: number;
  completed: boolean;
  last_watched_at: string;
};

export async function GET(request: NextRequest) {
  const auth = await getOutsetaUidFromRequest(request);
  if (auth instanceof NextResponse) return auth;
  const { uid } = auth;

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("course_video_progress")
      .select("video_id, watched_seconds, completed, last_watched_at")
      .eq("outseta_user_uid", uid);

    if (error) {
      console.error("[course/progress] GET error:", error);
      return NextResponse.json(
        { error: "Failed to load progress", details: error.message },
        { status: 500 }
      );
    }

    const progress: ProgressEntry[] = (data ?? []).map((row) => ({
      video_id: row.video_id,
      watched_seconds: row.watched_seconds ?? 0,
      completed: row.completed ?? false,
      last_watched_at: row.last_watched_at ?? "",
    }));

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("[course/progress] GET error:", error);
    return NextResponse.json(
      {
        error: "Failed to load progress",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await getOutsetaUidFromRequest(request);
  if (auth instanceof NextResponse) return auth;
  const { uid } = auth;

  let body: { videoId: string; watchedSeconds: number; completed?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { videoId, watchedSeconds, completed } = body;
  if (!videoId || typeof watchedSeconds !== "number") {
    return NextResponse.json(
      { error: "Body must include videoId (string) and watchedSeconds (number)" },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from("course_video_progress").upsert(
      {
        outseta_user_uid: uid,
        video_id: videoId,
        watched_seconds: Math.max(0, Math.floor(watchedSeconds)),
        completed: completed ?? false,
        last_watched_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "outseta_user_uid,video_id",
      }
    );

    if (error) {
      console.error("[course/progress] POST error:", error);
      return NextResponse.json(
        { error: "Failed to save progress", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[course/progress] POST error:", error);
    return NextResponse.json(
      {
        error: "Failed to save progress",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
