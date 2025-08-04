/**
 * xlsx.js
 * Vitest mock setup for the 'xlsx' library used in XLSXButton tests.
 *
 * Author: Yumi Takuma
 */

import { vi } from "vitest";

// Mocking the 'xlsx' module to isolate component tests from actual file generation logic.
vi.mock("xlsx", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    utils: {
      aoa_to_sheet: vi.fn(() => ({ mockedSheet: true })),
      book_new: vi.fn(() => ({ Sheets: {}, SheetNames: [] })),
      book_append_sheet: vi.fn(),
    },
    writeFile: vi.fn(),
  };
});
