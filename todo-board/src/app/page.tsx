"use client";

import "./globals.css";
import { useState } from "react";
import { useTodoStore } from "@/store/todoStore";
import BoardList from "@/components/BoardList";
import Button from "@/components/ui/Button";

// 애플리케이션의 메인 페이지 역할
// export default를 사용하여 다른 파일에서 import불러올수 있음 
export default function Page() {
  // 보드 제목을 입력하고 추가 버튼을 클릭하면 새로운 보드를 추가
  // Zustand의 useTodoStore()를 사용하여 전역 상태 관리 함수
  const { addBoard } = useTodoStore();
  // 사용자가 입력한 보드 제목을 상태로 관리하기위한 state
  const [title, setTitle] = useState("");

  // 보드 추가 핸들러
  const addNewBoard = () => {
    // 공백 입력 방지
    if (title.trim()) {
      // 새로운 보드가 boards 배열에 추가
      addBoard(title);
      // 입력 input 초기화
      setTitle("");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 제목 */}
      <h1 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-2">
        <span className="text-gray-800">ToDo List</span>
      </h1>

      {/* 입력 필드 & 버튼 */}
      <div className="flex justify-center gap-6 mb-20">
        <input
          className="px-4 py-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-96 text-lg"
          placeholder="보드 제목 입력"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNewBoard()}
        />
        <Button variant="primary" onClick={addNewBoard} className="w-36">
          보드 추가
        </Button>

      </div>

      {/* 보드 리스트 컴포넌트 */}
      <BoardList />
    </div>
  );
}
