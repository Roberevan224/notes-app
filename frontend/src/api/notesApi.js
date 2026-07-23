import axios from 'axios';

const API_BASE_URL = 'https://notes-app-production-6a04.up.railway.app/api';

const notesApi = axios.create({
  baseURL: API_BASE_URL,
});

// Notes endpoints
export const getNotes = () => notesApi.get('/notes');
export const getNoteById = (id) => notesApi.get(`/notes/${id}`);
export const createNote = (note) => notesApi.post('/notes', note);
export const updateNote = (id, note) => notesApi.put(`/notes/${id}`, note);
export const deleteNote = (id) => notesApi.delete(`/notes/${id}`);
export const searchNotes = (query) => notesApi.get('/notes/search', { params: { query } });

// Categories endpoints
export const getCategories = () => notesApi.get('/categories');
export const getCategoryById = (id) => notesApi.get(`/categories/${id}`);
export const createCategory = (category) => notesApi.post('/categories', category);
export const updateCategory = (id, category) => notesApi.put(`/categories/${id}`, category);
export const deleteCategory = (id) => notesApi.delete(`/categories/${id}`);

export default notesApi;
