"use client";

import { SmokeLog } from "@/app/page";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "@/lib/supabase";
import { AppDispatch, RootState } from "@/lib/store";
import { setHistory, setTodayCount, setLoading, setIsDayEnded } from "@/lib/slices/smokeSlice";
import { getTodayJST } from "../date";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

export function useSmokeLog() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));

      const today = getTodayJST();
      const { data: todayData } = await supabase
        .from('smoke_logs')
        .select('*')
        .eq('date', today)
        .maybeSingle()

      if (todayData) {
        dispatch(setTodayCount(todayData.count))
      }

      const { data: historyData } = await supabase
        .from('smoke_logs')
        .select('*')
        .neq('date', today) // 今日以外のデータ
        .order('date', { ascending: false })

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

  const incrementSmoke = async () => {
    await fetch('/api/smoke', { method: 'POST' })
  };

  const endDay = async () => {
    await fetch('/api/end-day', { method: 'POST' })
  };

  const todayCount = useSelector((state: RootState) => state.smoke.todayCount)
  const isDayEnded = useSelector((state: RootState) => state.smoke.isDayEnded)
  const history = useSelector((state: RootState) => state.smoke.history)
  const isLoading = useSelector((state: RootState) => state.smoke.isLoading)

  return {
    todayCount,
    isDayEnded,
    incrementSmoke,
    endDay,
    history,
    isLoading
  }

}