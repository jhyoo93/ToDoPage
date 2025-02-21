// src/store/todoStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Board, Task, TodoStore } from "@/types"; 

// Zustand 스토어 생성
export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      boards: [],

      // 보드 추가
      addBoard: (title) =>
        set((state) => {
          if (!title.trim()) return state;
          const newBoard: Board = {
            id: crypto.randomUUID(),
            title,
            order: state.boards.length,
            tasks: [],
          };
          return { boards: [...state.boards, newBoard] };
        }),

      // 보드 수정
      updateBoard: (id, title) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === id ? { ...board, title } : board
          ),
        })),

      // 보드 삭제
      deleteBoard: (id) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.id !== id),
        })),

      // 보드 순서 변경
      reorderBoards: (sourceIndex, destinationIndex) =>
        set((state) => {
          const updatedBoards = [...state.boards];
          const [movedBoard] = updatedBoards.splice(sourceIndex, 1);
          updatedBoards.splice(destinationIndex, 0, movedBoard);

          const reorderedBoards = updatedBoards.map((board, index) => ({
            ...board,
            order: index,
          }));

          console.log("보드 정렬 변경:", reorderedBoards);
          return { boards: reorderedBoards };
        }),

      // 할 일 추가
      addTask: (boardId, content) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: [...board.tasks, { id: crypto.randomUUID(), content, order: board.tasks.length }],
                }
              : board
          ),
        })),

      // 할 일 수정
      updateTask: (boardId, taskId, content) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? {
                  ...board,
                  tasks: board.tasks.map((task) => (task.id === taskId ? { ...task, content } : task)),
                }
              : board
          ),
        })),

      // 할 일 삭제
      deleteTask: (boardId, taskId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.id === boardId
              ? { ...board, tasks: board.tasks.filter((task) => task.id !== taskId) }
              : board
          ),
        })),

      // 할 일 정렬 (보드 내 이동 및 보드 간 이동)
      reorderTasks: (sourceBoardId, sourceIndex, destinationBoardId, destinationIndex) =>
        set((state) => {
          console.log(`할 일 이동: ${sourceIndex} (보드 ${sourceBoardId}) → ${destinationIndex} (보드 ${destinationBoardId})`);
      
          let movedTask: Task | null = null;
      
          // 출발 보드에서 할 일 제거
          const updatedBoards = state.boards.map((board) => {
            if (board.id === sourceBoardId) {
              const updatedTasks = [...board.tasks];
              [movedTask] = updatedTasks.splice(sourceIndex, 1);
              return { ...board, tasks: updatedTasks };
            }
            return board;
          });
      
          if (!movedTask) return state; // 이동할 할 일이 없으면 기존 상태 유지
      
          // 도착 보드에 할 일 추가
          return {
            boards: updatedBoards.map((board) => {
              if (board.id === destinationBoardId) {
                const updatedTasks = [...board.tasks];
                if(movedTask) {
                  updatedTasks.splice(destinationIndex, 0, movedTask);
                }             
                return { ...board, tasks: updatedTasks };
              }
              return board;
            }),
          };
        }),

    }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
