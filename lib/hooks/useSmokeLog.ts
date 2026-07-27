"use client";

import { SmokeLog } from "@/app/page";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "@/lib/supabase";
import { AppDispatch, RootState } from "@/lib/store";
import { setHistory, setTodayCount, setLoading, setIsDayEnded, incrementSmokeCount, setError, updateHistoryItem } from "@/lib/slices/smokeSlice";
import { getTodayJST } from "../date";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export function useSmokeLog() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));

      const today = getTodayJST();
      // 今日のデータを取得
      const { data: todayData, error: todayError } = await supabase
        .from('smoke_logs')
        .select('*')
        .eq('date', today)
        .maybeSingle()

      // エラー処理
      if (todayError) dispatch(setError('今日のデータの取得に失敗しました。'))
      // カウントをセットする
      if (todayData) {
        dispatch(setTodayCount(todayData.count))
        // finishボタンが押されているかを取得
        dispatch(setIsDayEnded(todayData.is_day_ended))
      }

      // 今日以外のデータを全て取得
      const { data: historyData, error: historyError } = await supabase
        .from('smoke_logs')
        .select('*')
        .neq('date', today) // 今日以外のデータ
        .order('date', { ascending: false })

      // エラー処理
      if (historyError) dispatch(setError('履歴データの取得に失敗しました。'))
      // 今日以外のデータをセットする
      if (historyData) {
        dispatch(setHistory(historyData))
      }

      dispatch(setLoading(false))
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    const channel = supabase
      .channel(`smoke_changes_${Math.random()}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'smoke_logs'
        },
        (payload: RealtimePostgresChangesPayload<SmokeLog>) => {
          const updated = payload.new as SmokeLog;
          const today = getTodayJST();
          if (updated.date === today) {
            dispatch(setTodayCount(updated.count))
            dispatch(setIsDayEnded(updated.is_day_ended))
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel)
    }
  }, [dispatch])

  // カウントボタンの処理
  const incrementSmoke = async () => {
    // finishボタンが押された場合はreturn
    if (isDayEnded) return;
    const previousCount = todayCount
    // SMOKE COUNTボタンを押したら即座にカウントする
    dispatch(incrementSmokeCount());
    // supabaseにデータを保存する
    const res = await fetch('/api/smoke', { method: 'POST' });
    if (!res.ok) {
      dispatch(setTodayCount(previousCount))
      dispatch(setError('カウントの保存に失敗しました。'))
    }
  };

  const endDay = async () => {
    const res = await fetch('/api/end-day', { method: 'POST' })
    if (!res.ok) {
      dispatch(setError('終日処理に失敗しました。'))
    }
  };

  // カウントを再開する処理
  const startDay = async () => {
    const res = await fetch('/api/start-day', { method: 'POST' })
    if (!res.ok) {
      dispatch(setError('再開処理に失敗しました。'))
    }
  };

  // Editボタンの処理
  const editHistory = async (date: string, count: number) => {
    const previousHistory = history;
    // supabase更新前に楽観的更新をしておく
    dispatch(updateHistoryItem({ date, count }));
    const res = await fetch('/api/edit-history', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      // ボタンから受け取った日付とカウントをsupabaseに送る
      body: JSON.stringify({ date, count }),
    });
    // 更新が失敗したらロールバックする
    if (!res.ok) {
      dispatch(setHistory(previousHistory));
      dispatch(setError('履歴の更新に失敗しました。'));
    }
  };

  const todayCount = useSelector((state: RootState) => state.smoke.todayCount)
  const isDayEnded = useSelector((state: RootState) => state.smoke.isDayEnded)
  const history = useSelector((state: RootState) => state.smoke.history)
  const isLoading = useSelector((state: RootState) => state.smoke.isLoading)
  const errorMessage = useSelector((state: RootState) => state.smoke.errorMessage)

  return {
    todayCount,
    isDayEnded,
    incrementSmoke,
    endDay,
    startDay,
    editHistory,
    history,
    isLoading,
    errorMessage
  }

}