import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DeletePrompt from "./DeletePrompt";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { updateWWidth } from "../redux/taskSlice";
import BMCIcon from "../assets/bmc-button.svg";

const TaskManager = () => {
  const dispatch = useDispatch();
  const statuses = ["Backlog", "In Progress", "Done"];
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    const handleResize = () => {
      dispatch(updateWWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <>
      <div className="py-14 px-5 overflow-y-auto lg:px-10 h-full w-full flex flex-col max-w-screen-xl mx-auto min-w-92.5 min-h-138">
        <div className="relative inline-block mx-auto text-center text-5xl font-light mb-10 font-playwright">
          <h1 className="text-indigo">taskite</h1>
          <span className="absolute -top-0.5 -left-0.5 text-yellow">
            taskite
          </span>
        </div>
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 md:flex-1 md:grid-cols-3 gap-5 md:flex-grow md:overflow-hidden">
            {statuses.map((status) => (
              <TaskList
                key={status}
                tasks={tasks[status] || []}
                status={status}
              />
            ))}
          </div>
        </DndProvider>
        <div className="relative w-full mt-10 text-black/80 text-base flex flex-col gap-5 sm:flex-row justify-between items-center">
          <p>
            &copy; 2025&nbsp;
            <a
              className="underline"
              href="https://takumayumi.pages.dev"
              title="takumayumi"
              target="_blank"
              rel="noreferrer"
            >
              takumayumi
            </a>
          </p>
          <a
            href="https://buymeacoffee.com/yumicchi"
            title="Buy me a hot chocolate"
            target="_blank"
            rel="noreferrer"
            aria-label="Buy me a hot chocolate"
          >
            <img
              src={BMCIcon}
              alt="Buy me a hot chocolate"
              width="179"
              height="50"
            />
          </a>
        </div>
      </div>
      <DeletePrompt />
    </>
  );
};

export default TaskManager;
