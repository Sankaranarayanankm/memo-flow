import React, { useContext, useState } from "react";
import "./Note.css";
import { noteContext } from "../../context/noteContext";
import { Draggable } from "react-beautiful-dnd";
const Note = ({ id, topic, desc, index }) => {
  const notectx = useContext(noteContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { deleteNoteHandler } = notectx;

  async function deleteNoteRequest() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://messenger-add37-default-rtdb.firebaseio.com/notes/${id}.json`,
        { method: "DELETE", headers: { "Content-Type": "application/json" } }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Failed to delete note");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  if (error) {
    return <p>{error}</p>;
  }

  const deleteHandler = (id) => {
    deleteNoteHandler(id);
    deleteNoteRequest();
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <div
            className="note"
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <h4>{topic}</h4>
            <p>{desc}</p>
            <button onClick={() => deleteHandler(id)}>
              {loading ? "Deleting" : "Delete"}
            </button>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Note;
