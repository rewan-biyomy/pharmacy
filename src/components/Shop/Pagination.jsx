import React from 'react'

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
      <button 
        className="btn btn-outline-secondary rounded-pill px-4"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        السابق
      </button>
      {Array.from({length: totalPages}, (_, i) => (
        <button
          key={i + 1}
          className={`btn rounded-circle ${currentPage === i + 1 ? 'btn-pharma' : 'btn-outline-secondary'}`}
          style={{width: '44px', height: '44px', padding: 0}}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button 
        className="btn btn-outline-secondary rounded-pill px-4"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        التالي
      </button>
    </div>
  )
}

export default Pagination