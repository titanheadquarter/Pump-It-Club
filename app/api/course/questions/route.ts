import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { getOutsetaUidFromRequest } from "@/lib/course-auth";

export const dynamic = "force-dynamic";

export type QuestionEntry = {
  id: string;
  video_id: string;
  content: string;
  created_at: string;
};

export type CreateQuestionRequest = {
  videoId: string;
  content: string;
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
      .from("course_video_questions")
      .select("id, video_id, content, created_at")
      .eq("outseta_user_uid", uid)
      .eq("video_id", videoId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[course/questions] GET error:", error);
      return NextResponse.json(
        { error: "Failed to load questions", details: error.message },
        { status: 500 }
      );
    }

    const questions: QuestionEntry[] = (data ?? []).map((row) => ({
      id: row.id,
      video_id: row.video_id,
      content: row.content,
      created_at: row.created_at,
    }));

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("[course/questions] GET error:", error);
    return NextResponse.json(
      {
        error: "Failed to load questions",
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
    const body: CreateQuestionRequest = await request.json();
    const { videoId, content } = body;

    if (!videoId || !content?.trim()) {
      return NextResponse.json(
        { error: "videoId and content are required" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("course_video_questions")
      .insert({
        outseta_user_uid: uid,
        video_id: videoId,
        content: content.trim(),
      })
      .select("id, video_id, content, created_at")
      .single();

    if (error) {
      console.error("[course/questions] POST error:", error);
      return NextResponse.json(
        { error: "Failed to save question", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      question: {
        id: data.id,
        video_id: data.video_id,
        content: data.content,
        created_at: data.created_at,
      },
    });
  } catch (error) {
    console.error("[course/questions] POST error:", error);
    return NextResponse.json(
      {
        error: "Failed to save question",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}