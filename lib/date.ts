// 今日の日付をsupabaseの表記に合わせたYYYY-MM-DD表記にする
export function getTodayJST(): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(new Date());
}
