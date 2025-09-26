import React, { useState } from 'react';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';
import logo from '../../assets/loginIcons/logo.svg';
import showPasswordIcon from '../../assets/loginIcons/showPassword.svg';
// import axios from 'axios'; 
import './loginAdmin.css';

interface AdminLoginData {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginAdmin: React.FC = () => {
  const [formData, setFormData] = useState<AdminLoginData>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    if (apiError) {
      setApiError('');
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setApiError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {

      /*
      const loginData = {
        email: formData.email,
        password: formData.password
      };

      const response = await axios.post('', loginData);

      if (response.status === 200 && response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        
        console.log('Admin login successful!', response.data);
        navigate('/admin/dashboard');
      } else {
        setApiError(response.data.message || 'Login failed');
      }
      */

      // remove when api is connected
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Admin login successful!', {email: formData.email});
      
      
    } catch (error) {
      console.error('Admin login error:', error);
      setApiError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div className="admin-login-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="admin-login-card rounded-4 border-0 shadow-lg">
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <img src={logo} alt="Shippix Logo" className="admin-logo mb-3" />
              <h3 className="admin-title m-0">Shippix-Admin</h3>
              <p className="admin-subtitle">Sign in to your admin dashboard</p>
            </div>

            <Form onSubmit={handleSubmit}>
              {/* when api is connected */}
              {/* {apiError && (
                <Alert variant="danger" className="mb-3">
                  {apiError}
                </Alert>
              )} */}

              <Form.Group className="mb-3">
                <Form.Label className="admin-form-label mb-1">Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="admin@shippix.com" 
                  className={`admin-form-input w-100 rounded-4 p-3 ${errors.email ? 'is-invalid' : ''}`}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="admin-form-label">Password</Form.Label>
                <div className="password-input-container position-relative">
                  <Form.Control 
                    type={showPassword ? 'text' : 'password'} 
                    name="password" 
                    value={formData.password} 
                    onChange={handleInputChange} 
                    placeholder="Enter your password" 
                    className={`admin-form-input w-100 rounded-4 p-3 ${errors.password ? 'is-invalid' : ''}`}
                  />
                  <button type="button" className="password-toggle-btn position-absolute border-0" onClick={() => setShowPassword(!showPassword)}>
                    <img src={showPasswordIcon} alt="Show Password" />
                  </button>
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </Form.Group>

              <Button type="submit" className="admin-signin-btn border-0 w-100 rounded-4">
                {isLoading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="text-center mt-3">
                <button type="button" className="admin-forgot-link border-0 bg-transparent" onClick={handleForgotPassword}>
                  Forgot your password?
                </button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoginAdmin;
