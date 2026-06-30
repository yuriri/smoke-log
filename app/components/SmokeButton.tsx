"use client";
import { useSmokeLog } from "@/lib/hooks/useSmokeLog";

export default function SmokeButton() {
  const {isDayEnded, incrementSmoke} = useSmokeLog();

  return (
    <button className="bg-pink-400 rounded-xl p-2  hover:cursor-pointer" onClick={incrementSmoke} disabled={isDayEnded}>吸った</button>
  )
}