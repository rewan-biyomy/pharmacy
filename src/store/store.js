import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import wishlistReducer from './slices/wishlistSlice'
import orderReducer from './slices/orderSlice'

const normalizeOrderState = (value) => {
  if (Array.isArray(value)) {
    return { orders: value, currentOrder: null }
  }

  if (value && typeof value === 'object') {
    return {
      orders: Array.isArray(value.orders) ? value.orders : [],
      currentOrder: value.currentOrder || null,
    }
  }

  return { orders: [], currentOrder: null }
}

const loadState = () => {
  try {
    const cart = localStorage.getItem('cart')
    const wishlist = localStorage.getItem('wishlist')
    const order = localStorage.getItem('pharmacy_orders')
    return {
      cart: cart ? JSON.parse(cart) : undefined,
      wishlist: wishlist ? JSON.parse(wishlist) : undefined,
      order: order ? normalizeOrderState(JSON.parse(order)) : undefined,
    }
  } catch {
    return {}
  }
}

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
  preloadedState: {
    cart: preloadedState.cart || undefined,
    wishlist: preloadedState.wishlist || undefined,
    order: preloadedState.order || undefined,
  },
})

store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem('cart', JSON.stringify(state.cart))
  localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
  localStorage.setItem('pharmacy_orders', JSON.stringify({
    orders: state.order.orders,
    currentOrder: state.order.currentOrder,
  }))
})