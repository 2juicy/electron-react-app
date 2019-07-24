import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const { ipcRenderer } = window.require("electron");

export default function Video() {
  const [video, setVideo] = useState();

  useEffect(() => {
    ipcRenderer.on("video", (event, arg) => {
      setVideo(parse(arg));
    });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      }}
    >
      {video}
    </div>
  );
}
