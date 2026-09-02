import React from 'react'

function SectionTitle({ subtitle, title, icon }) {
  return (
    <div className="section-title">
      <small>{subtitle}</small>
      <h2>
        {title}
        {icon && <span className="me-2">{icon}</span>}
      </h2>
    </div>
  )
}

export default SectionTitle