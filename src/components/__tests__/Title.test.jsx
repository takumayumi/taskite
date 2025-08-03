import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../../redux/taskSlice";
import XLSXButton from "../XLSXButton";
import { vi } from "vitest";

// Mock xlsx
vi.mock("xlsx", () => ({
  writeFile: vi.fn(),
  utils: {
    book_new: () => ({}),
    aoa_to_sheet: () => ({}),
    book_append_sheet: () => {},
  },
}));

import * as XLSX from "xlsx";

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
