import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TodoStore } from "@/types";

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      boards: [],

      // 보드 추가
      addBoard: (title) =>
        set((state) => {
          if (!title.trim()) return state;
          return {           
            boards: [...state.boards, { id: crypto.randomUUID(), title, tasks: [] }],
          };
        }),

      // 보드 수정
      updateBoard: (id, title) =>
        set((state) => ({
          boards: state.boards.map((b) => (b.id === id ? { ...b, title } : b)),
        })),

      // 보드 삭제
      deleteBoard: (id) =>
        set((state) => ({ 
          boards: state.boards.filter((b) => b.id !== id),
        })),

      // 보드 순서 변경
      reorderBoards: (fromIndex, toIndex) => 
        set((state) => {
          const boards = [...state.boards]; 
          const [moved] = boards.splice(fromIndex, 1);
          boards.splice(toIndex, 0, moved);
          return { boards };
        }),

      // 할 일 추가
      addTask: (boardId) =>
        set((state) => ({      
          boards: state.boards.map((b) => 
            b.id === boardId
              ? { ...b, tasks: [...b.tasks, { id: crypto.randomUUID(), content: "" }] }
              : b
          ),
        })),

      // 할 일 수정
      updateTask: (boardId, taskId, content) =>
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === boardId
              ? {
                  ...b,
                  tasks: b.tasks.map((t) => (t.id === taskId ? { ...t, content } : t)),
                }
              : b
          ),
        })),

      // 할 일 삭제
      deleteTask: (boardId, taskId) =>
        set((state) => ({
          boards: state.boards.map((b) =>
            b.id === boardId ? { ...b, tasks: b.tasks.filter((t) => t.id !== taskId) } : b
          ),
        })),

      // 할 일 정렬 (같은 보드 내에서만)
      reorderTasks: (boardId, fromIndex, toIndex) =>
        set((state) => {
          console.log(`할 일 정렬: ${fromIndex} → ${toIndex} (보드 ${boardId})`);
          return {
            boards: state.boards.map((b) => {
              if (b.id !== boardId) return b;   

              const tasks = [...b.tasks];             
              const [moved] = tasks.splice(fromIndex, 1);
              tasks.splice(toIndex, 0, moved);
              return { ...b, tasks };
            }),
          };
        }),
    }),
    { name: "todo-storage", storage: createJSONStorage(() => localStorage) } 
  )
);
