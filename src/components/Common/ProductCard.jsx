import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import StarRating from './StarRating'
import { addToCart } from '../../store/slices/cartSlice'
import { toggleWishlist } from '../../store/slices/wishlistSlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(state => state.wishlist.items)
  const isWished = wishlistItems.some(item => item.id === product.id)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    dispatch(addToCart(product))
  }

  const handleToggleWishlist = (e) => {
    e.stopPropagation()
    e.preventDefault()
    dispatch(toggleWishlist(product))
  }

  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    <div className="product-card-wrapper">
      <Link to={`/product/${product.id}`} className="product-card-link text-decoration-none">
        <div className="product-card-v2">
          {/* صورة المنتج */}
          <div className="product-card-image">
            {discountPercent > 0 && (
              <span className="product-badge discount-badge">
                خصم {discountPercent}%
              </span>
            )}
            {product.badge && !discountPercent && (
              <span className="product-badge">{product.badge}</span>
            )}
            
            <button 
              className={`wishlist-btn-v2 ${isWished ? 'active' : ''}`}
              onClick={handleToggleWishlist}
            >
              <i className={`bi ${isWished ? 'bi-heart-fill' : 'bi-heart'}`}></i>
            </button>

            <img src={product.image} alt={product.name} loading="lazy" />

            {/* طبقة Hover مع زر العين */}
            <div className="product-card-overlay">
              <button className="eye-btn" onClick={(e) => e.stopPropagation()}>
                <Link to={`/product/${product.id}`} className="text-decoration-none text-white">
                  <i className="bi bi-eye-fill"></i>
                </Link>
              </button>
            </div>
          </div>

          {/* معلومات المنتج */}
          <div className="product-card-info">
            <span className="product-category">{product.category}</span>
            <h5 className="product-name">{product.name}</h5>
            
            <div className="product-rating">
              <StarRating rating={product.rating} />
              <span className="rating-value">({product.rating})</span>
            </div>

            <div className="product-price-row">
              <span className="current-price">{product.price} ج.م</span>
              {product.oldPrice && (
                <span className="old-price">{product.oldPrice} ج.م</span>
              )}
            </div>

            <div className="product-actions">
              <button className="btn-add-cart" onClick={handleAddToCart}>
                <i className="bi bi-cart-plus"></i>
                <span>أضف للسلة</span>
              </button>
              <Link to={`/product/${product.id}`} className="btn-view">
                <i className="bi bi-eye"></i>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard