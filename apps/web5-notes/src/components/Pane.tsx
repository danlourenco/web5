import PaneItem from "./PaneItem";
import { Note } from "../types/types";

interface PaneProps {
  notes: Note[];
  isLoading: boolean;
}
export default function Pane({ notes, isLoading }: PaneProps) {
  return (
    <div className="bg-gray-200 flex-2 p-4 w-1/3 border-r border-gray-300">
      {!notes.length ? (
        <div className="flex flex-col justify-center text-center h-full">
          {isLoading ? "Loading..." : "No notes yet"}
        </div>
      ) : (
        <ul>
          {" "}
          {notes.map((note: Note) => (
            <li key={note.id} className=" bg-gray-300 h-8 py-2 px-1">
              <div>{note.data}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
