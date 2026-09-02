import { Link } from 'react-router-dom'
function HeroSection() {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="d-flex align-items-center gap-3 mb-4">
                            {/* <img src="/images/logo.png" alt="صيدلية الفخرانى" className="hero-logo" / */}
                            <div>
                                <h1 className="display-5 fw-bold mb-0" style={{ color: 'var(--pharma-dark)' }}>
                                    صيدلية الفخرانى
                                </h1>
                                <p className="text-pharma-primary fw-bold mb-0">خبرة تهتم بصحتك</p>
                            </div>
                        </div>
                        <p className="lead text-muted mb-4">
                            صيدلية الفخراني ... رعاية دوائية متكاملة، وخبرة تثق بها في كل خطوة ��
                        </p>
                        <Link to="/shop" className="btn btn-pharma btn-lg">
                            تسوق الآن <i className="bi bi-arrow-left ms-2"></i>
                        </Link>
                    </div>
                    <div className="col-lg-6 text-center mt-4 mt-lg-0">
                        <img
                            src="https://scontent.fcai19-6.fna.fbcdn.net/v/t39.30808-6/752916661_122096848233407429_4016284517687894448_n.jpg?stp=dst-jpg_tt6&cstp=mx1600x608&ctp=s1600x608&_nc_cat=101&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEGHJhrk70bXAFAb4MXu-7PMiO7EoN92OIyI7sSg33Y4mZGqtF4jIVA4ALWxYcDXclbQ9eGzViMwOlR99hxV_v9&_nc_ohc=KBVAPspUN-UQ7kNvwG9LXu2&_nc_oc=Ado7k_BsREsJb5d1I2IUN73KDWr8v0mBzMFwbKluYWCypX0lCRy2oMSMN2Xx6XzW13k&_nc_zt=23&_nc_ht=scontent.fcai19-6.fna&_nc_gid=SrKX2prHDzUyK5-8GRNJlg&_nc_ss=7b2a8&oh=00_AQIHKFnyjqJpOUgGuVeEuE4Q5HBqess4lbGGNAYNw7TD9g&oe=6A9DE813"
                            alt="صيدلية"
                            className="img-fluid rounded-4 shadow"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection