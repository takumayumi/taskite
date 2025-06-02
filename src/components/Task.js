import React, { useEffect, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  setShowPrompt,
  toggleTask,
  updateContent,
  updateCreated,
  updateStatus,
} from "../redux/taskSlice";
import classNames from "classnames";

const Task = ({ task }) => {
  const dispatch = useDispatch();
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

  const handleDelete = () => {
    dispatch(toggleTask(task));
    dispatch(setShowPrompt("delete"));
  };

  const handleDropdown = (event) => {
    const _value = event.target.value;

    if (task.status !== _value) {
      dispatch(updateStatus({ task, newStatus: _value }));
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
      dispatch(updateContent({ task, content: _value }));
      dispatch(updateCreated(task));
      input.disabled = true;
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
  }, [task]);

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
          onKeyDown={(e) => handleTextChange(e)}
          placeholder="New task"
          ref={inputRef}
          title="Task"
          type="text"
        />
        <button
          className={classNames(
            "inline-flex w-auto leading-3 justify-end hover:text-orange-2 duration-200 ease-linear",
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
          className="flex-grow w-full text-orange-2 bg-transparent rounded-md outline-none focus:outline-none"
          value={task.status}
          onChange={handleDropdown}
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
          Edit title <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          className="btn-icon"
          onClick={handleDelete}
          title="Delete Task"
          type="button"
        >
          Delete task <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default Task;
