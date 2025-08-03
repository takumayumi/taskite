import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import DeletePrompt from "../DeletePrompt";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../../redux/taskSlice";

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
