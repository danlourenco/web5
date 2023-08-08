import PaneItem from "./PaneItem";
import { Note } from "../types/types";

interface PaneProps {
  notes: Note[];
  isLoading: boolean;
  onDelete: any;
}
export default function Pane({ notes, isLoading, onDelete }: PaneProps) {
  return (
    <div className="bg-[#f5f5f7] flex-2 p-4 w-1/3 border-r border-darker-gray">
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
        <ul>
          {notes.map((note: Note) => (
            <PaneItem note={note} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
