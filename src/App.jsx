/**
 * App.jsx
 * Main application container.
 * Handles layout, drag-and-drop context, responsive logic, and global modals.
 *
 * Author: Yumi Takuma
 */

import React, { lazy, Suspense, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Slide } from "react-toastify";
import ExportButton from "./components/ExportButton";
import Footer from "./components/Footer";
import ImportButton from "./components/ImportButton";
import TaskList from "./components/TaskList";
import Title from "./components/Title";
import XLSXButton from "./components/XLSXButton";
import { updateWidth } from "./redux/taskSlice";

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
      <div className="mx-auto flex h-full min-h-full w-full max-w-screen-xl flex-col overflow-y-auto px-5 py-10">
        <Title />
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 gap-5 md:flex-1 md:flex-grow md:grid-cols-3 md:overflow-hidden">
            {statuses.map((status) => (
              <TaskList
                key={status}
                tasks={tasks[status] || []}
                status={status}
              />
            ))}
          </div>
        </DndProvider>
        <div className="mt-5 flex w-full flex-col justify-center gap-3 sm:flex-row sm:gap-5">
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
