import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAdmin from './pages/loginAdmin/loginAdmin'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/admin-login" element={<LoginAdmin />} />
      </Routes>
    </Router>
  </React.StrictMode>
)