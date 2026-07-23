import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';
import Auth from './components/Auth';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import CategoryModal from './components/CategoryModal';
import {
  getNotes,
  getCategories,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
  createCategory,
} from './api/notesApi';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [appLoading, setAppLoading] = useState(true);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        loadData();
      }
    });
    return unsubscribe;
  }, []);

  const loadData = async () => {
    try {
      setAppLoading(true);
      const [notesRes, categoriesRes] = await Promise.all([
        getNotes(),
        getCategories(),
      ]);
      setNotes(notesRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setAppLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setNotes([]);
      setCategories([]);
      setSelectedNote(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setIsEditing(true);
  };

  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setIsEditing(true);
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (selectedNote) {
        // Update existing note
        const response = await updateNote(selectedNote._id, noteData);
        setNotes(notes.map((n) => (n._id === selectedNote._id ? response.data : n)));
      } else {
        // Create new note
        const response = await createNote(noteData);
        setNotes([response.data, ...notes]);
      }
      setIsEditing(false);
      setSelectedNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        setNotes(notes.filter((n) => n._id !== id));
        setSelectedNote(null);
        setIsEditing(false);
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleSearch = async (query) => {
    try {
      const response = await searchNotes(query);
      setNotes(response.data);
    } catch (error) {
      console.error('Error searching notes:', error);
    }
  };

  const handleClearSearch = () => {
    loadData();
  };

  const handleAddCategory = async (categoryData) => {
    try {
      const response = await createCategory(categoryData);
      setCategories([...categories, response.data]);
      setShowCategoryModal(false);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === null) {
      loadData();
    } else {
      const filtered = notes.filter(
        (note) => note.category?._id === categoryId
      );
      setNotes(filtered);
    }
  };

  const getFilteredNotes = () => {
    if (selectedCategory === null) {
      return notes;
    }
    return notes.filter((note) => note.category?._id === selectedCategory);
  };

  // Show loading screen while checking authentication
  if (loading) {
    return <div className="app loading">Loading...</div>;
  }

  // Show login/signup if not authenticated
  if (!user) {
    return <Auth onAuthSuccess={() => {}} />;
  }

  // Show app if authenticated
  if (appLoading) {
    return <div className="app loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Notes App</h1>
        <div className="header-actions">
          <span className="user-email">{user.email}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="app-container">
        <aside className="sidebar">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            onAddCategory={() => setShowCategoryModal(true)}
          />
        </aside>

        <main className="main-content">
          <div className="notes-section">
            <div className="notes-header">
              <SearchBar
                onSearch={handleSearch}
                onClear={handleClearSearch}
              />
              <button className="new-note-btn" onClick={handleNewNote}>
                + New Note
              </button>
            </div>

            {isEditing ? (
              <div className="editor-section">
                <NoteEditor
                  note={selectedNote}
                  categories={categories}
                  onSave={handleSaveNote}
                  onCancel={() => {
                    setIsEditing(false);
                    setSelectedNote(null);
                  }}
                />
              </div>
            ) : (
              <NotesList
                notes={getFilteredNotes()}
                onSelectNote={handleSelectNote}
                onDeleteNote={handleDeleteNote}
                selectedNoteId={selectedNote?._id}
              />
            )}
          </div>
        </main>
      </div>

      {showCategoryModal && (
        <CategoryModal
          onSave={handleAddCategory}
          onClose={() => setShowCategoryModal(false)}
        />
      )}
    </div>
  );
}

export default App;
