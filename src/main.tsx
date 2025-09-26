import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginAdmin from './pages/loginAdmin/loginAdmin'
import AdminLayout from './components/adminLayout/adminLayout'
import Overview from './pages/overview/Overview.tsx'
import BusinessOwner from './pages/businessOwners/businessOwner.tsx'
import OrderReview from './pages/orderReview/orderReview.tsx'
import Analytics from './pages/analytics/analytics.tsx'

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

import CustomerNavbar from './components/Navbar';
import TrackYourOrder from './pages/trackYourOrder/TrackYourOrder';
import Help from './pages/help/Help';
import ShipmentDetails from './pages/shippmentDetails/ShipmentDetails';
import RescheduleShipment from './pages/reschedule/RescheduleShipment';

const AppContent: React.FC = () => {
  const location = useLocation();

  const isBusinessOwnerRoute =
    location.pathname === '/dashboard' ||
    location.pathname === '/create-order' ||
    location.pathname === '/review-order' ||
    location.pathname === '/payment' ||
    location.pathname === '/order-status' ||
    location.pathname === '/support' ||
    location.pathname === '/login' ||
    location.pathname === '/signup';

  const isClientRoute = location.pathname === '/' ||
    location.pathname === '/help' ||
    location.pathname.startsWith('/shipment');
  
  const isDashboardRoute = location.pathname === '/dashboard';
  const isCreateOrderRoute = location.pathname === '/create-order';
  const isReviewOrderRoute = location.pathname === '/review-order';
  const isPaymentRoute = location.pathname === '/payment';
  const isOrderStatusRoute = location.pathname === '/order-status';
  const isSupportRoute = location.pathname === '/support';
  
  const showBusinessNavbar = isBusinessOwnerRoute && !isCreateOrderRoute && !isReviewOrderRoute && !isPaymentRoute && !isOrderStatusRoute;
  const showBusinessFooter = isDashboardRoute;
  
  return (
    <>
      {showBusinessNavbar && (isDashboardRoute || isSupportRoute ? <HomeNavbar /> : <AuthNavbar />)}

      {isClientRoute && <CustomerNavbar />}
      
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/review-order" element={<ReviewOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/help" element={<Help />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/tracking" element={<TrackYourOrder />} />
        <Route path="/help" element={<Help />} />
        <Route path="/shipment/:id" element={<ShipmentDetails />} />
        <Route path="/shipment/:id/reschedule" element={<RescheduleShipment />} />
      </Routes>

      {showBusinessFooter && <Footer />}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginAdmin />} />
        <Route path="/admin-login" element={<LoginAdmin />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Overview />} />
          <Route path="business-owners" element={<BusinessOwner />} />
          <Route path="orders" element={<OrderReview />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        
      </Routes>
    </Router>
    <Router>
      <AppContent />
    </Router>
  </React.StrictMode>
)