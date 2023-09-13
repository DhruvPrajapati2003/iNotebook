import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Notesitem from "./Notesitem";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const [showPopup, setShowPopup] = useState(false);
  const [note, setnote] = useState({ etitle: "", edescreption: "", etag: "" });

  const { notes, fetchNote, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNote();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setnote({
      _id:currentNote._id,
      etitle: currentNote.title,
      edescreption: currentNote.descreption,
      etag: currentNote.tag,
    });

    setShowPopup(true);
  };

  const modelShowClick = () => {
    setShowPopup(!showPopup);
  };

  // const closeModal = () => {
  //   setShowPopup(false);
  // };

  const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    editNote(note._id, note.etitle, note.edescreption, note.etag);
    setShowPopup(!showPopup);
  };
  return (
    <>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={modelShowClick}
          style={{ display: "none" }}
        >
          Launch demo modal
        </button>
        {showPopup && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                width: "30%",
                position: "relative",
              }}
            >
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={modelShowClick}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h2 className="my-3">Update Notes</h2>
              <form className="my-3" onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    aria-describedby="emailHelp"
                    name="etitle"
                    minLength={5}
                    onChange={onchange}
                    value={note.etitle}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="descreption" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="descreption"
                    name="edescreption"
                    minLength={5}
                    onChange={onchange}
                    value={note.edescreption}
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
                    name="etag"
                    minLength={5}
                    onChange={onchange}
                    value={note.etag}
                    required
                  />
                </div>
                <button
                  disabled={
                    note.etitle.length < 5 || note.edescreption.length < 5
                  }
                  type="submit"
                  className="btn btn-primary"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">{notes.length === 0 && "no note here"}</div>
        {Array.isArray(notes)
          ? notes.map((note) => {
              return (
                <Notesitem key={note._id} note={note} updateNote={updateNote} />
              );
            })
          : null}
      </div>
    </>
  );
};

export default Notes;
