import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

// 履歴を編集する
export async function PATCH(request: NextRequest) {
  const { date, count } = await request.json();

  if (!date || typeof count !== "number" || count < 0) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const { error } = await supabase
    .from("smoke_logs")
    .update({ count })
    .eq("date", date);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
