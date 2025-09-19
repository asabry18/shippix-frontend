import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/home/Dashboard';
import CreateOrder from './pages/createOrder/CreateOrder';
import AuthNavbar from './components/authNavbar/navbar.tsx';
import HomeNavbar from './components/homeNavbar/navbar.tsx';
import Footer from './components/Footer/Footer';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/' || location.pathname === '/dashboard';
  const isCreateOrderRoute = location.pathname === '/create-order';
  const showNavbar = !isCreateOrderRoute;
  const showFooter = isDashboardRoute;
  
  return (
    <>
      {showNavbar && (isDashboardRoute ? <HomeNavbar /> : <AuthNavbar />)}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppContent />
    </Router>
  </React.StrictMode>
)