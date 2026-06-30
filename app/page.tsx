import SmokeButton from "./components/SmokeButton";
import TodayCounter from "./components/TodayCounter";
import EndDayButton from "./components/EndDayButton";
import History from "./components/HistoryTable";

export type SmokeLog = {
  id: number,
  date: string,
  count: number;
  is_day_ended: boolean;
  ended_at: string| null;
  created_at: string
};

export default function Home() {
  return <div>
    <h1 className="text-3xl font-bold underline">Smoke Log</h1>
    <TodayCounter />
    <SmokeButton />
    <EndDayButton />
    <History />
  </div>
}
