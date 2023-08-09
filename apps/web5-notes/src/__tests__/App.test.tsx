import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "../App";
// Tests
describe("App", () => {
  it("renders the title", () => {
    render(<App />);
    const title = screen.getByRole("heading", {
      name: "Web5 Notes",
    });
    expect(title).toBeInTheDocument();
  });
});
