import React from "react";
import "./Modal.css";
import Image from "../Image/Image";

export default function Modal({ modal, close, img }) {
  if (!modal) {
    return null;
  }
  return (
    <div className="modal" onClick={close}>
      <Image img={img} close={close} />
    </div>
  );
}
