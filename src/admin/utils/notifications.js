export const ADMIN_NOTIFICATIONS_KEY = 'pharmacy_admin_notifications'
export const ORDER_NOTIFICATIONS_KEY = 'pharmacy_order_notifications'

const normalizeNotificationType = (value) => {
  const type = String(value || '').toLowerCase()
  if (type === 'delete' || type.includes('حذف')) return 'delete'
  if (type === 'update' || type.includes('تعديل')) return 'update'
  if (type === 'order' || type.includes('طلب') || type.includes('استلام')) return 'order'
  return 'info'
}

const normalizeNotification = (item, fallbackType = 'info') => ({
  id: item?.id ?? `${Date.now()}-${Math.random()}`,
  title: item?.title || 'تنبيه',
  text: item?.text || item?.message || 'إشعار جديد',
  type: normalizeNotificationType(item?.type || fallbackType),
  read: Boolean(item?.read),
  createdAt: item?.createdAt || new Date().toISOString(),
})

const readStorageList = (key) => {
  try {
    const saved = localStorage.getItem(key)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const getNotifications = () => {
  const adminItems = readStorageList(ADMIN_NOTIFICATIONS_KEY).map((item) => normalizeNotification(item, 'info'))
  const orderItems = readStorageList(ORDER_NOTIFICATIONS_KEY).map((item) => normalizeNotification(item, 'order'))

  return [...adminItems, ...orderItems]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((item) => ({ ...item, read: Boolean(item.read) }))
}

export const getUnreadNotificationsCount = () =>
  getNotifications().filter((item) => !item.read).length

export const pushNotification = (text, options = {}) => {
  const next = [
    normalizeNotification(
      {
        ...options,
        text,
        read: false,
        createdAt: new Date().toISOString(),
      },
      options.type || 'info'
    ),
    ...readStorageList(ADMIN_NOTIFICATIONS_KEY).map((item) => normalizeNotification(item, 'info')),
  ].slice(0, 12)

  localStorage.setItem(ADMIN_NOTIFICATIONS_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event('admin:notifications'))
  return next
}

export const markAllNotificationsRead = () => {
  const adminNext = readStorageList(ADMIN_NOTIFICATIONS_KEY).map((item) => ({
    ...normalizeNotification(item, 'info'),
    read: true,
  }))
  const orderNext = readStorageList(ORDER_NOTIFICATIONS_KEY).map((item) => ({
    ...normalizeNotification(item, 'order'),
    read: true,
  }))

  localStorage.setItem(ADMIN_NOTIFICATIONS_KEY, JSON.stringify(adminNext))
  localStorage.setItem(ORDER_NOTIFICATIONS_KEY, JSON.stringify(orderNext))
  window.dispatchEvent(new Event('admin:notifications'))
  return [...adminNext, ...orderNext]
}

export const clearNotifications = () => {
  localStorage.removeItem(ADMIN_NOTIFICATIONS_KEY)
  localStorage.removeItem(ORDER_NOTIFICATIONS_KEY)
  window.dispatchEvent(new Event('admin:notifications'))
}
