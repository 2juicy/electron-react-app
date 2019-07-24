import React, { useEffect, useState } from "react";
import Post from "./components/Post/Post";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function() {
      let data = await fetch(
        "https://reddit.com/r/aww.json?limit=50&raw_json=1"
      );
      let res = await data.json();
      setPosts(res.data.children);
    })().catch(err => console.error(err));
  }, []);

  return (
    <div className="App">
      <h1>Reddit Posts</h1>
      <Post posts={posts} />
    </div>
  );
}
