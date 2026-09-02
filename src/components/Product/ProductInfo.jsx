import React from 'react'
import { useDispatch } from 'react-redux'
import StarRating from '../Common/StarRating'
import { addToCart } from '../../store/slices/cartSlice'

function ProductInfo({ product }) {
  const dispatch = useDispatch()

  return (
    <div>
      <span className="badge bg-pharma-light text-pharma-primary mb-2">{product.category}</span>
      <h1 className="fw-bold mb-3\">{product.name}</h1>
      <div className="d-flex align-items-center gap-2 mb-3">
        <StarRating rating={product.rating} />
        <span className="text-muted">({product.rating})</span>
        <span className="text-muted">|</span>
        <span className="text-muted">{product.reviews} تقييم</span>
      </div>
      <div className="mb-4">
        <span className="price fs-2">{product.price} ج.م</span>
        {product.oldPrice && (
          <span className="old-price fs-4 me-3">{product.oldPrice} ج.م</span>
        )}
      </div>
      <p className="text-muted mb-4 fs-5">{product.description}</p>

      <div className="d-flex gap-3 mb-4">
        <button 
          className="btn btn-pharma btn-lg px-5"
          onClick={() => dispatch(addToCart(product))}
        >
          <i className="bi bi-cart-plus ms-2"></i>
          أضف للسلة
        </button>
        <button className="btn btn-outline-secondary btn-lg rounded-circle" style={{width: '56px'}}>
          <i className="bi bi-heart"></i>
        </button>
      </div>

      <div className="border-top pt-3 text-muted">
        <p className="mb-1"><strong>الرمز:</strong> {product.sku}</p>
        <p className="mb-0"><strong>التصنيف:</strong> {product.category}</p>
      </div>
    </div>
  )
}

export default ProductInfo