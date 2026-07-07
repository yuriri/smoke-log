import { SmokeLog } from "@/app/page";

// 昨日の日付を取得する
export function getYesterdayJST(): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(new Date(Date.now() - 86400000));
}

// 過去日(昨日以前）のログを取得し、データがない日は値を0とし、データを返す
export default function fillHistory(history: SmokeLog[]): { date: string; count: number }[] {
  if (history.length === 0) return [];

  // ログを格納するMap
  const logMap = new Map(history.map(log => [log.date, log.count]));
  // 最古のログ日を取得
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