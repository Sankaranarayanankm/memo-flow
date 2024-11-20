import React, { useState } from "react";
import "./Home.css";
import AddNote from "../AddNote/AddNote";
import NoteList from "../NoteList/NoteList";
import Modal from "../../Modal/Modal";

const Home = () => {
  const [show, setShow] = useState(false);
  const showHandler = () => setShow(true);
  const hideHandler = () => setShow(false);
  return (
    <div className="home">
      <button onClick={showHandler} className="home__addnote">
        Add note
      </button>
      {show && (
        <Modal onClose={hideHandler}>
          <AddNote onClose={hideHandler} />
        </Modal>
      )}
      <NoteList />
    </div>
  );
};

export default Home;
