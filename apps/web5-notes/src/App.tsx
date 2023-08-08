import { useState, useEffect, useRef } from "react";
import { Web5 } from "@tbd54566975/web5";
import useNotes from "./hooks/useNotes";
import Pane from "./components/Pane";
import { Note } from "./types/types";
import {
  DocumentPlusIcon,
  TrashIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

const noteSchema = "http://some-schema-registry.org/notes";

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
    deleteRecords();
  };
  return (
    <main className="bg-app-gray h-screen">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold m-2">
          <span className="text-app-heading">Web5</span>{" "}
          <span className="text-app-yellow">Notes</span>
        </h1>
        <div
          title={did}
          className="w-[400px] text-app-heading overflow-ellipsis whitespace-nowrap overflow-hidden"
        >
          DID: {did}
        </div>
      </header>
      <section className="flex border">
        <Pane notes={notes} isLoading={notesAreLoading} />
        {/* <!-- Right Pane --> */}
        <div className=" flex-1 p-4 bg-white">
          {/* <!-- Toolbar Pane - should be menu element --> */}
          <menu className="flex flex-row-reverse bg-white rounded-sm shadow-sm h-[64px] p-2 h-12">
            <li className="h-[45px]">
              <button title="Save" onClick={handleSaveNote}>
                <DocumentPlusIcon className="h-6 w-6 text-app-yellow  hover:text-yellow-600" />
              </button>
            </li>
            <li>
              <button title="Delete" onClick={handleDeleteNote}>
                <TrashIcon className="h-6 w-6 text-app-yellow hover:text-yellow-600" />
              </button>
            </li>
            <li>
              <button title="DeleteAll " onClick={handleDeleteAllRecords}>
                <FireIcon className="h-6 w-6 text-red-600 hover:text-red-900" />
              </button>
            </li>
          </menu>
          <textarea
            className="w-full p-4 h-[500px]"
            onChange={handleTextChange}
            value={currentNoteText}
          />
        </div>
      </section>
      {/* <div>
        DID: <div className="w-[400px] overflow-scroll bg-white">{did}</div>
      </div> */}
    </main>
  );
}

export default App;
