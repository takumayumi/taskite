import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

test("renders footer with copyright and BuyMeACoffee", () => {
  render(<Footer />);
  expect(screen.getByText(/takumayumi/i)).toBeInTheDocument();
  expect(screen.getByAltText(/buy me a hot chocolate/i)).toBeInTheDocument();
});
