import React, { useContext, useState } from "react";
import "./AddNote.css";
import { noteContext } from "../../context/noteContext";

const AddNote = (props) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    topic: "",
    desc: "",
  });
  const notectx = useContext(noteContext);
  const { addNoteHandler } = notectx;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // send notes to the backend
  async function sendNote() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://messenger-add37-default-rtdb.firebaseio.com/notes.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Failed to send note");
      }
      const result = await response.json();
      const obj = {
        ...input,
        id: result.name,
      };
      addNoteHandler(obj);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <p>{error}</p>;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    sendNote();
    setInput({
      topic: "",
      desc: "",
    });
  };
  return (
    <form onSubmit={submitHandler} className="addNote">
      <h1>Add Notes here</h1>
      <div className="addNote__inputs">
        <div className="addNote__topic">
          <label htmlFor="topic">Topic</label>
          <input
            type="text"
            name="topic"
            id="topic"
            value={input.topic}
            onChange={changeHandler}
          />
        </div>
        <div className="addNote__desc">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            name="desc"
            id="desc"
            value={input.desc}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="addNote__button">
        <button type="submit">{loading ? "Please wait" : "Add"}</button>
        <button type="button" onClick={props.onClose}>
          Close
        </button>
      </div>
    </form>
  );
};

export default AddNote;
