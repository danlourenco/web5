import { useState, useEffect, useRef } from "react";
import { Web5 } from "@tbd54566975/web5";
import useNotes from "./hooks/useNotes";
import Pane from "./components/Pane";
import { Note } from "./types/types";
import { DocumentPlusIcon, TrashIcon } from "@heroicons/react/24/solid";

const noteSchema = "http://some-schema-registry.org/notes";

const notesArray = [];
function App() {
  const [did, setDid] = useState<string | null>(null);
  const web5Ref = useRef();
  const { notes, setNotes, currentNoteText, setCurrentNoteText } = useNotes();
  const [notesAreLoading, setNotesAreLoading] = useState<boolean>(false);

  function processNotes(records): Note[] {
    return Promise.all(
      records.map(async (record) => ({
        data: await record.data.text(),
        id: record.id,
        record,
      }))
    );
  }

  async function populateNoteList() {
    if (!web5Ref.current) return;
    setNotesAreLoading(true);
    const recordQueryResponse = await web5Ref.current.dwn.records.query({
      message: {
        filter: {
          schema: noteSchema,
        },
        dateSort: "createdAscending",
      },
    });
    console.log({ recordQueryResponse });
    setNotesAreLoading(false);
    const notes = await processNotes(recordQueryResponse.records);
    setNotes(notes);
  }

  async function saveNote(noteText: string) {
    if (!web5Ref.current) return;

    await web5Ref.current.dwn.records.create({
      data: noteText,
      message: {
        schema: noteSchema,
        dataFormat: "text/plain",
      },
    });
  }

  async function deleteRecords() {
    if (!web5Ref.current) return;
    console.log("is this reachable");
    const { records } = await web5Ref.current.dwn.records.query({
      message: {
        filter: {
          schema: noteSchema,
        },
      },
    });
    console.log({ records });
    for (let record of records) {
      console.log("deleting ", record);
      await record.delete();
    }
  }

  useEffect(() => {
    async function initWeb5() {
      const { web5, did } = await Web5.connect();
      setDid(did);
      // use this web5Ref to make calls
      web5Ref.current = web5;
    }
    initWeb5().then(() => {
      populateNoteList();
    });
  }, []);

  const handleTextChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentNoteText(value);

  const handleSaveNote = async () => {
    await saveNote(currentNoteText);
    setCurrentNoteText("");
    populateNoteList();
  };

  const handleDeleteNote = () => console.log("note deleted!!");
  const handleDeleteAllRecords = () => {
    console.log("gonna delete all records");
    deleteRecords();
  };
  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold text-center m-2">Web 5 Notes</h1>
      <section className="flex h-[500px] border border-gray-800">
        <Pane notes={notes} isLoading={notesAreLoading} />
        {/* <!-- Right Pane --> */}
        <div className=" flex-1 p-4">
          {/* <!-- Toolbar Pane - should be menu element --> */}
          <menu className="flex flex-row-reverse bg-white rounded-sm shadow-sm">
            <li>
              <button title="Save" onClick={handleSaveNote}>
                <DocumentPlusIcon className="h-6 w-6 text-gray-400  hover:text-gray-800" />
              </button>
            </li>
            <li>
              <button title="Delete" onClick={handleDeleteNote}>
                <TrashIcon className="h-6 w-6 text-gray-400  hover:text-red-600" />
              </button>
            </li>
            <li>
              <button title="DeleteAll " onClick={handleDeleteAllRecords}>
                Delete All
              </button>
            </li>
          </menu>
          <textarea
            className="w-full border-gray-700 border-2 rounded-md p-4"
            onChange={handleTextChange}
            value={currentNoteText}
          />
          <div>
            DID: <div className="w-[400px] overflow-scroll bg-white">{did}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
