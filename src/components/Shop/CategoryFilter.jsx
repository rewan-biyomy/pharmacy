import React from 'react'

function CategoryFilter({ activeCategory, onCategoryChange, categories = [] }) {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter