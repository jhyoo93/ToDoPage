"use client";

import "./globals.css";
import { useState } from "react";
import { useTodoStore } from "@/store/todoStore";
import BoardList from "@/components/BoardList";

export default function Page() {
  const { addBoard } = useTodoStore();
  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleAddBoard = () => {
    if (newBoardTitle.trim() !== "") {
      addBoard(newBoardTitle);
      setNewBoardTitle("");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">📌 ToDo List</h1>

      <div className="flex justify-center mb-6">
        <input
          className="px-4 py-2 border rounded focus:outline-none"
          placeholder="보드 제목 입력"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddBoard();
          }}
        />
        &nbsp;
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 transition"
          onClick={handleAddBoard}
        >
          보드 추가
        </button>
      </div>

      {/* 보드 리스트 컴포넌트 사용 */}
      <BoardList />
    </div>
  );
}
