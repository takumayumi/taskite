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
          "popup-bg",
          showPrompt === "import" ? "show" : "hide"
        )}
        onClick={handleCancel}
      >
        <div
          className={classNames(
            "popup",
            showPrompt === "import" ? "show" : "hide"
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
          <div className="popup-buttons">
            <button className="popup-button confirm" onClick={handleConfirm}>
              Yes
            </button>
            <button className="popup-button cancel" onClick={handleCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportPrompt;
