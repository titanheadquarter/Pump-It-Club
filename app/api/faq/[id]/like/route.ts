import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/utils/supabase/server";

// POST /api/faq/[id]/like - FAQ liken/unliken (Toggle)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerClient();
    const { id } = params;

    // Authentifizierter User erforderlich
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Prüfe ob bereits geliked
    const { data: existingLike, error: checkError } = await supabase
      .from("faq_likes")
      .select("id")
      .eq("faq_id", id)
      .eq("user_id", user.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error("Like check error:", checkError);
      return NextResponse.json({ error: "Failed to check like status" }, { status: 500 });
    }

    let action = "liked";
    let success = false;

    if (existingLike) {
      // Unlike: Entferne den Like
      const { error: deleteError } = await supabase
        .from("faq_likes")
        .delete()
        .eq("faq_id", id)
        .eq("user_id", user.id);

      if (deleteError) {
        console.error("Unlike error:", deleteError);
        return NextResponse.json({ error: "Failed to unlike" }, { status: 500 });
      }

      action = "unliked";
      success = true;
    } else {
      // Like: Füge neuen Like hinzu
      const { error: insertError } = await supabase
        .from("faq_likes")
        .insert({
          faq_id: id,
          user_id: user.id,
        });

      if (insertError) {
        console.error("Like error:", insertError);
        return NextResponse.json({ error: "Failed to like" }, { status: 500 });
      }

      success = true;
    }

    // Aktuelle Like-Count abrufen
    const { data: faq, error: countError } = await supabase
      .from("faqs")
      .select("like_count")
      .eq("id", id)
      .single();

    if (countError) {
      console.error("Like count error:", countError);
      return NextResponse.json({ error: "Failed to get like count" }, { status: 500 });
    }

    return NextResponse.json({
      success,
      action,
      like_count: faq.like_count
    });
  } catch (error) {
    console.error("Like POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}