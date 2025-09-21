import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/createOrderIcon/back.svg';
import personIcon from '../../assets/createOrderIcon/person.svg';
import locationIcon from '../../assets/createOrderIcon/location.svg';
import packageIcon from '../../assets/createOrderIcon/package.svg';
import dollarIcon from '../../assets/createOrderIcon/dollar.svg';
import editIcon from '../../assets/reviewOrderIcons/edit.svg';
import saveIcon from '../../assets/reviewOrderIcons/save.svg';
import './reviewOrder.css';

interface OrderData {
  customerName: string;
  emailAddress: string;
  phoneNumber: string;
  streetAddress: string;
  city: string;
  notesToDriver: string;
  itemsDescription: string;
  packageValue: string;
  totalWeight: string;
  shippingCost: number;
  totalDistance: number;
  orderId?: string;
}

const ReviewOrder: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const orderData: OrderData | null = location.state?.orderData || null;
  const orderId = orderData?.orderId || "123456";

  if (!orderData) {
    return (
      <Container >
        <div className="review-order-no-data pt-5">
          <div className="text-center" >
            <h3>No Order Data Found</h3>
            <p>Please go back and create an order first.</p>
            <Button onClick={() => navigate('/create-order')}>
              Create Order
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  const handleBackToEdit = () => {
    navigate('/create-order', { state: { formData: orderData } });
  };

  const handleApproveShipment = () => {
    const paymentData = {
      customerName: orderData.customerName,
      orderId: orderId,
      shippingCost: orderData.shippingCost
    };
    navigate('/payment', { state: { paymentData } });
  };

  const handleEditOrderDetails = () => {
    navigate('/create-order', { state: { formData: orderData } });
  };

  const handleSaveAsDraft = () => {
    console.log('Order saved as draft:', orderData);
    navigate('/dashboard');
  };

  return (
    <Container className="py-4 px-3 review-order-container">
      <div className="review-order-content">
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-center">
                <Button variant="link" className="back-btn p-0 me-2" onClick={handleBackToEdit}>
                    <img src={backIcon} alt="Back" className="back-icon" />
                </Button>
              <h2 className="review-title mb-0">Review Order</h2>
            </div>
            <p className="order-id m-0">Order #{orderId}</p>
          </Col>
        </Row>

        <Row>

          <Col lg={8}>
            <Card className="info-card mb-4 rounded-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img src={personIcon} alt="Customer" className="section-icon me-2" />
                  <h5 className="section-title mb-0">Customer Information</h5>
                </div>
                <Row>
                  <Col md={6}>
                    <div className="info-item mb-3">
                      <span className="info-label">Name</span>
                      <span className="info-value">{orderData.customerName}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Phone Number</span>
                      <span className="info-value">{orderData.phoneNumber}</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-item mb-3">
                      <span className="info-label">Email Address</span>
                      <span className="info-value">{orderData.emailAddress}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Order Date</span>
                      <span className="info-value">14-8-2025</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="info-card rounded-4 mb-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img src={locationIcon} alt="Location" className="section-icon me-2" />
                  <h5 className="section-title mb-0">Delivery Information</h5>
                </div>
                <Row>
                  <Col md={6}>
                    <div className="info-item mb-3">
                      <span className="info-label">Street Address</span>
                      <span className="info-value">{orderData.streetAddress}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Total Distance (Km)</span>
                      <span className="info-value">{orderData.totalDistance}</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-item">
                      <span className="info-label">City</span>
                      <span className="info-value">{orderData.city}</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="info-card rounded-4 mb-4">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <img src={packageIcon} alt="Package" className="section-icon me-2" />
                  <h5 className="section-title mb-0">Package Information</h5>
                </div>
                <Row>
                  <Col md={6}>
                    <div className="info-item mb-3">
                      <span className="info-label">Items Description</span>
                      <span className="info-value">{orderData.itemsDescription}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Package Value (EGP)</span>
                      <span className="info-value">{orderData.packageValue}</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="info-item">
                      <span className="info-label">Total Weight (kg)</span>
                      <span className="info-value">{orderData.totalWeight}</span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="cost-card rounded-4 mb-4">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <img src={dollarIcon} alt="Cost" className="cost-icon me-2" />
                  <h5 className="cost-title mb-0">Shipping Cost</h5>
                </div>
                <h4 className="cost-amount mt-2 mb-0">{orderData.shippingCost.toFixed(2)} EGP</h4>
              </Card.Body>
            </Card>

            <Card className="status-card rounded-4 mb-4">
              <Card.Body>
                <h5 className="status-title">Order Status</h5>
                <div className="status-indicator">
                  <div className="status-icon">
                    <div className="spinner"></div>
                  </div>
                  <div className="status-content">
                    <span className="status-label rounded-4">processing</span>
                    <small className="status-description">Awaiting review and approval</small>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <div className="action-buttons-container">
              <Button className="approve-btn rounded-4 w-100 p-3 border-0 mb-3" onClick={handleApproveShipment}>
                <span className="btn-icon me-2">✓</span>
                Approve & Create Shipment
              </Button>

              <Button variant="outline-secondary" className="edit-btn rounded-4 w-100 p-3 text-dark d-flex align-items-center justify-content-center mb-3" onClick={handleEditOrderDetails}>
                <img src={editIcon} alt="Edit" className="btn-icon-svg me-2" />
                Edit Order Details
              </Button>

              <Button variant="outline-secondary" className="draft-btn rounded-4 w-100 p-3 text-dark d-flex align-items-center justify-content-center" onClick={handleSaveAsDraft}>
                <img src={saveIcon} alt="Save" className="btn-icon-svg me-2" />
                Save as Draft
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ReviewOrder;