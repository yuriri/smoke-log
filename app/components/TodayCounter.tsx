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
  const { todayCount, isLoading } = useSmokeLog();
  return <p className={`${orbitron.className} text-center text-white`}>Todays count<strong className={`${orbitron.className} bold text-5xl`}>{
    isLoading
      ? initialCount
      : todayCount}</strong></p>
}