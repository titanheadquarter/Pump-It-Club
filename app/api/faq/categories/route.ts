import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  sort_order: z.number().default(0),
});

// GET /api/faq/categories - Alle Kategorien abrufen
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();

    const { data: categories, error } = await supabase
      .from("faq_categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Categories GET error:", error);
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Categories GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/faq/categories - Neue Kategorie erstellen (Admin)
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const validatedData = createCategorySchema.parse(body);

    const { data: category, error } = await supabase
      .from("faq_categories")
      .insert(validatedData)
      .select()
      .single();

    if (error) {
      console.error("Category POST error:", error);
      return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
    }

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Category POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}