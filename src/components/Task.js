import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const Task = ({ onDelete, onUpdateStatus, task }) => {
  const [showStatusDrodpown, setShowStatusDropdown] = useState(false);
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const handleStatusChange = (event) => {
    const shouldUpdateStatus = window.confirm(
      `Are you sure you want to update the status of this task from ${task.status} to ${event.target.value}?`
    );

    if (shouldUpdateStatus && task.status !== event.target.value) {
      onUpdateStatus(task.id, event.target.value);
    }
  };

  useEffect(() => {
    if (isDragging) {
      setShowStatusDropdown(false);
    }
  }, [isDragging]);

  return (
    <div
      className={`card py-6 px-6 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      ref={drag}
    >
      {/* Task Control: Update Status or Delete Task */}
      <div className="absolute top-6 right-6 flex items-center gap-x-4">
        <button
          className="font-bold text-blue-500 text-xl"
          onClick={() => setShowStatusDropdown(!showStatusDrodpown)}
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          className="font-bold text-red-500 text-xl"
          onClick={() => onDelete(task.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      {/* Task title */}
      <span>{task.content}</span>
      {/* Task Control: Change Status Dropdown */}
      <label className={showStatusDrodpown ? "flex mt-6 text-xl" : "hidden"}>
        Status:
        <select
          className="ml-2 flex-grow"
          value={task.status}
          onChange={handleStatusChange}
        >
          <option value="Backlog">Backlog</option>
          <option value="In Progress">In Progess</option>
          <option value="Done">Done</option>
        </select>
      </label>
    </div>
  );
};

export default Task;
