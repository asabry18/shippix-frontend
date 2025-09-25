import React from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import './BusinessOwner.css';
import viewDetailsIcon from '../../assets/businessOwnerIcons/viewDetails.svg';
import editIcon from '../../assets/businessOwnerIcons/edit.svg';
import approveIcon from '../../assets/businessOwnerIcons/approve.svg';

interface BusinessOwner {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  totalOrders: number;
  revenue: string;
  status: 'active' | 'pending';
}

const BusinessOwner: React.FC = () => {
  const getOwnerInfo = (owner: BusinessOwner) => [
    { label: 'Email', value: owner.email },
    { label: 'Phone', value: owner.phone },
    { label: 'Total Orders', value: owner.totalOrders },
    { label: 'Revenue', value: owner.revenue }
  ];

  const businessOwners: BusinessOwner[] = [
    {
      id: '1',
      name: 'Ahmed Mohamed',
      businessName: 'Ahmed Electronics',
      email: 'ahmed@electronics.com',
      phone: '+20 123 456 7890',
      totalOrders: 45,
      revenue: '$2250',
      status: 'active'
    },
    {
      id: '2',
      name: 'Layla Ibrahim',
      businessName: 'Fashion Hub',
      email: 'layla@fashionhub.com',
      phone: '+20 987 654 3210',
      totalOrders: 23,
      revenue: '$1150',
      status: 'pending'
    }
  ];

  return (
    <Container className="business-owner-container p-4">

      <div className="business-owner-header mb-4">
        <h2 className="mb-0">Business Owner Management</h2>
        <p className="text-muted">Manage registered business accounts</p>
      </div>

      <div className="d-flex flex-column gap-3">
        {businessOwners.map((owner) => (
          <Card key={owner.id} className="business-owner-card rounded-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h5 className="business-name fw-bold mb-0">{owner.businessName}</h5>
                  <p className="text-muted owner-details">{owner.name} • {owner.businessName}</p>
                </div>
                <div className={`status-badge px-2 py-1 rounded-3 ${owner.status}`}>
                  {owner.status}
                </div>
              </div>

              <Row className="mb-3">
                {getOwnerInfo(owner).map((info, index) => (
                  <Col md={3} key={index}>
                    <div className="mb-2 d-flex flex-column">
                      <small className="text-muted contact-info-label">{info.label}</small>
                      <span className="contact-info-value">{info.value}</span>
                    </div>
                  </Col>
                ))}
              </Row>

              <div className="d-flex gap-2">
                <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-2 action-button p-2 rounded-3">
                  <img src={viewDetailsIcon} alt="View Details"/>
                  View Details
                </Button>

                <Button variant="outline-secondary" size="sm" className="d-flex align-items-center gap-2 action-button p-2 rounded-3">
                  <img src={editIcon} alt="Edit"  />
                  Edit
                </Button>
                
                {owner.status === 'pending' && (
                  <Button variant="success" size="sm" className="d-flex align-items-center gap-2 approve-button p-2 rounded-3">
                    <img src={approveIcon} alt="Approve" className="approve-icon"/>
                    Approve
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default BusinessOwner;
