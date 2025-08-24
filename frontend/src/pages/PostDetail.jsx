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

  const token = localStorage.getItem("token");

  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
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
