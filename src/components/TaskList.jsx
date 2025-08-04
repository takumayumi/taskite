/**
 * TaskList.jsx
 * A droppable column for a specific task status.
 * Supports drag-and-drop via react-dnd, and allows task creation within each column.
 *
 * Author: Yumi Takuma
 */

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import Task from "./Task";
import { addTask, updateStatus } from "../redux/taskSlice";

const TaskList = ({ status, tasks }) => {
  const dispatch = useDispatch();

  // Configure this column as a drop target for tasks
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (task) => dispatch(updateStatus({ task, newStatus: status })),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      className={classNames(
        "bg-green relative col-span-1 flex w-full flex-col gap-4 overflow-hidden rounded-xl p-6 transition-colors duration-200 ease-linear md:h-full",
        isOver ? "bg-green-2" : "",
      )}
    >
      {/* Column Header */}
      <div
        className="flex items-center gap-4 font-bold transition-colors duration-200 ease-linear"
        role="region"
        aria-label={`${status} column`}
      >
        <h2
          className={classNames(
            "text-lg font-semibold lg:text-xl",
            isOver ? "text-yellow-1" : "",
          )}
        >
          {status}
        </h2>
        <button
          className="text-white-1 ml-auto"
          onClick={() => dispatch(addTask(status))}
          title={`Add ${status} Task`}
          type="button"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      {/* Task Items */}
      <div
        className={classNames(
          "[&::-webkit-scrollbar-thumb]:bg-yellow flex max-h-72 min-h-0 flex-col gap-2 overflow-auto md:max-h-full md:flex-[1_1_auto] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar]:pl-1",
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
