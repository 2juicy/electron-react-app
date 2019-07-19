import React from "react";
import "./Thumbnail.css";

export default function Thumbnail({ thumbnail }) {
  return <img src={thumbnail} alt="thumbnail" />;
}
