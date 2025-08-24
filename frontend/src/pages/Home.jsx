import { useEffect, useState } from "react";
import { getPosts } from "../api/api";
import { Link } from "react-router-dom";
import { User, Tag, CalendarDays, ArrowRight } from "lucide-react";
import "./Home.css";

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
      <h1>📖 ALL Posts</h1>
      <div className="posts-container">
        
        {posts.length === 0 && <p style={{ textAlign: "center", width: "100%" }}>No posts yet.</p>}
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h2> 📝 {post.title}</h2>
            <p> 👤 By: {post.author?.username || "Unknown"}</p>
            <p> ✍️ {post.content?.substring(0, 100)}...</p>
            <Link to={`/post/${post._id}`} className="read-more">Read More ➡️</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
