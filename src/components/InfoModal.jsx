/**
 * InfoModal.jsx
 * Displays a modal with app information.
 * Only visible when `showPrompt` is set to "info" in Redux state.
 *
 * Author: Yumi Takuma
 */

import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { setShowPrompt } from "../redux/taskSlice";

const InfoModal = () => {
  const dispatch = useDispatch();
  const showPrompt = useSelector((state) => state.taskite.showPrompt);

  const handleCancel = () => {
    dispatch(setShowPrompt(null));
  };

  if (showPrompt !== "info") return null;

  return (
    <div
      className={classNames(
        "popup-bg",
        showPrompt === "info" ? "show" : "hide",
      )}
      onClick={handleCancel}
    >
      <div
        className={classNames("popup", showPrompt === "info" ? "show" : "hide")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="block w-full">
          <p className="mb-3">
            <strong>What you can do with taskite?</strong>
          </p>
          <ul className="mb-3 list-disc pl-5">
            <li>No sign-up required.</li>
            <li>
              Your tasks are stored privately in your browser using local
              storage or cookies.
            </li>
            <li>You can drag and drop tasks to reorder them easily.</li>
            <li>Export and import your task data anytime for backup.</li>
            <li>Download your task list as an Excel file for sharing.</li>
            <li>
              Private/incognito mode is supported, but tasks won’t be saved
              after the tab is closed.
            </li>
          </ul>
          <p className="text-indigo">
            Be careful: clearing your browser data will permanently delete your
            tasks, unless you've exported a backup.
          </p>
        </div>
        <div className="popup-buttons">
          <button className="btn-txt confirm" onClick={handleCancel}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
