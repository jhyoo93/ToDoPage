"use client";

import { useTodoStore } from "@/store/todoStore";
import Button from "./ui/Button";
import { TaskProps } from "@/types";

// 보드내 할일 컴포넌트
// export default를 사용하여 다른 파일에서 import불러올수 있음
export default function Task({ boardId, task }: TaskProps) { // 보드 구분값, 할일 데이터, TaskProps을 사용하여 올바른 타입보장
  // 할 일의 내용을 수정하거나 삭제하는 기능을 Zustand에서 가져옴
  const { updateTask, deleteTask } = useTodoStore();

  return (
    <li className="p-3 bg-white border rounded-lg flex justify-between items-center shadow-md cursor-grab relative">
      <input
        className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-0 focus:border-none focus:shadow-none transition"
        value={task.content || ""}
        onChange={(e) => updateTask(boardId, task.id, e.target.value)}
        onBlur={(e) => updateTask(boardId, task.id, e.target.value)}
      />
      
      <Button
        variant="icon"
        onClick={() => deleteTask(boardId, task.id)}
        className="absolute top-2 right-2"
      >
        ×
      </Button>
      
    </li>
  );
}
