import { useSelector, useDispatch } from "react-redux";
import { deleteTask, setShowPrompt, toggleTask } from "../redux/taskSlice";
import classNames from "classnames";

const DeletePrompt = () => {
  const dispatch = useDispatch();
  const showPrompt = useSelector((state) => state.tasks.showPrompt);
  const task = useSelector((state) => state.tasks.task);

  const handleConfirm = () => {
    dispatch(deleteTask(task));
    dispatch(setShowPrompt(false));
    dispatch(toggleTask(null));
  };

  const handleCancel = () => {
    dispatch(setShowPrompt(false));
    dispatch(toggleTask(null));
  };

  return (
    <div
      className={classNames(
        "fixed top-0 left-0 h-full w-full transition-opacity bg-black/80 duration-200 ease-linear",
        showPrompt
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
      onClick={handleCancel}
    >
      <div
        className={classNames(
          "fixed z-10 w-auto bg-yellow-1 rounded-lg p-10 transition-transform duration-200 ease-linear top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 flex flex-col gap-10",
          showPrompt ? "scale-100" : "scale-0"
        )}
      >
        <p>Are you sure you want to delete this task?</p>
        <div className="flex items-center gap-5 justify-end">
          <button className="btn-txt bg-green-2" onClick={handleConfirm}>
            Yes
          </button>
          <button className="btn-txt bg-orange-2" onClick={handleCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePrompt;
