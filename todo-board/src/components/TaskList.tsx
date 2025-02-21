"use client";

import { useTodoStore } from "@/store/todoStore";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskListProps } from "@/types";
import Task from "./Task";

// 할일 목록 렌더링 컴포넌트
// export default를 사용하여 다른 파일에서 import불러올수 있음
export default function TaskList({ boardId }: TaskListProps) { //boardId를 props로 받아서 해당 보드의 할 일만 렌더링
  // 현재 존재하는 모든 보드 목록을 가져옴
  const { boards } = useTodoStore();
  // 현재 렌더링할 보드를 find()함수로 찾는다
  const board = boards.find((b) => b.id === boardId);
  
  // 해당 boardId를 가진 보드 찾지 못하면 null을 리턴해 렌더링하지 않는다
  if (!board) return null;

  return (
    // 특정 보드 내에서만 할 일이 드래그 & 드롭 가능하도록 설정
    // 구분값 TASK(할일) 지정
    <Droppable key={boardId} droppableId={boardId} type="TASK">
      {(prov) => (
        <ul ref={prov.innerRef} {...prov.droppableProps} className="mt-4 space-y-2">
          {board.tasks.map((task, taskIndex) => (
            // Draggable을 사용하여 각 할 일을 드래그 가능하도록 설정
            // draggableId={task.id} - 할일 id값설정
            // index={taskIndex} - 할일 현재 위치
            <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
              {(prov) => (
                <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                  {/*할일 컴포넌트 렌더링*/}
                  <Task boardId={boardId} task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {prov.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
