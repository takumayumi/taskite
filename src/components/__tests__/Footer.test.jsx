/**
 * Footer.test.jsx
 * Tests for the Footer component.
 *
 * Author: Yumi Takuma
 */

import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

test("renders footer with copyright and BuyMeACoffee", () => {
  // Render the Footer component
  render(<Footer />);

  // Check for author's name
  expect(screen.getByText(/takumayumi/i)).toBeInTheDocument();

  // Check for Buy Me a Hot Chocolate image (alt text)
  expect(screen.getByAltText(/buy me a hot chocolate/i)).toBeInTheDocument();
});
