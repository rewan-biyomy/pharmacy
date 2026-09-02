import React from 'react'

const features = [
  { icon: 'bi-truck', title: 'توصيل مجاني', desc: 'للطلبات فوق 200 ج.م' },
  { icon: 'bi-shield-check', title: 'دفع آمن', desc: '100% حماية معتمدة' },
  { icon: 'bi-arrow-repeat', title: 'استرجاع سهل', desc: 'سياسة استرجاع 14 يوم' },
  { icon: 'bi-headset', title: 'دعم 24/7', desc: 'فريق متخصص جاهز' },
]

function FeaturesBar() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row g-4 text-center">
          {features.map((f, i) => (
            <div key={i} className="col-6 col-lg-3">
              <i className={`bi ${f.icon} text-pharma-primary fs-2 mb-2 d-block`}></i>
              <h6 className="fw-bold mb-1">{f.title}</h6>
              <p className="text-muted small mb-0">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesBar