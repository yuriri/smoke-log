import { supabase } from "@/lib/supabase";
import { getTodayJST } from "@/lib/utils/date";
import { NextResponse } from "next/server";

// 今日のカウントを再開する
export async function POST() {
  const today = getTodayJST();

  const { error } = await supabase
    .from('smoke_logs')
    .update({
      is_day_ended: false,
      ended_at: null,
      count: 0 // カウントを0にリセットする
    })
    .eq('date', today)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true })
}
