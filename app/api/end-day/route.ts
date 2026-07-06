import { supabase } from "@/lib/supabase";
import { getTodayJST } from "@/lib/date";
import { NextResponse } from "next/server";

// 今日のカウントを終了する
export async function POST() {
  const today = getTodayJST();

  const { error } = await supabase
    .from('smoke_logs')
    .update({
      is_day_ended: true,
      ended_at: new Date().toISOString()
    })
    .eq('date', today)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true })
}
