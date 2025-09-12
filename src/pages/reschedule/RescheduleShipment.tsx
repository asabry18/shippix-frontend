import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './RescheduleShipment.css';
import warningIcon from '../../assets/rescheduleIcons/warning.svg';

const RescheduleShipment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    reason: '',
    pickupDate: '',
    pickupTime: '',
    selectedAddress: 'Home',
    newAddress: '',
    specialInstructions: ''
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const handleConfirmReschedule = () => {
    setShowConfirmModal(false);
    navigate(`/shipment/${id}`);
  };

  const handleCancelModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <Container className="reschedule-container py-3">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>

          <div className="text-center">
            <h1 className="mb-3">Reschedule Shipment</h1>
            <p className="text-muted">Modify your delivery schedule & preferences.</p>
          </div>
          <div className="reschedule-note mb-3 m-auto rounded-5 text-center py-3 px-3">
            <strong>Note:</strong> Rescheduling is only available until one day before your shipment is out for delivery
          </div>

          <Row className="g-4">

            <Col md={4}>
              <Card className="current-shipment-card border-0 rounded-5">
                <Card.Header className="bg-transparent border-0">
                  <h5 className="fw-bold mb-0">Current Shipment</h5>
                </Card.Header>
                <Card.Body>
                  <div className="shipment-info">
                    <div className="info-item mb-3">
                      <label className="info-label">Tracking ID</label>
                      <div className="info-value">#{id || 'ID'}</div>
                    </div>
                    
                    <div className="info-item mb-3">
                      <label className="info-label">Scheduled</label>
                      <div className="info-value">Date & Time</div>
                    </div>
                    
                    <div className="info-item">
                      <label className="info-label">Address</label>
                      <div className="info-value">123 Nasr, Cairo, Egypt</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={8}>
              <Form onSubmit={handleSubmit}>
                <Card className="reschedule-box rounded-5 border-0 mb-3">
                  <Card.Body className="p-4">
                    <h5 className="fw-bold mb-3">Why Are You Rescheduling?</h5>
                    <Form.Select name="reason" value={formData.reason} onChange={handleInputChange} className="reason-select" required>
                      <option value="">Select Reason</option>
                      <option value="not-available">I won't be available</option>
                      <option value="change-time">Need different time</option>
                      <option value="change-address">Change delivery address</option>
                      <option value="emergency">Emergency situation</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Card.Body>
                </Card>

                <Card className="reschedule-box rounded-5 border-0 mb-3">
                  <Card.Body className="p-4">
                    <h5 className="fw-bold mb-3">Select New Date & Time</h5>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="form-label">Pick-Up Date</Form.Label>
                          <Form.Control type="date" name="pickupDate" value={formData.pickupDate} onChange={handleInputChange} placeholder="mm/dd/yy" className="date-input" required/>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="form-label">Pick-Up Time</Form.Label>
                          <Form.Control type="time" name="pickupTime" value={formData.pickupTime} onChange={handleInputChange} placeholder="--:-- --" className="time-input" required/>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                <Card className="reschedule-box rounded-5 border-0 mb-3">
                  <Card.Body className="p-4">
                    <h5 className="fw-bold mb-3">Change Delivery Address</h5>

                    <div className="address-option mb-3">
                      <Form.Check type="radio" name="selectedAddress" value="Home" checked={formData.selectedAddress === 'Home'} onChange={handleInputChange} label="" id="home-address" className="d-none" />
                      <label htmlFor="home-address" className={`address-card rounded-4 w-100 mb-0 ${formData.selectedAddress === 'Home' ? 'selected' : ''}`}>
                        <div className="address-title">Home</div>
                        <div className="address-details">123 Nasr City, Cairo, Egypt</div>
                      </label>
                    </div>

                    <div className="address-option mb-3">
                      <Form.Check type="radio" name="selectedAddress" value="Office" checked={formData.selectedAddress === 'Office'} onChange={handleInputChange} label="" id="office-address" className="d-none"/>
                      <label htmlFor="office-address" className={`address-card rounded-4 w-100 mb-0 ${formData.selectedAddress === 'Office' ? 'selected' : ''}`}>
                        <div className="address-title">Office</div>
                        <div className="address-details">123 Dokki, Giza, Egypt</div>
                      </label>
                    </div>

                    <div className="address-option mb-3">
                      <Form.Check type="radio" name="selectedAddress" value="New" checked={formData.selectedAddress === 'New'} onChange={handleInputChange} label="" id="new-address" className="d-none"/>
                      <label htmlFor="new-address" className={`address-card rounded-4 w-100 mb-0 ${formData.selectedAddress === 'New' ? 'selected' : ''}`}>
                        <div className="address-title">Add New Address</div>
                      </label>
                    </div>

                    {formData.selectedAddress === 'New' && (
                      <Form.Group className="mt-3">
                        <Form.Control type="text" name="newAddress" value={formData.newAddress} onChange={handleInputChange} placeholder="Enter new address" className="new-address-input"/>
                      </Form.Group>
                    )}
                  </Card.Body>
                </Card>

                <Card className="reschedule-box rounded-5 border-0 mb-4">
                  <Card.Body className="p-4">
                    <h5 className="fw-bold mb-3">Special Instructions</h5>
                    <Form.Group>
                      <Form.Control as="textarea" rows={3} name="specialInstructions" value={formData.specialInstructions} onChange={handleInputChange} placeholder="Add special instructions for delivery" className="special-instructions-input"/>
                    </Form.Group>
                  </Card.Body>
                </Card>

                <div className="d-flex gap-3">
                  <Button variant="outline-secondary" onClick={() => navigate(`/shipment/${id}`)} className="cancel-btn flex-fill">
                    Cancel
                  </Button>
                  <Button type="submit" variant="success" className="submit-btn flex-fill">
                    Confirm Reschedule
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={handleCancelModal} centered>
        <Modal.Header closeButton className="border-0 pb-0 d-flex justify-content-between align-items-center">
          <Modal.Title className="fw-bold">Confirm Reschedule</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="text-center mb-3">
            <div className="warning-icon my-3">
              <img src={warningIcon} alt="Warning Icon" />
            </div>
            <h5 className="fw-bold mb-3">Important Notice</h5>
            <p className="text-muted mb-0">
              If you reschedule this order, it will return back to the review stage and will take more time for delivery. 
              Are you sure you want to proceed with rescheduling?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="outline-secondary" onClick={handleCancelModal} className="flex-fill">
            Cancel
          </Button>
          <Button variant="warning" onClick={handleConfirmReschedule} className="flex-fill fw-bold">
            Yes, Reschedule
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default RescheduleShipment;
