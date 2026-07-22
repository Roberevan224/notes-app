import React, { useState } from 'react';
import '../styles/CategoryModal.css';

const CategoryModal = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('#3498db');

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Category name is required');
      return;
    }
    onSave({ name, color });
    setName('');
    setColor('#3498db');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Category</h2>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal-input"
        />
        <div className="color-picker">
          <label>Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="color-input"
          />
        </div>
        <div className="modal-actions">
          <button className="modal-save" onClick={handleSubmit}>
            Create
          </button>
          <button className="modal-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
