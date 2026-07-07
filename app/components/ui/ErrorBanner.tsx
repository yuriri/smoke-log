"use client";
import { useSmokeLog } from "@/lib/hooks/useSmokeLog";

export default function ErrorBanner() {
  const { errorMessage } = useSmokeLog();
  if (!errorMessage) return null;
  return <p className="text-red-600 text-center">{errorMessage}</p>
}