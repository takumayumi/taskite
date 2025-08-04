/**
 * taskSlice.ts
 * Redux slice for managing task state.
 * Handles task CRUD operations, localStorage sync, modal states, and responsive width tracking.
 *
 * Author: Yumi Takuma
 */

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Load state from localStorage or use fallback defaults
const stored = JSON.parse(localStorage.getItem("taskite")) || {};

const initialState = {
  selectedTask: null,
  showPrompt: stored.showPrompt ?? null,
  tasks: stored.tasks || {},
  width: window.innerWidth,
};

// Save task state to localStorage (excluding transient UI state)
const updateLocalStorage = (state) => {
  localStorage.setItem(
    "taskite",
    JSON.stringify({
      tasks: state.tasks,
    }),
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
        created: new Date().toString(),
        status,
      });
      updateLocalStorage(state);
    },

    deleteTask: (state) => {
      for (const status in state.tasks) {
        state.tasks[status] = state.tasks[status].filter(
          (task) => task.id !== state.selectedTask.id,
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

    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload;
    },

    setShowPrompt: (state, action) => {
      state.showPrompt = action.payload;
      updateLocalStorage(state);
    },

    updateContent: (state, action) => {
      const { task, content } = action.payload;
      const { id, status } = task;

      // Update task content only if it has changed
      state.tasks[status] = state.tasks[status].map((task) => {
        if (task.id === id) {
          if (task.content !== content) {
            return {
              ...task,
              content,
              updated: new Date().toString(),
            };
          }
        }
        return task;
      });

      updateLocalStorage(state);
    },

    updateCreated: (state, action) => {
      const { id, status } = action.payload;
      state.tasks[status] = state.tasks[status].map((task) =>
        task.id === id ? { ...task, created: new Date().toString() } : task,
      );
      updateLocalStorage(state);
    },

    updateStatus: (state, action) => {
      const { task, newStatus } = action.payload;
      const { id } = task;

      // Find and remove the task from its current status list
      const taskToUpdate = Object.values(state.tasks)
        .flat()
        .find((task) => task.id === id);
      const updatedTask = { ...taskToUpdate, status: newStatus };

      for (const status in state.tasks) {
        state.tasks[status] = state.tasks[status].filter(
          (task) => task.id !== id,
        );
      }

      // Add task to new status column
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
  setSelectedTask,
  setShowPrompt,
  updateContent,
  updateCreated,
  updateStatus,
  updateWidth,
} = taskSlice.actions;

export default taskSlice.reducer;
