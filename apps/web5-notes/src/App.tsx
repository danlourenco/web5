import { useState } from "react";
import Modal from "react-modal";

import useNotes from "./hooks/useNotes";
import Pane from "./components/Pane";
import Header from "./components/Header";

import { PencilSquareIcon, FireIcon } from "@heroicons/react/24/outline";

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
  const {
    notes,
    saveNote,
    notesAreLoading,
    deleteRecord,
    deleteRecords,
    updateRecord,
    readRecord,
    selectedNoteId,
    setSelectedNoteId,
  } = useNotes();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentNoteText, setCurrentNoteText] = useState<string>("");

  const currentNoteIsPristine = currentNoteText === "";
  const isNotesArrayEmpty = notes.length === 0;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleTextChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLTextAreaElement>) => setCurrentNoteText(value);

  const handleSaveNote = async () => {
    if (selectedNoteId) {
      await updateRecord(selectedNoteId, currentNoteText);
    } else {
      await saveNote(currentNoteText);
    }
    setCurrentNoteText("");
    setSelectedNoteId(null);
  };

  const handleNoteSelection = async (id: string) => {
    const record = await readRecord(id);
    const noteText = await record.data.text();
    setSelectedNoteId(record.id);
    setCurrentNoteText(noteText);
  };

  const handleDeleteNote = async (id: any) => {
    await deleteRecord(id);
    if (selectedNoteId === id) {
      setCurrentNoteText("");
      setSelectedNoteId(null);
    }
  };

  const handleDeleteAllRecords = async () => {
    closeModal();

    await deleteRecords();
    setSelectedNoteId(null);
    setCurrentNoteText("");
  };

  return (
    <main className="bg-app-gray h-screen">
      <Header />
      <section className="flex border">
        <Pane
          notes={notes}
          isLoading={notesAreLoading}
          onDelete={handleDeleteNote}
          onSelection={handleNoteSelection}
        />
        {/* <!-- Right Pane --> */}
        <div className=" flex-1 p-4 bg-white">
          <menu className="flex flex-row-reverse justify-between bg-white rounded-sm shadow-sm  p-2 h-12">
            <li className="h-[45px]">
              <button
                name="Save"
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
          </menu>

          <textarea
            autoFocus
            className="w-full p-4 h-[500px] resize-none"
            onChange={handleTextChange}
            value={currentNoteText}
            placeholder="Enter your note here..."
            data-testid="note-text"
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
      <div className="p-4">
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
      </div>
    </main>
  );
}

export default App;
