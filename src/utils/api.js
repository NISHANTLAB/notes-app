import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api";

export const registerUser = async (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = async (userData) => axios.post(`${API_URL}/auth/login`, userData);

export const fetchNotes = async (token) =>
  axios.get(`${API_URL}/notes`, { headers: { Authorization: `Bearer ${token}` } });

export const createNote = async (note, token) =>
  axios.post(`${API_URL}/notes`, note, { headers: { Authorization: `Bearer ${token}` } });

export const updateNote = async (id, note, token) =>
  axios.put(`${API_URL}/notes/${id}`, note, { headers: { Authorization: `Bearer ${token}` } });

export const deleteNote = async (id, token) =>
  axios.delete(`${API_URL}/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
