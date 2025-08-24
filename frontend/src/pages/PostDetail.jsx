import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost, deletePost } from "../api/api";
import "./PostDetail.css";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const [error, setError] = useState("");
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const token = localStorage.getItem("token");

  const images = [
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1",
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1493244040629-496f6d136cc3",
    "https://images.unsplash.com/photo-1522199710521-72d69614c702",
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
        setForm({
          title: data.title,
          content: data.content,
          tags: data.tags.join(", "),
        });

        // Mock likes & comments (replace with API integration later)
        setLikes(data.likes || 0);
        setComments(data.comments || []);
      } catch (err) {
        setError("Failed to load post");
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updatePost(
        id,
        { ...form, tags: form.tags.split(",").map((t) => t.trim()) },
        token
      );
      setEditMode(false);
      const updatedPost = await getPost(id);
      setPost(updatedPost);
    } catch (err) {
      setError(err.response?.data?.error || "Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(id, token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Delete failed");
    }
  };

  // ❤️ Like handler
  const handleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    // 🔗 Later connect to backend API
  };

  // 💬 Add comment
  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: Date.now(),
      text: commentInput,
      user: "You", // replace with logged-in user
    };
    setComments([...comments, newComment]);
    setCommentInput("");
    // 🔗 Later send comment to backend
  };

  // 🔗 Share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Post link copied to clipboard!");
  };

  if (!post) return <p>Loading...</p>;

  const isAuthor =
    token && post.author._id === JSON.parse(atob(token.split(".")[1])).id;

  return (
    <div
      className="post-detail-container"
      style={{
        backgroundImage: `url(${post.coverImage || randomImage})`,
      }}
    >
      {error && <p className="error">{error}</p>}

      {editMode ? (
        <div className="edit-form">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Content"
          />
          <input
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
          />
          <button className="save-btn" onClick={handleUpdate}>
            💾 Save
          </button>
          <button className="cancel-btn" onClick={() => setEditMode(false)}>
            ❌ Cancel
          </button>
        </div>
      ) : (
        <div className="post-content">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p className="author">👤 Author: {post.author.username}</p>
          <p className="tags">🏷️ Tags: {post.tags.join(", ")}</p>

          
          <div className="extra-features">
            <button onClick={handleLike} className="like-btn">
              {liked ? "❤️ Liked" : "🤍 Like"} ({likes})
            </button>

            <button onClick={handleShare} className="share-btn">
              🔗 Share
            </button>
          </div>

          <div className="comments-section">
            <h3>💬 Comments</h3>
            <div className="comments-list">
              {comments.length === 0 ? (
                <p>No comments yet</p>
              ) : (
                comments.map((c) => (
                  <p key={c.id}>
                    <strong>{c.user}:</strong> {c.text}
                  </p>
                ))
              )}
            </div>
            <div className="comment-input">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={handleAddComment}>➕ Add</button>
            </div>
          </div>

          {isAuthor && (
            <div className="actions">
              <button className="edit-btn" onClick={() => setEditMode(true)}>
                ✏️ Edit
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostDetail;
