import { json } from "react-router-dom";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
  const host="http://localhost:5000"
const notesstart=[]
    const [notes, setnotes] = useState(notesstart)




    const fetchNote=async()=>{

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify(),
      }); 
      // return response.json(); 
  
      const json = await response.json();
      setnotes(json)
    }



    const Addnote=async(title,descreption,tag)=>{
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":  localStorage.getItem('token')
        },
        body: JSON.stringify({title,descreption,tag}),
       
      });


    const note=  await response.json();
      setnotes(notes.concat(note))
    }



    const deletNote= async(id)=>{

      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":  localStorage.getItem('token')
        },
        body: JSON.stringify(),
      });
      // return response.json(); 
  
      const json = await response.json();
      console.log(json)
    
      const newNote=notes.filter((note)=>{return note._id!==id})
      setnotes(newNote)
    }


    const editNote = async (id, title, descreption, tag) => {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, descreption, tag }),
      });
      let newNotes=JSON.parse(JSON.stringify(notes))
      for (let index = 0; index < newNotes.length; index++) {
        const element = notes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].descreption = descreption;
          newNotes[index].tag = tag;
          break;
        }
      }
      setnotes(newNotes)
    };
    

return (
    <NoteContext.Provider value={{notes,Addnote,deletNote,fetchNote,editNote}}>
                {props.children}
    </NoteContext.Provider>
)

}

export default NoteState;