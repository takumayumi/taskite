import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const TaskList = ({ onAdd, onDelete, onUpdateStatus, status, tasks }) => {
  const [isCollapsed, setCollapsed] = useState(false);
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onUpdateStatus(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`col-span-1 flex flex-col gap-y-6 relative h-full rounded-xl p-8 ${
        isOver ? "bg-gray-500/20" : ""
      }`}
      ref={drop}
    >
      {/* Task List Title / Status */}
      <div className="flex items-center">
        <h2 className="font-bold text-3xl">{status}</h2>
        {/* Collapse */}
        <button className="ml-4 text-gray-500" onClick={toggleCollapse}>
          {isCollapsed ? (
            <FontAwesomeIcon icon={faCaretUp} />
          ) : (
            <FontAwesomeIcon icon={faCaretDown} />
          )}
        </button>
      </div>
      {/* Task Control: Add Task */}
      <button
        className="card font-bold text-blue-500 text-2xl p-3"
        onClick={() => onAdd(status)}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      {/* Task List */}
      {!isCollapsed && (
        <>
          {tasks.map((task) => (
            <Task
              key={task.id}
              onDelete={onDelete}
              onUpdateStatus={onUpdateStatus}
              task={task}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TaskList;
