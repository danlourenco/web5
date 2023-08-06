import useWeb5 from "./hooks/useWeb5";
import { useState } from 'react';

const mockNotes = [
  {
    id: 1,
    text: 'Note 1'
  },
  {
    id: 2,
    text: 'Note 2'
  },
  {
    id: 3,
    text: 'Dear Diary'
  },
]
function Pane({ notes = mockNotes }) {

  const noteItems = notes.map(note =>
    <li key={note.id} className=" bg-gray-300 h-8 py-2 px-1">{note.text}</li>);
  return (
    <div className="bg-gray-200 flex-2 p-4 w-1/3 border-r border-gray-300">
      <ul>
        {noteItems}
      </ul>
    </div>
  )
}
function App() {
  const { web5, did } = useWeb5();
  const [noteText, setNoteText] = useState('');
  const handleTextChange = (e) => setNoteText(e.target.value);
  const handleSaveNote = () => console.log('note saved!');
  const handleDeleteNote = () => console.log('note deleted!!');

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold text-center m-2">
        Web 5 Notes
      </h1>
      <section className="flex h-[500px]">
        <Pane />
        {/* <!-- Right Pane --> */}
        <div className="bg-blue-100 flex-1 p-4">
          {/* <!-- Toolbar Pane - should be menu element --> */}
          <menu className="flex flex-row-reverse">
            <li><button title="New Note" className="bg-white rounded-sm m-2 p-2 h-8 w-8" onClick={handleSaveNote}>📄</button></li>
            <li><button title="Delete Note" className="bg-white rounded-sm m-2 h-8 w-8 p-2" onClick={handleDeleteNote}>🗑️</button></li>
          </menu>
          <textarea className="w-full border-gray-700 border-2 rounded-md p-4" onChange={handleTextChange} value={noteText} />
        </div>
      </section>
    </main>
  )
}

export default App
