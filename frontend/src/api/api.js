import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const signup = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/signup`, userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, userData);
  return res.data;
};

export const getPosts = async () => {
  const res = await axios.get(`${BASE_URL}/posts`);
  return res.data;
};

export const getPost = async (id) => {
  const res = await axios.get(`${BASE_URL}/posts/${id}`);
  return res.data;
};

export const createPost = async (postData, token) => {
  const res = await axios.post(`${BASE_URL}/posts`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updatePost = async (id, postData, token) => {
  const res = await axios.put(`${BASE_URL}/posts/${id}`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deletePost = async (id, token) => {
  const res = await axios.delete(`${BASE_URL}/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
