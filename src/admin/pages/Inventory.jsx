import { useEffect, useState } from 'react'
import { readProducts } from '../../data/catalog'

function Inventory() {
  const [products, setProducts] = useState(() => readProducts())

  useEffect(() => {
    const sync = () => setProducts(readProducts())
    window.addEventListener('pharmacy-products-changed', sync)
    return () => window.removeEventListener('pharmacy-products-changed', sync)
  }, [])

  const total = products.length
  const available = products.filter((product) => Number(product.stock ?? 0) > Number(product.minStock ?? 5)).length
  const lowStock = products.filter((product) => Number(product.stock ?? 0) <= Number(product.minStock ?? 5)).length

  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold mb-1">المخزون</h4>
        <p className="text-muted mb-0">تتبع كميات المنتجات والتنبيهات</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="bg-white rounded-4 shadow-sm p-4 text-center">
            <h2 className="fw-bold text-pharma-primary">{total}</h2>
            <p className="text-muted mb-0\">إجمالي المنتجات</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-white rounded-4 shadow-sm p-4 text-center">
            <h2 className="fw-bold text-success">{available}</h2>
            <p className="text-muted mb-0\">متوفر</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="bg-white rounded-4 shadow-sm p-4 text-center">
            <h2 className="fw-bold text-danger">{lowStock}</h2>
            <p className="text-muted mb-0\">منخفض المخزون</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-4 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-pharma-light">
              <tr>
                <th className="px-4">المنتج</th>
                <th>القسم</th>
                <th>المخزون الحالي</th>
                <th>الحد الأدنى</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const stock = Number(product.stock ?? 0)
                const minStock = Number(product.minStock ?? 5)
                const isLow = stock <= minStock

                return (
                  <tr key={product.id}>
                    <td className="px-4">
                      <div className="d-flex align-items-center gap-3">
                        <img src={product.image} alt="" className="rounded-3" style={{ width: '45px', height: '45px', objectFit: 'cover' }} />
                        <span className="fw-bold">{product.name}</span>
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div className="progress flex-grow-1" style={{ height: '8px', width: '100px' }}>
                          <div
                            className={`progress-bar ${isLow ? 'bg-danger' : 'bg-success'}`}
                            style={{ width: `${Math.min(((stock || 0) / Math.max(minStock + 10, 10)) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <span className="fw-bold small">{stock}</span>
                      </div>
                    </td>
                    <td>{minStock}</td>
                    <td>
                      {isLow ? (
                        <span className="badge bg-danger-subtle text-danger">
                          <i className="bi bi-exclamation-triangle-fill me-1"></i>
                          منخفض
                        </span>
                      ) : (
                        <span className="badge bg-success-subtle text-success">متوفر</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Inventory