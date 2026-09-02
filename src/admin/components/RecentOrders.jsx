import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function RecentOrders() {
  const orders = useSelector((state) => state.order.orders)

  const statusColors = {
    pending: 'bg-warning text-dark',
    confirmed: 'bg-info text-white',
    delivered: 'bg-success text-white',
    cancelled: 'bg-danger text-white',
  }

  const statusLabels = {
    pending: 'قيد المراجعة',
    confirmed: 'تم التأكيد',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي',
  }

  return (
    <div className="bg-white rounded-4 shadow-sm p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">آخر الطلبات</h5>
        <Link to="/admin/orders" className="btn btn-link text-pharma-primary text-decoration-none p-0">
          عرض الكل
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-4 text-muted">
          <i className="bi bi-inbox fs-1 mb-2 d-block"></i>
          <p>لا توجد طلبات بعد</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>العميل</th>
                <th>الإجمالي</th>
                <th>الحالة</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {[...orders].reverse().slice(0, 5).map((order) => (
                <tr key={order.id}>
                  <td className="fw-bold">#{order.id.slice(-6)}</td>
                  <td>{order.customer?.fullName || 'غير معروف'}</td>
                  <td className="fw-bold text-pharma-primary">{Number(order.grandTotal || 0).toFixed(2)} ج.م</td>
                  <td>
                    <span className={`badge ${statusColors[order.status] || 'bg-secondary'}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </td>
                  <td className="text-muted small">
                    {new Date(order.createdAt).toLocaleDateString('ar-EG')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default RecentOrders