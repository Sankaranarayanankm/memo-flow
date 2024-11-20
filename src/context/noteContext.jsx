import React, { createContext, useReducer } from "react";

export const noteContext = createContext({
  notes: [],
  editedNote: {},
  addNoteHandler: (note) => {},
  editNoteHandler: () => {},
  deleteNoteHandler: () => {},
  initializeHandler: () => {},
  updateNotes: () => {},
});
const reducer = (state, action) => {
  if (action.type == "ADD") {
    const updated = [...state.notes, action.payload];
    return {
      ...state,
      notes: updated,
    };
  } else if (action.type === "INITIAL") {
    return {
      ...state,
      notes: [...action.payload],
    };
  } else if (action.type == "DELETE") {
    const updated = state.notes.filter((item) => item.id !== action.payload);
    return {
      ...state,
      notes: updated,
    };
  } else if (action.type == "EDIT") {
    const edited = state.notes.find((item) => item.id == action.payload);
    const updated = state.notes.filter((item) => item.id != action.payload);
    return {
      ...state,
      notes: updated,
      editedNote: edited,
    };
  }
};

export default function NoteContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, { notes: [], editedNote: {} });

  const addNoteHandler = (note) => {
    dispatch({ type: "ADD", payload: note });
  };
  const editNoteHandler = (id) => {
    dispatch({ type: "EDIT", payload: id });
  };
  const deleteNoteHandler = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const initializeHandler = (notes) => {
    dispatch({ type: "INITIAL", payload: notes });
  };

  const defaultValue = {
    notes: state.notes,
    editedNote: state.editedNote,
    addNoteHandler,
    editNoteHandler,
    deleteNoteHandler,
    initializeHandler,
  };
  return (
    <noteContext.Provider value={defaultValue}>
      {props.children}
    </noteContext.Provider>
  );
}
