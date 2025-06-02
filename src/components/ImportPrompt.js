import { useSelector, useDispatch } from "react-redux";
import { importTasks, setShowPrompt } from "../redux/taskSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { useRef } from "react";

const ImportPrompt = () => {
  const dispatch = useDispatch();
  const showPrompt = useSelector((state) => state.taskite.showPrompt);
  const currentTasks = useSelector((state) => state.taskite.tasks);
  const currentTasksLength = Object.values(currentTasks).reduce(
    (sum, taskArr) => sum + taskArr.length,
    0
  );
  const fileInputRef = useRef(null);

  const handleConfirm = () => {
    if (showPrompt === "import") {
      fileInputRef.current?.click();
    }
    dispatch(setShowPrompt(null));
  };

  const handleCancel = () => {
    dispatch(setShowPrompt(null));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedJson = e.target.result;
        dispatch(importTasks(importedJson));
      } catch (error) {
        console.error("Failed to import:", error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Prompt UI */}
      <div
        className={classNames(
          "fixed top-0 left-0 h-full w-full transition-opacity bg-black/80 duration-200 ease-linear",
          showPrompt === "import"
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={handleCancel}
      >
        <div
          className={classNames(
            "fixed z-10 w-auto bg-yellow-1 rounded-lg p-10 transition-transform duration-200 ease-linear top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 flex flex-col gap-10",
            showPrompt === "import" ? "scale-100" : "scale-0"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full block">
            <p className="mb-3">
              <FontAwesomeIcon
                className="text-orange-2 mr-2"
                icon={faExclamationTriangle}
              />
              <strong>Replace all ({currentTasksLength}) tasks?</strong>
            </p>
            <p>
              Importing will overwrite your current tasks. This cannot be
              undone. Are you sure you want to continue?
            </p>
          </div>
          <div className="flex items-center gap-3 justify-end">
            <button className="btn-txt bg-green-2" onClick={handleConfirm}>
              Yes
            </button>
            <button className="btn-txt bg-orange-2" onClick={handleCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportPrompt;
