import { Note } from "../types/types";

interface PaneItemProps {
  note: Note;
}
export default function PaneItem({ note }: PaneItemProps) {
  console.log(note.id);
  return (
    <li key={note.id} className=" bg-gray-300 h-8 py-2 px-1">
      <div>{note.data}</div>
    </li>
  );
}
