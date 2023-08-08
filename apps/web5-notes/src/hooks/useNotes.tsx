import { useState } from 'react';
import { Note } from "../types/types";

export default function useNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [currentNoteText, setCurrentNoteText] = useState<string>('');

    return {notes, setNotes, currentNoteText, setCurrentNoteText};
}