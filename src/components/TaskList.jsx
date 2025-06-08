import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addTask, updateStatus } from "../redux/taskSlice";
import classNames from "classnames";
import Task from "./Task";

const TaskList = ({ status, tasks }) => {
  const dispatch = useDispatch();
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
          className="ml-auto text-white-1"
          onClick={() => dispatch(addTask(status))}
          title={`Add ${status} Task`}
          type="button"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {/* Task List */}
      <div
        className={classNames(
          "flex flex-col gap-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-yellow  overflow-auto max-h-72 md:max-h-full min-h-0 md:flex-[1_1_auto] [&::-webkit-scrollbar]:pl-1"
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
