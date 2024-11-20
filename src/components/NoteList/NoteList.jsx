import React, { useContext, useEffect } from "react";
import "./NoteList.css";
import { noteContext } from "../../context/noteContext";
import useFetch from "../../hooks/useFetch";
import Note from "../Note/Note";
import { Droppable } from "react-beautiful-dnd";

const NoteList = () => {
  const notectx = useContext(noteContext);
  const { error, data, loading } = useFetch(
    "https://messenger-add37-default-rtdb.firebaseio.com/notes.json"
  );
  const { notes } = notectx;
  const { initializeHandler } = notectx;

  if (error) {
    return <p>{error}</p>;
  }

  useEffect(() => {
    if (data) {
      const noteList = [];
      for (let val in data) {
        const notes = data[val];
        const obj = {
          ...notes,
          id: val,
        };
        noteList.push(obj);
      }
      initializeHandler(noteList);
    }
  }, [data]);

  return (
    <Droppable droppableId="NoteList">
      {(provided) => {
        return (
          <div
            className="noteList"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h3>Recent Notes...</h3>
            {loading && <h4>loading please wait</h4>}
            <ul>
              {notes &&
                notes.map((item, index) => (
                  <Note index={index} key={item.id} {...item} />
                ))}
            </ul>
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default NoteList;
