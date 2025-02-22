"use client";

import { useTodoStore } from "@/store/todoStore";
import Button from "./ui/Button";
import { TaskProps } from "@/types";

export default function Task({ boardId, task }: TaskProps) {
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
