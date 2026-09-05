import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../store/slices/cartSlice'
import { clearCurrentOrder } from '../store/slices/orderSlice'

function OrderSuccessPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentOrder = useSelector((state) => state.order.currentOrder)

  useEffect(() => {
    if (!currentOrder) {
      navigate('/')
    }
  }, [currentOrder, navigate])

  if (!currentOrder) return null

  const handleEditOrder = () => {
    navigate('/checkout')
  }

  const handleDeleteOrder = () => {
    dispatch(clearCurrentOrder())
    navigate('/shop')
  }

  return (
    <div>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 text-center">
              <div className="bg-white rounded-4 shadow-sm p-5">
                <div className="mb-4">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '80px' }}></i>
                </div>
                <h2 className="fw-bold mb-3">تم تأكيد طلبك بنجاح!</h2>
                <p className="text-muted mb-4">
                  تم تسجيل طلبك بنجاح، ويمكنك مراجعة التفاصيل أو تعديل الطلب قبل تأكيد التوصيل.
                </p>

                <div className="alert alert-success text-start mb-4">
                  <i className="bi bi-bag-check-fill ms-2"></i>
                  تم استلام طلبك بنجاح وسيتم تجهيز الطلب في أقرب وقت.
                </div>

                <div className="bg-pharma-light rounded-3 p-4 mb-4 text-start">
                  <h6 className="fw-bold mb-3">الفاتورة</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <span className="text-muted d-block">رقم الطلب</span>
                      <span className="fw-bold">#{currentOrder.id.slice(-6)}</span>
                    </div>
                    <div className="col-md-6">
                      <span className="text-muted d-block">الحالة</span>
                      <span className="badge bg-warning text-dark">قيد المراجعة</span>
                    </div>
                    <div className="col-md-6">
                      <span className="text-muted d-block">العميل</span>
                      <span className="fw-bold">{currentOrder.customer.fullName}</span>
                    </div>
                    <div className="col-md-6">
                      <span className="text-muted d-block">الهاتف</span>
                      <span className="fw-bold">{currentOrder.customer.phone}</span>
                    </div>
                    <div className="col-12">
                      <span className="text-muted d-block">العنوان</span>
                      <span className="fw-bold">{currentOrder.customer.city} - {currentOrder.customer.address}</span>
                    </div>
                    {(currentOrder.notes || currentOrder.customer?.notes) && (
                      <div className="col-12">
                        <span className="text-muted d-block">ملاحظات التوصيل</span>
                        <span className="fw-bold text-break">{currentOrder.notes || currentOrder.customer.notes}</span>
                      </div>
                    )}
                  </div>

                  <hr className="my-3" />
                  <div className="d-grid gap-2">
                    {currentOrder.items?.map((item) => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom pb-2">
                        <div>
                          <span className="fw-bold">{item.name}</span>
                          <small className="d-block text-muted">الكمية: {item.quantity}</small>
                        </div>
                        <span className="fw-bold text-pharma-primary">{(item.price * item.quantity).toFixed(2)} ج.م</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 d-flex justify-content-between">
                    <span className="text-muted">المجموع</span>
                    <span className="fw-bold">{Number(currentOrder.total || 0).toFixed(2)} ج.م</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">التوصيل</span>
                    <span className="fw-bold">{Number(currentOrder.deliveryFee || 0).toFixed(2)} ج.م</span>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-2 mt-2">
                    <span className="fw-bold">الإجمالي</span>
                    <span className="fw-bold text-pharma-primary fs-5">{Number(currentOrder.grandTotal || 0).toFixed(2)} ج.م</span>
                  </div>
                </div>

                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <button type="button" className="btn btn-outline-secondary" onClick={handleEditOrder}>
                    <i className="bi bi-pencil-square ms-2"></i>
                    تعديل الطلب
                  </button>
                  <button type="button" className="btn btn-outline-danger" onClick={handleDeleteOrder}>
                    <i className="bi bi-trash ms-2"></i>
                    حذف الطلب
                  </button>
                  <Link to="/shop" className="btn btn-pharma">
                    <i className="bi bi-shop ms-2"></i>
                    مواصلة التسوق
                  </Link>
                  <a
                    href="https://wa.me/+201234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success"
                  >
                    <i className="bi bi-whatsapp ms-2"></i>
                    تواصل معنا
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default OrderSuccessPage