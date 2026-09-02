import React from 'react'

const bottomFeatures = [
  { icon: 'bi-check-circle', title: 'منتجات أصلية', desc: 'مرخصة من وزارة الصحة' },
  { icon: 'bi-percent', title: 'أسعار تنافسية', desc: 'أفضل قيمة لنقودك' },
  { icon: 'bi-truck', title: 'توصيل سريع', desc: 'خلال 24-48 ساعة' },
  { icon: 'bi-emoji-smile', title: 'رضا العملاء', desc: 'هدفنا الأول دائماً' },
]

function BottomFeatures() {
  return (
    <section className="py-4 bg-pharma-primary text-white">
      <div className="container">
        <div className="row g-4 text-center">
          {bottomFeatures.map((f, i) => (
            <div key={i} className="col-6 col-lg-3">
              <i className={`bi ${f.icon} fs-2 mb-2 d-block`}></i>
              <h6 className="fw-bold mb-1">{f.title}</h6>
              <p className="small opacity-75 mb-0">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BottomFeatures