import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'pharmacy_order_notifications'

const readNotifications = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function NotificationsPage() {
  const [items, setItems] = useState(() => readNotifications())

  useEffect(() => {
    const sync = () => setItems(readNotifications())
    window.addEventListener('pharmacy-order-notification', sync)
    return () => window.removeEventListener('pharmacy-order-notification', sync)
  }, [])

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 className="fw-bold mb-2">الإشعارات</h1>
          <p className="mb-0 opacity-75">طلباتك ومعاملاتك الأخيرة</p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="bg-white rounded-4 shadow-sm p-4">
            {items.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-bell-slash fs-1 d-block mb-3"></i>
                <h5>لا توجد إشعارات حاليًا</h5>
              </div>
            ) : (
              <div className="d-grid gap-3">
                {items.map((item) => (
                  <div key={item.id} className="border rounded-4 p-3 bg-light-subtle">
                    <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                      <div>
                        <p className="fw-bold mb-1">{item.title}</p>
                        <p className="mb-0 text-muted small">{item.message}</p>
                      </div>
                      <span className="badge bg-pharma-light text-pharma-primary">{item.type}</span>
                    </div>
                    <small className="text-muted d-block mt-2">
                      {new Date(item.createdAt).toLocaleString('ar-EG')}
                    </small>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4">
              <Link to="/" className="btn btn-pharma">العودة للرئيسية</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NotificationsPage
