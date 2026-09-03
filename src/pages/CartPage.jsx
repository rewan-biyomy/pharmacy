import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice'
import StarRating from '../components/Common/StarRating'

function CartPage() {
  const dispatch = useDispatch()
  const { items, totalQuantity, totalPrice } = useSelector(state => state.cart)

  if (items.length === 0) {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h1 className="fw-bold mb-2">سلة المشتريات</h1>
            <p className="mb-0 opacity-75">راجع منتجاتك قبل إتمام الطلب</p>
          </div>
        </div>
        <section className="py-5">
          <div className="container text-center py-5">
            <i className="bi bi-cart-x fs-1 text-muted mb-3 d-block"></i>
            <h3 className="text-muted">السلة فارغة</h3>
            <p className="text-muted">لم تضف أي منتجات للسلة بعد</p>
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
          <h1 className="fw-bold mb-2">سلة المشتريات</h1>
          <p className="mb-0 opacity-75">راجع منتجاتك قبل إتمام الطلب</p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="bg-white rounded-4 shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold mb-0">
                    <i className="bi bi-cart3 ms-2 text-pharma-primary"></i>
                    منتجاتك ({totalQuantity})
                  </h5>
                  <button 
                    className="btn btn-outline-danger btn-sm rounded-pill"
                    onClick={() => dispatch(clearCart())}
                  >
                    <i className="bi bi-trash ms-1"></i>
                    إفراغ السلة
                  </button>
                </div>

                <div className="cart-items">
                  {items.map(item => (
                    <div key={item.id} className="cart-item d-flex gap-3 p-3 mb-3 rounded-3">
                      <div className="cart-item-img flex-shrink-0">
                        <img src={item.image} alt={item.name} className="rounded-3" />
                      </div>
                      <div className="flex-grow-1 min-width-0">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <span className="badge bg-pharma-light text-pharma-primary mb-1">{item.category}</span>
                            <h6 className="fw-bold mb-1">{item.name}</h6>
                            <div className="d-flex align-items-center gap-1 mb-1">
                              <StarRating rating={item.rating} size="small" />
                              <span className="text-muted small">({item.rating})</span>
                            </div>
                          </div>
                          <button 
                            className="btn btn-link text-danger p-0"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
                          <div className="d-flex align-items-center gap-2">
                            <span className="price">{item.price} ج.م</span>
                            {item.oldPrice && (
                              <span className="old-price small">{item.oldPrice} ج.م</span>
                            )}
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <div className="d-flex align-items-center border rounded-pill overflow-hidden">
                              <button type="button" className="btn btn-sm px-2" aria-label={`تقليل كمية ${item.name}`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>
                                <i className="bi bi-dash"></i>
                              </button>
                              <span className="px-2 small fw-bold">{item.quantity}</span>
                              <button type="button" className="btn btn-sm px-2" aria-label={`زيادة كمية ${item.name}`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                            <span className="fw-bold text-pharma-primary">
                              {(item.price * item.quantity).toFixed(2)} ج.م
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="bg-white rounded-4 shadow-sm p-4 sticky-top" style={{top: '100px'}}>
                <h5 className="fw-bold mb-4">
                  <i className="bi bi-receipt ms-2 text-pharma-primary"></i>
                  ملخص الطلب
                </h5>
                
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">عدد المنتجات</span>
                  <span className="fw-bold">{totalQuantity}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">المجموع الفرعي</span>
                  <span className="fw-bold">{totalPrice.toFixed(2)} ج.م</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">التوصيل</span>
                  <span className="text-success fw-bold">مجاني</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold">الإجمالي</span>
                  <span className="price fs-4">{totalPrice.toFixed(2)} ج.م</span>
                </div>

                <Link to="/checkout" className="btn btn-pharma w-100 mb-3">
  <i className="bi bi-credit-card ms-2"></i>
  إتمام الطلب
</Link>
                <Link to="/shop" className="btn btn-outline-pharma w-100">
                  <i className="bi bi-arrow-right ms-2"></i>
                  مواصلة التسوق
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CartPage