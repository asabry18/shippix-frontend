import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/authIcons/logo.svg';
import './Navbar.css';

const MainNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="main-navbar px-3">
      <Container>
        <Navbar.Brand onClick={handleHome} className="navbar-brand-custom">
          <img src={logo} alt="Shippix Logo" className="navbar-logo" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Button variant="primary" className="navbar-signin-btn border-0 rounded-2" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button variant="outline-primary" className="navbar-signup-btn border-0 rounded-2" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;