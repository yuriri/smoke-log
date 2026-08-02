"use client";
import { useSmokeLog } from "@/lib/hooks/useSmokeLog";
import classes from "./end_day_button.module.css";

export default function EndDayButton() {
  const { isDayEnded, endDay, startDay } = useSmokeLog();
  const handleClick = () => {
    // finishボタンが押された場合は、startボタンに切り替える
    if (isDayEnded) {
      if (confirm('カウントを再開しますか？')) {
        startDay();
      }
    } else {
      if (confirm('今日のカウントを終了しますか？')) {
        endDay();
      }
    }
  }
  return <button className={`rounded-xs w-[45%] hover:cursor-pointer mt-4 rounded-lg bg-gray-100 text-gray-500 ${classes.button01}`} onClick={handleClick}>{isDayEnded ? 'Start Count' : 'Finish Count'}</button>
}