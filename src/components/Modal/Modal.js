import React from "react";
import "./Modal.css";

export default function Modal({ modal, close, img }) {
  if (!modal) {
    return null;
  }

  return (
    <div className="modal" onClick={close}>
      <img src={img} className="modal-content" alt="img" />
    </div>
  );
}
