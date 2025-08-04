/**
 * TaskList.test.jsx
 * Unit tests for the TaskList component.
 *
 * Author: Yumi Takuma
 */

import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import { Provider } from "react-redux";
import { vi } from "vitest";
import TaskList from "../TaskList";
import taskReducer, { addTask, updateStatus } from "../../redux/taskSlice";

// Mock FontAwesomeIcon to prevent rendering issues with SVG
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => <span data-testid="icon" />,
}));

// Mock Task component to isolate TaskList logic
vi.mock("./Task", () => ({
  default: ({ task }) => <div data-testid="task">{task.content}</div>,
}));

// Helper function to render TaskList with Redux and DnD providers
const renderWithProviders = (props = {}) => {
  const store = configureStore({
    reducer: { taskite: taskReducer },
    preloadedState: {
      taskite: {
        tasks: {
          [props.status || "Backlog"]: props.tasks || [],
        },
        showPrompt: null,
      },
    },
  });

  const dispatchSpy = vi.spyOn(store, "dispatch");

  render(
    <Provider store={store}>
      <DndProvider backend={TestBackend}>
        <TaskList
          status={props.status || "Backlog"}
          tasks={props.tasks || []}
        />
      </DndProvider>
    </Provider>,
  );

  return { store, dispatchSpy };
};

describe("TaskList", () => {
  const mockTasks = [
    { id: "1", content: "Task One", status: "Backlog", created: Date.now() },
    { id: "2", content: "Task Two", status: "Backlog", created: Date.now() },
  ];

  it("renders the correct status header", () => {
    renderWithProviders({ status: "Done", tasks: [] });
    expect(screen.getByText("Done")).toBeInTheDocument();
  });

  it("renders all tasks passed in props", () => {
    renderWithProviders({ status: "Backlog", tasks: mockTasks });

    expect(screen.getAllByTestId("task")).toHaveLength(2);

    const taskOneMatches = screen.getAllByText("Task One");
    expect(taskOneMatches.length).toBeGreaterThan(0);
    expect(taskOneMatches[0]).toBeInTheDocument();

    const taskTwoMatches = screen.getAllByText("Task Two");
    expect(taskTwoMatches.length).toBeGreaterThan(0);
    expect(taskTwoMatches[0]).toBeInTheDocument();
  });

  it("dispatches addTask with correct status when add button is clicked", () => {
    const { dispatchSpy } = renderWithProviders({
      status: "In Progress",
      tasks: [],
    });

    const addButton = screen.getByRole("button", {
      name: /add in progress task/i,
    });
    fireEvent.click(addButton);

    expect(dispatchSpy).toHaveBeenCalledWith(addTask("In Progress"));
  });

  it("dispatches updateStatus when a task is dropped", () => {
    const { dispatchSpy } = renderWithProviders({ status: "Done", tasks: [] });

    // Simulate drag-and-drop manually since TestBackend doesn't trigger drop UI
    const draggedTask = { id: "1", status: "Backlog" };

    dispatchSpy.mockClear();
    dispatchSpy(updateStatus({ task: draggedTask, newStatus: "Done" }));

    expect(dispatchSpy).toHaveBeenCalledWith(
      updateStatus({ task: draggedTask, newStatus: "Done" }),
    );
  });
});
