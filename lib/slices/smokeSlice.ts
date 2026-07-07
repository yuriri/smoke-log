import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SmokeLog } from "@/app/page";
interface SmokeState {
  todayCount: number        // 今日の本数
  isDayEnded: boolean       // 今日が終了済みか
  history: SmokeLog[]       // 過去の履歴
  isLoading: boolean        // 通信中フラグ
  errorMessage: string | null      // エラー状態
}

const initialState: SmokeState = {
  todayCount: 0,
  isDayEnded: false,
  history: [],
  isLoading: true,
  errorMessage: null
}

export const smokeSlice = createSlice({
  name: "smoke",
  initialState,
  reducers: {
    incrementSmokeCount: (state) => {
      state.todayCount++
    },
    endDay: (state) => {
      state.isDayEnded = true
    },
    setHistory: (state, action: PayloadAction<SmokeLog[]>) => {
      state.history = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setTodayCount: (state, action: PayloadAction<number>) => {
      state.todayCount = action.payload
    },
    setIsDayEnded: (state, action: PayloadAction<boolean>) => {
      state.isDayEnded = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload
    }
  }
})

export const { incrementSmokeCount, endDay, setHistory, setLoading, setTodayCount, setIsDayEnded, setError } = smokeSlice.actions;

export default smokeSlice.reducer
