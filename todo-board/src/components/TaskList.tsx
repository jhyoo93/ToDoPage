"use client";

import { useTodoStore } from "@/store/todoStore";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { TaskListProps } from "@/types";
import Task from "./Task";

export default function TaskList({ boardId }: TaskListProps) {
  const { boards } = useTodoStore();
  const board = boards.find((b) => b.id === boardId);

  if (!board) return null;

  return (
    <Droppable key={boardId} droppableId={boardId} type="TASK">
      {(prov) => (
        <ul ref={prov.innerRef} {...prov.droppableProps} className="mt-4 space-y-2">
          {board.tasks.map((task, taskIndex) => (
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
