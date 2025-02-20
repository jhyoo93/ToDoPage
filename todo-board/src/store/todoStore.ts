import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// 보드 타입 정의
export type Board = {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
};

// 할 일 타입 정의
export type Task = {
  id: string;
  content: string;
  order: number;
};

// store 정의
type TodoStore = {
  boards: Board[];
  addBoard: (title: string) => void;
  updateBoard: (id: string, title: string) => void;
  deleteBoard: (id: string) => void;
  reorderBoards: (sourceIndex: number, destinationIndex: number) => void;
  addTask: (boardId: string, content: string) => void;
  updateTask: (boardId: string, taskId: string, content: string) => void;
  deleteTask: (boardId: string, taskId: string) => void;
  reorderTasks: (boardId: string, sourceIndex: number, destinationIndex: number) => void;
};

// Zustand 스토어 생성
export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      boards: [],

      // 보드 추가
      addBoard: (title) =>
        set((state) => {
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
          boards: state.boards.map((board) => (board.id === id ? { ...board, title } : board)),
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
          const [movedBoard] = updatedBoards.splice(sourceIndex, 1); // 원래 위치에서 제거
          updatedBoards.splice(destinationIndex, 0, movedBoard); // 새로운 위치에 삽입
      
          // 각 보드의 order 값을 다시 정렬
          const reorderedBoards = updatedBoards.map((board, index) => ({
            ...board,
            order: index,
          }));

          console.log("보드 순서 변경됨:");

          reorderedBoards.forEach((board) =>
            console.log(`ID: ${board.id}, Order: ${board.order}, Title: ${board.title}`)
          );
      
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
            board.id === boardId ? { ...board, tasks: board.tasks.filter((task) => task.id !== taskId) } : board
          ),
        })),

      // 할 일 순서 변경
      reorderTasks: (boardId, sourceIndex, destinationIndex) =>
        set((state) => {
          const updatedBoards = state.boards.map((board) => {
            if (board.id !== boardId) return board;

            const updatedTasks = [...board.tasks];
            const [movedTask] = updatedTasks.splice(sourceIndex, 1);
            updatedTasks.splice(destinationIndex, 0, movedTask);

            return { ...board, tasks: updatedTasks };
          });

          return { boards: updatedBoards };
        }),
        
      }),
    {
      name: "todo-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
