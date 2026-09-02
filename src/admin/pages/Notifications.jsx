import { useEffect, useState } from 'react'
import { getNotifications, clearNotifications, markAllNotificationsRead } from '../utils/notifications'

const typeStyles = {
  delete: 'bg-danger-subtle border-danger text-danger',
  update: 'bg-warning-subtle border-warning text-warning-emphasis',
  info: 'bg-primary-subtle border-primary text-primary-emphasis',
  order: 'bg-success-subtle border-success text-success-emphasis',
}

function AdminNotifications() {
  const [items, setItems] = useState(() => getNotifications())

  useEffect(() => {
    const sync = () => setItems(getNotifications())
    window.addEventListener('admin:notifications', sync)
    return () => window.removeEventListener('admin:notifications', sync)
  }, [])

  useEffect(() => {
    if (items.some((item) => !item.read)) {
      markAllNotificationsRead()
    }
  }, [items])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-1">الإشعارات</h4>
          <p className="text-muted mb-0">كل التنبيهات الخاصة باللوحة الإدارية</p>
        </div>

        {items.length > 0 && (
          <button className="btn btn-outline-danger btn-sm" type="button" onClick={() => {
            clearNotifications()
            setItems([])
          }}>
            مسح الكل
          </button>
        )}
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4">
        {items.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-bell-slash fs-1 d-block mb-3"></i>
            <h5>لا توجد إشعارات حاليًا</h5>
          </div>
        ) : (
          <div className="d-grid gap-3">
            {items.map((item) => {
              const isRead = item.read
              const typeClass = typeStyles[item.type] || typeStyles.info

              return (
                <div
                  key={item.id}
                  className={`border rounded-4 p-3 ${isRead ? 'bg-light-subtle border-light' : 'bg-white shadow-sm border-2 border-warning-subtle'}`}
                >
                  <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                    <div>
                      <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                        <p className="fw-bold mb-0">{item.title || 'تنبيه'}</p>
                        {!isRead && <span className="badge rounded-pill bg-danger">جديد</span>}
                      </div>
                      <p className="mb-0 text-muted small">{item.text}</p>
                    </div>
                    <span className={`badge rounded-pill border ${typeClass}`}>{item.type === 'delete' ? 'حذف' : item.type === 'update' ? 'تعديل' : item.type === 'order' ? 'طلب' : 'معلومة'}</span>
                  </div>
                  <small className="text-muted d-block mt-2">
                    {new Date(item.createdAt).toLocaleString('ar-EG')}
                  </small>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminNotifications
