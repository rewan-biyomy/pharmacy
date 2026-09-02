function ContactPage() {
  return (
    <div>
      {/* <div className="page-header">
        <div className="container">
          <h1 className="fw-bold mb-2">تواصل معنا</h1>
          <p className="mb-0 opacity-75">نحن هنا لمساعدتك على مدار الساعة</p>
        </div>
      </div> */}

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bg-white rounded-4 shadow-sm p-4 h-100">
                <h4 className="fw-bold mb-4">معلومات التواصل</h4>
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="bg-pharma-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '50px', height: '50px'}}>
                    <i className="bi bi-geo-alt-fill text-pharma-primary fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">العنوان</h6>
                    <p className="text-muted mb-0"> بني سويف، ميدان حارث، بجوار عيادة الدكتور جاب الله , Beni Suef, Egypt</p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="bg-pharma-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '50px', height: '50px'}}>
                    <i className="bi bi-telephone-fill text-pharma-primary fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">الهاتف</h6>
                    <p className="text-muted mb-0">‏010 38912222‏</p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="bg-pharma-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '50px', height: '50px'}}>
                    <i className="bi bi-envelope-fill text-pharma-primary fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">البريد الإلكتروني</h6>
                    <p className="text-muted mb-0">info@rawdapharmacy.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="bg-pharma-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width: '50px', height: '50px'}}>
                    <i className="bi bi-clock-fill text-pharma-primary fs-5"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">مواعيد العمل</h6>
                    <p className="text-muted mb-0">السبت - الخميس: 9:00 ص - 11:00 م</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage