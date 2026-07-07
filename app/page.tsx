import SmokeButton from "./components/SmokeButton";
import TodayCounter from "./components/TodayCounter";
import EndDayButton from "./components/EndDayButton";
import History from "./components/HistoryTable";
import ErrorBanner from "@/app/components/ui/ErrorBanner";
import { Bodoni_Moda } from "next/font/google";
import { supabase } from "@/lib/supabase";
import { getTodayJST } from "@/lib/date";

import classes from "./page.module.css";

// フォント読み込み
const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: '500'
});

export type SmokeLog = {
  id: number,
  date: string,
  count: number;
  is_day_ended: boolean;
  ended_at: string | null;
  created_at: string
};

export default async function Home() {
  const today = getTodayJST();
  let initialCount = 0;
  let hasError = false;
  // supabaseからデータを取得する
  try {
    const { data, error } = await supabase
      .from('smoke_logs')
      .select('count')
      .eq('date', today)
      .maybeSingle();

    // エラー処理
    if (error) {
      console.error('[SSR] smoke_logs fetch error:', error.message)
      hasError = true;
      throw new Error('[SSR] smoke_logs fetch error')
    }
    // データがなければ初期値を0にする
    initialCount = data?.count ?? 0;
  } catch (e) {
    console.error('[SSR] unexpected error:', e)
    hasError = true;
  }

  return <main className={classes.main}>
    <section className={`${classes.box} border-2 pt-16 border-emerald-800 flex flex-col items-center`}>
      <h1 className={`text-gray-100 text-5xl text-center font-bold ${bodoniModa.className}`}>Smoke Log</h1>
      {hasError
        ? <p className="text-red-400 text-sm text-center mt-5">データの読み込みに失敗しました。</p>
        : <>
          <TodayCounter initialCount={initialCount} />
          <SmokeButton />
          <EndDayButton />
          <History />
        </>
      }
    </section>
  </main>
}
