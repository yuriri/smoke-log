import SmokeButton from "./components/SmokeButton";
import TodayCounter from "./components/TodayCounter";
import EndDayButton from "./components/EndDayButton";
import History from "./components/HistoryTable";
import { Bodoni_Moda } from "next/font/google";

import classes from "./page.module.css";

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

export default function Home() {
  return <main className={classes.main}>
    <section className={`${classes.box} border-2 pt-16 border-emerald-800 flex flex-col items-center`}>
      <h1 className={`text-gray-100 text-5xl text-center font-bold ${bodoniModa.className}`}>Smoke Log</h1>
      <TodayCounter />
      <SmokeButton />
      <EndDayButton />
      <History />
    </section>
  </main>
}
