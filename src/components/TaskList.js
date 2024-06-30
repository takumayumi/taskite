import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateStatus } from "../redux/taskSlice";
import classNames from "classnames";
import Task from "./Task";

const TaskList = ({ status, tasks }) => {
  const dispatch = useDispatch();
  const [isCollapsed, setCollapsed] = useState(
    window.innerWidth < 768 ? false : true
  );
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (task) => dispatch(updateStatus({ task, newStatus: status })),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const wWidth = useSelector((state) => state.tasks.wWidth);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div
      className={classNames(
        "col-span-1 flex flex-col w-full gap-4 relative md:h-full rounded-xl overflow-hidden bg-green transition-colors duration-200 ease-linear p-6",
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
          className="md:ml-auto text-white-1"
          onClick={() => dispatch(addTask(status))}
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
        className={classNames(
          "flex flex-col gap-2 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent",
          isCollapsed || wWidth >= 768
            ? "md:overflow-auto md:flex-[1_1_auto] md:min-h-0 h-full"
            : "h-0 overflow-hidden"
        )}
        ref={drop}
      >
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
