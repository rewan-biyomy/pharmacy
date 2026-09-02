import { Routes, Route } from 'react-router-dom'
import TopBar from './components/Layout/TopBar'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import ChatButtons from './components/Common/ChatButtons'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import ContactPage from './pages/ContactPage'
import NotificationsPage from './pages/NotificationsPage'

// Admin
import AdminLayout from './admin/components/AdminLayout'
import AdminDashboard from './admin/pages/Dashboard'
import AdminProducts from './admin/pages/Products'
import AdminOrders from './admin/pages/Orders'
import AdminInventory from './admin/pages/Inventory'
import AdminSettings from './admin/pages/Settings'
import AdminNotifications from './admin/pages/Notifications'

function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="notifications" element={<AdminNotifications />} />
      </Route>

      {/* Public Routes */}
      <Route path="/*" element={
        <div className="d-flex flex-column min-vh-100">
          <TopBar />
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Routes>
          </main>
          <Footer />
          <ChatButtons />
        </div>
      } />
    </Routes>
  )
}

export default App