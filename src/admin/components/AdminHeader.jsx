import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getNotifications, getUnreadNotificationsCount } from '../utils/notifications'
import { readSettings } from '../../data/settings'

function AdminHeader() {
  const [notifications, setNotifications] = useState([])
  const [settings, setSettings] = useState(() => readSettings())
  const unreadCount = getUnreadNotificationsCount()

  useEffect(() => {
    const sync = () => {
      setNotifications(getNotifications())
      setSettings(readSettings())
    }
    sync()

    window.addEventListener('admin:notifications', sync)
    window.addEventListener('pharmacy-settings-updated', sync)
    return () => {
      window.removeEventListener('admin:notifications', sync)
      window.removeEventListener('pharmacy-settings-updated', sync)
    }
  }, [])

  return (
    <header className="admin-header bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center sticky-top" style={{ zIndex: 20 }}>
      <div>
        <h5 className="fw-bold mb-0">لوحة التحكم</h5>
        <small className="text-muted">{settings.pharmacyName}</small>
      </div>

      <div className="d-flex align-items-center gap-3">
        <Link to="/admin/notifications" className="btn btn-link text-muted p-0 position-relative" aria-label="الإشعارات">
          <i className="bi bi-bell fs-5"></i>
          {unreadCount > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '8px' }}>
              {unreadCount}
            </span>
          )}
        </Link>

        <div className="d-flex align-items-center gap-2">
          <div className="bg-pharma-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
            <i className="bi bi-person-fill"></i>
          </div>
          <div className="d-none d-md-block">
            <p className="mb-0 fw-bold small">الدكتور</p>
            <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>مدير النظام</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminHeader