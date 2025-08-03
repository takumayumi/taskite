import { render, screen, fireEvent } from "@testing-library/react";
import ImportButton from "../ImportButton";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import taskReducer, { setShowPrompt } from "../../redux/taskSlice";

describe("ImportButton", () => {
  it("dispatches setShowPrompt with 'import' when clicked", () => {
    const store = configureStore({
      reducer: {
        task: taskReducer,
      },
    });

    // Spy on the dispatch function
    const dispatchSpy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <ImportButton />
      </Provider>,
    );

    const button = screen.getByRole("button", { name: /restore from backup/i });
    fireEvent.click(button);

    expect(dispatchSpy).toHaveBeenCalledWith(setShowPrompt("import"));
  });
});
