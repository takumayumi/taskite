import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import ExportButton from "../ExportButton";
import { configureStore } from "@reduxjs/toolkit";

global.URL.createObjectURL = vi.fn(() => "blob:fake");
global.URL.revokeObjectURL = vi.fn();

test("renders ExportButton and triggers download", () => {
  const store = configureStore({
    reducer: { taskite: () => ({ tasks: {}, width: 1000 }) },
  });
  render(
    <Provider store={store}>
      <ExportButton />
    </Provider>,
  );

  const button = screen.getByText(/save as backup/i);
  expect(button).toBeInTheDocument();

  // Spy on createElement
  const clickSpy = vi.fn();
  document.createElement = vi.fn(() => ({
    click: clickSpy,
    setAttribute: vi.fn(),
  }));

  fireEvent.click(button);

  expect(URL.createObjectURL).toHaveBeenCalled();
  expect(clickSpy).toHaveBeenCalled();
});
