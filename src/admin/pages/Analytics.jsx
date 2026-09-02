import { useEffect, useState } from 'react'
import { readProducts } from '../../data/catalog'
import SalesChart from '../components/SalesChart'

function Analytics() {
  const [products, setProducts] = useState(() => readProducts())

  useEffect(() => {
    const sync = () => setProducts(readProducts())
    window.addEventListener('pharmacy-products-changed', sync)
    return () => window.removeEventListener('pharmacy-products-changed', sync)
  }, [])

  const topProducts = [...products]
    .map((product) => ({
      name: product.name,
      sales: Number(product.sales || 0),
    }))
    .filter((item) => item.sales > 0)
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5)

  const maxSales = topProducts.length ? Math.max(...topProducts.map((item) => item.sales)) : 1

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">الإحصائيات والتحليلات</h4>
        <p className="text-muted mb-0">رؤية شاملة لأداء الصيدلية</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <SalesChart />
        </div>
        <div className="col-lg-4">
          <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
            <h6 className="fw-bold mb-3">أكثر المنتجات مبيعاً</h6>
            {topProducts.length === 0 ? (
              <div className="text-center text-muted py-4">
                <i className="bi bi-bar-chart fs-1 d-block mb-2"></i>
                لا توجد بيانات مبيعات بعد
              </div>
            ) : (
              topProducts.map((item, i) => (
                <div key={i} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small fw-bold">{item.name}</span>
                    <span className="small text-muted">{item.sales} مبيع</span>
                  </div>
                  <div className="progress" style={{ height: '6px' }}>
                    <div className="progress-bar bg-pharma-primary" style={{ width: `${(item.sales / maxSales) * 100}%` }}></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics