/**
 * ExportButton.test.jsx
 * Tests for the ExportButton component.
 *
 * Author: Yumi Takuma
 */

import { configureStore } from "@reduxjs/toolkit";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import ExportButton from "../ExportButton";

// Mocking browser APIs used in the component
global.URL.createObjectURL = vi.fn(() => "blob:fake");
global.URL.revokeObjectURL = vi.fn();

test("renders ExportButton and triggers download", () => {
  // Create a simple mock store
  const store = configureStore({
    reducer: { taskite: () => ({ tasks: {}, width: 1000 }) },
  });

  render(
    <Provider store={store}>
      <ExportButton />
    </Provider>,
  );

  // Check that the export button is shown
  const button = screen.getByText(/save as backup/i);
  expect(button).toBeInTheDocument();

  // Spy on document.createElement to simulate anchor click
  const clickSpy = vi.fn();
  document.createElement = vi.fn(() => ({
    click: clickSpy,
    setAttribute: vi.fn(),
  }));

  // Simulate click on export button
  fireEvent.click(button);

  // Verify that download logic was triggered
  expect(URL.createObjectURL).toHaveBeenCalled();
  expect(clickSpy).toHaveBeenCalled();
});
