import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { z } from "zod";

const createFAQSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  summary: z.string().optional(),
  category_id: z.string().uuid().optional(),
  slug: z.string().min(1, "Slug is required"),
  is_published: z.boolean().default(false),
});

// GET /api/faq - Alle FAQs abrufen
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const published = searchParams.get("published");

    let query = supabase
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
      .order("created_at", { ascending: false });

    // Filter nach Kategorie
    if (category) {
      query = query.eq("category_id", category);
    }

    // Filter nach Veröffentlichungsstatus
    if (published === "true") {
      query = query.eq("is_published", true);
    }

    const { data: faqs, error } = await query;

    if (error) {
      console.error("FAQ GET error:", error);
      return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
    }

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error("FAQ GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/faq - Neue FAQ erstellen (Admin)
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    // Validierung
    const validatedData = createFAQSchema.parse(body);

    // Admin-Check (vereinfacht für dieses Beispiel)
    // In Produktion: Prüfe profiles.is_admin

    const { data: faq, error } = await supabase
      .from("faqs")
      .insert({
        ...validatedData,
        created_by: "00000000-0000-0000-0000-000000000000", // Admin UUID
      })
      .select(`
        *,
        faq_categories (
          name,
          slug
        )
      `)
      .single();

    if (error) {
      console.error("FAQ POST error:", error);
      return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
    }

    return NextResponse.json({ faq }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("FAQ POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}