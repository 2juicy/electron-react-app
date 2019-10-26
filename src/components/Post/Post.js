import React from "react";
import Thumbnail from "../Thumbnail/Thumbnail";

const { ipcRenderer } = window.require("electron");

export default function Post({ posts, showModal }) {
  const showImage = data => {
    if (data.media_embed.content) {
      ipcRenderer.send("toggle-video", data.media_embed.content);
    } else if (data.preview.reddit_video_preview) {
      window.open(data.preview.reddit_video_preview.fallback_url);
    } else if (data.preview.images) {
      showModal(data.preview.images[0].source.url);
    } else if (data.url) {
      showModal(data.url);
    }
  };

  return (
    <>
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
    </>
  );
}
