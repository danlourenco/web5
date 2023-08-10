import { TrashIcon } from "@heroicons/react/24/outline";
import { Note } from "../types/types";
interface PaneItemProps {
  note: Note;
  selected?: boolean;
  onDelete: (id: string) => void;
}
export default function PaneItem({ note, selected, onDelete }: PaneItemProps) {
  return (
    <li
      className={`h-[100px] py-4 px-8 bg-white border-b border-darker-gray ${
        selected ? "bg-yellow-400" : ""
      } hover:bg-gray-400 hover:cursor-pointer flex flex-row`}
    >
      <div
        className="text-[17px] font-semibold font-sans w-4/5"
        data-testid="note-text"
      >
        {note.data}
      </div>
      <div className="w-1/5 flex justify-end">
        <button className="self-baseline" onClick={() => onDelete(note.id)}>
          <TrashIcon className="h-6 w-6 text-yellow-300  hover:text-yellow-400" />
        </button>
      </div>
    </li>
  );
}
