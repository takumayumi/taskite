/**
 * XLSXButton.test.jsx
 * Unit test for the XLSXButton component that exports tasks to an Excel file.
 *
 * Author: Yumi Takuma
 */

import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { vi } from "vitest";
import XLSXButton from "../XLSXButton";
import taskReducer from "../../redux/taskSlice";

// Mock the xlsx module to avoid actual file writing
vi.mock("xlsx", () => ({
  writeFile: vi.fn(),
  utils: {
    book_new: () => ({}),
    aoa_to_sheet: () => ({}),
    book_append_sheet: () => {},
  },
}));

import * as XLSX from "xlsx";

// Utility function to render XLSXButton with a preloaded Redux store
const renderWithStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: { taskite: taskReducer },
    preloadedState: {
      taskite: {
        tasks: {
          Backlog: [
            { id: "1", content: "Task 1", created: 1234567890 },
            { id: "2", content: "Task 2", created: 1234567891 },
          ],
        },
        showPrompt: null,
        ...preloadedState.taskite,
      },
    },
  });

  render(
    <Provider store={store}>
      <XLSXButton />
    </Provider>,
  );

  return { store };
};

describe("XLSXButton", () => {
  it("calls XLSX.writeFile when clicked", () => {
    renderWithStore();

    const button = screen.getByRole("button", { name: /export to excel/i });
    fireEvent.click(button);

    expect(XLSX.writeFile).toHaveBeenCalledTimes(1);
  });
});
