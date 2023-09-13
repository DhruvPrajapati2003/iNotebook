import React from "react";
import Notes from "./Notes";
import noteContext from "../context/notes/noteContext";
import { useContext, useState } from "react";
const Addnote = () => {
  const context = useContext(noteContext);
  const { Addnote } = context;
  const [note, setnote] = useState({ title: "", descreption: "", tag: "" });
  const onclick = (e) => {
    e.preventDefault();
    Addnote(note.title, note.descreption, note.tag);
    setnote({ title: "", descreption: "", tag: "" });
    alert("Note Add Successfully");
  };
  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h2 className="my-3">Add Notes</h2>

      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            name="title"
            value={note.title}
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descreption" className="form-label">
            descreption
          </label>
          <input
            type="text"
            className="form-control"
            id="descreption"
            name="descreption"
            value={note.descreption}
            onChange={onchange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control" 
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onchange}
            minLength={5}
            required
          />
        </div>

        <button
          disabled={note.title.length < 5 || note.descreption.length < 5}
          type="submit"
          className="btn btn-primary"
          onClick={onclick}
        >
          Add Note
        </button>
      </form>

      <Notes />
    </>
  );
};

export default Addnote;
