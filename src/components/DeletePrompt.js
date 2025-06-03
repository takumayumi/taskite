import { useSelector, useDispatch } from "react-redux";
import { setShowPrompt } from "../redux/taskSlice";
import classNames from "classnames";

const DeletePrompt = () => {
  const dispatch = useDispatch();
  const showPrompt = useSelector((state) => state.taskite.showPrompt);

  const handleConfirm = () => {
    dispatch(setShowPrompt(null));
  };

  const handleCancel = () => {
    dispatch(setShowPrompt(null));
  };

  return (
    <div
      className={classNames(
        "popup-bg",
        showPrompt === "delete" ? "show" : "hide"
      )}
      onClick={handleCancel}
    >
      <div
        className={classNames(
          "popup",
          showPrompt === "delete" ? "show" : "hide"
        )}
      >
        <p>Are you sure you want to delete this task?</p>
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
  );
};

export default DeletePrompt;
