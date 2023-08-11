import { useEffect, useState, useRef } from "react";
import { Web5 } from "@tbd54566975/web5";
import { Note } from "../types/types";

const noteSchema = "http://some-schema-registry.org/notes";

export default function useNotes() {
  const web5Ref = useRef();
  const [did, setDid] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<Note[]>([]);
  const [notesAreLoading, setNotesAreLoading] = useState<boolean>(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  function processNotes(records): Promise<Note[]> {
    return Promise.all(
      records.map(async (record) => ({
        data: await record.data.text(),
        id: record.id,
        record,
      }))
    );
  }

  // TODO: update to use useCallback to clean up populateNoteList() calls
  async function populateNoteList() {
    if (!web5Ref.current) return;
    setNotesAreLoading(true);
    // @ts-ignore
    const recordQueryResponse = await web5Ref.current.dwn.records.query({
      message: {
        filter: {
          schema: noteSchema,
        },
        dateSort: "createdAscending",
      },
    });
    const notes = await processNotes(recordQueryResponse.records);
    setNotes(notes);
    setNotesAreLoading(false);
  }

  // TODO: update naming to align with existing fn names (createRecord)
  async function saveNote(noteText: string) {
    if (!web5Ref.current) return;
    // @ts-ignore
    await web5Ref.current.dwn.records.create({
      data: noteText,
      message: {
        schema: noteSchema,
        dataFormat: "text/plain",
      },
    });

    populateNoteList();
  }

  async function updateRecord(recordId: string, data: string) {
    if (!web5Ref.current) return;
    // @ts-ignore
    const { record } = await web5Ref.current.dwn.records.read({
      message: {
        recordId,
      },
    });
    await record.update({ data });

    populateNoteList();
  }

  async function readRecord(recordId: string) {
    if (!web5Ref.current) return;
    // @ts-ignore
    const { record } = await web5Ref.current.dwn.records.read({
      message: {
        recordId,
      },
    });
    return record;
  }

  async function deleteRecord(id: string) {
    // @ts-ignore
    await web5Ref.current.dwn.records.delete({
      message: {
        recordId: id,
      },
    });

    populateNoteList();
  }

  async function deleteRecords() {
    if (!web5Ref.current) return;
    // @ts-ignore
    const { records } = await web5Ref.current.dwn.records.query({
      message: {
        filter: {
          schema: noteSchema,
        },
      },
    });
    for (let record of records) {
      await record.delete();
    }

    populateNoteList();
  }

  useEffect(() => {
    async function initWeb5() {
      const { web5, did } = await Web5.connect();
      setDid(did);
      // @ts-ignore
      web5Ref.current = web5;
    }
    initWeb5().then(() => {
      populateNoteList();
    });
  }, []);

  return {
    updateRecord,
    readRecord,
    deleteRecord,
    deleteRecords,
    did,
    notes,
    notesAreLoading,
    saveNote,
    setNotes,
    selectedNoteId,
    setSelectedNoteId,
  };
}
