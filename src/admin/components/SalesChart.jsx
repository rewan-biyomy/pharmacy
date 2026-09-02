import { useMemo } from 'react'

function SalesChart() {
  const data = useMemo(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('pharmacy_orders') || '[]')
      const orders = Array.isArray(saved) ? saved : saved.orders || []

      const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
      const totals = Array.from({ length: 6 }, (_, index) => ({
        month: monthNames[index],
        sales: 0,
      }))

      orders.forEach((order) => {
        if (!order?.createdAt) return
        const created = new Date(order.createdAt)
        const monthIndex = created.getMonth()
        if (monthIndex >= 0 && monthIndex < 6) {
          totals[monthIndex].sales += Number(order.grandTotal || 0)
        }
      })

      return totals
    } catch {
      return [
        { month: 'يناير', sales: 0 },
        { month: 'فبراير', sales: 0 },
        { month: 'مارس', sales: 0 },
        { month: 'أبريل', sales: 0 },
        { month: 'مايو', sales: 0 },
        { month: 'يونيو', sales: 0 },
      ]
    }
  }, [])

  const maxSales = Math.max(...data.map((d) => d.sales), 1)

  return (
    <div className="bg-white rounded-4 shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">المبيعات الشهرية</h5>
        <select className="form-select form-select-sm" style={{width: '120px'}}>
          <option>2026</option>
          <option>2025</option>
        </select>
      </div>
      <div className="chart-container" style={{height: '250px'}}>
        <div className="d-flex align-items-end justify-content-between gap-2 h-100">
          {data.map((item, i) => (
            <div key={i} className="d-flex flex-column align-items-center gap-2 flex-grow-1">
              <div className="text-muted small">{item.sales.toLocaleString()} ج.م</div>
              <div
                className="rounded-top-2 w-100"
                style={{
                  height: `${(item.sales / maxSales) * 180}px`,
                  background: 'linear-gradient(180deg, var(--pharma-primary) 0%, #0d6a85 100%)',
                  minWidth: '30px',
                  transition: 'height 0.6s ease',
                }}
              ></div>
              <span className="small text-muted">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SalesChart