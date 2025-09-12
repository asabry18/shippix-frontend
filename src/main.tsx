import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerNavbar from './components/Navbar';
import TrackYourOrder from './pages/trackYourOrder/TrackYourOrder';
import Help from './pages/help/Help';
import ShipmentDetails from './pages/shippmentDetails/ShipmentDetails';
import RescheduleShipment from './pages/reschedule/RescheduleShipment';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <CustomerNavbar />
      <Routes>
        <Route path="/" element={<TrackYourOrder />} />
        <Route path="/help" element={<Help />} />
        <Route path="/shipment/:id" element={<ShipmentDetails />} />
        <Route path="/shipment/:id/reschedule" element={<RescheduleShipment />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
