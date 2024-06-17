import React from "react";

const TaskPrompt = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center pointer-events-auto">
      <span className="absolute z-0 bg-black bg-opacity-50 w-full h-full" />
      <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg">
        <p>{message}</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-red-500 text-white rounded-lg"
            onClick={onConfirm}
            type="button"
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPrompt;
