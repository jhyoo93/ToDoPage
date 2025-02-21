import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TodoStore } from "@/types";

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      // 보드 배열 초기화
      boards: [],

      // 보드 추가
      addBoard: (title) => // 생성될 보드에 제목을 받는 파라미터
        set((state) => { // Zustand의 set() 함수를 사용하여 상태를 변경
          if (!title.trim()) return state; /// 제목이 공백 일경우 상태 return
          return { 
            /// 기존 보드 데이터를 유지하기위해 ...전개연사자 사용 state.boards의 모든데이터를 새로운 배열 boards에 복사
            boards: [...state.boards, { id: crypto.randomUUID(), title, tasks: [] }],
          };
        }),

      // 보드 수정
      updateBoard: (id, title) => // 생성될 보드에 제목을 받는 파라미터
        set((state) => ({ // Zustand의 set() 함수를 사용하여 상태를 변경
          // boards 배열 목록을 순회 하며 id 가 일치하는 보드를 찾아 새로운 제목을 업데이트
          // id가 다를경우 변경없이 상태 유지
          boards: state.boards.map((b) => (b.id === id ? { ...b, title } : b)),
        })),

      // 보드 삭제
      deleteBoard: (id) => // 생성될 보드에 제목을 받는 파라미터
        set((state) => ({ // Zustand의 set() 함수를 사용하여 상태를 변경
          // boards 배열 에 조건을 만족하는 요소만 유지
          // baards의 id값과 파라미터 id값이 일치할경우 실행
          boards: state.boards.filter((b) => b.id !== id),
        })),

      // 보드 순서 변경
      reorderBoards: (fromIndex, toIndex) => // romIndex 기본 보드의 index, toIndex 이동후 새로운 index
        set((state) => { // Zustand의 set() 함수를 사용하여 상태를 변경
          // 현재 보드 목록을 복사해 새로운 배열 생성
          // 복사하는이유 js에서는 배열을 직접 수정하면 상태 변화감지가 어려워 새로 생성해야 React가 자동으로 감지할수있다
          const boards = [...state.boards]; 
          // boards배열에서 fromIndex위치의 보드를 삭제하고 반환해 삭제한 보드를 moved변수에 저장
          const [moved] = boards.splice(fromIndex, 1);
          // toIndex 위치에 moved(이동한 보드)를 추가
          boards.splice(toIndex, 0, moved);
          // 새로운 boards배열을 리턴하여 Zustand상태를 업데이트
          return { boards };
        }),

      // 할 일 추가
      addTask: (boardId) => // 보드 안에 할일을 추가하기때문에 보드를 구분할 id값 지정
        set((state) => ({ // Zustand의 set() 함수를 사용하여 상태를 변경, state는 현재 boards 배열

          // map() 함수를 사용하여 보드 목록을 순회하며 특정 보드를 수정
          // 현재 보드(b)의 id가 boardId와 일치할시 기존 보드 객체(b)를 복사하여 새로운 객체 생성
          // 기존 tasks(할일 배열)을 복사(...b.tasks)하여 새로운 배열생성후 새로운 할일 추가
          boards: state.boards.map((b) => 
            b.id === boardId
              ? { ...b, tasks: [...b.tasks, { id: crypto.randomUUID(), content: "" }] }
              : b
          ),
        })),

      // 할 일 수정
      updateTask: (boardId, taskId, content) => // 보드 구분값, 할일 구분값, 할일 내용 텍스트
        set((state) => ({ // Zustand의 set() 함수를 사용하여 상태를 변경, state는 현재 boards 배열
          boards: state.boards.map((b) => // 현재 저장된 보드 목록 배열 map()을 사용하여 보드 목록을 순회
            // 현재 보드(b)가 boardId와 일치하는지 확인
            // 일치 할시 현재 보드 안의 tasks 배열을 순회 후 taskId와 일치하는 할 일(t)을 찾아 내용(content)을 업데이트
            // 일치하지 않으면 기존 상태 유지
            b.id === boardId
              ? {
                  ...b,
                  tasks: b.tasks.map((t) => (t.id === taskId ? { ...t, content } : t)),
                }
              : b
          ),
        })),

      // 할 일 삭제
      deleteTask: (boardId, taskId) => // 보드 구분값, 할일 구분값
        set((state) => ({ // Zustand의 set() 함수를 사용하여 상태를 변경, state는 현재 boards 배열
          boards: state.boards.map((b) => // 현재 저장된 보드 목록 배열 map()을 사용하여 보드 목록을 순회
            // 현재 보드(b)가 boardId와 일치하는지 확인
            // 일치 할시 현재 안 tasks의 배열의 조건을 만족하는 요소를 찾아 삭제
            // 일치하지 않으면 기존상태 유지
            b.id === boardId ? { ...b, tasks: b.tasks.filter((t) => t.id !== taskId) } : b
          ),
        })),

      // 할 일 정렬 (같은 보드 내에서만)
      reorderTasks: (boardId, fromIndex, toIndex) => // 보드 구분값, 이동 전 인덱스 값, 이동후 인덱스값
        set((state) => {
          console.log(`할 일 정렬: ${fromIndex} → ${toIndex} (보드 ${boardId})`);
          return {
            boards: state.boards.map((b) => {// 현재 저장된 boards 배열을 순회하여 특정 보드를 찾는다
               // 현재 보드(b)의 id가 boardId와 일치하는지 확인후 일치하면 수정 아닐시 현재상태유지
              if (b.id !== boardId) return b;
              // React의 상태 관리를 위해 tasks 배열을 직접 변경하지 않고 복사본을 수정
              const tasks = [...b.tasks];
              // fromIndex 위치에서 할 일을 꺼내고, tasks 배열에서 제거
              // 제거된 할일 moved변수에 저장
              const [moved] = tasks.splice(fromIndex, 1);
              // moved 할 일을 새로운 위치(toIndex)에 삽입
              tasks.splice(toIndex, 0, moved);
              // 기존 보드 데이터 유지하며 tasks배열만 업데이트
              return { ...b, tasks };
            }),
          };
        }),
    }),
    // Zustand 상태를 localStorage에 저장하여 페이지를 새로고침해도 데이터가 유지
    // createJSONStorage()는 데이터를 JSON 형식으로 변환하여 저장
    { name: "todo-storage", storage: createJSONStorage(() => localStorage) } 
  )
);
