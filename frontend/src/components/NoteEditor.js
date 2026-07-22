import React, { useState, useEffect } from 'react';
import '../styles/NoteEditor.css';

const NoteEditor = ({ note, categories, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setCategory(note.category?._id || '');
    } else {
      setTitle('');
      setContent('');
      setCategory('');
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }

    const noteData = {
      title,
      content,
      category: category || undefined,
    };

    onSave(noteData);
  };

  return (
    <div className="note-editor">
      <input
        type="text"
        className="note-title"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="note-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      <textarea
        className="note-content"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="editor-actions">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
