/**
 * Title.test.jsx
 * Unit tests for the Title component which displays the app name and opens an info modal on click.
 *
 * Author: Yumi Takuma
 */

import { render, screen, fireEvent } from "@testing-library/react";
import Title from "../Title";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import taskReducer, { setShowPrompt } from "../../redux/taskSlice";
import { vi } from "vitest";

// Utility to render Title with Redux store and spy on dispatch
const renderWithStore = () => {
  const store = configureStore({
    reducer: { taskite: taskReducer },
  });

  const dispatchSpy = vi.spyOn(store, "dispatch");

  render(
    <Provider store={store}>
      <Title />
    </Provider>,
  );

  return { dispatchSpy };
};

describe("Title", () => {
  it("dispatches setShowPrompt('info') when clicked", () => {
    const { dispatchSpy } = renderWithStore();

    // Click the button labeled with the app title
    fireEvent.click(screen.getByRole("button", { name: /taskite/i }));

    expect(dispatchSpy).toHaveBeenCalledWith(setShowPrompt("info"));
  });

  it("renders the title visually", () => {
    renderWithStore();

    // Check that the heading appears
    expect(
      screen.getByRole("heading", { name: /taskite/i }),
    ).toBeInTheDocument();

    // Expect both the visible heading and hidden accessible label
    expect(screen.getAllByText("taskite")).toHaveLength(2);
  });
});
