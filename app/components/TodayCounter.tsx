"use client";
import { useSmokeLog } from "@/lib/hooks/useSmokeLog";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  weight: '400',
  subsets: ["latin"]
});

export default function TodayCounter() {
  const { todayCount } = useSmokeLog();
  return <p className={`${orbitron.className} text-center text-white`}>Todays count<strong className={`${orbitron.className} bold text-5xl`}>{todayCount}</strong></p>
}