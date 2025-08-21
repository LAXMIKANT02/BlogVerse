import { useEffect, useState } from "react";
import { getPosts } from "../api/api";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>BlogVerse</h1>
      <Link to="/create">+ Create New Post</Link>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <div key={post._id} style={{ margin: "20px 0" }}>
          <h2>{post.title}</h2>
          <p>By: {post.author?.username || "Unknown"}</p>
          <Link to={`/post/${post._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
