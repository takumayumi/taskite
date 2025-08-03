import { render, screen, fireEvent } from "@testing-library/react";
import Title from "../Title";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import taskReducer, { setShowPrompt } from "../../redux/taskSlice";
import { vi } from "vitest";

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

    // Safer match
    fireEvent.click(screen.getByRole("button", { name: /taskite/i }));

    expect(dispatchSpy).toHaveBeenCalledWith(setShowPrompt("info"));
  });

  it("renders the title visually", () => {
    renderWithStore();

    expect(
      screen.getByRole("heading", { name: /taskite/i }),
    ).toBeInTheDocument();

    expect(screen.getAllByText("taskite")).toHaveLength(2);
  });
});
