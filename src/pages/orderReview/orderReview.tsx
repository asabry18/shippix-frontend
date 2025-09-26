import React from 'react';
import { Card, Button, Form, InputGroup, Row, Col, Container } from 'react-bootstrap';
import './orderReview.css';
import searchIcon from '../../assets/orderReviewIcons/search.svg';
import filterIcon from '../../assets/orderReviewIcons/filter.svg';
import approveIcon from '../../assets/orderReviewIcons/approve.svg';
import rejectIcon from '../../assets/orderReviewIcons/reject.svg';

interface Order {
  id: string;
  orderNumber: string;
  businessName: string;
  customer: string;
  address: string;
  weight: string;
  distance: string;
  description: string;
  price: string;
  status: 'pending' | 'approved' | 'rejected';
}

const OrderReview: React.FC = () => {
  const getOrderDetails = (order: Order) => [
    { label: 'Customer', value: order.customer },
    { label: 'Address', value: order.address },
    { label: 'Weight', value: order.weight },
    { label: 'Distance', value: order.distance }
  ];

  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      businessName: 'R. Electronics',
      customer: 'Afnan Sayed',
      address: '123 Main St, Cairo',
      weight: '2.5 kg',
      distance: '15.2 km',
      description: 'Smartphone and accessories',
      price: '$45',
      status: 'pending'
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      businessName: 'Gaming Hub',
      customer: 'Hamza Sayed',
      address: '456 Stanly Bridge, Alexandria',
      weight: '1.2 kg',
      distance: '8.7 km',
      description: 'Accessories items',
      price: '$25',
      status: 'approved'
    }
  ];

  return (
    <Container className="p-4">
      <div className="order-review-header mb-3">
        <h2 className='mb-0'>Order Review</h2>
        <p className="text-muted">Review and approve pending orders</p>
      </div>

      <div className="search-filter-bar mb-4">
        <Row>
          <Col md={8}>
            <InputGroup className="search-input-group rounded-4">
              <InputGroup.Text className="search-icon-wrapper border-0">
                <img src={searchIcon} alt="Search" className="search-icon" />
              </InputGroup.Text>
              <Form.Control type="text" placeholder="Search orders..." className="search-input border-0 p-2"/>
            </InputGroup>
          </Col>
          <Col md={4}>
            <Button className="filter-button rounded-4 border-0 p-2 d-flex align-items-center justify-content-center w-100">
              <img src={filterIcon} alt="Filter" className="filter-icon" />
              Filter
            </Button>
          </Col>
        </Row>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <Card key={order.id} className="order-card rounded-4 mb-4">
            <Card.Body>
              <div className="order-header d-flex justify-content-between align-items-start mb-3">
                <div className="order-info">
                  <h5 className="order-number mb-0">{order.orderNumber}</h5>
                  <p className="business-name mb-0">{order.businessName}</p>
                </div>
                <div className={`status-badge rounded-3 ${order.status}`}>
                  {order.status}
                </div>
              </div>

              <Row className="order-details mb-3">
                {getOrderDetails(order).map((detail, index) => (
                  <Col md={3} key={index}>
                    <div className="detail-item d-flex flex-column">
                      <small className="detail-label">{detail.label}</small>
                      <span className="detail-value">{detail.value}</span>
                    </div>
                  </Col>
                ))}
              </Row>

              <div className="description-section py-3 mb-3">
                <small className="detail-label">Description</small>
                <p className="description-text">{order.description}</p>
              </div>

              <div className="price-actions-section d-flex justify-content-between align-items-center">
                <div className="price-section">
                  <span className="price-text">Price: {order.price}</span>
                </div>
                <div className="action-buttons d-flex align-items-center">
                  {order.status === 'pending' ? (
                    <>
                      <Button variant="outline-secondary" className="reject-button py-2 px-3 rounded-3 d-flex align-items-center">
                        <img src={rejectIcon} alt="Reject" className="action-icon" />
                        Reject
                      </Button>
                      <Button className="approve-button py-2 px-3 rounded-3 d-flex align-items-center">
                        <img src={approveIcon} alt="Approve" className="action-icon" />
                        Approve
                      </Button>
                    </>
                  ) : (
                    <div className="status-display">
                      Order {order.status}
                    </div>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default OrderReview;
