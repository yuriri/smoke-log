"use client";

import { useSmokeLog } from "@/lib/hooks/useSmokeLog";
import fillHistory from "@/lib/utils/fillHistory";
import Loading from "@/app/components/ui/Loading";


export default function History() {
  // ログを取得
  const { history, isLoading } = useSmokeLog();
  // ログを整形
  const filledHistory = fillHistory(history);

  return (
    <div className="scroll flex-1 items-start overflow-scroll w-full border-t-2 mt-5 border-white flex justify-center">
      {isLoading && <Loading />}
      {!isLoading &&
        filledHistory.length > 0 ? (
        <table className={`mt-2 w-[90%] table-auto`}>
          <thead>
            <tr className="text-gray-100 ">
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
      )
      }
    </div>
  )

}