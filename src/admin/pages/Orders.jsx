import { useDispatch, useSelector } from 'react-redux'
import { updateOrderStatus } from '../../store/slices/orderSlice'

function Orders() {
  const dispatch = useDispatch()
  const orders = useSelector(state => state.order.orders)

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

  const getReadableStatus = (status) => statusLabels[status] || status || 'غير محدد'

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">إدارة الطلبات</h4>
          <p className="text-muted mb-0">{orders.length} طلب في النظام</p>
        </div>
      </div>

      <div className="bg-white rounded-4 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-pharma-light">
              <tr>
                <th className="px-4">رقم الطلب</th>
                <th>العميل</th>
                <th>المنتجات</th>
                <th>الإجمالي</th>
                <th>العنوان</th>
                <th>الحالة</th>
                <th className="px-4">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {[...orders].reverse().map(order => (
                <tr key={order.id}>
                  <td className="px-4 fw-bold\">#{order.id.slice(-6)}</td>
                  <td>
                    <div>
                      <p className="fw-bold mb-0\">{order.customer?.fullName}</p>
                      <small className="text-muted\">{order.customer?.phone}</small>
                    </div>
                  </td>
                  <td>{order.items?.length || 0} منتج</td>
                  <td className="fw-bold text-pharma-primary\">{order.grandTotal?.toFixed(2)} ج.م</td>
                  <td>
                    <small>{order.customer?.city} - {order.customer?.address}</small>
                  </td>
                  <td>
                    <select 
                      className={`form-select form-select-sm ${statusColors[order.status]}`}
                      style={{width: '130px', border: 'none'}}
                      value={order.status}
                      onChange={(e) => dispatch(updateOrderStatus({ id: order.id, status: e.target.value }))}
                    >
                      <option value="pending\">قيد المراجعة</option>
                      <option value="confirmed\">تم التأكيد</option>
                      <option value="delivered\">تم التوصيل</option>
                      <option value="cancelled\">ملغي</option>
                    </select>
                  </td>
                  <td className="px-4 text-muted small\">
                    {new Date(order.createdAt).toLocaleDateString('ar-EG')}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-1 mb-2 d-block"></i>
                    لا توجد طلبات بعد
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Orders