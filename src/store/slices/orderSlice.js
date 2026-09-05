import { createSlice } from '@reduxjs/toolkit'

const ORDER_STORAGE_KEY = 'pharmacy_orders'

const readOrders = () => {
  try {
    const saved = localStorage.getItem(ORDER_STORAGE_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed)) return parsed
    if (parsed && Array.isArray(parsed.orders)) return parsed.orders
    return []
  } catch {
    return []
  }
}

const readCurrentOrder = () => {
  try {
    const saved = localStorage.getItem(ORDER_STORAGE_KEY)
    if (!saved) return null

    const parsed = JSON.parse(saved)
    if (parsed && parsed.currentOrder) return parsed.currentOrder
    return null
  } catch {
    return null
  }
}

const initialState = {
  orders: readOrders(),
  currentOrder: readCurrentOrder(),
}

const saveOrders = (state) => {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify({
    orders: state.orders,
    currentOrder: state.currentOrder,
  }))
}

const notifyOrderEvent = (title, message, type = 'طلب') => {
  const bucket = JSON.parse(localStorage.getItem('pharmacy_order_notifications') || '[]')
  const next = [
    {
      id: Date.now() + Math.random(),
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString(),
    },
    ...bucket,
  ].slice(0, 20)

  localStorage.setItem('pharmacy_order_notifications', JSON.stringify(next))
  window.dispatchEvent(new Event('pharmacy-order-notification'))
  window.dispatchEvent(new Event('admin:notifications'))
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state, action) => {
      const newOrder = {
        id: Date.now().toString(),
        ...action.payload,
        notes: String(action.payload.notes || '').trim().slice(0, 500),
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      state.orders.push(newOrder)
      state.currentOrder = newOrder
      saveOrders(state)
      notifyOrderEvent('تم استلام طلب جديد', `تم تسجيل طلب رقم #${newOrder.id.slice(-6)} بنجاح.`, 'طلب')
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload
      const order = state.orders.find((item) => item.id === id)
      if (order) {
        order.status = status
        saveOrders(state)
        const labels = {
          pending: 'قيد المراجعة',
          confirmed: 'تم التأكيد',
          delivered: 'تم الاستلام',
          cancelled: 'ملغي',
        }
        notifyOrderEvent('تحديث حالة الطلب', `تم تحديث طلب #${id.slice(-6)} إلى ${labels[status] || status}.`, 'استلام')
      }
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
      saveOrders(state)
    },
  },
})

export const { createOrder, clearCurrentOrder, updateOrderStatus } = orderSlice.actions
export default orderSlice.reducer