import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { getOutsetaUidFromRequest } from "@/lib/course-auth";

export const dynamic = "force-dynamic";

export type NoteEntry = {
  id: string;
  video_id: string;
  content: string;
  timestamp_seconds: number | null;
  created_at: string;
};

export type CreateNoteRequest = {
  videoId: string;
  content: string;
  timestampSeconds?: number;
};

export async function GET(request: NextRequest) {
  const auth = await getOutsetaUidFromRequest(request);
  if (auth instanceof NextResponse) return auth;
  const { uid } = auth;

  const url = new URL(request.url);
  const videoId = url.searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json(
      { error: "videoId query parameter required" },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("course_video_notes")
      .select("id, video_id, content, timestamp_seconds, created_at")
      .eq("outseta_user_uid", uid)
      .eq("video_id", videoId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[course/notes] GET error:", error);
      return NextResponse.json(
        { error: "Failed to load notes", details: error.message },
        { status: 500 }
      );
    }

    const notes: NoteEntry[] = (data ?? []).map((row) => ({
      id: row.id,
      video_id: row.video_id,
      content: row.content,
      timestamp_seconds: row.timestamp_seconds,
      created_at: row.created_at,
    }));

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("[course/notes] GET error:", error);
    return NextResponse.json(
      {
        error: "Failed to load notes",
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

  try {
    const body: CreateNoteRequest = await request.json();
    const { videoId, content, timestampSeconds } = body;

    if (!videoId || !content?.trim()) {
      return NextResponse.json(
        { error: "videoId and content are required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("course_video_notes")
      .insert({
        outseta_user_uid: uid,
        video_id: videoId,
        content: content.trim(),
        timestamp_seconds: timestampSeconds ?? null,
      })
      .select("id, video_id, content, timestamp_seconds, created_at")
      .single();

    if (error) {
      console.error("[course/notes] POST error:", error);
      return NextResponse.json(
        { error: "Failed to save note", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      note: {
        id: data.id,
        video_id: data.video_id,
        content: data.content,
        timestamp_seconds: data.timestamp_seconds,
        created_at: data.created_at,
      },
    });
  } catch (error) {
    console.error("[course/notes] POST error:", error);
    return NextResponse.json(
      {
        error: "Failed to save note",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}