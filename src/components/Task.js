import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const Task = ({
  isOver,
  onDelete,
  onUpdateContent,
  onUpdateCreated,
  onUpdateStatus,
  task,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const [showMenu, setShowMenu] = useState(false);
  const inputRef = useRef(null);
  const textRef = useRef(null);

  const handleBlur = () => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    input.disabled = true;
    setShowMenu(false);
  };

  const handleStatusChange = (event) => {
    if (task.status !== event.target.value) {
      onUpdateStatus(task.id, event.target.value);
    }
  };

  const handleTextChange = (e) => {
    const text = textRef.current;
    const input = e.target;
    const value = input.value;

    if (e.key === "Tab" || e.key === "Enter" || e.type === "blur") {
      e.preventDefault();

      const _value = value === "" ? "New task" : value;

      text.textContent = _value;
      onUpdateContent(task, _value);
      onUpdateCreated(task);
      handleBlur();
    }

    text.textContent = value;
    input.style.height = `${text.scrollHeight}px`;
  };

  const onUpdateText = () => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    input.removeAttribute("disabled");
    input.focus();
    setShowMenu(false);
  };

  useEffect(() => {
    if (isDragging) {
      setShowMenu(false);
    }
  }, [isDragging]);

  useEffect(() => {
    const input = inputRef.current;

    if (!input) {
      return;
    }

    if (!task.created) {
      input.removeAttribute("disabled");
      input.focus();
    }

    const handleResize = () => {
      const text = textRef.current;
      const input = inputRef.current;

      if (text) {
        text.textContent = input.value;
        input.style.height = `${text.scrollHeight}px`;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
  }, [onUpdateCreated, task]);

  return (
    <div
      className={`bg-white rounded-md w-full relative p-4 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      ref={drag}
    >
      <div className="flex relative flex-col gap-4">
        <span
          className="absolute top-0 w-full -z-10 invisible left-0 min-h-8 break-words"
          onClick={() => console.log("asdasd")}
          ref={textRef}
        >
          {task.content}
        </span>
        <textarea
          className="overflow-y-hidden bg-transparent w-full resize-none outline-none focus:outline-none"
          defaultValue={task.created ? task.content : ""}
          disabled={task.created}
          name={task.id}
          onBlur={(e) => handleTextChange(e)}
          onChange={(e) => handleTextChange(e)}
          onClick={() => console.log("asdfg")}
          onKeyDown={(e) => handleTextChange(e)}
          placeholder="New task"
          ref={inputRef}
          title="Task"
          type="text"
        />
        <button
          className={classNames(
            "inline-flex w-auto leading-3 hover:text-orange-2 duration-200 ease-linear",
            showMenu ? "text-orange-2" : "text-orange"
          )}
          onClick={() => setShowMenu(!showMenu)}
          type="button"
        >
          •••
        </button>
      </div>
      <div
        className={classNames(
          "mt-4 flex-col gap-4 text-sm lg:text-base items-start",
          showMenu ? "flex" : "hidden"
        )}
      >
        <select
          className="flex-grow w-full bg-transparent rounded-md outline-none focus:outline-none"
          value={task.status}
          onChange={handleStatusChange}
          title="Change Status"
        >
          <option value="Backlog">Backlog</option>
          <option value="In Progress">In Progess</option>
          <option value="Done">Done</option>
        </select>
        <button
          className="btn-icon"
          onClick={() => onUpdateText()}
          title="Edit Title"
          type="button"
        >
          <FontAwesomeIcon icon={faPencil} /> Edit title
        </button>
        <button
          className="btn-icon"
          onClick={() => onDelete(task.id)}
          title="Delete Task"
          type="button"
        >
          <FontAwesomeIcon icon={faTrash} /> Delete task
        </button>
      </div>
    </div>
  );
};

export default Task;
