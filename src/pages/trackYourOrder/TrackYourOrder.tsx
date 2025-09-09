import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './TrackYourOrder.css';
import LocationIcon from '../../assets/icons/location.svg';
import { cards } from './cardData';

const TrackYourOrder: React.FC = () => {
  return (
    <Container className="py-5 track-your-order">
      <Row className="justify-content-center text-center mb-3">
        <Col lg={8}>
          <h1 className="display-4 fw-bold main-title">
            Track Your Shipments with <span className="text-confidence">Confidence</span>
          </h1>
          <p className="lead text-muted mt-3 m-auto">
            Professional logistics services with real-time tracking, flexible scheduling, and 24/7 support.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col lg={7}>
          <div className="how-it-works p-4 rounded-4 text-center">
            <h5 className="fw-bold">
                <img src={LocationIcon} alt="Location Icon" className="me-2"/>
                How Tracking Works
            </h5>
            <p className="mb-0">
              When you create a shipment order, you’ll receive a secure tracking link via email or SMS. This ensures your shipment information stays private and secure.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        {cards.map((card, index) => (
          <Col md={4} key={index} >
            <Card className="h-100 feature-card border-0 text-center shadow-sm">
              <Card.Body className="p-4">
                <div className="icon m-auto mb-3">
                  <img src={card.icon} alt={card.title}/>
                </div>
                <Card.Title className="h5 mb-3 card-title">
                  {card.title}
                </Card.Title>
                <Card.Text className="card-text">
                  {card.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TrackYourOrder;
