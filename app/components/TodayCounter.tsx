"use client";
import { useSmokeLog } from "@/lib/hooks/useSmokeLog";

export default function TodayCounter() {
  const {todayCount} = useSmokeLog();
  return <div>今日の本数{todayCount}</div>
}