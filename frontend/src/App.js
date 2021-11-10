import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';



function App() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState();

  const [noteList, setNotesList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/notes").then((response) => {
            setNotesList(response.data);
          });
  },[])
  

  const addNote = () => {
    axios.post("http://localhost:4000/create", {
      title: title,
      description: description
    }).then((response) => {
      setNotesList(response.data);
    });
    //console.log(response.data)
  };


  const deleteNote = (id) => {
    axios.delete(`http://localhost:4000/delete/${id}`).then((response) => {
      setNotesList(
        noteList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };


  return (
    <div className="App">
      <div className="Information">
      <label>Title:</label>
      <input type="text" onChange={(event) => {
        setTitle(event.target.value);
      }}/>
      <label>Description:</label>
      <input type="text" onChange={(event) => {
        setDescription(event.target.value);
      }}/>
       <button onClick={addNote}>Add</button>
       {noteList.map((val, key) =>{
        return <div className="Note">
        <div>
          <h3>ID: {val.id}</h3>
          <h3>Title: {val.title}</h3>
          <h3>Description: {val.description}</h3>
        </div>
        <div>
          <button onClick={() => deleteNote(val.id)}>
            Delete
          </button>
        </div>
      </div>
    })}
    </div>
    </div>
  );
}

export default App;
  