import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAdmin from './pages/loginAdmin/loginAdmin'
import AdminLayout from './components/adminLayout/adminLayout'
import Overview from './pages/overview/Overview.tsx'
import BusinessOwner from './pages/businessOwners/businessOwner.tsx'
// import OrderReview from './pages/orderReview/OrderReview'
import Analytics from './pages/analytics/analytics.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/admin-login" element={<LoginAdmin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Overview />} />
          <Route path="business-owners" element={<BusinessOwner />} />
          {/* <Route path="orders" element={<OrderReview />} /> */}
          <Route path="analytics" element={<Analytics />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>
        
      </Routes>
    </Router>
  </React.StrictMode>
)