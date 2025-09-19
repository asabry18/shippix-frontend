import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, /*Alert*/ Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/authIcons/logo.svg';
import showPasswordIcon from '../../assets/authIcons/showpassword.svg';
// import axios from 'axios'; 
import './Login.css';

interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

interface ValidationErrors {
  username?: string;
  password?: string;
  general?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_@.-]+$/.test(formData.username)) {
      newErrors.username = 'Username contains invalid characters';
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
    const { name, value, type, checked } = e.target;

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
      [name]: type === 'checkbox' ? checked : value
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
        username: formData.username,
        password: formData.password
      };

      const response = await axios.post('api', loginData);

      if (response.status === 200 && response.data.success) {
        const storage = formData.rememberMe ? localStorage : sessionStorage;
        storage.setItem('authToken', response.data.token);
        storage.setItem('user', JSON.stringify(response.data.user));
        
        console.log('Login successful!', response.data);
      } else {
        setApiError(response.data.message || 'Login failed');
      }
      */

      // remove when api is connected
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login successful!', { 
        username: formData.username, 
        rememberMe: formData.rememberMe 
      });
      
      
    } catch (error) {
      console.error('Login error:', error);
      setApiError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

    const handleSignIn = () => {
    navigate('/signup');
  };

  return (
    <Container fluid className="login-container">
      <Row className="min-vh-100">
        <Col lg={6} className="welcome-section d-flex flex-column justify-content-center align-items-center">
          <div className="welcome-content text-center">
            <div className="logo-section">
                <img src={logo} alt="Shippix Logo" />
            </div>
            <h1 className="welcome-title m-0">Welcome Back!</h1>
          </div>
        </Col>

        <Col lg={6} className="login-form-section d-flex align-items-center">
          <Container>
            <div className="form-header text-center mb-4">
              <h2 className="form-title">Sign in to your business account</h2>
            </div>

            <Form onSubmit={handleSubmit}>
              {/* when api is connected */}
              {/* {apiError && (
                <Alert variant="danger" className="mb-3">
                  {apiError}
                </Alert>
              )} */}

              <Form.Group className="mb-3">
                <Form.Control type="text" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" className={`rounded-3 p-2 login-input ${errors.username ? 'is-invalid' : ''}`} disabled={isLoading} required/>
                {errors.username && (
                  <div className="invalid-feedback d-block">
                    {errors.username}
                  </div>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="password-input-container">
                  <Form.Control type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" className={`rounded-3 p-2 login-input password-field ${errors.password ? 'is-invalid' : ''}`} disabled={isLoading} required/>
                  <button type="button" className="password-toggle d-flex justify-content-center align-items-center p-0" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
                    {showPassword ? (
                      <img src={showPasswordIcon} className='show-password' alt="Hide Password Icon"/>
                    ) : (
                      <img src={showPasswordIcon} className='show-password' alt="Show Password Icon"/>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </Form.Group>

              <div className="form-options d-flex justify-content-between align-items-center mb-4">
                <Form.Check type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} label="Remember me" className="remember-me-check" disabled={isLoading}/>
                <button type="button" className="forgot-password-link border-0 p-0" onClick={handleForgotPassword} disabled={isLoading}>
                  Forgot Password ?
                </button>
              </div>

              <Button type="submit" className="signin-btn p-2 rounded-3 w-100 mb-4" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <div className="signin-section text-center">
                    <span className="signin-text">Don't have an account? </span>
                    <button type="button" className="signin-link fw-bold" onClick={handleSignIn} disabled={isLoading}>
                        Sign Up
                    </button>
                </div>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;