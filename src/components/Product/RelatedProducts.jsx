import React from 'react'
import ProductCard from '../Common/ProductCard'
import SectionTitle from '../Common/SectionTitle'

function RelatedProducts({ products }) {
  if (products.length === 0) return null

  return (
    <div className="mt-5 pt-5">
      <SectionTitle subtitle="منتجات ذات صلة" title="قد يعجبك أيضاً" />
      <div className="row g-4">
        {products.map(p => (
          <div key={p.id} className="col-6 col-lg-3">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts