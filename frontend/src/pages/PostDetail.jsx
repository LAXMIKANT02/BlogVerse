import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost, deletePost } from "../api/api";

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setPost(data);
        setForm({ 
          title: data.title, 
          content: data.content, 
          tags: data.tags.join(", ") 
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
      await updatePost(id, { ...form, tags: form.tags.split(",").map(t => t.trim()) }, token);
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

  const isAuthor = token && post.author._id === JSON.parse(atob(token.split(".")[1])).id;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {editMode ? (
        <div>
          <input name="title" value={form.title} onChange={handleChange} />
          <textarea name="content" value={form.content} onChange={handleChange} />
          <input name="tags" value={form.tags} onChange={handleChange} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Author: {post.author.username}</p>
          <p>Tags: {post.tags.join(", ")}</p>
          {isAuthor && (
            <>
              <button onClick={() => setEditMode(true)}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default PostDetail;
