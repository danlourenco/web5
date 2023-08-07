import PaneItem from "./PaneItem";
import { Note } from "../types/types";

interface PaneProps {
  notes: Note[];
}
export default function Pane({ notes }: PaneProps) {
  const noteItems = notes.map((note: Note) => <PaneItem note={note} />);

  return (
    <div className="bg-gray-200 flex-2 p-4 w-1/3 border-r border-gray-300">
      {!notes.length
        ? <div className="flex flex-col justify-center text-center h-full">No notes yet</div>
        : (<ul> {noteItems} </ul>
        )}
    </div>
  )
}