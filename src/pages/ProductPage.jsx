import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductImages from '../components/Product/ProductImages'
import ProductInfo from '../components/Product/ProductInfo'
import RelatedProducts from '../components/Product/RelatedProducts'
import { readProducts } from '../data/catalog'

function ProductPage() {
  const { id } = useParams()
  const [products, setProducts] = useState(() => readProducts())

  useEffect(() => {
    const sync = () => setProducts(readProducts())
    window.addEventListener('pharmacy-products-changed', sync)
    return () => window.removeEventListener('pharmacy-products-changed', sync)
  }, [])

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>المنتج غير موجود</h2>
        <Link to="/shop" className="btn btn-pharma mt-3">العودة للمتجر</Link>
      </div>
    )
  }

  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 2)

  return (
    <div>
      <div className="bg-white border-bottom py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link to="/">الرئيسية</Link></li>
              <li className="breadcrumb-item"><Link to="/shop">المتجر</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <ProductImages product={product} />
            </div>
            <div className="col-lg-7">
              <ProductInfo product={product} />
            </div>
          </div>
          <RelatedProducts products={related} />
        </div>
      </section>
    </div>
  )
}

export default ProductPage