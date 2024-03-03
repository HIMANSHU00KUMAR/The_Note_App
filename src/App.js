import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import ContentArea from './components/ContentArea';
import Note from './components/Note';
import axios from 'axios';
import { BASE_URL } from './utilis';


const apiUrl=`${BASE_URL}/api/notes`;



function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []); // Run once on component mount


  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${apiUrl}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  // const addNote = (newNote) => {
  //   try {
  //     setNotes(prevNotes => [...prevNotes, newNote]);
  //   } catch (error) {
  //     console.error('Failed to add note:', error);
  //   }
  // };

  const addNote = async (newNote) => {
    try {
      const response = await axios.post(`${apiUrl}`, newNote);
      setNotes(prevNotes => [...prevNotes, response.data]);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };


  // const deleteNote = (id) => {
  //   try {
  //     setNotes(prevNotes => prevNotes.filter((note, index) => index !== id));
  //   } catch (error) {
  //     console.error('Failed to delete note:', error);
  //   }
  // };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };
  


  const updateNote = async (id, newtitle, newcontent) => {
    try {
      await axios.put(`${apiUrl}/${id}`, { title: newtitle, content: newcontent });
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title: newtitle, content: newcontent };
        }
        return note;
      });
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };


  // const updateNote = (id, newtitle, newcontent) => {
  //   // console.log(id);

  //   const updatedNote = notes.map((note, index) => {
  //     // console.log(index);
  //     if (index === id) {
  //       // console.log(note);
  //       return { ...note, title: newtitle, content: newcontent };
  //     }
  //     return note;
  //   })
  //   setNotes(updatedNote);

  // }


  // console.log(notes);

  return (
    <div>
      <Header />
      <ContentArea onAdd={addNote} />
      {notes.map((note) => (
        <Note
          key={note._id}
          id={note._id}
          title={note.title}
          content={note.content}
          onDelete={deleteNote}
          onUpdate={updateNote}
        />
      ))}
      
    </div>
  );
}

export default App;
