"use client";

import { useSmokeLog } from "@/lib/hooks/useSmokeLog";
import Loading from "@/app/components/ui/Loading";
import { SmokeLog } from "@/app/page";

// 昨日の日付を取得する
function getYesterdayJST(): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(new Date(Date.now() - 86400000));
}

// 過去日(昨日以前）のログを取得し、データがない日は値を0とし、データを返す
function fillHistory(history: SmokeLog[]): { date: string; count: number }[] {
  if (history.length === 0) return [];

  // ログを格納するMap
  const logMap = new Map(history.map(log => [log.date, log.count]));
  const earliest = history[history.length - 1].date;
  const yesterday = getYesterdayJST();

  const result: { date: string; count: number }[] = [];
  let current = yesterday;

  // 昨日から最古のログ日まで1日ずつ遡る
  while (current >= earliest) {
    // ログがある日はその count、ない日は 0 を追加
    result.push({ date: current, count: logMap.get(current) ?? 0 });
    // current を1日前に進める（JST正午を基準にすることで日付ズレを防ぐ）
    const d = new Date(current + 'T12:00:00+09:00');
    d.setDate(d.getDate() - 1);
    current = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(d);
  }

  return result;
}

export default function History() {
  // ログを取得
  const { history, isLoading } = useSmokeLog();
  // ログを整形
  const filledHistory = fillHistory(history);

  return (
    <div className="scroll flex-1 items-start overflow-scroll w-full border-t-2 mt-5 border-white flex justify-center">
      {isLoading && <Loading />}
      {!isLoading &&
        filledHistory.length > 0 ? (
        <table className={`mt-2 w-[90%] table-auto`}>
          <thead>
            <tr className="text-gray-100 ">
              <th className="font-normal text-left">Date</th>
              <th className="font-normal text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {filledHistory.map((item => <tr key={item.date} className=" text-gray-100"><td>{item.date}</td><td className="text-right">{item.count}</td></tr>))}
          </tbody>
        </table>
      ) : (
        <p>No Data yet...</p>
      )
      }
    </div>
  )

}