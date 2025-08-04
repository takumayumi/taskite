/**
 * DeletePrompt.jsx
 * Confirmation modal for deleting a task from the board.
 *
 * Author: Yumi Takuma
 */

import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, setSelectedTask, setShowPrompt } from "../redux/taskSlice";

const DeletePrompt = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.taskite.selectedTask);
  const showPrompt = useSelector((state) => state.taskite.showPrompt);

  const handleConfirm = () => {
    dispatch(deleteTask(selectedTask));
    dispatch(setSelectedTask(null));
    dispatch(setShowPrompt(null));
  };

  const handleCancel = () => {
    dispatch(setSelectedTask(null));
    dispatch(setShowPrompt(null));
  };

  return (
    <div
      className={classNames(
        "popup-bg",
        showPrompt === "delete" ? "show" : "hide",
      )}
      onClick={handleCancel}
    >
      <div
        className={classNames(
          "popup",
          showPrompt === "delete" ? "show" : "hide",
        )}
      >
        <p>Are you sure you want to delete this task?</p>
        <div className="popup-buttons">
          <button className="btn-txt confirm" onClick={handleConfirm}>
            Yes
          </button>
          <button className="btn-txt cancel" onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePrompt;
