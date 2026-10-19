import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [note, setnote] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/notes").then((res) => {
      setnote(res.data.note1);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function handlesumbit(e) {
    e.preventDefault();
    const { title, discription } = e.target.elements;
    console.log(title.value, discription.value);

    axios
      .post("http://localhost:3000/notes", {
        title: title.value,
        discription: discription.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handledeleteNote(noteId) {
    axios.delete("http://localhost:3000/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }

  function updateNote(noteId) {
    axios
      .patch("http://localhost:3000/notes/" + noteId, {
        discription: "Note update",
      })
      .then((res) => {
        console.log(res.data.Message);
        fetchNotes();
      });
  }

  return (
    <>
      <form className="note-create-from" onSubmit={handlesumbit}>
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="discription" type="text" placeholder="Enter Discription" />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {note.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.discription}</p>

              <button
                onClick={() => {
                  handledeleteNote(note._id);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  updateNote(note._id);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
