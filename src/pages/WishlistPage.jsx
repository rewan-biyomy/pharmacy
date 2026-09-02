import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleWishlist } from '../store/slices/wishlistSlice'
import { addToCart } from '../store/slices/cartSlice'
import StarRating from '../components/Common/StarRating'

function WishlistPage() {
  const dispatch = useDispatch()
  const wishlistItems = useSelector(state => state.wishlist.items)

  if (wishlistItems.length === 0) {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h1 className="fw-bold mb-2">المفضلة</h1>
            <p className="mb-0 opacity-75">منتجاتك المفضلة في مكان واحد</p>
          </div>
        </div>
        <section className="py-5">
          <div className="container text-center py-5">
            <i className="bi bi-heart fs-1 text-muted mb-3 d-block"></i>
            <h3 className="text-muted">المفضلة فارغة</h3>
            <p className="text-muted">لم تضف أي منتجات للمفضلة بعد</p>
            <Link to="/shop" className="btn btn-pharma mt-3">
              <i className="bi bi-shop ms-2"></i>
              تصفح المتجر
            </Link>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 className="fw-bold mb-2">المفضلة</h1>
          <p className="mb-0 opacity-75">منتجاتك المفضلة في مكان واحد</p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {wishlistItems.map(product => (
              <div key={product.id} className="col-6 col-lg-3">
                <div className="product-card h-100 d-flex flex-column">
                  <div className="card-img-wrapper">
                    {product.badge && (
                      <span className="position-absolute top-0 end-0 m-2 badge bg-pharma-primary rounded-pill">
                        {product.badge}
                      </span>
                    )}
                    <button 
                      className="wishlist-btn"
                      onClick={() => dispatch(toggleWishlist(product))}
                      style={{color: '#e53935'}}
                    >
                      <i className="bi bi-heart-fill"></i>
                    </button>
                    <img src={product.image} alt={product.name} className="img-fluid" />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <span className="text-pharma-primary small fw-bold mb-1">{product.category}</span>
                    <h5 className="card-title fs-6 fw-bold mb-2">{product.name}</h5>
                    <div className="mb-2 d-flex align-items-center gap-1">
                      <StarRating rating={product.rating} />
                      <span className="text-muted small me-1">({product.rating})</span>
                    </div>
                    <div className="mb-3">
                      <span className="price">{product.price} ج.م</span>
                      {product.oldPrice && (
                        <span className="old-price">{product.oldPrice} ج.م</span>
                      )}
                    </div>
                    <div className="mt-auto d-flex gap-2">
                      <button 
                        className="btn btn-pharma flex-grow-1"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        <i className="bi bi-cart-plus ms-1"></i>
                        أضف للسلة
                      </button>
                      <Link to={`/product/${product.id}`} className="btn btn-outline-pharma">
                        <i className="bi bi-eye"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default WishlistPage