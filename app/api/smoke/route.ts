import { supabase } from "@/lib/supabase";
import { getTodayJST } from "@/lib/date";
import { NextResponse } from "next/server";

// 吸った本数をsupabaseに追加する処理
export async function POST() {
  const today = getTodayJST()

  // 前日以前の未終了レコードを自動クローズ
  await supabase
    .from('smoke_logs')
    .update({ is_day_ended: true, ended_at: new Date().toISOString() })
    .eq('is_day_ended', false)
    .lt('date', today)

  const { error } = await supabase.rpc('increment_smoke_count', {
    target_date: today
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
