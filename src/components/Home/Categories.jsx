import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../Common/SectionTitle'
import { readCategories } from '../../data/catalog'

function Categories() {
  const [categories, setCategories] = useState(() => readCategories())

  useEffect(() => {
    const sync = () => setCategories(readCategories())
    window.addEventListener('pharmacy-products-changed', sync)
    return () => window.removeEventListener('pharmacy-products-changed', sync)
  }, [])

  return (
    <section className="py-5 bg-pharma-light">
      <div className="container">
        <SectionTitle subtitle="تصفح حسب القسم" title="أقسام الصيدلية" />
        <div className="row g-4 text-center">
          {categories.filter((c) => c.id !== 'all').map((cat) => (
            <div key={cat.id} className="col-4 col-lg-2">
              <Link to="/shop" className="text-decoration-none category-item d-block">
                <div className="category-icon">
                  <i className={`bi ${cat.icon}`}></i>
                </div>
                <h6 className="fw-bold text-dark">{cat.name}</h6>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories