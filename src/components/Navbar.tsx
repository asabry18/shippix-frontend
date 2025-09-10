import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShippixLogo from '../assets/icons/shippix-logo.svg';
import './Navbar.css';

const CustomerNavbar: React.FC = () => {
  return (
    <Navbar expand="lg" className="customer-navbar py-3" bg="white">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={ShippixLogo} alt="Shippix" height="32" className="me-2"/>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/help" className="nav-link-custom me-3">
              Support
            </Nav.Link>
            <Button variant="primary" className="get-started-btn">
              Get Started
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomerNavbar;
