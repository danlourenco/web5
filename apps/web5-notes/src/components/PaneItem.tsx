import { Note } from "../types/types";

interface PaneItemProps {
  note: Note;
  selected?: boolean;
}
export default function PaneItem({ note, selected }: PaneItemProps) {
  return (
    <li
      key={note.id}
      className={`h-[100px] py-4 px-8 bg-white border-b border-darker-gray ${
        selected ? "bg-yellow-400" : ""
      } hover:bg-gray-400 hover:cursor-pointer`}
    >
      <div className="text-[17px] font-semibold font-sans">{note.data}</div>
    </li>
  );
}
