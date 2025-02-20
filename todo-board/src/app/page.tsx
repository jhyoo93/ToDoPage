"use client";

import { useState } from "react";
import { useTodoStore } from "@/store/todoStore";
import dynamic from "next/dynamic";

// react-beautiful-dnd`를 클라이언트에서만 로드하도록 설정
const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
  { ssr: false }
);
const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable),
  { ssr: false }
);
const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable),
  { ssr: false }
);

export default function Home() {
  const {
    boards,
    addBoard,
    updateBoard,
    deleteBoard,
    reorderBoards,
    addTask,
    updateTask,
    deleteTask,
    reorderTasks,
  } = useTodoStore();

  const [newBoardTitle, setNewBoardTitle] = useState("");

  const handleAddBoard = () => {
    if (newBoardTitle.trim() !== "") {
      addBoard(newBoardTitle);
      setNewBoardTitle("");
    }
  };

  // 드래그 앤 드롭 핸들러
  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;
    if (!destination) return;
  
    if (type === "BOARD") {
      if (source.index !== destination.index) {
        reorderBoards(source.index, destination.index);
      }
    } else if (type === "TASK") {
      reorderTasks(source.droppableId, source.index, destination.droppableId);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">📌 ToDo List</h1>

      <div className="flex justify-center mb-6">
        <input
          className="px-4 py-2 border rounded focus:outline-none"
          placeholder="제목 입력"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddBoard();
          }}
        />
        &nbsp;
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 transition"
          onClick={handleAddBoard}
        >
          Add
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="boards" type="BOARD" direction="horizontal">
          {(provided) => (
            <div
              className="flex gap-12 mt-4 p-4 overflow-x-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {boards.map((board, boardIndex) => (
                <Draggable key={String(board.id)} draggableId={String(board.id)} index={boardIndex}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 bg-white border rounded-lg shadow-lg w-72 min-h-[300px] cursor-grab flex-shrink-0"
                    >
                      {/* 보드 제목과 삭제 버튼 */}
                      <div className="flex items-center justify-between mb-3 w-full">
                        <input
                          className="text-lg font-bold bg-transparent border-b-2 border-gray-300 outline-none focus:border-blue-500 transition flex-1"
                          value={board.title}
                          placeholder="제목 입력"
                          onChange={(e) => updateBoard(board.id, e.target.value)}
                        />
                        <button
                          className="px-1  bg-red-500 text-white rounded hover:bg-red-600 transition"
                          onClick={() => deleteBoard(board.id)}
                        >
                          X
                        </button>
                      </div>

                      {/* 할 일 추가 버튼 */}
                      <button
                        className="px-3 py-2 bg-black text-white rounded w-full hover:bg-gray-500 transition"
                        onClick={() => addTask(board.id, "새로운 할 일")}
                      >
                        ToDo Add
                      </button>

                      {/* 할 일 목록 */}
                      <Droppable droppableId={String(board.id)} type="TASK">
                        {(provided) => (
                          <ul className="mt-4 space-y-2" {...provided.droppableProps} ref={provided.innerRef}>
                            {board.tasks.map((task, taskIndex) => (
                              <Draggable key={String(task.id)} draggableId={String(task.id)} index={taskIndex}>
                                {(provided) => (
                                  <li
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-3 bg-gray-100 border rounded flex justify-between items-center shadow-sm cursor-grab gap-2"
                                  >
                                    <input
                                      className="flex-1 bg-transparent border-none outline-none px-2 py-1"
                                      value={task.content}
                                      onChange={(e) => updateTask(board.id, task.id, e.target.value)}
                                      onBlur={(e) => updateTask(board.id, task.id, e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.currentTarget.blur();
                                        }
                                      }}
                                    />

                                    {/* 삭제 버튼 */}
                                    <button
                                      className="px-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                      onClick={() => deleteTask(board.id, task.id)}
                                    >
                                      X
                                    </button>
                                  </li>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </ul>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
