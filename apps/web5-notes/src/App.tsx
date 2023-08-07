import { useState, useEffect } from 'react';
import useWeb5 from "./hooks/useWeb5";
import Pane from "./components/Pane";

function App() {
  const { web5, did } = useWeb5();
  const [noteText, setNoteText] = useState('');
  // const notesArray = [];
  const [notes, updateNotes] = useState([]);

  const initialize = async (web5) => {
    if (!web5) return;
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          schema: 'http://some-schema-registry.org/notes'
        },
        dateSort: 'createdAscending'
      }
    });

    updateNotes(
      response.records
    );
    console.log(notes);

    // response.records.forEach(record => {
    //   // notesArray.push(record)
    //   updateNotes( record => [])
    // })
  }

  useEffect(() => {
    initialize(web5);
    console.log('useEffect called')
  }, [])

  const saveNote = async (noteData, web5Instance, destinationArray) => {
    const { record } = await web5Instance.dwn.records.create({
      data: noteData,
      message: {
        schema: 'http://some-schema-registry.org/notes',
        dataFormat: 'text/plain'
      }
    });

    const data = await record.data.text();
    const note = { record, data, id: record.id };
    destinationArray.push(note);
    console.log(note)
  }
  const handleTextChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => setNoteText(value);
  const handleSaveNote = async () => {
    await saveNote(noteText, web5, notes);
  }
  const handleDeleteNote = () => console.log('note deleted!!');

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold text-center m-2">
        Web 5 Notes
      </h1>
      <section className="flex h-[500px]">
        <Pane notes={notes} />
        {/* <!-- Right Pane --> */}
        <div className="bg-blue-100 flex-1 p-4">
          {/* <!-- Toolbar Pane - should be menu element --> */}
          <menu className="flex flex-row-reverse bg-white rounded-sm shadow-sm">
            <li><button title="Save " className="bg-blue-300 rounded-sm" onClick={handleSaveNote}>Save</button></li>
            <li><button title="Delete " className="bg-red-200 rounded-sm" onClick={handleDeleteNote}>Delete</button></li>
          </menu>
          <textarea className="w-full border-gray-700 border-2 rounded-md p-4" onChange={handleTextChange} value={noteText} />
        </div>
      </section>
    </main>
  )
}

export default App;
