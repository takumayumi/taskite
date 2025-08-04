/**
 * store.js
 * Configures the Redux store.
 * Registers the task reducer under the "taskite" namespace.
 *
 * Author: Yumi Takuma
 */

import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

export const store = configureStore({
  reducer: {
    taskite: taskReducer,
  },
});
