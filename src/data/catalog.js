import { products as seedProducts, categories as seedCategories } from './products'

export const PRODUCT_STORAGE_KEY = 'pharmacy_products'

const normalizeProduct = (product, index) => ({
  ...product,
  id: product.id ?? index + 1,
  stock: Number(product.stock ?? 10),
  minStock: Number(product.minStock ?? 5),
  sales: Number(product.sales ?? 0),
  price: Number(product.price ?? 0),
  oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
  rating: Number(product.rating ?? 4.5),
})

export const readProducts = () => {
  if (typeof window === 'undefined') {
    return seedProducts.map(normalizeProduct)
  }

  try {
    const saved = localStorage.getItem(PRODUCT_STORAGE_KEY)
    if (!saved) {
      localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(seedProducts.map(normalizeProduct)))
      return seedProducts.map(normalizeProduct)
    }

    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed.map(normalizeProduct) : seedProducts.map(normalizeProduct)
  } catch {
    return seedProducts.map(normalizeProduct)
  }
}

export const writeProducts = (items) => {
  if (typeof window === 'undefined') {
    return items
  }

  const normalized = Array.isArray(items) ? items.map(normalizeProduct) : []
  localStorage.setItem(PRODUCT_STORAGE_KEY, JSON.stringify(normalized))
  window.dispatchEvent(new Event('pharmacy-products-changed'))
  return normalized
}

export const readCategories = () => {
  const products = readProducts()
  const generated = [...new Set(products.map((item) => item.category).filter(Boolean))]

  return [
    { id: 'all', name: 'الكل', icon: 'bi-grid' },
    ...generated.map((category) => ({ id: category, name: category, icon: 'bi-bag' })),
  ]
}

export { seedCategories }
