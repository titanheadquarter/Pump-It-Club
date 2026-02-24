import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { z } from "zod";

const updateFAQSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  summary: z.string().optional(),
  category_id: z.string().uuid().optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  is_published: z.boolean().optional(),
});

// GET /api/faq/[id] - Einzelne FAQ abrufen
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const { id } = params;

    const { data: faq, error } = await supabase
      .from("faqs")
      .select(`
        *,
        faq_categories (
          name,
          slug
        ),
        profiles:created_by (
          full_name
        )
      `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("FAQ GET single error:", error);
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json({ faq });
  } catch (error) {
    console.error("FAQ GET single error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/faq/[id] - FAQ aktualisieren (Admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const { id } = params;
    const body = await request.json();

    const validatedData = updateFAQSchema.parse(body);

    const { data: faq, error } = await supabase
      .from("faqs")
      .update({
        ...validatedData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(`
        *,
        faq_categories (
          name,
          slug
        )
      `)
      .single();

    if (error) {
      console.error("FAQ PUT error:", error);
      return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
    }

    return NextResponse.json({ faq });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("FAQ PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/faq/[id] - FAQ löschen (Admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const { id } = params;

    const { error } = await supabase
      .from("faqs")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("FAQ DELETE error:", error);
      return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("FAQ DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}