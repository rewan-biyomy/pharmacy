import { Outlet, Link, useLocation } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

function AdminLayout() {
  return (
    <div className="admin-layout d-flex" style={{minHeight: '100vh'}}>
      <AdminSidebar />
      <div className="admin-main flex-grow-1 d-flex flex-column">
        <AdminHeader />
        <main className="admin-content p-4 bg-light flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout