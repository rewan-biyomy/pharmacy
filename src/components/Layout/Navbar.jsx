import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Navbar() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const cartItems = useSelector((state) => state.cart.totalQuantity)
  const wishlistItems = useSelector((state) => state.wishlist.items.length)

  const isActive = (path) => (location.pathname === path ? 'active text-pharma-primary' : '')

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={closeMenu}>
          <img src="/images/logo.png" alt="صيدلية الفرازدق" className="nav-logo" />
          <span>صيدليه الفخرانى</span>
        </Link>

        <button
          className="navbar-toggler border-0 d-lg-none"
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="navbarNav"
          aria-label="فتح القائمة"
        >
          <i className={`bi ${isMenuOpen ? 'bi-x-lg' : 'bi-list'} fs-4`} aria-hidden="true"></i>
        </button>

        <div className={`navbar-collapse flex-grow-1 justify-content-between align-items-center ${isMenuOpen ? 'is-open' : ''}`} id="navbarNav">
          <ul className="navbar-nav mx-auto d-flex align-items-center gap-2 gap-lg-3 mb-0">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/" onClick={closeMenu}>الرئيسية</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/shop')}`} to="/shop" onClick={closeMenu}>المتجر</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/contact')}`} to="/contact" onClick={closeMenu}>تواصل معنا</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to="/notifications" onClick={closeMenu} className="btn btn-link text-dark position-relative p-2" title="الإشعارات" aria-label="الإشعارات">
              <i className="bi bi-bell fs-5"></i>
            </Link>
            <Link to="/wishlist" onClick={closeMenu} className="btn btn-link text-dark position-relative p-2" title="المفضلة" aria-label="المفضلة">
              <i className="bi bi-heart fs-5"></i>
              {wishlistItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '10px' }}
                >
                  {wishlistItems}
                </span>
              )}
            </Link>
            <Link to="/cart" onClick={closeMenu} className="btn btn-link text-dark position-relative p-2" title="سلة المشتريات" aria-label="سلة المشتريات">
              <i className="bi bi-cart3 fs-5"></i>
              {cartItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-pharma-primary"
                  style={{ fontSize: '10px' }}
                >
                  {cartItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar