import React from "react";

export default function Image({ img, close }) {
  return <img className="modal-content" src={img} onClick={close} alt="img" />;
}
