import React from 'react';
import { Navbar, Nav, Button, Container, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/authIcons/logo.svg';
import notficationIcon from '../../assets/homeNavbarIcons/notification.svg';
import dropdownIcon from '../../assets/homeNavbarIcons/dropdown.svg';
import help from '../../assets/homeNavbarIcons/help.svg';
import language from '../../assets/homeNavbarIcons/language.svg';
import manage from '../../assets/homeNavbarIcons/manage.svg';
import setting from '../../assets/homeNavbarIcons/setting.svg';
import logout from '../../assets/homeNavbarIcons/logout.svg';
import './navbar.css';

const HomeNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    navigate('/create-order');
  };

  const handleSupport = () => {
    console.log('Support clicked');
  };

  const handleNotifications = () => {
    console.log('Notifications clicked');
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleAccount = () => {
    console.log('Account settings clicked');
  };

  const handleHelp = () => {
    console.log('Help clicked');
  };

  const handleLanguage = () => {
    console.log('Language settings clicked');
  };

  const handleManage = () => {
    console.log('Manage orders clicked');
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="dashboard-navbar px-3">
      <Container>
        <Navbar.Brand onClick={handleHome} className="dashboard-brand-custom d-flex align-items-center">
          <img src={logo} alt="Shippix Logo" className="dashboard-navbar-logo me-3" />
          <div className="brand-text">
            <h5 className="brand-title mb-0 fw-bold">Shippix-Business</h5>
            <small className="brand-subtitle">Business Dashboard</small>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="dashboard-navbar-nav" />
        <Navbar.Collapse id="dashboard-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Button className="create-order-btn rounded-3" onClick={handleCreateOrder}>
              Create New Order
            </Button>
            
            <Button variant="link" className="support-btn text-decoration-none" onClick={handleSupport}>
              Support
            </Button>
            
            <Button variant="link" className="notification-btn" onClick={handleNotifications}>
              <img src={notficationIcon} alt="Notifications" />
            </Button>
            
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="dropdown-toggle-custom p-0" id="dropdown-basic">
                <img src={dropdownIcon} alt="Menu" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="user-dropdown-menu p-0 rounded-4">
                <div className="dropdown-header p-3 rounded-top-4">
                  <div className="user-info d-flex align-items-center">
                    <div className="user-avatar d-flex align-items-center justify-content-center rounded-circle fw-bold">AS</div>
                    <div className="user-details">
                      <div className="user-name text-dark">Ahmed sabry</div>
                      <div className="company-name">business</div>
                    </div>
                  </div>
                </div>
                <Dropdown.Divider />
                
                <Dropdown.Item onClick={handleAccount} className="dropdown-item-custom py-2 d-flex align-items-center text-decoration-none border-0">
                  <img src={setting} alt="Account" className="dropdown-icon" />
                  <div>
                    <div className="dropdown-title">Account</div>
                    <div className="dropdown-subtitle">Settings and Privacy</div>
                  </div>
                </Dropdown.Item>
                
                <Dropdown.Item onClick={handleHelp} className="dropdown-item-custom py-2 d-flex align-items-center text-decoration-none border-0">
                  <img src={help} alt="Help" className="dropdown-icon" />
                  Help
                </Dropdown.Item>
                
                <Dropdown.Item onClick={handleLanguage} className="dropdown-item-custom py-2 d-flex align-items-center text-decoration-none border-0">
                  <img src={language} alt="Language" className="dropdown-icon" />
                  Language
                </Dropdown.Item>
                
                <Dropdown.Item onClick={handleManage} className="dropdown-item-custom py-2 d-flex align-items-center text-decoration-none border-0">
                  <img src={manage} alt="Manage" className="dropdown-icon" />
                  <div>
                    <div className="dropdown-title">Manage</div>
                    <div className="dropdown-subtitle">Your Orders</div>
                  </div>
                </Dropdown.Item>
                
                <Dropdown.Divider />
                
                <Dropdown.Item onClick={handleLogout} className="dropdown-item-custom py-2 d-flex align-items-center text-decoration-none border-0 logout-item">
                  <img src={logout} alt="Log Out" className="dropdown-icon" />
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeNavbar;