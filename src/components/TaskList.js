import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const TaskList = ({
  onAdd,
  onDelete,
  onUpdateContent,
  onUpdateCreated,
  onUpdateStatus,
  status,
  tasks,
}) => {
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
      className={classNames(
        "col-span-1 flex flex-col w-full gap-4 relative h-full rounded-xl overflow-hidden bg-green transition-colors duration-200 ease-linear p-6",
        isOver ? "bg-green-2" : ""
      )}
    >
      {/* Task Status */}
      <div className="flex items-center transition-colors duration-200 ease-linear gap-4 font-bold">
        <h2
          className={classNames(
            "text-lg lg:text-xl font-semibold",
            isOver ? "text-yellow-1" : ""
          )}
        >
          {status}
        </h2>
        <button
          className="md:ml-auto text-orange-2"
          onClick={() => onAdd(status)}
          title={`Add ${status} Task`}
          type="button"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
          className="ml-auto block md:hidden"
          onClick={toggleCollapse}
          title={`${isCollapsed ? "Show" : "Hide"} ${status} Tasks`}
          type="button"
        >
          <FontAwesomeIcon
            className={classNames(
              "transition-transform duration-100 ease-in",
              isCollapsed ? "rotate-180" : ""
            )}
            icon={faCaretUp}
          />
        </button>
      </div>
      {/* Task List */}
      <div
        className="flex-[1_1_auto] overflow-auto min-h-0 flex flex-col gap-2 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent"
        ref={drop}
      >
        {!isCollapsed && (
          <>
            {tasks.map((task) => (
              <Task
                isOver={isOver}
                key={task.id}
                onDelete={onDelete}
                onUpdateContent={onUpdateContent}
                onUpdateCreated={onUpdateCreated}
                onUpdateStatus={onUpdateStatus}
                task={task}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;
