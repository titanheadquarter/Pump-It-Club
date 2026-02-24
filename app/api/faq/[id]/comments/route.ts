import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { z } from "zod";

const createCommentSchema = z.object({
  content: z.string().min(1, "Content is required"),
  parent_id: z.string().uuid().optional(),
  is_public: z.boolean().default(true),
});

// GET /api/faq/[id]/comments - Kommentare zu einer FAQ abrufen
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const { id } = params;

    const { data: comments, error } = await supabase
      .from("faq_comments")
      .select(`
        *,
        profiles:author_id (
          full_name
        ),
        faq_comments (
          id,
          content,
          author_id,
          profiles:author_id (
            full_name
          ),
          created_at
        )
      `)
      .eq("faq_id", id)
      .eq("is_public", true)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Comments GET error:", error);
      return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
    }

    return NextResponse.json({ comments });
  } catch (error) {
    console.error("Comments GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/faq/[id]/comments - Neuen Kommentar erstellen
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const { id } = params;
    const body = await request.json();

    const validatedData = createCommentSchema.parse(body);

    // Authentifizierter User erforderlich
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { data: comment, error } = await supabase
      .from("faq_comments")
      .insert({
        ...validatedData,
        faq_id: id,
        author_id: user.id,
      })
      .select(`
        *,
        profiles:author_id (
          full_name
        )
      `)
      .single();

    if (error) {
      console.error("Comment POST error:", error);
      return NextResponse.json({ error: "Failed to create comment" }, { status: 500 });
    }

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Comment POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}