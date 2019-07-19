import React from "react";
import "./Thumbnail.css";

export default function Thumbnail({ thumbnail }) {
  return <img className="thumbnail" src={thumbnail} alt="thumbnail" />;
}
