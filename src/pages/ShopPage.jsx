import React, { useEffect, useState } from 'react'
import ShopHeader from '../components/Shop/ShopHeader'
import CategoryFilter from '../components/Shop/CategoryFilter'
import ProductGrid from '../components/Shop/ProductGrid'
import Pagination from '../components/Shop/Pagination'
import { readProducts, readCategories } from '../data/catalog'

function ShopPage() {
  const [products, setProducts] = useState(() => readProducts())
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const sync = () => setProducts(readProducts())
    window.addEventListener('pharmacy-products-changed', sync)
    return () => window.removeEventListener('pharmacy-products-changed', sync)
  }, [])

  const filtered = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const start = (currentPage - 1) * itemsPerPage
  const paginated = filtered.slice(start, start + itemsPerPage)

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <ShopHeader />
      <section className="py-5">
        <div className="container">
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
            categories={readCategories()}
          />
          <p className="text-center text-muted mb-4">
            عرض {paginated.length} من {filtered.length} منتج
          </p>
          <ProductGrid products={paginated} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      </section>
    </div>
  )
}

export default ShopPage