import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { Web5 } from "@tbd54566975/web5";

import useNotes from "./hooks/useNotes";
import Pane from "./components/Pane";
import { Note } from "./types/types";

import { PencilSquareIcon, FireIcon } from "@heroicons/react/24/outline";

const noteSchema = "http://some-schema-registry.org/notes";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
  },
};

function App() {
  const [did, setDid] = useState<string | null>(null);
  const web5Ref = useRef();
  const {
    notes,
    setNotes,
    currentNoteText,
    currentNoteIsPristine,
    isNotesArrayEmpty,
    setCurrentNoteText,
  } = useNotes();
  const [notesAreLoading, setNotesAreLoading] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
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

  /* Web5 Methods */
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

  async function deleteRecord(id) {
    await web5Ref.current.dwn.records.delete({
      message: {
        recordId: id,
      },
    });
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

  const handleDeleteNote = async (id: any) => {
    await deleteRecord(id);
    populateNoteList();
  };

  const handleDeleteAllRecords = async () => {
    closeModal();
    await deleteRecords();
    populateNoteList();
  };

  return (
    <main className="bg-app-gray h-screen">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold m-2 px-2">
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
        <Pane
          notes={notes}
          isLoading={notesAreLoading}
          onDelete={handleDeleteNote}
        />
        {/* <!-- Right Pane --> */}
        <div className=" flex-1 p-4 bg-white">
          {/* <!-- Toolbar Pane - should be menu element --> */}
          <menu className="flex flex-row-reverse justify-between bg-white rounded-sm shadow-sm  p-2 h-12">
            <li className="h-[45px]">
              <button
                title="Save"
                onClick={handleSaveNote}
                disabled={currentNoteIsPristine}
              >
                {currentNoteIsPristine ? (
                  <PencilSquareIcon className="h-6 w-6 text-gray-300" />
                ) : (
                  <PencilSquareIcon className="h-6 w-6 text-app-yellow  hover:text-yellow-600" />
                )}
              </button>
            </li>
            <li>
              <button
                title="DeleteAll"
                disabled={isNotesArrayEmpty}
                onClick={openModal}
              >
                {isNotesArrayEmpty ? (
                  <FireIcon className="h-6 w-6 text-gray-300" />
                ) : (
                  <FireIcon className="h-6 w-6 text-red-600 hover:text-red-900" />
                )}
              </button>
            </li>
          </menu>
          <textarea
            className="w-full p-4 h-[500px]"
            onChange={handleTextChange}
            value={currentNoteText}
            placeholder="Enter your note here..."
          />
        </div>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="text-2xl font-bold text-red-600">
          You sure you want to nuke all your notes?
        </h2>
        <div className="flex justify-center align-middle">
          <img src="/sure-about-that.gif" className="h-[200px] w-auto" />
        </div>
        <div className="flex justify-center mt-2">
          <button
            className="rounded-md border-2 p-2 text-white bg-red-600 hover:bg-red-900"
            onClick={handleDeleteAllRecords}
          >
            Yes, nuke 'em!
          </button>
          <button
            onClick={closeModal}
            className="rounded-md border-2 p-2 bg-white text-blue-800"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </main>
  );
}

export default App;
