import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function() {
      let response = await fetch("https://reddit.com/r/oddlysatisfying.json");
      let json = await response.json();
      setPosts(json.data.children);
    })();
  }, []);

  console.log(posts);

  return (
    <div className="App">
      {posts.map(post => (
        <div className="flex-container" key={post.data.id}>
          {post.data.thumbnail_height && post.data.thumbnail_width ? (
            <img
              className="thumbnail"
              src={post.data.thumbnail}
              alt="thumbnail"
            />
          ) : null}
          <h4>{post.data.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default App;
