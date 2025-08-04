/**
 * taskSlice.test.js
 * Unit tests for taskSlice reducer actions.
 * Verifies task state logic: CRUD, status updates, and localStorage sync.
 *
 * Author: Yumi Takuma
 */

import reducer, {
  addTask,
  deleteTask,
  importTasks,
  setSelectedTask,
  setShowPrompt,
  updateContent,
  updateCreated,
  updateStatus,
  updateWidth,
} from "../taskSlice";

// Mock localStorage for state persistence
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(global, "localStorage", { value: localStorageMock });

// Mock toast notifications to avoid actual popups during test
vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("taskSlice reducer", () => {
  const initialState = {
    selectedTask: null,
    showPrompt: null,
    tasks: {},
    width: 1024,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test("addTask adds a task to the given status", () => {
    const state = reducer(initialState, addTask("Backlog"));
    expect(state.tasks.Backlog.length).toBe(1);
    expect(state.tasks.Backlog[0].content).toBe("New task");
  });

  test("deleteTask removes the selected task", () => {
    const task = { id: "1", content: "Sample", status: "Backlog" };
    const stateWithTask = {
      ...initialState,
      selectedTask: task,
      tasks: { Backlog: [task] },
    };
    const state = reducer(stateWithTask, deleteTask());
    expect(state.tasks.Backlog).toHaveLength(0);
  });

  test("importTasks sets tasks if valid structure", () => {
    const validJson = JSON.stringify({
      tasks: { Backlog: [{ id: "1", content: "Valid" }] },
    });
    const state = reducer(initialState, importTasks(validJson));
    expect(state.tasks.Backlog[0].content).toBe("Valid");
  });

  test("setSelectedTask updates selectedTask", () => {
    const task = { id: "123", content: "Select me" };
    const state = reducer(initialState, setSelectedTask(task));
    expect(state.selectedTask).toEqual(task);
  });

  test("setShowPrompt updates showPrompt", () => {
    const state = reducer(initialState, setShowPrompt(true));
    expect(state.showPrompt).toBe(true);
  });

  test("updateContent updates task content", () => {
    const task = { id: "1", status: "Backlog" };
    const stateWithTask = {
      ...initialState,
      tasks: {
        Backlog: [{ id: "1", content: "Old" }],
      },
    };
    const state = reducer(
      stateWithTask,
      updateContent({ task, content: "New" }),
    );
    expect(state.tasks.Backlog[0].content).toBe("New");
  });

  test("updateCreated updates created timestamp", () => {
    const id = "1";
    const stateWithTask = {
      ...initialState,
      tasks: {
        Done: [{ id, content: "Test", created: "yesterday" }],
      },
    };
    const state = reducer(stateWithTask, updateCreated({ id, status: "Done" }));
    expect(state.tasks.Done[0].created).not.toBe("yesterday");
  });

  test("updateStatus moves task to new status", () => {
    const task = { id: "1", status: "Backlog" };
    const stateWithTask = {
      ...initialState,
      tasks: {
        Backlog: [task],
      },
    };
    const state = reducer(
      stateWithTask,
      updateStatus({ task, newStatus: "Done" }),
    );
    expect(state.tasks.Backlog).toHaveLength(0);
    expect(state.tasks.Done[0].id).toBe("1");
  });

  test("updateWidth sets screen width", () => {
    const state = reducer(initialState, updateWidth(1440));
    expect(state.width).toBe(1440);
  });
});
