import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import fillHistory, { getYesterdayJST } from "@/lib/utils/fillHistory";

beforeEach(() => {
  // 日時のモックを有効化
  vi.useFakeTimers()
})

afterEach(() => {
  // 実際の日時に戻す
  vi.useRealTimers()
})

test('昨日の日付を返す(timeZone:Asia/Tokyo)', () => {
  // JST 2025-05-03 12:30 → 2025-05-02
  const testDay = new Date('2025-05-03T12:30:00+09:00');
  vi.setSystemTime(testDay);
  expect(getYesterdayJST()).toBe('2025-05-02');
})

describe('ログの形式', () => {

  test('空配列を返す', () => {
    expect(fillHistory([])).toEqual([]);
  });

  test('昨日から最古の日まで0埋めしながら降順に整形する', () => {
    const testDay = new Date('2025-05-04T12:30:00+09:00');
    vi.setSystemTime(testDay);
    const testMap = [
      {
        id: 1,
        date: '2025-05-03',
        count: 2,
        is_day_ended: true,
        ended_at: '2025-05-03',
        created_at: '2025-05-03',
      },
      {
        id: 2,
        date: '2025-05-01',
        count: 3,
        is_day_ended: true,
        ended_at: '2025-05-01',
        created_at: '2025-05-01',
      },
    ];

    const successMap = [
      {
        "count": 2,
        "date": "2025-05-03",
      },
      {
        "count": 0,
        "date": "2025-05-02",
      },
      {
        "count": 3,
        "date": "2025-05-01",
      },
    ];
    expect(fillHistory(testMap)).toEqual(successMap)
  })
})