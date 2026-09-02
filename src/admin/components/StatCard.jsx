function StatCard({ title, value, change, icon, color }) {
  const isPositive = change >= 0
  
  return (
    <div className="admin-stat-card bg-white rounded-4 p-4 shadow-sm h-100">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div 
          className="rounded-3 d-flex align-items-center justify-content-center"
          style={{
            width: '48px', 
            height: '48px', 
            background: `rgba(18, 130, 162, 0.1)`,
            color: 'var(--pharma-primary)'
          }}
        >
          <i className={`bi ${icon} fs-4`}></i>
        </div>
        <span className={`badge ${isPositive ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
          <i className={`bi bi-arrow-${isPositive ? 'up' : 'down'} small`}></i>
          {Math.abs(change)}%
        </span>
      </div>
      <h3 className="fw-bold mb-1">{value}</h3>
      <p className="text-muted mb-0 small">{title}</p>
    </div>
  )
}

export default StatCard