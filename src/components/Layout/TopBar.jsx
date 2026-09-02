import { useEffect, useState } from 'react'
import { readSettings } from '../../data/settings'

function TopBar() {
  const [settings, setSettings] = useState(() => readSettings())

  useEffect(() => {
    const sync = () => setSettings(readSettings())
    window.addEventListener('pharmacy-settings-updated', sync)
    return () => window.removeEventListener('pharmacy-settings-updated', sync)
  }, [])

  return (
    <div className="top-bar text-white py-2">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-heart-pulse-fill text-white"></i>
          <small>{settings.pharmacyName} - خبرة تهتم بصحتك</small>
        </div>
        <small className="d-none d-md-block">توصيل مجاني للطلبات فوق 200 ج.م</small>
      </div>
    </div>
  )
}

export default TopBar