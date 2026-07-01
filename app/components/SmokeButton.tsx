"use client";
import { useSmokeLog } from "@/lib/hooks/useSmokeLog";
import { Bodoni_Moda, Orbitron } from "next/font/google";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: '700'
});

const orbitron = Orbitron({
  weight: '500',
  subsets: ["latin"]
});

export default function SmokeButton() {
  const { isDayEnded, incrementSmoke } = useSmokeLog();

  return (
    <button className={`${orbitron.className} w-[90%] bg-emerald-800 block text-2xl mt-6 text-gray-100 rounded-md p-2 hover:cursor-pointer`} onClick={incrementSmoke} disabled={isDayEnded}>SMOKED</button>
  )
}