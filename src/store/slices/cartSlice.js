import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.totalQuantity += 1
      state.totalPrice += action.payload.price
    },
    removeFromCart: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        state.totalQuantity -= item.quantity
        state.totalPrice -= item.price * item.quantity
        state.items = state.items.filter(item => item.id !== action.payload)
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      const nextQuantity = Math.max(1, Number(quantity) || 1)

      if (item) {
        state.totalQuantity += nextQuantity - item.quantity
        state.totalPrice += (nextQuantity - item.quantity) * item.price
        item.quantity = nextQuantity
      }
    },
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer