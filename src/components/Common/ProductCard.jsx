import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import StarRating from './StarRating'
import { addToCart } from '../../store/slices/cartSlice'
import { toggleWishlist } from '../../store/slices/wishlistSlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
    <div className="product-card-wrapper" onClick={() => navigate(`/product/${product.id}`)} role="link" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${product.id}`)}>
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
              <Link to={`/product/${product.id}`} className="eye-btn text-decoration-none text-white" onClick={(e) => e.stopPropagation()} aria-label={`عرض ${product.name}`}>
                <i className="bi bi-eye-fill"></i>
              </Link>
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
              <Link to={`/product/${product.id}`} className="btn-view" onClick={(e) => e.stopPropagation()}>
                <i className="bi bi-eye"></i>
              </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProductCard