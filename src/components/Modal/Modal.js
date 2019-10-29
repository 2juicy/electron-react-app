import React from "react";
import "./Modal.css";

export default function Modal({ modal, close, img, title }) {
  if (!modal) {
    return null;
  }

  return (
    <div className="modal" onClick={close}>
      <img src={img} className="modal-img" alt="img" />
      <h4>{title}</h4>
    </div>
  );
}
