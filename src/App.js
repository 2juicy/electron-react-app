import React, { useEffect, useState } from "react";
import Post from "./components/Post/Post";
import Modal from "./components/Modal/Modal";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  function showModal(img, title) {
    setModal(true);
    setModalContent([img, title]);
  }

  useEffect(() => {
    (async function() {
      let data = await fetch(
        "https://reddit.com/r/aww.json?limit=50&raw_json=1"
      );
      let res = await data.json();
      setPosts(res.data.children);
    })().catch(err => console.error(err));
  }, []);

  console.log(posts);

  return (
    <div className="App">
      <h1>Reddit Posts</h1>
      <Post posts={posts} showModal={showModal} />
      <Modal
        modal={modal}
        img={modalContent[0]}
        title={modalContent[1]}
        close={() => setModal(false)}
      />
    </div>
  );
}
