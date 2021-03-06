import React from "react";
import Thumbnail from "../Thumbnail/Thumbnail";

const { ipcRenderer } = window.require("electron");

export default function Post({ posts, showModal }) {
  const showImage = data => {
    if (data.thumbnail !== "self") {
      if (data.media_embed.content) {
        ipcRenderer.send("toggle-video", data.media_embed.content);
      } else if (data.preview.reddit_video_preview) {
        window.open(data.preview.reddit_video_preview.fallback_url);
      } else if (data.preview.images) {
        showModal(data.preview.images[0].source.url, data.title);
      } else if (data.url) {
        showModal(data.url, data.title);
      }
    } else {
      window.open(`https://reddit.com${data.permalink}`);
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
