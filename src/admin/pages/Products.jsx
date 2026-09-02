
import { useEffect, useMemo, useState } from 'react'
import { readProducts, writeProducts } from '../../data/catalog'
import { pushNotification } from '../utils/notifications'

const emptyProduct = {
  name: '',
  category: 'فيتامينات',
  price: '',
  oldPrice: '',
  rating: 4.5,
  image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
  sku: `PHR-${Date.now()}`,
  badge: 'جديد',
  stock: 10,
  minStock: 5,
  sales: 0,
}

function Products() {
  const [products, setProducts] = useState(() => readProducts())
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyProduct)

  useEffect(() => {
    writeProducts(products)
  }, [products])

  const categories = useMemo(
    () => ['all', ...new Set(products.map((p) => p.category))],
    [products]
  )

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCategory === 'all' || p.category === filterCategory
    return matchSearch && matchCat
  })

  const openAddForm = () => {
    setEditingId(null)
    setForm({ ...emptyProduct, sku: `PHR-${Date.now()}` })
    setShowForm(true)
  }

  const openEditForm = (product) => {
    setEditingId(product.id)
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice || '',
      rating: product.rating,
      image: product.image,
      sku: product.sku,
      badge: product.badge || '',
      stock: product.stock ?? 10,
      minStock: product.minStock ?? 5,
      sales: product.sales ?? 0,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    const product = products.find((item) => item.id === id)
    setProducts((prev) => prev.filter((item) => item.id !== id))
    pushNotification(`تم حذف المنتج: ${product?.name || 'منتج'}`, { type: 'delete' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim()) {
      return
    }

    const normalized = {
      ...form,
      id: editingId ?? Date.now(),
      name: form.name.trim(),
      price: Number(form.price) || 0,
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      rating: Number(form.rating) || 4.5,
      sku: form.sku || `PHR-${Date.now()}`,
      badge: form.badge || null,
      stock: Number(form.stock) || 0,
      minStock: Number(form.minStock) || 0,
      sales: Number(form.sales) || 0,
    }

    if (editingId) {
      setProducts((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...normalized } : item))
      )
      pushNotification(`تم تعديل المنتج: ${normalized.name}`, { type: 'update' })
    } else {
      setProducts((prev) => [normalized, ...prev])
      pushNotification(`تم إضافة منتج جديد: ${normalized.name}`, { type: 'info' })
    }

    window.dispatchEvent(new Event('pharmacy-products-changed'))

    setShowForm(false)
    setEditingId(null)
    setForm(emptyProduct)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h4 className="fw-bold mb-1">إدارة المنتجات</h4>
          <p className="text-muted mb-0">{products.length} منتج في النظام</p>
        </div>

        <button className="btn btn-pharma" type="button" onClick={openAddForm}>
          <i className="bi bi-plus-lg ms-2"></i>
          منتج جديد
        </button>
      </div>

      <div className="bg-white rounded-4 shadow-sm p-3 mb-4 d-flex flex-wrap gap-3 align-items-center">
        <div className="flex-grow-1" style={{ minWidth: '200px' }}>
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="ابحث عن منتج..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <select
          className="form-select"
          style={{ width: '160px' }}
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">جميع الأقسام</option>
          {categories.filter((c) => c !== 'all').map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-4 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-pharma-light">
              <tr>
                <th className="px-4">المنتج</th>
                <th>القسم</th>
                <th>السعر</th>
                <th>المخزون</th>
                <th>التقييم</th>
                <th className="px-4">الإجراءات</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((product) => {
                const stock = Number(product.stock ?? 0)
                const minStock = Number(product.minStock ?? 5)
                const stockLow = stock <= minStock

                return (
                  <tr key={product.id}>
                    <td className="px-4">
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="rounded-3"
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <div>
                          <p className="fw-bold mb-0">{product.name}</p>
                          <small className="text-muted">{product.sku}</small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge bg-pharma-light text-pharma-primary">{product.category}</span>
                    </td>

                    <td>
                      <span className="fw-bold text-pharma-primary">{Number(product.price).toFixed(2)} ج.م</span>
                      {product.oldPrice && (
                        <small className="text-muted text-decoration-line-through d-block">
                          {Number(product.oldPrice).toFixed(2)} ج.م
                        </small>
                      )}
                    </td>

                    <td>
                      <span className={`badge ${stockLow ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                        {stock}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex align-items-center gap-1">
                        <i className="bi bi-star-fill text-warning small"></i>
                        <span className="fw-bold small">{product.rating}</span>
                      </div>
                    </td>

                    <td className="px-4">
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary rounded-circle"
                          style={{ width: '34px', height: '34px', padding: 0 }}
                          title="تعديل"
                          onClick={() => openEditForm(product)}
                          type="button"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger rounded-circle"
                          style={{ width: '34px', height: '34px', padding: 0 }}
                          title="حذف"
                          onClick={() => handleDelete(product.id)}
                          type="button"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    <i className="bi bi-search fs-2 d-block mb-2"></i>
                    لا توجد منتجات مطابقة للبحث
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="modal d-block" style={{ background: 'rgba(0,0,0,0.45)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 rounded-4">
              <form onSubmit={handleSubmit}>
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-bold">{editingId ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="إغلاق"
                    onClick={() => setShowForm(false)}
                  ></button>
                </div>

                <div className="modal-body row g-3">
                  <div className="col-md-6">
                    <label className="form-label">اسم المنتج</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">القسم</label>
                    <select
                      className="form-select"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    >
                      {['فيتامينات', 'مكملات غذائية', 'أدوية', 'أجهزة طبية', 'العناية بالأطفال', 'الأم والطفل'].map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">السعر</label>
                    <input
                      type="number"
                      className="form-control"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">السعر القديم</label>
                    <input
                      type="number"
                      className="form-control"
                      value={form.oldPrice}
                      onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">التقييم</label>
                    <input
                      type="number"
                      className="form-control"
                      value={form.rating}
                      onChange={(e) => setForm({ ...form, rating: e.target.value })}
                      min="0"
                      max="5"
                      step="0.1"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">المخزون الحالي</label>
                    <input
                      type="number"
                      className="form-control"
                      value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      min="0"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">الحد الأدنى للمخزون</label>
                    <input
                      type="number"
                      className="form-control"
                      value={form.minStock}
                      onChange={(e) => setForm({ ...form, minStock: e.target.value })}
                      min="0"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">SKU</label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.sku}
                      onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">رابط الصورة</label>
                    <input
                      type="url"
                      className="form-control"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-footer border-0">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowForm(false)}>
                    إغلاق
                  </button>
                  <button type="submit" className="btn btn-pharma">
                    {editingId ? 'حفظ التعديلات' : 'إضافة المنتج'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products
