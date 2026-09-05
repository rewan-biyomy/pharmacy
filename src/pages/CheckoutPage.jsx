import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../store/slices/cartSlice'
import { createOrder } from '../store/slices/orderSlice'
import { readSettings } from '../data/settings'

function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items, totalPrice } = useSelector(state => state.cart)
  const settings = readSettings()
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    building: '',
    floor: '',
    apartment: '',
    notes: '',
    paymentMethod: 'cod',
    deliveryMethod: 'home',
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (items.length === 0) {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h1 className="fw-bold mb-2">إتمام الطلب</h1>
          </div>
        </div>
        <section className="py-5">
          <div className="container text-center py-5">
            <i className="bi bi-cart-x fs-1 text-muted mb-3 d-block"></i>
            <h3 className="text-muted">السلة فارغة</h3>
            <p className="text-muted">أضف منتجات للسلة أولاً</p>
          </div>
        </section>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'الاسم مطلوب'
    if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب'
    else if (!/^(01)[0-9]{9}$/.test(formData.phone)) newErrors.phone = 'رقم هاتف غير صحيح'
    if (!formData.address.trim()) newErrors.address = 'العنوان مطلوب'
    if (!formData.city.trim()) newErrors.city = 'المدينة مطلوبة'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    
    const deliveryFee = formData.deliveryMethod === 'express'
      ? Number(settings.expressDelivery || 0)
      : Number(settings.standardDelivery || 0)

    const orderData = {
      customer: formData,
      notes: formData.notes.trim().slice(0, 500),
      items: items,
      total: totalPrice,
      deliveryFee,
      grandTotal: totalPrice + deliveryFee,
    }

    dispatch(createOrder(orderData))
    dispatch(clearCart())
    navigate('/order-success')
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 className="fw-bold mb-2">إتمام الطلب</h1>
          <p className="mb-0 opacity-75">أدخل بياناتك لتوصيل الطلب</p>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-lg-8">
                {/* بيانات العميل */}
                <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                  <h5 className="fw-bold mb-4">
                    <i className="bi bi-person ms-2 text-pharma-primary"></i>
                    بيانات العميل
                  </h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">الاسم بالكامل *</label>
                      <input 
                        type="text" 
                        name="fullName" 
                        className={`form-control form-control-lg ${errors.fullName ? 'is-invalid' : ''}`}
                        placeholder="محمد أحمد" 
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">رقم الهاتف *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                        placeholder="01234567890" 
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">البريد الإلكتروني (اختياري)</label>
                      <input 
                        type="email" 
                        name="email" 
                        className="form-control form-control-lg"
                        placeholder="example@email.com" 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* عنوان التوصيل */}
                <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                  <h5 className="fw-bold mb-4">
                    <i className="bi bi-geo-alt ms-2 text-pharma-primary"></i>
                    عنوان التوصيل
                  </h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-bold">المدينة *</label>
                      <select
                        name="city"
                        className={`form-select form-select-lg ${errors.city ? 'is-invalid' : ''}`}
                        value={formData.city}
                        onChange={handleChange}
                      >
                        <option value="">اختر المحافظة</option>
                        <option value="القاهرة">القاهرة</option>
                        <option value="الإسكندرية">الإسكندرية</option>
                        <option value="الجيزة">الجيزة</option>
                        <option value="الدقهلية">الدقهلية</option>
                        <option value="البحيرة">البحيرة</option>
                        <option value="الشرقية">الشرقية</option>
                        <option value="الغربية">الغربية</option>
                        <option value="المنوفية">المنوفية</option>
                        <option value="القليوبية">القليوبية</option>
                        <option value="الأسكندرية">الأسكندرية</option>
                        <option value="المنيا">المنيا</option>
                        <option value="أسيوط">أسيوط</option>
                        <option value="بني سويف">بني سويف</option>
                        <option value="سوهاج">سوهاج</option>
                        <option value="قنا">قنا</option>
                        <option value="الأقصر">الأقصر</option>
                        <option value="أسوان">أسوان</option>
                        <option value="الفيوم">الفيوم</option>
                        <option value="دمياط">دمياط</option>
                        <option value="كفر الشيخ">كفر الشيخ</option>
                        <option value="بورسعيد">بورسعيد</option>
                        <option value="الإسماعيلية">الإسماعيلية</option>
                        <option value="السويس">السويس</option>
                        <option value="الجيزة">الجيزة</option>
                        <option value="بني سويف">بني سويف</option>
                        <option value="الوادى الجديد">الوادي الجديد</option>
                        <option value="المنيا">المنيا</option>
                        <option value="الشرقية">الشرقية</option>
                        <option value="الأقصر">الأقصر</option>
                        <option value="شمال سيناء">شمال سيناء</option>
                        <option value="جنوب سيناء">جنوب سيناء</option>
                        <option value="رأس البر">رأس البر</option>
                        <option value="مرسى مطروح">مرسى مطروح</option>
                        <option value="أخرى">أخرى</option>
                      </select>
                      {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-bold">المنطقة / الحي *</label>
                      <input 
                        type="text" 
                        name="address" 
                        className={`form-control form-control-lg ${errors.address ? 'is-invalid' : ''}`}
                        placeholder="شارع النصر، حي مصر الجديدة" 
                        value={formData.address}
                        onChange={handleChange}
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">رقم العمارة</label>
                      <input type="text" name="building" className="form-control form-control-lg" placeholder="15" value={formData.building} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">الدور</label>
                      <input type="text" name="floor" className="form-control form-control-lg" placeholder="3" value={formData.floor} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-bold">الشقة</label>
                      <input type="text" name="apartment" className="form-control form-control-lg" placeholder="5" value={formData.apartment} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-bold">ملاحظات إضافية (اختياري)</label>
                      <textarea name="notes" className="form-control" rows="3" placeholder="أي تعليمات خاصة بالتوصيل..." value={formData.notes} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                {/* طريقة التوصيل */}
                <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                  <h5 className="fw-bold mb-4">
                    <i className="bi bi-truck ms-2 text-pharma-primary"></i>
                    طريقة التوصيل
                  </h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div 
                        className={`p-3 rounded-3 border ${formData.deliveryMethod === 'home' ? 'border-pharma-primary bg-pharma-light' : 'border-secondary-subtle'}`}
                        onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'home' }))}
                        style={{cursor: 'pointer'}}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                            <i className="bi bi-house-door fs-4 text-pharma-primary"></i>
                          </div>
                          <div>
                            <h6 className="fw-bold mb-1">توصيل للمنزل</h6>
                            <p className="text-muted small mb-0">التوصيل خلال 24-48 ساعة</p>
                            <span className="text-success fw-bold small">مجاني</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div 
                        className={`p-3 rounded-3 border ${formData.deliveryMethod === 'express' ? 'border-pharma-primary bg-pharma-light' : 'border-secondary-subtle'}`}
                        onClick={() => setFormData(prev => ({ ...prev, deliveryMethod: 'express' }))}
                        style={{cursor: 'pointer'}}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                            <i className="bi bi-lightning fs-4 text-pharma-primary"></i>
                          </div>
                          <div>
                            <h6 className="fw-bold mb-1">توصيل سريع</h6>
                            <p className="text-muted small mb-0">التوصيل خلال 2-4 ساعات</p>
                            <span className="text-pharma-primary fw-bold small">50 ج.م</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* طريقة الدفع */}
                <div className="bg-white rounded-4 shadow-sm p-4">
                  <h5 className="fw-bold mb-4">
                    <i className="bi bi-credit-card ms-2 text-pharma-primary"></i>
                    طريقة الدفع
                  </h5>
                  <div className="p-3 rounded-3 border border-pharma-primary bg-pharma-light">
                    <div className="d-flex align-items-center gap-3">
                      <i className="bi bi-cash-stack fs-3 text-pharma-primary"></i>
                      <div>
                        <h6 className="fw-bold mb-1">الدفع عند الاستلام</h6>
                        <p className="text-muted small mb-0">ادفع نقداً عند استلام الطلب</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ملخص الطلب */}
              <div className="col-lg-4">
                <div className="bg-white rounded-4 shadow-sm p-4 sticky-top" style={{top: '100px'}}>
                  <h5 className="fw-bold mb-4">
                    <i className="bi bi-receipt ms-2 text-pharma-primary"></i>
                    ملخص الطلب
                  </h5>
                  
                  <div className="mb-3">
                    {items.map(item => (
                      <div key={item.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                        <div className="d-flex align-items-center gap-2">
                          <img src={item.image} alt={item.name} className="rounded-2" style={{width: '40px', height: '40px', objectFit: 'cover'}} />
                          <div>
                            <p className="mb-0 small fw-bold" style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px'}}>{item.name}</p>
                            <p className="mb-0 text-muted" style={{fontSize: '12px'}}>x{item.quantity}</p>
                          </div>
                        </div>
                        <span className="fw-bold small">{(item.price * item.quantity).toFixed(2)} ج.م</span>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">المجموع</span>
                    <span className="fw-bold">{totalPrice.toFixed(2)} ج.م</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">التوصيل</span>
                    <span className="text-success fw-bold">
                      {formData.deliveryMethod === 'express'
                        ? `${Number(settings.expressDelivery || 0).toFixed(2)} ج.م`
                        : Number(settings.standardDelivery || 0) === 0
                          ? 'مجاني'
                          : `${Number(settings.standardDelivery || 0).toFixed(2)} ج.م`}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold">الإجمالي</span>
                    <span className="price fs-4">{(totalPrice + (formData.deliveryMethod === 'express' ? Number(settings.expressDelivery || 0) : Number(settings.standardDelivery || 0))).toFixed(2)} ج.م</span>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-pharma w-100 btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm ms-2"></span>
                        جاري إتمام الطلب...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle ms-2"></i>
                        تأكيد الطلب
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default CheckoutPage