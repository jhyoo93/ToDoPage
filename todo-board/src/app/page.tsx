"use client";

import { useTodoStore } from "@/store/todoStore";

export default function Home() {

  const { boards, addBoard, updateBoard, deleteBoard } = useTodoStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo Board</h1>

      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => addBoard("새보드")}>
        추가
      </button>

      <ul className="mt-4">
        {boards.map((board) => (
          <li key={board.id} className="p-2 border my-2 flex justify-between">
            <span>{board.title}</span>
            <div>
              <button
                className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                onClick={() => updateBoard(board.id, "수정된 보드")}
              >
                수정
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => deleteBoard(board.id)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}
