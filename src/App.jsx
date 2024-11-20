import React, { useContext, useEffect, useLayoutEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { authContext } from "./context/authContext";
import Home from "./components/Home/Home";
import { DragDropContext } from "react-beautiful-dnd";
import { noteContext } from "./context/noteContext";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";

const App = () => {
  const authctx = useContext(authContext);
  const notectx = useContext(noteContext);
  const { token } = authctx;
  const { notes, initializeHandler } = notectx;

  useLayoutEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      authctx.login(storedToken);
    }
  }, []);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId == source.droppableId &&
      destination.index === source.index
    )
      return;

    const updatedNotes = Array.from(notes);
    const [movedItem] = updatedNotes.splice(source.index, 1);
    updatedNotes.splice(destination.index, 0, movedItem);

    initializeHandler(updatedNotes);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <Switch>
          {!token && (
            <Route path="/login">
              <Login />
            </Route>
          )}
          {!token && (
            <Route path="/signup">
              <Signup />
            </Route>
          )}
          {!token && (
            <Route path="/forgetpassword">
              <ForgetPassword />
            </Route>
          )}
          {token && (
            <Route exact path="/">
              <Home />
            </Route>
          )}
          <Route path="*">
            {!token && <Signup />}
            {token && <Home />}
          </Route>
        </Switch>
      </div>
    </DragDropContext>
  );
};

export default App;
