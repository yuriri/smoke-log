"use client";

import { useSmokeLog } from "@/lib/hooks/useSmokeLog";
import fillHistory from "@/lib/utils/fillHistory";
import Loading from "@/app/components/ui/Loading";
import ErrorBanner from "@/app/components/ui/ErrorBanner";

export default function History() {
  // ログを取得
  const { history, isLoading, errorMessage } = useSmokeLog();
  // ログを整形
  const filledHistory = fillHistory(history);

  return (
    <div className="scroll flex-1 items-center overflow-y-auto w-full border-t-2 mt-5 border-white flex flex-col">
      {errorMessage && <ErrorBanner />}
      {!errorMessage && isLoading && <Loading additionalClass="mt-4 w-full" />}
      {!errorMessage && (!isLoading &&
        filledHistory.length > 0 ? (
        <table className={`mt-2 w-[90%] table-auto`}>
          <thead>
            <tr className="text-gray-300">
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
      ))
      }
    </div>
  )

}