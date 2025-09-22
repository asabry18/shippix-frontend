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
import ReviewOrder from './pages/reviewOrder/reviewOrder.tsx';
import Payment from './pages/payment/payment.tsx';
import OrderStatus from './pages/status/orderStatus.tsx';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/' || location.pathname === '/dashboard';
  const isCreateOrderRoute = location.pathname === '/create-order';
  const isReviewOrderRoute = location.pathname === '/review-order';
  const isPaymentRoute = location.pathname === '/payment';
  const isOrderStatusRoute = location.pathname === '/order-status';
  const showNavbar = !isCreateOrderRoute && !isReviewOrderRoute && !isPaymentRoute && !isOrderStatusRoute;
  const showFooter = isDashboardRoute;
  
  return (
    <>
      {showNavbar && (isDashboardRoute ? <HomeNavbar /> : <AuthNavbar />)}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/review-order" element={<ReviewOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <AppContent />
  </Router>
)