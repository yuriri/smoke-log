"use client";

import { useSmokeLog } from "@/lib/hooks/useSmokeLog";
import { Orbitron } from "next/font/google";

// フォントの読み込み
const orbitron = Orbitron({
  weight: '400',
  subsets: ["latin"]
});

// 今日吸った本数を表示する
export default function TodayCounter({ initialCount }: { initialCount: number }) {
  const { todayCount, isDayEnded, isLoading, errorMessage } = useSmokeLog();
  return <p className={`${orbitron.className} text-center text-white`}>Todays count<strong className={`${orbitron.className} bold text-5xl`}>{
    errorMessage
      ? "-"
      : isDayEnded // finishボタンが押されていたら-を表示し、カウントをリセットする
        ? "-"
        : isLoading
          ? initialCount
          : todayCount}</strong></p>
}