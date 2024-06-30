import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPrompt: false,
  task: null,
  tasks: JSON.parse(localStorage.getItem("tasks")) || {},
  wWidth: window.innerWidth,
};

const taskSlice = createSlice({
  name: "task",
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

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;

      for (const status in state.tasks) {
        state.tasks[status] = state.tasks[status].filter(
          (task) => task.id !== id
        );
      }

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setShowPrompt: (state, action) => {
      const show = action.payload;

      state.showPrompt = show;
    },
    toggleTask: (state, action) => {
      state.task = action.payload;
    },
    updateContent: (state, action) => {
      const { task, content } = action.payload;
      const { id, status } = task;

      state.tasks[status] = state.tasks[status].map((task) =>
        task.id === id ? { ...task, content } : task
      );

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateCreated: (state, action) => {
      const { id, status } = action.payload;

      state.tasks[status] = state.tasks[status].map((task) =>
        task.id === id ? { ...task, created: true } : task
      );

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
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
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateWWidth: (state, action) => {
      state.wWidth = action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  setShowPrompt,
  toggleTask,
  updateContent,
  updateCreated,
  updateStatus,
  updateWWidth,
} = taskSlice.actions;
export default taskSlice.reducer;
