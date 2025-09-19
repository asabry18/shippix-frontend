import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import boxIcon from '../../assets/homeIcons/box.svg';
import checklistIcon from '../../assets/homeIcons/checklest.svg';
import locationIcon from '../../assets/homeIcons/location.svg';
import truckIcon from '../../assets/homeIcons/truck.svg';
import './Dashboard.css';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  iconAlt: string;
}

interface ShipmentData {
  id: string;
  status: string;
  route: string;
  timeRemaining: string;
  statusLevel: number;
}

const Dashboard: React.FC = () => {
  const statsData = [
    { title: 'Total Completed Orders', value: 40, icon: boxIcon, iconAlt: 'Box Icon' },
    { title: 'Completed Today', value: 3, icon: checklistIcon, iconAlt: 'Checklist Icon' },
    { title: 'Active', value: 5, icon: locationIcon, iconAlt: 'Location Icon' },
    { title: 'Pending Pickup', value: 0, icon: truckIcon, iconAlt: 'Truck Icon' }
  ];

  const activeShipments: ShipmentData[] = [
    { id: 'ID1', status: 'Status', route: 'Cairo → Alexandria', timeRemaining: 'Time Remaining', statusLevel: 3 },
    { id: 'ID2', status: 'Status', route: 'Cairo → Giza', timeRemaining: 'Time Remaining', statusLevel: 2 },
    { id: 'ID3', status: 'Status', route: 'Cairo → Aswan', timeRemaining: 'Time Remaining', statusLevel: 1 }
  ];

  const performanceData = {
    deliverySuccessRate: '96%',
    averageDeliveryTime: '2 days',
    customerSatisfaction: '4.9/5'
  };

  const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, iconAlt }) => (
    <Col lg={3} md={6} className="mb-4">
      <Card className="stats-card rounded-4">
        <Card.Body className="d-flex align-items-center justify-content-between p-4">
          <div className="stats-content">
            <h6 className="stats-title">{title}</h6>
            <h3 className="stats-value m-0 fw-bold">{value}</h3>
          </div>
          <div className="stats-icon">
            <img src={icon} alt={iconAlt} />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );

  return (
    <div className="dashboard-container py-5">
      <Container>

        <div className="dashboard-header mb-4">
          <h1 className="dashboard-title">Business Dashboard</h1>
        </div>
        <Row className="mb-5">
          {statsData.map((stat, index) => (
            <StatsCard key={index} title={stat.title} value={stat.value} icon={stat.icon} iconAlt={stat.iconAlt} />
          ))}
        </Row>

        <Row>
          <Col lg={8} className="mb-4">
            <Card className="shipments-card rounded-5">
              <div className="shipments-header p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Active Shipments</h4>
                  <a href="#" className="view-all-link">View All</a>
                </div>
              </div>
              <Card.Body className="p-0">
                <div className="shipments-table">
                  {activeShipments.map((shipment, index) => (
                    <div key={index} className="shipment-row d-flex align-items-center justify-content-between p-4">
                      <div className="shipment-info">
                        <div className="shipment-id">{shipment.id}</div>
                        <div className="shipment-route mb-2">{shipment.route}</div>
                        <div className="progress-bar-container">
                          <div className={`progress-bar-fill progress-status-${shipment.statusLevel}`}>
                          </div>
                        </div>
                      </div>
                      <div className="shipment-status">
                        <div className="status-text">{shipment.status}</div>
                        <div className="time-remaining">{shipment.timeRemaining}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} className="mb-4">
            <Card className="performance-card rounded-4 border-0">
              <div className="performance-header p-4 rounded-top-4">
                <h4 className="mb-0">This Week's Performance</h4>
              </div>
              <Card.Body className="performance-body p-4">
                <div className="performance-metric d-flex justify-content-between align-items-center mb-4">
                  <span className="metric-label">Delivery Success Rate</span>
                  <span className="metric-value fw-bold">{performanceData.deliverySuccessRate}</span>
                </div>
                <div className="performance-metric d-flex justify-content-between align-items-center mb-4">
                  <span className="metric-label">Average Delivery Time</span>
                  <span className="metric-value fw-bold">{performanceData.averageDeliveryTime}</span>
                </div>
                <div className="performance-metric d-flex justify-content-between align-items-center">
                  <span className="metric-label">Customer Satisfaction</span>
                  <span className="metric-value fw-bold">{performanceData.customerSatisfaction}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;