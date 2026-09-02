import React, { useEffect, useState } from 'react'
import ProductCard from '../Common/ProductCard'
import SectionTitle from '../Common/SectionTitle'
import { readProducts } from '../../data/catalog'

function NewArrivals() {
  const [products, setProducts] = useState(() => readProducts())

  useEffect(() => {
    const sync = () => setProducts(readProducts())
    window.addEventListener('pharmacy-products-changed', sync)
    return () => window.removeEventListener('pharmacy-products-changed', sync)
  }, [])

  const newArrivals = products.slice(4, 8)

  return (
    <section className="py-5">
      <div className="container">
        <SectionTitle subtitle="منتجات  " title=" اطلع على  المنتجات" />
        <div className="row g-4">
          {newArrivals.map(product => (
            <div key={product.id} className="col-6 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewArrivals