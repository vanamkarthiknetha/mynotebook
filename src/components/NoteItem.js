import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const {showAlert}=props;

  const { deleteNote } = useContext(NoteContext);
  const { note, updateNote } = props;

  return (
    <div className="col-md-3 my-3">
      <div className="card ">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-3"
              onClick={() => {
                deleteNote(note._id);
                showAlert("Deleted successfully!", "success");
              }}
            />
            <i
              className="fa-solid fa-pen-to-square "
              onClick={() => {
                updateNote(note);
              }}
            />
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
