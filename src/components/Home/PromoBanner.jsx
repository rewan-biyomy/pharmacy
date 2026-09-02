import React from 'react'

function PromoBanner() {
  return (
    <section className="py-4">
      <div className="container">
        <div className="promo-banner d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-3">
            <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
              <i className="bi bi-tag-fill text-pharma-primary fs-3"></i>
            </div>
            <div>
              <small className="d-block opacity-75">عرض حصري لك!</small>
              <h3 className="fw-bold mb-0">خصم 15% على أول طلب</h3>
              <p className="mb-0 opacity-75">استخدم الكود عند الدفع</p>
            </div>
          </div>
          <div className="border border-2 border-white border-dashed rounded-3 px-4 py-2 text-center">
            <small className="d-block opacity-75">الكود:</small>
            <h4 className="fw-bold mb-0">WELCOME15</h4>
            <small className="opacity-75">صالح لـ 7 أيام</small>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PromoBanner