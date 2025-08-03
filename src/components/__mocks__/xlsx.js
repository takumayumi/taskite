import { vi } from "vitest";

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
