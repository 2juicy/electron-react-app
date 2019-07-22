import React, { useEffect, useState } from "react";
import Thumbnail from "./components/Thumbnail/Thumbnail";
import "./App.css";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function() {
      let data = await fetch(
        "https://reddit.com/r/oddlysatisfying.json?limit=50&raw_json=1"
      );
      let res = await data.json();
      setPosts(res.data.children);
    })().catch(err => console.error(err));
  }, []);

  const showImage = data => {
    if (data.media_embed.content) {
      ipcRenderer.send("toggle-video", data.media_embed.content);
    } else if (data.preview.reddit_video_preview) {
      window.open(data.preview.reddit_video_preview.fallback_url);
    } else if (data.preview.images) {
      ipcRenderer.send("toggle-image", data.preview.images[0].source.url);
    } else if (data.url) {
      ipcRenderer.send("toggle-image", data.url);
    }
  };

  return (
    <div className="App">
      <h1>Reddit Posts</h1>
      {posts.map(post => (
        <div
          className="flex-container"
          key={post.data.id}
          onClick={() => showImage(post.data)}
        >
          {post.data.thumbnail.substr(0, 4) === "http" ? (
            <div className="thumbnail">
              <Thumbnail thumbnail={post.data.thumbnail} />
            </div>
          ) : null}
          <h4>{post.data.title}</h4>
        </div>
      ))}
    </div>
  );
}
