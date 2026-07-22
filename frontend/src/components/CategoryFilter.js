import React from 'react';
import '../styles/CategoryFilter.css';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory, onAddCategory }) => {
  return (
    <div className="category-filter">
      <h3>Categories</h3>
      <div className="category-list">
        <button
          className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          All Notes
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            className={`category-btn ${selectedCategory === category._id ? 'active' : ''}`}
            onClick={() => onSelectCategory(category._id)}
            style={{ borderLeftColor: category.color }}
          >
            {category.name}
          </button>
        ))}
      </div>
      <button className="add-category-btn" onClick={onAddCategory}>
        + Add Category
      </button>
    </div>
  );
};

export default CategoryFilter;
