import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './ShipmentDetails.css';
import loctionIcon from '../../assets/icons/location.svg';
import clockIcon from '../../assets/clock.svg';
import driverIcon from '../../assets/driver.svg';
import callIcon from '../../assets/call.svg';

interface DeliveryStatus {
  step: string;
  status: 'complete' | 'current' | 'pending';
  label: string;
}

const ShipmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const deliveryStatuses: DeliveryStatus[] = [
    { step: 'Pending', status: 'complete', label: 'Complete' },
    { step: 'Picked Up', status: 'complete', label: 'Complete' },
    { step: 'In Transit', status: 'current', label: 'Current' },
    { step: 'Out For Delivery', status: 'pending', label: 'Pending' },
    { step: 'Delivered', status: 'pending', label: 'Pending' },
  ];

  const currentStatus = deliveryStatuses.find(status => status.status === 'current')?.step || 'In Transit';
  const isOutForDeliveryOrDelivered = ['Out For Delivery', 'Delivered'].includes(currentStatus);

  return (
    <Container fluid className="shipment-details-container py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold text-center">Shipment ID: {id || 'id'}</h2>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <Card className="map-card border-0">
            <Card.Body>
              <div className="map-placeholder d-flex flex-column align-items-center justify-content-center text-center">
                  <img src={loctionIcon} alt="Location Icon"/>
                <h5 className="mt-3 mb-2">Interactive Map</h5>
                <p>Your driver is 8 KM away from you</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="mb-4 status-card border-0">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="status-icon me-2">
                  <img src={clockIcon} alt="Clock Icon"/>
                </div>
                <h5 className="mb-0 fw-bold">Delivery Status</h5>
              </div>

              <div className="status-timeline">
                {deliveryStatuses.map((status, index) => (
                  <div key={index} className="status-item d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                      <div className={`status-dot ${status.status}`}></div>
                      <span className="status-text ms-2">{status.step}</span>
                    </div>
                    <Badge className="status-badge" bg={status.status === 'complete' ? 'secondary' : status.status === 'current' ? 'success' : 'light text-dark'}>
                      {status.label}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          <Card className="info-card border-0">
            <Card.Body>
              <div className="eta-section mb-4">
                <h6 className="fw-bold mb-3">ETA (Estimated Arrival Time)</h6>
                <div className="eta-display mb-3">
                  <span className="eta-time">2 Days : 30 hrs : 44 min</span>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-success" className="reschedule-btn flex-fill"  disabled={isOutForDeliveryOrDelivered}>
                    Reschedule
                  </Button>
                </div>
              </div>

              <div className="driver-section">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div className="driver-icon me-2">
                      <img src={driverIcon} alt="Driver Icon"/>
                    </div>
                    <span className="fw-bold">Your Driver</span>
                  </div>
                  <Button variant="outline-dark" size="sm" className="support-btn">
                    Support
                  </Button>
                </div>
                
                <div className="driver-details">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="driver-name">Driver's Name</div>
                    <Button variant="outline-success" size="sm" className="call-btn">
                        <img src={callIcon} alt="Call Icon" className="me-1"/>
                    </Button>
                  </div>
                  <div className="driver-rating text-muted">Rating: 4.5/5</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ShipmentDetails;
