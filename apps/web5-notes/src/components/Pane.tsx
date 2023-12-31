import PaneItem from "./PaneItem";
import { Note } from "../types/types";

interface PaneProps {
  notes: Note[];
  isLoading: boolean;
  onSelection: (id: string) => void;
  onDelete: (id: any) => void;
}
export default function Pane({
  notes,
  isLoading,
  onSelection,
  onDelete,
}: PaneProps) {
  return (
    <div
      className="bg-[#f5f5f7] flex-2 p-4 w-1/3 border-r border-darker-gray"
      data-testid="notes-pane"
    >
      <div className="h-[64px]">
        <input
          type="text"
          value=""
          placeholder="Search (not yet enabled)"
          disabled
          className="rounded-lg bg-[#e2e2e7] p-2 w-full h-12 placeholder:text-[#7e7e85]"
        ></input>
      </div>
      {!notes.length ? (
        <div className="flex flex-col justify-center text-center h-full text-[#7e7e85]">
          {isLoading ? "Loading..." : "No notes yet"}
        </div>
      ) : (
        <ul data-testid="notes-container">
          {notes.map((note: Note) => (
            <PaneItem
              key={note.id}
              note={note}
              onDelete={onDelete}
              onSelection={onSelection}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
