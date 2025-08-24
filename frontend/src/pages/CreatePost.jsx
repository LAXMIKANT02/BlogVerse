import { useState } from "react";
import { createPost } from "../api/api";
import { useNavigate } from "react-router-dom";
import "./CreatePost.css";

function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", tags: "", coverImage: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a post");
      return;
    }
    try {
      await createPost(
        { ...form, tags: form.tags.split(",").map((t) => t.trim()) },
        token
      );
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create post");
    }
  };

  return (
    <div className="create-container">
      <h2>Create Post</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={handleChange}
          rows="6"
          required
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
        />
        
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePost;
