"use client";
import { useSmokeLog } from "@/lib/hooks/useSmokeLog";
import { Orbitron } from "next/font/google";
import classes from "./smoke_button.module.css";

// フォント読み込み
const orbitron = Orbitron({
  weight: '500',
  subsets: ["latin"]
});

// 本数をカウント処理するボタン
export default function SmokeButton() {
  const { isDayEnded, incrementSmoke } = useSmokeLog();
  return (
    // finishボタンが押されたらdisabledを付与する
    <button className={`${orbitron.className} w-[90%] bg-emerald-800 block text-2xl mt-6 text-gray-100 rounded-md p-2 hover:cursor-pointer disabled:bg-gray-400 disabled::pointer- ${classes.SmokeButton}`} onClick={incrementSmoke} disabled={isDayEnded}>SMOKED</button>
  )
}