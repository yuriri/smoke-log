"use client";
import { useSmokeLog } from "@/lib/hooks/useSmokeLog";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  weight: '400',
  subsets: ["latin"]
});

export default function History() {
  const { history } = useSmokeLog();
  return (
    <div className="w-full border-t-2 mt-5 border-white flex justify-center">
      {history.length > 0 ? (
        <table className={`mt-2 w-[90%] table-auto`}>
          <thead>
            <tr className="text-gray-100 ">
              <th className="font-normal text-left">Date</th>
              <th className="font-normal text-right">Count</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item => <tr key={item.id} className=" text-gray-100"><td>{item.date}</td><td className="text-right">{item.count}</td></tr>))}
          </tbody>
        </table>
      ) : (
        <p>まだデータなし</p>
      )
      }
    </div>
  )

}