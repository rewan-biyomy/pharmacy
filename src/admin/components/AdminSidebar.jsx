import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const navItems = [
  { path: '/admin', label: 'الرئيسية', icon: 'bi-grid-fill' },
  { path: '/admin/products', label: 'المنتجات', icon: 'bi-capsule' },
  { path: '/admin/orders', label: 'الطلبات', icon: 'bi-bag-check' },
  { path: '/admin/inventory', label: 'المخزون', icon: 'bi-box-seam' },
  { path: '/admin/settings', label: 'الإعدادات', icon: 'bi-gear' },
]

function AdminSidebar() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (path) => location.pathname === path

  return (
    <aside 
      className={`admin-sidebar bg-white border-start shadow-sm d-flex flex-column ${collapsed ? 'collapsed' : ''}`}
      style={{
        width: collapsed ? '70px' : '260px',
        transition: 'width 0.3s ease',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
        {!collapsed && (
          <Link to="/admin" className="text-decoration-none d-flex align-items-center gap-2">
            <img src="/images/logo.png" alt="" style={{height: '35px'}} />
            <span className="fw-bold text-pharma-primary" style={{fontSize: '1rem'}}>الإدارة</span>
          </Link>
        )}
        <button 
          className="btn btn-link text-dark p-1"
          onClick={() => setCollapsed(!collapsed)}
        >
          <i className={`bi ${collapsed ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-grow-1 py-3">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`admin-nav-link d-flex align-items-center gap-3 px-3 py-3 text-decoration-none ${
              isActive(item.path) ? 'active' : 'text-dark'
            }`}
            title={collapsed ? item.label : ''}
          >
            <i className={`bi ${item.icon} fs-5`}></i>
            {!collapsed && <span className="fw-medium">{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Back to Site */}
      <div className="p-3 border-top">
        <Link to="/" className="btn btn-outline-pharma w-100 btn-sm d-flex align-items-center justify-content-center gap-2">
          <i className="bi bi-arrow-right"></i>
          {!collapsed && <span>الموقع</span>}
        </Link>
      </div>
    </aside>
  )
}

export default AdminSidebar