import React from 'react'

function ProductImages({ product }) {
  return (
    <div className="bg-pharma-light rounded-4 p-4 text-center">
      <img 
        src={product.image} 
        alt={product.name} 
        className="img-fluid rounded-3" 
        style={{maxHeight: '400px'}} 
      />
    </div>
  )
}

export default ProductImages