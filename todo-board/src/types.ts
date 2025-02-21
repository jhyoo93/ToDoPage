// 보드 타입 정의
export interface Board {
  id: string;
  title: string;
  tasks: Task[];
}

// 할 일 타입 정의
export interface Task {
  id: string;
  content: string;
}

// Zustand 스토어 인터페이스
export interface TodoStore {

  // 보드
  boards: Board[];
  addBoard: (title: string) => void;
  updateBoard: (id: string, title: string) => void;
  deleteBoard: (id: string) => void;
  reorderBoards: (fromIndex: number, toIndex: number) => void;

  // 할일
  addTask: (boardId: string) => void;
  updateTask: (boardId: string, taskId: string, content: string) => void;
  deleteTask: (boardId: string, taskId: string) => void;
  reorderTasks: (boardId: string, fromIndex: number, toIndex: number) => void;
}

// 보드 타입 props
export interface BoardProps {
  board: Board;
}

// 할일 타입 props
export interface TaskProps {
  boardId: string;
  task: Task;
}

// 할일 리스트 타입 props
export interface TaskListProps {
  boardId: string;
}
