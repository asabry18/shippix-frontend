import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../../assets/payment/back.svg';
import secureIcon from '../../assets/payment/secure.svg';
import checkIcon from '../../assets/payment/check.svg';
import './payment.css';

interface PaymentData {
  customerName: string;
  orderId: string;
  shippingCost: number;
  city: string;
  itemsDescription: string;
}

type PaymentMethod = 'visa' | 'fawry' | 'vodafone';

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const paymentData: PaymentData | null = location.state?.paymentData || null;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('visa');

  const orderId = paymentData?.orderId;
  const customerName = paymentData?.customerName;
  const shippingCost = paymentData?.shippingCost;

  const handleBackToReview = () => {
    navigate('/review-order');
  };

  const handlePaymentSubmit = () => {
    const newOrder = {
      orderId: orderId,
      customerName: customerName,
      city: paymentData?.city,
      itemsDescription: paymentData?.itemsDescription,
      shippingCost: shippingCost,
      paymentMethod: selectedPaymentMethod,
      completedAt: new Date().toISOString()
    };

    navigate('/dashboard', { state: { newOrder } });
  };

  if (!paymentData) {
    return (
      <Container>
        <div className="payment-content-no-data pt-5">
          <div className="text-center">
            <h3>No Payment Data Found</h3>
            <p>Please go back and create an order first.</p>
            <Button onClick={() => navigate('/create-order')}>
              Create Order
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4 payment-container">
      <div className="payment-content">
        <Row className="mb-4">
          <Col>
            <div className="d-flex align-items-start">
              <Button variant="link" className="back-btn p-0 me-2" onClick={handleBackToReview}>
                <img src={backIcon} alt="Back" className="back-icon" />
              </Button>
              <div>
                <h2 className="payment-title mb-0">Payment</h2>
                <p className="order-id-text m-0">Order #{orderId}</p>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={7}>
            <Card className="payment-method-card rounded-4">
              <Card.Body className="p-4">
                <h5 className="method-title mb-1">Select Payment Method</h5>
                <p className="method-subtitle mb-3">Choose your preferred payment option</p>
                
                <Form>
                  <div className="payment-option position-relative rounded-4 mb-3">
                    <Form.Check
                      type="radio"
                      id="visa"
                      name="paymentMethod"
                      value="visa"
                      checked={selectedPaymentMethod === 'visa'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                      className="payment-radio position-absolute "
                    />
                    <label htmlFor="visa" className="payment-label ms-4">
                      <span className="payment-method-name">Visa Card</span>
                    </label>
                  </div>

                  <div className="payment-option position-relative rounded-4 mb-3">
                    <Form.Check
                      type="radio"
                      id="fawry"
                      name="paymentMethod"
                      value="fawry"
                      checked={selectedPaymentMethod === 'fawry'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                      className="payment-radio position-absolute "
                    />
                    <label htmlFor="fawry" className="payment-label ms-4">
                      <span className="payment-method-name">Fawry</span>
                    </label>
                  </div>

                  <div className="payment-option position-relative rounded-4">
                    <Form.Check
                      type="radio"
                      id="vodafone"
                      name="paymentMethod"
                      value="vodafone"
                      checked={selectedPaymentMethod === 'vodafone'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                      className="payment-radio position-absolute "
                    />
                    <label htmlFor="vodafone" className="payment-label ms-4">
                      <span className="payment-method-name">Vodafone Cash</span>
                    </label>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={5}>
            <Card className="payment-summary-card rounded-4">
              <Card.Body className="p-4">
                <h5 className="summary-title mb-4">Payment Summary</h5>
                
                <div className="summary-item d-flex justify-content-between align-items-center mb-2">
                  <span className="summary-label">Customer:</span>
                  <span className="summary-value">{customerName}</span>
                </div>

                <div className="summary-item d-flex justify-content-between align-items-center mb-4">
                  <span className="summary-label">Order ID:</span>
                  <span className="summary-value">#{orderId}</span>
                </div>

                <div className="summary-item d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                  <span className="summary-label">Shipping Cost:</span>
                  <span className="summary-price">{shippingCost?.toFixed(2)} EGP</span>
                </div>

                <div className="secure-payment-info p-3 rounded-4 mb-4">
                  <div className="d-flex align-items-center">
                    <img src={secureIcon} alt="Secure" className="secure-icon me-2" />
                    <span className="secure-title">Secure Payment</span>
                  </div>
                  <p className="secure-description">
                    Your payment info is encrypted and secure
                  </p>
                </div>

                <Button className="pay-btn w-100 rounded-4 p-3 border-0 d-flex align-items-center justify-content-center" onClick={handlePaymentSubmit}>
                  <img src={checkIcon} alt="Pay" className="pay-icon me-2" />
                  Pay {shippingCost?.toFixed(2)} EGP
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Payment;
