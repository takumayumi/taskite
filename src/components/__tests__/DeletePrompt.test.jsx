/**
 * DeletePrompt.test.jsx
 * Tests for the DeletePrompt component.
 *
 * Author: Yumi Takuma
 */

import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import DeletePrompt from "../DeletePrompt";
import reducer from "../../redux/taskSlice";

// Helper to render component with a test Redux store
function renderWithStore(initialState) {
  const store = configureStore({
    reducer: { taskite: reducer },
    preloadedState: initialState,
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <DeletePrompt />
      </Provider>,
    ),
  };
}

// Should show the delete confirmation when showPrompt is "delete"
test('renders DeletePrompt when showPrompt is "delete"', () => {
  renderWithStore({
    taskite: {
      tasks: {},
      showPrompt: "delete",
      selectedTask: null,
      width: 1024,
    },
  });
  expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  expect(screen.getByText(/yes/i)).toBeInTheDocument();
  expect(screen.getByText(/no/i)).toBeInTheDocument();
});

// Clicking "No" should cancel the prompt (sets showPrompt to null)
test('clicking "No" hides the prompt', () => {
  const { store } = renderWithStore({
    taskite: {
      tasks: {},
      showPrompt: "delete",
      selectedTask: null,
      width: 1024,
    },
  });
  fireEvent.click(screen.getByText(/no/i));
  expect(store.getState().taskite.showPrompt).toBe(null);
});
