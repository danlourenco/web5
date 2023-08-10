import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Pane from "../components/Pane";

const mockNotes = [
  {
    data: "Note 1",
    id: "abcd",
    record: {
      isDeleted: false,
      author: "authorDid",
      target: "target",
    },
  },
  {
    data: "Note 2",
    id: "efgh",
    record: {
      isDeleted: false,
      author: "authorDid",
      target: "target",
    },
  },
];

describe("Pane", () => {
  it("renders the correct number of PaneItems based on `notes` prop array length", async () => {
    const mockCallback = vi.fn();
    render(
      <Pane
        notes={mockNotes}
        isLoading={false}
        onSelection={mockCallback}
        onDelete={mockCallback}
      />
    );
    const numberOfPaneItems = await screen.findAllByRole("listitem");
    expect(numberOfPaneItems).toHaveLength(2);
  });
});
