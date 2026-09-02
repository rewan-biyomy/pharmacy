
import { useEffect, useState } from 'react'
import { pushNotification } from '../utils/notifications'
import { readSettings, writeSettings, defaultSettings } from '../../data/settings'

function Settings() {
  const [form, setForm] = useState(() => readSettings())

  useEffect(() => {
    const sync = () => setForm(readSettings())
    window.addEventListener('pharmacy-settings-updated', sync)
    return () => window.removeEventListener('pharmacy-settings-updated', sync)
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    writeSettings(form)
    pushNotification('تم حفظ إعدادات النظام بنجاح', { type: 'info' })
  }

  const updateField = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <form onSubmit={handleSave}>
      <h4 className="fw-bold mb-4">إعدادات النظام</h4>

      <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
        <h6 className="fw-bold mb-3">معلومات الصيدلية</h6>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">اسم الصيدلية</label>
            <input
              type="text"
              className="form-control"
              value={form.pharmacyName}
              onChange={updateField('pharmacyName')}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">رقم الهاتف</label>
            <input
              type="tel"
              className="form-control"
              value={form.phone}
              onChange={updateField('phone')}
            />
          </div>

          <div className="col-12">
            <label className="form-label">العنوان</label>
            <input
              type="text"
              className="form-control"
              value={form.address}
              onChange={updateField('address')}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-4">
        <h6 className="fw-bold mb-3">إعدادات التوصيل</h6>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">رسوم التوصيل العادية</label>
            <input
              type="number"
              className="form-control"
              value={form.standardDelivery}
              onChange={updateField('standardDelivery')}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">رسوم التوصيل السريع</label>
            <input
              type="number"
              className="form-control"
              value={form.expressDelivery}
              onChange={updateField('expressDelivery')}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-pharma mt-3">
          حفظ التغييرات
        </button>
      </div>
    </form>
  )
}

export default Settings

