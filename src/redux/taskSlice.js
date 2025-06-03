import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Load from localStorage with fallback
const stored = JSON.parse(localStorage.getItem("taskite")) || {};

// Initial state
const initialState = {
  showPrompt: stored.showPrompt ?? null,
  tasks: stored.tasks || {},
  width: window.innerWidth,
};

// Helper to persist to localStorage
const updateLocalStorage = (state) => {
  localStorage.setItem(
    "taskite",
    JSON.stringify({
      tasks: state.tasks,
    })
  );
};

const taskSlice = createSlice({
  name: "taskite",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const status = action.payload;
      if (!state.tasks[status]) {
        state.tasks[status] = [];
      }
      state.tasks[status].push({
        id: Date.now().toString(),
        content: "New task",
        created: false,
        status,
      });
      updateLocalStorage(state);
    },

    deleteTask: (state, action) => {
      for (const status in state.tasks) {
        state.tasks[status] = state.tasks[status].filter(
          (task) => task.id !== action.payload
        );
      }
      updateLocalStorage(state);
    },

    importTasks: (state, action) => {
      try {
        const imported = JSON.parse(action.payload);
        if (
          typeof imported === "object" &&
          imported !== null &&
          typeof imported.tasks === "object"
        ) {
          state.tasks = imported.tasks;
          updateLocalStorage(state);
          toast.success("Import successful!", {
            className: "success-bg",
          });
        } else {
          toast.error("Invalid taskite structure.", {
            className: "error-bg",
          });
        }
      } catch (error) {
        toast.error(`Failed to import taskite: ${error.message}`, {
          className: "error-bg",
        });
      }
    },

    setShowPrompt: (state, action) => {
      state.showPrompt = action.payload;
      updateLocalStorage(state);
    },

    updateContent: (state, action) => {
      const { task, content } = action.payload;
      const { id, status } = task;
      state.tasks[status] = state.tasks[status].map((task) =>
        task.id === id ? { ...task, content } : task
      );
      updateLocalStorage(state);
    },

    updateCreated: (state, action) => {
      const { id, status } = action.payload;
      state.tasks[status] = state.tasks[status].map((task) =>
        task.id === id ? { ...task, created: true } : task
      );
      updateLocalStorage(state);
    },

    updateStatus: (state, action) => {
      const { task, newStatus } = action.payload;
      const { id } = task;
      const taskToUpdate = Object.values(state.tasks)
        .flat()
        .find((task) => task.id === id);
      const updatedTask = { ...taskToUpdate, status: newStatus };

      for (const status in state.tasks) {
        state.tasks[status] = state.tasks[status].filter(
          (task) => task.id !== id
        );
      }

      if (!state.tasks[newStatus]) {
        state.tasks[newStatus] = [];
      }

      state.tasks[newStatus].push(updatedTask);
      updateLocalStorage(state);
    },

    updateWidth: (state, action) => {
      state.width = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  importTasks,
  setShowPrompt,
  updateContent,
  updateCreated,
  updateStatus,
  updateWidth,
} = taskSlice.actions;

export default taskSlice.reducer;
