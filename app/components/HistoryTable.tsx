"use client";
import { useSmokeLog } from "@/lib/hooks/useSmokeLog"

export default function History() {
  const { history } = useSmokeLog();
  return (
    <div>
    {history.length > 0 ? (
      <table className="table-auto border border-gray-400">
        <thead>
          <tr className="bg-gray-400">
          <th>日付</th>
          <th>本数</th>
          </tr>
        </thead>
        <tbody>
        {history.map((item => <tr key={item.id}><td>{item.date}</td><td>{item.count}本</td></tr>))}
          
        </tbody>
      </table>
      ) : (
        <p>まだデータなし</p>
      )
    }
    </div>
  )

}