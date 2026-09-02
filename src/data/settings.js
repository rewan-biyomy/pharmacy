export const SETTINGS_STORAGE_KEY = 'pharmacy_admin_settings'

export const defaultSettings = {
  pharmacyName: 'صيدلية الفخراني',
  phone: '‏010 38912222‏',
  address: ' بني سويف، ميدان حارث، بجوار عيادة الدكتور جاب الله , Beni Suef, Egypt',
  standardDelivery: 0,
  expressDelivery: 50,
  currency: 'ج.م',
}

export const readSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY)
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : { ...defaultSettings }
  } catch {
    return { ...defaultSettings }
  }
}

export const writeSettings = (nextSettings) => {
  const normalized = { ...defaultSettings, ...(nextSettings || {}) }
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(normalized))
  window.dispatchEvent(new Event('pharmacy-settings-updated'))
  return normalized
}
