import React from 'react';
import '../styles/NotesList.css';

const NotesList = ({ notes, onSelectNote, onDeleteNote, selectedNoteId }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="notes-list">
      <h2>Your Notes</h2>
      {notes.length === 0 ? (
        <p className="empty-message">No notes yet. Create one to get started!</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li
              key={note._id}
              className={`note-item ${selectedNoteId === note._id ? 'active' : ''}`}
              onClick={() => onSelectNote(note)}
            >
              <div className="note-item-content">
                <h3>{note.title}</h3>
                <p>{note.content.substring(0, 50)}...</p>
                <span className="note-date">{formatDate(note.createdAt)}</span>
              </div>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note._id);
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesList;
