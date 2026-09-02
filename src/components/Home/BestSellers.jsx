import React, { useEffect, useState } from 'react'
import ProductCard from '../Common/ProductCard'
import SectionTitle from '../Common/SectionTitle'
import { readProducts } from '../../data/catalog'

function BestSellers() {
  const [products, setProducts] = useState(() => readProducts())

  useEffect(() => {
    const sync = () => setProducts(readProducts())
    window.addEventListener('pharmacy-products-changed', sync)
    return () => window.removeEventListener('pharmacy-products-changed', sync)
  }, [])

  const bestSellers = products.slice(0, 4)

  return (
    <section className="py-5">
      <div className="container">
        <SectionTitle 
          subtitle=" منتجات   الجديده" 
          title="المنتجات الجديده" 
          icon={<i className="bi bi-heart-fill text-danger fs-4"></i>}
        />
        <div className="row g-4">
          {bestSellers.map(product => (
            <div key={product.id} className="col-6 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestSellers