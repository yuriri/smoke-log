"use client";
import { useSmokeLog } from "@/lib/hooks/useSmokeLog";
import classes from "./end_day_button.module.css";

export default function EndDayButton() {
  const { isDayEnded, endDay } = useSmokeLog();
  const handleClick = () => {
    if(confirm('今日のカウントを終了しますか？')) {
      endDay();
    }
  }
  return <button className={`rounded-xs hover:cursor-pointer ${classes.button01}`} onClick={handleClick} disabled={isDayEnded}>今日のカウントを終了</button>
}