"use client";

import { useTodoStore } from "@/store/todoStore";
import TaskList from "./TaskList";

interface BoardProps {
  board: {
    id: string;
    title: string;
  } | undefined;
}

export default function Board({ board }: BoardProps) {
  const { updateBoard, deleteBoard, addTask } = useTodoStore();

  if (!board) {
    return <div className="p-4 bg-white border rounded-lg shadow-lg w-72 min-h-[100px]">📌 보드 로드 중...</div>;
  }

  return (
    <div className="p-4 bg-white border rounded-lg shadow-lg w-72 min-h-[300px] cursor-grab flex-shrink-0">
      {/* 보드 제목 입력 필드 */}
      <div className="flex items-center justify-between mb-3 w-full">
        <input
          className="text-lg font-bold bg-transparent border-b-2 border-gray-300 outline-none focus:border-blue-500 transition flex-1"
          value={board.title || ""}
          placeholder="보드 제목 입력"
          onChange={(e) => updateBoard(board.id, e.target.value)}
        />
        <button
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          onClick={() => deleteBoard(board.id)}
        >
          X
        </button>
      </div>

      {/* 할 일 추가 버튼 */}
      <button
        className="px-3 py-2 bg-black text-white rounded w-full hover:bg-gray-500 transition"
        onClick={() => addTask(board.id, "새로운 할 일")}
      >
        ToDo 추가
      </button>

      {/* 할 일 목록 컴포넌트 */}
      <TaskList boardId={board.id} />
    </div>
  );
}
