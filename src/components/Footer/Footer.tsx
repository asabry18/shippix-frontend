import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="shippix-footer py-4">
      <Container>
        <Row className="footer-main">

          <Col lg={4} md={6} className="mb-4">
            <div className="footer-section mb-5">
              <h5 className="footer-title pb-2">About Shippix</h5>
              <p className="footer-text">
                We are Egypt's leading shipping and logistics platform, connecting 
                businesses with reliable carriers to deliver packages safely and 
                efficiently across the country. With our advanced tracking technology 
                and competitive rates, we make shipping simple for businesses of all 
                sizes.
              </p>
            </div>
            
            <div className="footer-section mt-4">
              <h5 className="footer-title pb-2">Business Hours</h5>
              <div className="business-hours">
                <div className="hours-item">Sunday - Thursday: 9:00 AM - 10:00 PM</div>
                <div className="hours-item">Friday - Saturday: 10:00 AM - 8:00 PM</div>
              </div>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-4">
            <div className="footer-section">
              <h5 className="footer-title pb-2">Why Choose Us?</h5>
              <div className="features-list">
                <div className="feature-item mb-2">
                  <strong>Competitive Rates:</strong> Up to 20% lower than market average shipping costs
                </div>
                <div className="feature-item mb-2">
                  <strong>Real-time Tracking:</strong> Live updates from pickup to delivery
                </div>
                <div className="feature-item mb-2">
                  <strong>Business Focus:</strong> Tailored solutions for business owners and entrepreneurs
                </div>
                <div className="feature-item mb-2">
                  <strong>Local Expertise:</strong> Deep understanding of Egyptian logistics and delivery challenges
                </div>
              </div>
            </div>
          </Col>

          <Col lg={4} md={12} className="mb-4 d-flex justify-content-center">
            <div className="footer-section contact-section">
              <h5 className="footer-title pb-2">Contact Us</h5>
              
              <div className="contact-section">
                <h6 className="contact-subtitle">Follow Us</h6>
                <div className="social-links">
                  <div className="social-item mb-2">
                    <strong>Facebook:</strong> <a href="#" className="social-link">ShippixEgypt</a>
                  </div>
                  <div className="social-item mb-2">
                    <strong>Instagram:</strong> <a href="#" className="social-link">shippix_eg</a>
                  </div>
                  <div className="social-item">
                    <strong>LinkedIn:</strong> <a href="#" className="social-link">Shippix Egypt</a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="footer-bottom pt-4">
          <Col>
            <div className="quick-links-section text-center">
              <h5 className="footer-title pb-2 text-center mb-4">Quick Links</h5>
              <Row className="quick-links-grid">
                <Col md={4} className="text-center mb-3">
                  <div className="quick-links-group d-flex flex-column">
                    <a href="#" className="quick-link">Shipping Calculator</a>
                    <a href="#" className="quick-link">Pricing</a>
                  </div>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <div className="quick-links-group d-flex flex-column">
                    <a href="#" className="quick-link">Track Package</a>
                    <a href="#" className="quick-link">Business Solutions</a>
                  </div>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <div className="quick-links-group d-flex flex-column">
                    <a href="#" className="quick-link">Support Center</a>
                    <a href="#" className="quick-link">Terms of Service</a>
                    <a href="#" className="quick-link">Privacy Policy</a>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;