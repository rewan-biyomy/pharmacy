import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { readSettings } from '../../data/settings'

function Footer() {
  const [settings, setSettings] = useState(() => readSettings())

  useEffect(() => {
    const sync = () => setSettings(readSettings())
    window.addEventListener('pharmacy-settings-updated', sync)
    return () => window.removeEventListener('pharmacy-settings-updated', sync)
  }, [])

  return (
    <footer className="footer-dark pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h4 className="mb-3 d-flex align-items-center gap-2">
              <img src="/images/logo.png" alt={settings.pharmacyName} className="footer-logo" />
              {settings.pharmacyName}
            </h4>
            <p className="text-white-50">
              خبرة تهتم بصحتك. وجهتك الأولى للأدوية والمكملات الغذائية والأجهزة الطبية بأفضل الأسعار.
            </p>
          </div>
          <div className="col-lg-2 col-md-6">
            <h6 className="mb-3">روابط سريعة</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/">الرئيسية</Link></li>
              <li className="mb-2"><Link to="/shop">المتجر</Link></li>
              <li className="mb-2"><Link to="/cart">سلة المشتريات</Link></li>
              <li className="mb-2"><Link to="/wishlist">المفضلة</Link></li>
              <li className="mb-2"><Link to="/contact">تواصل معنا</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h6 className="mb-3">خدمة العملاء</h6>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2"><i className="bi bi-envelope ms-2"></i> {settings.email || 'info@alfarazdaq.com'}</li>
              <li className="mb-2"><i className="bi bi-telephone ms-2"></i> {settings.phone}</li>
              <li className="mb-2"><i className="bi bi-clock ms-2"></i> السبت - الخميس: 9ص - 11م</li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-secondary" />
        <div className="text-center text-white-50 small">
          © 2026 {settings.pharmacyName}. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
}

export default Footer