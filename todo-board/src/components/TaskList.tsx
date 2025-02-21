"use client";

import { useTodoStore } from "@/store/todoStore";
import dynamic from "next/dynamic";
import Task from "./Task";

// `react-beautiful-dnd`를 클라이언트에서만 로드하도록 설정
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false });

interface TaskListProps {
  boardId: string;
}

export default function TaskList({ boardId }: TaskListProps) {
  const { boards, reorderTasks } = useTodoStore();

  // 현재 보드 찾기
  const board = boards.find((b) => b.id === boardId);
  if (!board) return null;

  // 할 일 드래그 핸들러
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceBoardId = source.droppableId;
    const destinationBoardId = destination.droppableId;

    reorderTasks(sourceBoardId, source.index, destinationBoardId, destination.index);
  };

  return (
    <Droppable droppableId={boardId} type="TASK">
      {(provided) => (
        <ul className="mt-4 space-y-2" {...provided.droppableProps} ref={provided.innerRef}>
          {board.tasks.map((task, taskIndex) => (
            <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                  {/* 개별 할 일 컴포넌트 */}
                  <Task boardId={boardId} task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
