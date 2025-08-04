/**
 * ImportPrompt.test.jsx
 * Unit tests for the ImportPrompt component.
 *
 * Author: Yumi Takuma
 */

import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { vi } from "vitest";
import ImportPrompt from "../ImportPrompt";
import taskReducer, { setShowPrompt, importTasks } from "../../redux/taskSlice";

// Mock FileReader to simulate file loading
class MockFileReader {
  readAsText = vi.fn(function () {
    this.onload({ target: { result: '{"test":"data"}' } });
  });
}
vi.stubGlobal("FileReader", MockFileReader);

// Mock importTasks action
vi.mock("../../redux/taskSlice", async () => {
  const actual = await vi.importActual("../../redux/taskSlice");
  return {
    ...actual,
    importTasks: vi.fn((json) => ({ type: "mock/importTasks", payload: json })),
    setShowPrompt: actual.setShowPrompt,
  };
});

// Helper to render component with mocked store
const renderWithStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: { taskite: taskReducer },
    preloadedState,
  });

  const dispatchSpy = vi.spyOn(store, "dispatch");

  render(
    <Provider store={store}>
      <ImportPrompt />
    </Provider>,
  );

  return { store, dispatchSpy };
};

describe("ImportPrompt", () => {
  it("shows prompt when showPrompt is 'import'", () => {
    renderWithStore({
      taskite: {
        showPrompt: "import",
        tasks: {
          categoryA: [{ id: 1 }, { id: 2 }],
          categoryB: [{ id: 3 }],
        },
      },
    });

    // Check that confirmation prompt is visible
    expect(screen.getByText(/replace all \(3\) tasks\?/i)).toBeInTheDocument();
  });

  it("hides prompt when showPrompt is not 'import'", () => {
    renderWithStore({ taskite: { showPrompt: null, tasks: {} } });

    const popupBg = screen.getByText(/replace all/i).closest(".popup-bg");
    expect(popupBg).toHaveClass("hide");
  });

  it("dispatches importTasks with file content when a file is selected", async () => {
    renderWithStore({
      taskite: { showPrompt: "import", tasks: {} },
    });

    // Click "Yes" to trigger the hidden input
    fireEvent.click(screen.getByText("Yes"));

    // Grab the hidden file input
    const fileInput = screen.getByTestId("file-input");
    expect(fileInput).toBeInTheDocument();

    // Simulate a file upload
    const file = new File(['{"test":"data"}'], "tasks.json", {
      type: "application/json",
    });

    await waitFor(() =>
      fireEvent.change(fileInput, { target: { files: [file] } }),
    );

    await waitFor(() => {
      expect(importTasks).toHaveBeenCalledWith('{"test":"data"}');
    });
  });

  it("dispatches setShowPrompt(null) when 'No' is clicked", () => {
    const { dispatchSpy } = renderWithStore({
      taskite: { showPrompt: "import", tasks: {} },
    });

    fireEvent.click(screen.getByText("No"));
    expect(dispatchSpy).toHaveBeenCalledWith(setShowPrompt(null));
  });

  it("dispatches setShowPrompt(null) when background is clicked", () => {
    const { dispatchSpy } = renderWithStore({
      taskite: { showPrompt: "import", tasks: {} },
    });

    const background = screen
      .getByText(/replace all/i)
      .closest(".popup")?.parentElement;

    fireEvent.click(background);
    expect(dispatchSpy).toHaveBeenCalledWith(setShowPrompt(null));
  });
});
