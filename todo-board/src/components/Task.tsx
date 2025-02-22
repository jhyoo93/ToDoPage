"use client";

import { useTodoStore } from "@/store/todoStore";
import Button from "./ui/Button";
import { TaskProps } from "@/types";

export default function Task({ boardId, task }: TaskProps) {
  const { updateTask, deleteTask } = useTodoStore();

  return (
    <li className="p-3 bg-white border rounded-lg flex items-center shadow-md relative">
      <input
        className="w-full bg-transparent border-none outline-none px-2 py-1 pr-8 text-gray-700 
                   focus:outline-none focus:ring-0 focus:border-none"
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
