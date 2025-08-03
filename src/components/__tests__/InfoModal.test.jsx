import { render, screen, fireEvent } from "@testing-library/react";
import InfoModal from "../InfoModal";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import taskReducer, { setShowPrompt } from "../../redux/taskSlice";
import { vi } from "vitest";

const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: { taskite: taskReducer },
    preloadedState,
  });

  const dispatchSpy = vi.spyOn(store, "dispatch");

  render(
    <Provider store={store}>
      <InfoModal />
    </Provider>,
  );

  return { store, dispatchSpy };
};

describe("InfoModal", () => {
  it("renders modal when showPrompt is 'info'", () => {
    renderWithStore({
      taskite: { showPrompt: "info", tasks: {} },
    });

    expect(
      screen.getByText(/what you can do with taskite\?/i),
    ).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });

  it("does not render modal when showPrompt is not 'info'", () => {
    renderWithStore({
      taskite: { showPrompt: null, tasks: {} },
    });

    expect(
      screen.queryByText(/what you can do with taskite\?/i),
    ).not.toBeInTheDocument();
  });

  it("dispatches setShowPrompt(null) when clicking OK", () => {
    const { dispatchSpy } = renderWithStore({
      taskite: { showPrompt: "info", tasks: {} },
    });

    fireEvent.click(screen.getByText("OK"));
    expect(dispatchSpy).toHaveBeenCalledWith(setShowPrompt(null));
  });

  it("dispatches setShowPrompt(null) when clicking background", () => {
    const { dispatchSpy } = renderWithStore({
      taskite: { showPrompt: "info", tasks: {} },
    });

    const background = screen
      .getByText(/what you can do with taskite/i)
      .closest(".popup")?.parentElement;

    fireEvent.click(background);
    expect(dispatchSpy).toHaveBeenCalledWith(setShowPrompt(null));
  });
});
