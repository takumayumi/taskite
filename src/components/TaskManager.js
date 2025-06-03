import { lazy, Suspense, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer, Slide } from "react-toastify";
import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { updateWidth } from "../redux/taskSlice";
import BMCIcon from "../assets/bmc-button.svg";

const DeletePrompt = lazy(() => import("./DeletePrompt"));
const ImportPrompt = lazy(() => import("./ImportPrompt"));

const TaskManager = () => {
  const dispatch = useDispatch();
  const statuses = ["Backlog", "In Progress", "Done"];
  const tasks = useSelector((state) => state.taskite.tasks);

  useEffect(() => {
    const handleResize = () => {
      dispatch(updateWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={10000}
        closeButton={false}
        closeOnClick
        draggable={false}
        hideProgressBar
        icon={false}
        newestOnTop={false}
        pauseOnFocusLoss
        pauseOnHover
        rtl={false}
        transition={Slide}
      />
      <div className="py-14 px-5 overflow-y-auto lg:px-10 h-full w-full flex min-h-full flex-col max-w-screen-xl mx-auto">
        <div className="relative inline-block mx-auto text-center text-5xl font-light mb-5 font-playwright">
          <h1 className="text-indigo">taskite</h1>
          <span className="absolute -top-0.5 -left-0.5 text-yellow">
            taskite
          </span>
        </div>
        <div className="w-full mb-5 flex justify-end gap-5 flex-row">
          <ImportButton />
          <ExportButton />
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
        <div className="mt-auto relative w-full pt-5 text-black/80 text-base flex flex-col gap-5 sm:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()}&nbsp;
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
      <Suspense fallback={null}>
        <DeletePrompt />
        <ImportPrompt />
      </Suspense>
    </>
  );
};

export default TaskManager;
