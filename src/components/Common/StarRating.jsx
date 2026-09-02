import React from 'react'

function StarRating({ rating, size = 'small' }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<i key={i} className={`bi bi-star-fill text-warning ${size}`}></i>)
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<i key={i} className={`bi bi-star-half text-warning ${size}`}></i>)
    } else {
      stars.push(<i key={i} className={`bi bi-star text-warning ${size}`}></i>)
    }
  }
  return <span className="d-flex align-items-center gap-1">{stars}</span>
}

export default StarRating