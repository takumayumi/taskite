/**
 * ImportButton.test.jsx
 * Unit test for the ImportButton component.
 *
 * Author: Yumi Takuma
 */

import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import ImportButton from "../ImportButton";
import taskReducer, { setShowPrompt } from "../../redux/taskSlice";

describe("ImportButton", () => {
  it("dispatches setShowPrompt with 'import' when clicked", () => {
    // Set up a Redux store with the task reducer
    const store = configureStore({
      reducer: {
        task: taskReducer,
      },
    });

    // Spy on the store's dispatch function
    const dispatchSpy = vi.spyOn(store, "dispatch");

    // Render the ImportButton component wrapped in the Redux provider
    render(
      <Provider store={store}>
        <ImportButton />
      </Provider>,
    );

    // Find the button and simulate a click
    const button = screen.getByRole("button", { name: /restore from backup/i });
    fireEvent.click(button);

    // Expect the correct action to be dispatched
    expect(dispatchSpy).toHaveBeenCalledWith(setShowPrompt("import"));
  });
});
