import classNames from "classnames";

const Prompt = ({ setShowPrompt, setTaskId, setTasks, showPrompt, taskId }) => {
  const onDelete = () => {
    if (taskId) {
      setTasks((prevTasks) => {
        const newTasks = { ...prevTasks };

        Object.keys(newTasks).forEach((status) => {
          newTasks[status] = newTasks[status].filter(
            (task) => task.id !== taskId
          );
        });

        return newTasks;
      });

      setTaskId(null);
    }
  };

  const handleConfirm = () => {
    onDelete();
    setShowPrompt(false);
  };

  const handleCancel = () => {
    setShowPrompt(false);
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

export default Prompt;
