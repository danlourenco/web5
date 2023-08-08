import { useState } from "react";
import { Note } from "../types/types";

export default function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNoteText, setCurrentNoteText] = useState<string>("");

  const currentNoteIsPristine = currentNoteText === "";

  return {
    notes,
    setNotes,
    currentNoteIsPristine,
    currentNoteText,
    setCurrentNoteText,
  };
}
