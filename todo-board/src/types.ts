// 보드 타입 정의
export interface Board {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

// 할 일 타입 정의
export interface Task {
  id: string;
  content: string;
  order: number;
}

// Zustand 스토어 인터페이스
export interface TodoStore {
  boards: Board[];
  addBoard: (title: string) => void;
  updateBoard: (id: string, title: string) => void;
  deleteBoard: (id: string) => void;
  reorderBoards: (sourceIndex: number, destinationIndex: number) => void;
  addTask: (boardId: string, content: string) => void;
  updateTask: (boardId: string, taskId: string, content: string) => void;
  deleteTask: (boardId: string, taskId: string) => void;
  reorderTasks: (sourceBoardId: string, sourceIndex: number, destinationBoardId: string, destinationIndex: number) => void;
}
