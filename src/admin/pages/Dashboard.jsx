import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { readProducts } from '../../data/catalog'
import StatCard from '../components/StatCard'
import RecentOrders from '../components/RecentOrders'

function Dashboard() {
  const orders = useSelector((state) => state.order.orders)
  const [products, setProducts] = useState(() => readProducts())

  useEffect(() => {
    const sync = () => setProducts(readProducts())
    window.addEventListener('pharmacy-products-changed', sync)
    return () => window.removeEventListener('pharmacy-products-changed', sync)
  }, [])

  const totals = {
    revenue: orders.reduce((sum, order) => sum + Number(order.grandTotal || 0), 0),
    orders: orders.length,
    products: products.length,
    lowStock: products.filter((product) => Number(product.stock || 0) <= 5).length,
  }

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">مرحباً، دكتور 👋</h4>
        <p className="text-muted mb-0">إليك نظرة عامة على أداء الصيدلية اليوم</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-4">
          <StatCard title="الطلبات" value={String(totals.orders)} change={8.2} icon="bi-bag-check" />
        </div>
        <div className="col-6 col-lg-4">
          <StatCard title="المنتجات" value={String(totals.products)} change={-2.1} icon="bi-capsule" />
        </div>
        <div className="col-6 col-lg-4">
          <StatCard title="المخزون المنخفض" value={String(totals.lowStock)} change={0} icon="bi-box-seam" />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <RecentOrders />
        </div>
      </div>
    </div>
  )
}

export default Dashboard