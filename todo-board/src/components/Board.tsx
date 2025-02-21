"use client";

import { useTodoStore } from "@/store/todoStore";
import TaskList from "./TaskList";
import Button from "./ui/Button";
import { BoardProps } from "@/types"; 

 // Board컴포넌트
 // BoardProps 타입을 사용하여 board가 올바른 타입인지 보장
export default function Board({ board }: BoardProps) { // board객체를 props로 받는다, 
  // 보드를 수정, 삭제, 추가 기능을 Zustand에서 가져와서 사용
  const { updateBoard, deleteBoard, addTask } = useTodoStore();

  return (
    <div className="relative p-6 bg-white border border-gray-300 rounded-lg shadow-lg w-80 min-h-[400px]">
      <Button
        variant="icon"
        onClick={() => deleteBoard(board.id)}
        className="absolute top-3 right-3 w-6 h-6 text-gray-500 hover:text-red-500 transition"
        >
        ×
      </Button>
      <input
        className="text-lg font-bold bg-transparent border-b-2 border-gray-300 w-full mb-4"
        value={board.title || ""}
        // 입력 값이 변경될 때 updateBoard를 호출하여 보드 제목을 업데이트
        onChange={(e) => updateBoard(board.id, e.target.value)}
      />
      <Button onClick={() => addTask(board.id)} 
              className="px-4 py-2 bg-black text-white rounded w-full hover:bg-gray-800">
        + 할 일 추가</Button>
        
      <TaskList boardId={board.id} />
    </div>
  );
}
