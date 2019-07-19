import React, { useEffect, useState } from "react";
import Thumbnail from "./components/Thumbnail/Thumbnail";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        let data = await fetch(
          "https://reddit.com/r/oddlysatisfying.json?raw_json=1"
        );
        let res = await data.json();
        setPosts(res.data.children);
      } catch (err) {
        console.log("Failed to fetch or no posts found");
      }
    })();
  }, []);

  console.log(posts);

  return (
    <div className="App">
      <h1>Reddit Posts</h1>
      {posts.map(post => (
        <div className="flex-container" key={post.data.id}>
          {post.data.thumbnail_height && (
            <div className="thumbnail">
              <Thumbnail
                thumbnail={post.data.thumbnail}
                embed={post.data.media_embed.content}
              />
            </div>
          )}
          <h4>{post.data.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default App;
