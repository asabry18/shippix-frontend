import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/payment/back.svg';
import approveIcon from '../../assets/orderStatus/approve.svg';
import waitingIcon from '../../assets/orderStatus/waiting.svg';
import pickupIcon from '../../assets/orderStatus/pickup.svg';
import inTransitIcon from '../../assets/orderStatus/inTransit.svg';
import shippedIcon from '../../assets/orderStatus/shipped.svg';
import './orderStatus.css';

interface OrderStatusData {
  orderId: string;
  customerName: string;
  status: string;
  deliveryAddress: string;
}

interface StatusStep {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
}

const OrderStatus: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const orderData: OrderStatusData | null = location.state?.orderData || null;

  const orderId = orderData?.orderId;
  const customerName = orderData?.customerName;
  const deliveryAddress = orderData?.deliveryAddress;
  const currentStatus = orderData?.status;

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleContactSupport = () => {
    console.log('Contact Support clicked');
  };

  const statusSteps: StatusStep[] = [
    {
      id: 'payment',
      title: 'Payment Confirmed',
      description: 'Payment has been processed successfully',
      timestamp: '8/14/2025, 8:33:41 PM',
      icon: approveIcon,
      isCompleted: true,
      isActive: false
    },
    {
      id: 'approval',
      title: 'Awaiting Approval',
      description: 'Under review by our shipping team',
      timestamp: '',
      icon: waitingIcon,
      isCompleted: false,
      isActive: true
    },
    {
      id: 'ready',
      title: 'Approved & Ready',
      description: 'Order approved and ready for shipping',
      timestamp: '8/14/2025, 8:33:48 PM',
      icon: approveIcon,
      isCompleted: false,
      isActive: false
    },
    {
      id: 'pickup',
      title: 'Pickup Scheduled',
      description: 'Carrier pickup has been scheduled',
      timestamp: '8/14/2025, 8:43:52 PM',
      icon: pickupIcon,
      isCompleted: false,
      isActive: false
    },
    {
      id: 'transit',
      title: 'In Transit',
      description: 'Package is on its way to destination',
      timestamp: '',
      icon: inTransitIcon,
      isCompleted: false,
      isActive: false
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: 'Package delivered successfully',
      timestamp: '',
      icon: shippedIcon,
      isCompleted: false,
      isActive: false
    }
  ];
  return (
    <Container className="py-4 px-3 order-status-container">
      <div className="order-status-content">
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center">
                <Button variant="link" className="back-btn p-0 me-3" onClick={handleBackToDashboard}>
                    <img src={backIcon} alt="Back" className="back-icon" />
                </Button>
                <h2 className="status-page-title mb-0">Shipment Status</h2>
            </div>
            <p className="order-id-text m-0">Order #{orderId}</p>
          </Col>
        </Row>

        <Row>

          <Col lg={7}>
            <Card className="progress-card rounded-4">
              <Card.Body className="p-4">
                <h5 className="progress-title mb-4">Shipment Progress</h5>
                
                <div className="progress-timeline">
                  {statusSteps.map((step, index) => (
                    <div key={step.id} className={`timeline-step d-flex align-items-center mb-4 ${step.isCompleted ? 'completed' : ''} ${step.isActive ? 'active' : ''}`}>
                      <div className="step-indicator me-4">
                        <div className="step-icon-container rounded-circle d-flex align-items-center justify-content-center">
                          <img src={step.icon} alt={step.title} className="step-icon" />
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div className={`connecting-line ${step.isCompleted ? 'completed-line' : ''}`}></div>
                        )}
                      </div>
                      
                      <div className="step-content">
                        <div className="d-flex align-items-center mb-1">
                          <h6 className={"step-title mb-0"}>{step.title}</h6>
                          {step.isActive && <div className="active-dot ms-2 rounded-circle"></div>}
                        </div>
                        <p className="step-description">{step.description}</p>
                        {step.timestamp && (
                          <small className="step-timestamp">{step.timestamp}</small>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card className="details-card rounded-4">
              <Card.Body className="p-4">
                <h5 className="details-title mb-4">Order Details</h5>
                <div className="details-divider mb-4">
                    
                    <div className="detail-item d-flex justify-content-between align-items-center mb-3">
                    <span className="detail-label">Customer:</span>
                    <span className="detail-value">{customerName}</span>
                    </div>

                    <div className="detail-item d-flex justify-content-between align-items-center mb-3">
                    <span className="detail-label">Order ID:</span>
                    <span className="detail-value">#{orderId}</span>
                    </div>

                    <div className="detail-item d-flex justify-content-between align-items-center mb-4">
                    <span className="detail-label">Status:</span>
                    <span className="detail-status">{currentStatus}</span>
                    </div>

                    <div className="detail-item d-flex justify-content-between align-items-center mb-4">
                    <span className="detail-label">Delivery Address:</span>
                    <span className="detail-value">{deliveryAddress}</span>
                    </div>
                </div>

                <div className="action-buttons">
                  <Button className="dashboard-btn border-0 w-100 rounded-4 p-3 mb-3" onClick={handleBackToDashboard}>
                    Back to Dashboard
                  </Button>

                  <Button variant="outline-secondary" className="support-btn w-100 rounded-4 p-3" onClick={handleContactSupport}>
                    Contact Support
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default OrderStatus;
