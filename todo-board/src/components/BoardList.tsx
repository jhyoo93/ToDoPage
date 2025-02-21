"use client";

import { useTodoStore } from "@/store/todoStore";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Board from "./Board";
import { DropResult } from "react-beautiful-dnd";

// 보드 목록 렌더링 컴포넌트
// export default를 사용하여 다른 파일에서 import불러올수 있음
export default function BoardList() {
  // 보드를 이동하거나, 특정 보드 내에서 할 일을 이동할 수 있는 기능을 Zustand에서 가져옴
  const { boards, reorderBoards, reorderTasks } = useTodoStore();

  // 드래그 종료 이벤트
  // 드래그가 끝날때 실행되는 함수
  const onDragEnd = ({ source, destination, type }: DropResult) => { // 이동전 인덱스, 이동후 인덱스, 드래그 항목구분 보드/할일
    // 드래그가 취소되면 아무 작업도 하지 않도록 설정
    
    console.log(source);
    console.log(destination);
    console.log(type);

    if (!destination) return;
    
    // 구분값이 보드일때
    if (type === "BOARD") {
      // 현재 위치에서 새 위치로 보드를 이동
      reorderBoards(destination.index, source.index);
      
    // 구분값이 할일일때
    } else if (type === "TASK") {
      // from.droppableId: 어느 보드에서 이동했는지 확인
      // from.index: 이전 위치, to.index: 새로운 위치
      reorderTasks(destination.droppableId, destination.index, source.index);
    }

    
  };

  return (
    // @hello-pangea/dnd에서 제공하는 드래그 앤 드롭 기능을 감싸는 컨텍스트
    // 
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
