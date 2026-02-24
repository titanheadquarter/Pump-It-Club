import { NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export type CourseVideo = {
  id: string;
  sort_order: number;
  title: string;
  duration: number;
  video_key: string;
};

export type CourseModule = {
  id: string;
  sort_order: number;
  title: string;
  videos: CourseVideo[];
};

export async function GET() {
  try {
    const supabase = createServerClient();

    const { data: modules, error: modulesError } = await supabase
      .from("course_modules")
      .select("id, sort_order, title")
      .order("sort_order", { ascending: true });

    if (modulesError) {
      console.error("[course/modules] modules error:", modulesError);
      return NextResponse.json(
        { error: "Failed to load modules", details: modulesError.message },
        { status: 500 }
      );
    }

    const { data: videos, error: videosError } = await supabase
      .from("course_videos")
      .select("id, module_id, sort_order, title, duration, video_key")
      .order("sort_order", { ascending: true });

    if (videosError) {
      console.error("[course/modules] videos error:", videosError);
      return NextResponse.json(
        { error: "Failed to load videos", details: videosError.message },
        { status: 500 }
      );
    }

    const modulesWithVideos: CourseModule[] = (modules ?? []).map((m) => ({
      id: m.id,
      sort_order: m.sort_order,
      title: m.title,
      videos: (videos ?? [])
        .filter((v) => v.module_id === m.id)
        .map((v) => ({
          id: v.id,
          sort_order: v.sort_order,
          title: v.title,
          duration: Number(v.duration),
          video_key: v.video_key,
        })),
    }));

    return NextResponse.json({ modules: modulesWithVideos });
  } catch (error) {
    console.error("[course/modules] error:", error);
    return NextResponse.json(
      {
        error: "Failed to load course",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
