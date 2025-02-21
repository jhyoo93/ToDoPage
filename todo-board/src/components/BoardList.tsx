"use client";

import { useTodoStore } from "@/store/todoStore";
import dynamic from "next/dynamic";
import Board from "./Board";

// `react-beautiful-dnd`를 클라이언트에서만 로드하도록 설정
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false });

export default function BoardList() {
  const { boards, reorderBoards } = useTodoStore();

  // 보드 드래그 앤 드롭 핸들러
  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === "BOARD") {
      if (source.index !== destination.index) {
        reorderBoards(source.index, destination.index);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="boards" type="BOARD" direction="horizontal">
        {(provided) => (
          <div
            className="flex gap-6 mt-4 p-4 overflow-x-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {boards.map((board, boardIndex) => (
              <Draggable key={board.id} draggableId={board.id} index={boardIndex}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex-shrink-0"
                  >
                    {/* 개별 보드 컴포넌트 */}
                    <Board board={board} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
