"use client";

import { useTodoStore } from "@/store/todoStore";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Board from "./Board";
import { DropResult } from "react-beautiful-dnd";

export default function BoardList() {
  const { boards, reorderBoards, reorderTasks } = useTodoStore();

  const onDragEnd = ({ source, destination, type }: DropResult) => {
    
    console.log(source);
    console.log(destination);
    console.log(type);

    if (!destination) return;
    
    if (type === "BOARD") {
      reorderBoards(destination.index, source.index);     
    } else if (type === "TASK") {
      reorderTasks(destination.droppableId, destination.index, source.index);
    }

    
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="boards" type="BOARD" direction="horizontal">
        {(prov) => (
          <div ref={prov.innerRef} {...prov.droppableProps} className="flex justify-center gap-6 mt-8 p-4">
            {boards.map((board, index) => (
              <Draggable key={board.id} draggableId={board.id} index={index}>
                {(prov) => (
                  <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                    <Board board={board} />
                  </div>
                )}
              </Draggable>
            ))}
            {prov.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
