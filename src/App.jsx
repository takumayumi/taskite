import { lazy, Suspense, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ToastContainer, Slide } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateWidth } from "./redux/taskSlice";
import ExportButton from "./components/ExportButton";
import Footer from "./components/Footer";
import ImportButton from "./components/ImportButton";
import TaskList from "./components/TaskList";
import Title from "./components/Title";
import XLSXButton from "./components/XLSXButton";

const DeletePrompt = lazy(() => import("./components/DeletePrompt"));
const ImportPrompt = lazy(() => import("./components/ImportPrompt"));
const InfoModal = lazy(() => import("./components/InfoModal"));

const App = () => {
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
        autoClose={5000}
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
      <div className="py-10 px-5 overflow-y-auto h-full w-full flex min-h-full flex-col max-w-screen-xl mx-auto">
        <Title />
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
        <div className="w-full mt-5 flex justify-center gap-3 sm:gap-5 flex-col sm:flex-row">
          <ImportButton />
          <XLSXButton />
          <ExportButton />
        </div>
        <Footer />
      </div>
      <Suspense fallback={null}>
        <DeletePrompt />
        <ImportPrompt />
        <InfoModal />
      </Suspense>
    </>
  );
};

export default App;
