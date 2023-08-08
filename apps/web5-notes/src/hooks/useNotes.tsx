import { useState } from "react";
import { Note } from "../types/types";

export default function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNoteText, setCurrentNoteText] = useState<string>("");

  const currentNoteIsPristine = currentNoteText === "";
  const isNotesArrayEmpty = notes.length === 0;
  return {
    currentNoteIsPristine,
    currentNoteText,
    isNotesArrayEmpty,
    notes,
    setCurrentNoteText,
    setNotes,
  };
}
