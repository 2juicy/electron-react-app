import React, { useState, useEffect } from "react";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export default function Image() {
  const [image, setImage] = useState();

  useEffect(() => {
    ipcRenderer.on("image", (event, arg) => {
      setImage(arg);
    });
  }, []);

  return <img src={image} alt="img" style={{ width: "100%" }} />;
}
