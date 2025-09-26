import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Container, Dropdown } from 'react-bootstrap';
import logo from '../../assets/loginIcons/logo.svg';
import orderReviewIcon from '../../assets/sidebarIcons/orderReview.svg';
import businessOwnersIcon from '../../assets/sidebarIcons/businessOwners.svg';
import analyticsIcon from '../../assets/sidebarIcons/analytics.svg';
import './adminLayout.css';

interface SidebarItem {
  id: string;
  title: string;
  icon: string;
  path: string;
}

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems: SidebarItem[] = [
    {
      id: 'overview',
      title: 'Overview',
      icon: analyticsIcon,
      path: '/admin/dashboard'
    },
    {
      id: 'order-review',
      title: 'Order Review',
      icon: orderReviewIcon,
      path: '/admin/orders'
    },
    {
      id: 'business-owners',
      title: 'Business Owners',
      icon: businessOwnersIcon,
      path: '/admin/business-owners'
    },
    {
      id: 'analytics',
      title: 'Analytics & Reports',
      icon: analyticsIcon,
      path: '/admin/analytics'
    }
  ];

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getActiveItem = () => {
    return sidebarItems.find(item => isActive(item.path)) || sidebarItems[0];
  };

  return (
    <>
      <nav className="admin-navbar">
        <Container className="d-flex justify-content-between align-items-center py-3">
          <div className="navbar-logo">
            <img src={logo} alt="Shippix Logo" className="logo-img" />
          </div>

          <div className="navbar-avatar d-none d-md-block">
            <div className="avatar-circle rounded-circle d-flex justify-content-center align-items-center">
              <span className="avatar-letter">A</span>
            </div>
          </div>

          <div className="d-md-none">
            <Dropdown align="end">
              <Dropdown.Toggle className="mobile-nav-dropdown py-2 rounded-3 border-0 d-flex align-items-center justify-content-evenly" id="mobile-nav-dropdown">
                <img src={getActiveItem().icon} alt="Menu" className="dropdown-current-icon" />
                <span className="dropdown-current-text">{getActiveItem().title}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="mobile-nav-menu border-0 p-0 rounded-4">
                <div className="dropdown-header d-flex align-items-center p-3 m-0">
                  <div className="dropdown-avatar rounded-circle d-flex justify-content-center align-items-center">
                    <span className="avatar-letter">A</span>
                  </div>
                  <span className="admin-name">Admin</span>
                </div>
                
                {sidebarItems.map((item) => (
                  <Dropdown.Item key={item.id} className={`nav-dropdown-item p-3 d-flex ${isActive(item.path) ? 'active' : ''}`} onClick={() => handleItemClick(item.path)}>
                    <img src={item.icon} alt={`${item.title} Icon`} className="nav-dropdown-icon" />
                    <span>{item.title}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </nav>

      <div className="admin-sidebar position-fixed d-none d-md-flex flex-column">
        <nav className="sidebar-nav py-3 overflow-hidden">
          <div className="nav-list">
            {sidebarItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button className={`nav-link p-3 w-100 d-flex text-start rounded-3 ${isActive(item.path) ? 'active' : ''}`} onClick={() => handleItemClick(item.path)}>
                  <img src={item.icon} alt={`${item.title} Icon`} className="nav-icon" />
                  <span className="nav-text">{item.title}</span>
                </button>
              </li>
            ))}
          </div>
        </nav>
      </div>
      
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;