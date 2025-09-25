import React from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import './Overview.css';
import pendingIcon from '../../assets/overviewIcons/pending.svg';
import revenueIcon from '../../assets/overviewIcons/revenue.svg';
import totalOrdersIcon from '../../assets/overviewIcons/totalOrders.svg';
import activeBusinessOwnersIcon from '../../assets/overviewIcons/activeBusinessOwners.svg';

interface StatsCard {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  businessName: string;
  status: 'pending' | 'approved' | 'in-transit';
  price: string;
}

const Overview: React.FC = () => {
  const statsCards: StatsCard[] = [
    {
      id: 'total-orders',
      title: 'Total Orders',
      value: '1,234',
      subtitle: '+12% from last month',
      icon: totalOrdersIcon
    },
    {
      id: 'active-business-owners',
      title: 'Active Business Owners',
      value: '89',
      subtitle: '+5 new this week',
      icon: activeBusinessOwnersIcon
    },
    {
      id: 'pending-reviews',
      title: 'Pending Reviews',
      value: '23',
      subtitle: 'Requires attention',
      icon: pendingIcon
    },
    {
      id: 'revenue',
      title: 'Revenue',
      value: '$45,231',
      subtitle: '+8% from last month',
      icon: revenueIcon
    }
  ];

  const recentOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customerName: 'Afnan',
      businessName: 'R. Electronics',
      status: 'pending',
      price: '$45'
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customerName: 'Hamza',
      businessName: 'Gaming Hub',
      status: 'approved',
      price: '$25'
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customerName: 'Maya',
      businessName: 'Book Store',
      status: 'in-transit',
      price: '$30'
    }
  ];

  return (
    <Container className="overview-container p-4">
      <div className="overview-header mb-4">
        <h2 className='mb-0'>Dashboard Overview</h2>
        <p className="text-muted">Monitor your shipping operations at a glance</p>
      </div>

      <Row className="g-3 mb-4">
        {statsCards.map((card) => (
          <Col key={card.id} lg={3} md={6}>
            <Card className="stats-card rounded-4">
              <Card.Body>
                <div className="d-flex align-items-start justify-content-between mb-2">
                  <h6 className="text-muted stats-card-title mb-0">{card.title}</h6>
                  <div className="stats-card-icon">
                    <img src={card.icon} alt={`${card.title} icon`} width="20" height="20" />
                  </div>
                </div>
                <h2 className="stats-card-number mb-0">{card.value}</h2>
                <small className="text-muted stats-card-subtitle">{card.subtitle}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="recent-orders-card rounded-4">
        <Card.Body className="p-4">
          <Card.Title className="recent-orders-title mb-0">Recent Orders</Card.Title>
          <Card.Text className="text-muted recent-orders-subtitle">Latest orders requiring your attention</Card.Text>

          <div className="d-flex flex-column">
            {recentOrders.map((order) => (
              <div key={order.id} className="d-flex align-items-center justify-content-between order-item py-3">
                <div className="d-flex flex-column">
                  <h6 className="order-title">{order.orderNumber} - {order.customerName}</h6>
                  <small className="text-muted order-subtitle">{order.businessName}</small>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span className={`status-badge px-2 py-1 rounded-3 ${order.status}`}>{order.status}</span>
                  <span className="order-price">{order.price}</span>
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Overview;