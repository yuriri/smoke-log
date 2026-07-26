"use client";
import { useState } from "react";

type Props = {
  date: string;
  count: number;
  editHistory: (date: string, count: number) => Promise<void>; // 連続呼び出しを防ぐため親コンポーネントから処理を受けとる
};

export default function EditHistoryButton({ date, count, editHistory }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(count);

  const handleSave = async () => {
    await editHistory(date, inputValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setInputValue(count);
    setIsEditing(false);
  };

  // 編集中の表示
  if (isEditing) {
    return (
      <span className="flex items-center gap-1">
        <input
          type="number"
          min={0}
          value={inputValue}
          // 更新したカウント値を関数に渡す
          onChange={(e) => setInputValue(Number(e.target.value))}
          className="w-16 text-right bg-gray-700 text-white border border-gray-500 rounded px-1"
        />
        <button
          onClick={handleSave}
          className="text-xs text-green-400 hover:text-green-300"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="text-xs text-gray-400 hover:text-gray-300"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => { setInputValue(count); setIsEditing(true); }}
      className="text-xs text-gray-400 hover:text-gray-200"
    >
      Edit
    </button>
  );
}
