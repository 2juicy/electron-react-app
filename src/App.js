import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        let data = await fetch("https://reddit.com/r/oddlysatisfying.json");
        let res = await data.json();
        setPosts(res.data.children);
      } catch (err) {
        console.log("Failed to fetch or no posts found");
      }
    })();
  }, []);

  return (
    <div className="App">
      <h1>Reddit Posts</h1>
      {posts.map(post => (
        <div className="flex-container" key={post.data.id}>
          {post.data.thumbnail_height && (
            <img
              className="thumbnail"
              src={post.data.thumbnail}
              alt="thumbnail"
            />
          )}
          <h4>{post.data.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default App;
