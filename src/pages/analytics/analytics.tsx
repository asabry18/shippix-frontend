import React from 'react';
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap';
import './analytics.css';
import downloadIcon from '../../assets/analyticsIcons/download.svg';

interface QuickStat {
  label: string;
  value: string;
  color: string;
}

const Analytics: React.FC = () => {
  const quickStats: QuickStat[] = [
    { label: 'Delivery Success Rate', value: '94.2%', color: 'success' },
    { label: 'Average Delivery Time', value: '2.4 days', color: 'dark' },
    { label: 'Customer Satisfaction', value: '4.8/5', color: 'success' },
    { label: 'Monthly Revenue', value: '$45,231', color: 'success' }
  ];

  return (
    <Container className="analytics-container p-4">
      <div className="analytics-header mb-4">
        <h2 className='mb-0'>Analytics & Reports</h2>
        <p className="text-muted">Generate comprehensive reports and insights</p>
      </div>

      <Card className="generate-report-card p-2 rounded-4 mb-4">
        <Card.Body>
          <div className="generate-report-header mb-4">
            <h5 className='mb-0'>Generate Report</h5>
            <p className="text-muted mb-0">Create custom reports for analysis</p>
          </div>

          <Row className="align-items-end">
            <Col md={3}>
              <Form.Group>
                <Form.Label className="mb-1">From Date</Form.Label>
                <Form.Control type="text" className="date-input rounded-3" placeholder="mm/dd/yyyy" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="mb-1">To Date</Form.Label>
                <Form.Control type="text" className="date-input rounded-3" placeholder="mm/dd/yyyy" />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label className="mb-1">Filter by Status</Form.Label>
                <Form.Select className="status-select rounded-3">
                  <option>Select status</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3}>
                <Button className="generate-report-button rounded-3 d-flex align-items-center border-0">
                    <img src={downloadIcon} alt="Download" className="button-icon" />
                    Generate Report
                </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="quick-stats-card p-2 rounded-4">
        <Card.Body>
          <div className="quick-stats-header mb-3">
            <h5 className='mb-0'>Quick Stats</h5>
            <p className="text-muted mb-0">Key performance indicators</p>
          </div>

          <div className="stats-grid">
            {quickStats.map((stat, index) => (
              <div key={index} className="stat-item py-2 d-flex justify-content-between align-items-center">
                <div className="stat-label">{stat.label}</div>
                <div className={`stat-value ${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Analytics;
