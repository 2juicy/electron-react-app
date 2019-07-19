import React from "react";
import parse from "html-react-parser";
import "./Thumbnail.css";

export default function Thumbnail({ thumbnail, embed }) {
  console.log(embed);
  return embed ? parse(embed) : <img src={thumbnail} alt="thumbnail" />;
}
