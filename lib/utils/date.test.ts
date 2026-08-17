import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { getTodayJST } from '@/lib/utils/date';

test('返り値が YYYY-MM-DD 形式', () => {
  expect(getTodayJST()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
})

describe('タイムゾーン', () => {
  beforeEach(() => {
    // 日時のモックを有効化
    vi.useFakeTimers()
  })

  afterEach(() => {
    // 実際の日時に戻す
    vi.useRealTimers()
  })

  test('JSTタイムゾーンで日付を返す', () => {
    // UTC 2024-12-31 15:30 = JST 2025-01-01 00:30
    // JST は UTC + 9 なので、JST の方が先に日付が変わる
    const fixedDate = new Date('2024-12-31T15:30:00Z');
    vi.setSystemTime(fixedDate);
    expect(getTodayJST()).toBe('2025-01-01');
  })

})