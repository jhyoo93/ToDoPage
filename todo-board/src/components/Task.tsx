"use client";

import { useTodoStore } from "@/store/todoStore";

interface TaskProps {
  boardId: string;
  task: {
    id: string;
    content: string;
  };
}

export default function Task({ boardId, task }: TaskProps) {
  const { updateTask, deleteTask } = useTodoStore();

  if (!boardId) {
    return <div className="p-3 text-red-500">보드 정보를 찾을 수 없음</div>;
  }

  return (
    <li className="p-3 bg-gray-100 border rounded flex justify-between items-center shadow-sm cursor-grab gap-2">
      <input
        className="flex-1 bg-transparent border-none outline-none px-2 py-1"
        value={task.content || ""}
        onChange={(e) => updateTask(boardId, task.id, e.target.value)}
        onBlur={(e) => updateTask(boardId, task.id, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
      />
      <button
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        onClick={() => deleteTask(boardId, task.id)}
      >
        X
      </button>
    </li>
  );
}
