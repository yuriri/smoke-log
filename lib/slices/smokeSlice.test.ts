import { describe, expect, test } from "vitest";
import smokeReducer, { incrementSmokeCount, setTodayCount, setHistory, setLoading, setIsDayEnded, endDay } from "@/lib/slices/smokeSlice";

const initialState = {
  todayCount: 0,
  isDayEnded: false,
  history: [],
  isLoading: true
};

test('incrementSmokeCount: カウントが1増える', () => {
  const nextState = smokeReducer(initialState, incrementSmokeCount())
  expect(nextState.todayCount).toEqual(1)
})

test('setTodayCount: 指定した値にセットされる', () => {
  const nextState = smokeReducer(initialState, setTodayCount(5))
  expect(nextState.todayCount).toBe(5)
})

test('setHistory: 履歴を上書きする', () => {
  const historyData = [
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

  const resultState = [
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
  ]

  const nextState = smokeReducer(initialState, setHistory(historyData))
  expect(nextState.history).toEqual(resultState)
});

describe('setLoading', () => {
  test('trueにセットされる', () => {
    const nextState = smokeReducer(initialState, setLoading(true))
    expect(nextState.isLoading).toBe(true)
  })

  test('falseにセットされる', () => {
    const state = { ...initialState, isLoading: true }
    const nextState = smokeReducer(state, setLoading(false))
    expect(nextState.isLoading).toBe(false)
  })
})

describe('setIsDayEnded', () => {
  test('trueにセットされる', () => {
    const nextState = smokeReducer(initialState, setIsDayEnded(true))
    expect(nextState.isDayEnded).toBe(true)
  })

  test('falseにセットされる', () => {
    const state = { ...initialState, isDayEnded: true }
    const nextState = smokeReducer(state, setIsDayEnded(false))
    expect(nextState.isDayEnded).toBe(false)
  })
})

test('endDay: trueにセットされる', () => {
  const nextState = smokeReducer(initialState, endDay())
  expect(nextState.isDayEnded).toBe(true)
})