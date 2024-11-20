import React from "react";
import "./Modal.css";
import ReactDOM from "react-dom";

const Backdrop = ({ onClose }) => {
  return <div onClick={onClose} className="backdrop" />;
};

const Overlay = (props) => {
  return <div className="overlay">{props.children}</div>;
};

const Modal = (props) => {
  return ReactDOM.createPortal(
    <>
      <Backdrop onClose={props.onClose} />
      <Overlay>{props.children}</Overlay>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
