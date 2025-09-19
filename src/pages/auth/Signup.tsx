import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/authIcons/logo.svg';
import showPasswordIcon from '../../assets/authIcons/showpassword.svg';
import personIcon from '../../assets/authIcons/person.svg';
import homeIcon from '../../assets/authIcons/home.svg';
// import axios from 'axios';
import './Signup.css';

interface SignupFormData {
  ownerName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  password: string;
  confirmPassword: string;
  businessName: string;
  businessType: string;
  pickupLocation: string;
}

interface ValidationErrors {
  ownerName?: string;
  email?: string;
  phoneNumber?: string;
  nationalId?: string;
  password?: string;
  confirmPassword?: string;
  businessName?: string;
  businessType?: string;
  pickupLocation?: string;
  general?: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    ownerName: '',
    email: '',
    phoneNumber: '',
    nationalId: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: '',
    pickupLocation: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    } else if (formData.ownerName.charAt(0) === ' ') {
      newErrors.ownerName = 'First character cannot be a space';
    } else if (/\d/.test(formData.ownerName)) {
      newErrors.ownerName = 'Numbers are not allowed in owner name';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.ownerName)) {
      newErrors.ownerName = 'Special characters are not allowed in owner name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email.charAt(0) === ' ') {
      newErrors.email = 'First character cannot be a space';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email must be in valid format (e.g., user@example.com)';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (formData.phoneNumber.charAt(0) === ' ') {
      newErrors.phoneNumber = 'First character cannot be a space';
    } else if (!/^\d+$/.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Only numbers are allowed in phone number';
    } else if (formData.phoneNumber.replace(/\s+/g, '').length < 10 || formData.phoneNumber.replace(/\s+/g, '').length > 13) {
      newErrors.phoneNumber = 'Phone number must be 10-13 digits';
    }

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = 'National ID is required';
    } else if (!/^\d{14}$/.test(formData.nationalId)) {
      newErrors.nationalId = 'National ID must be exactly 14 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one numeric digit';
    } else if (!/(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    } else if (formData.businessName.charAt(0) === ' ') {
      newErrors.businessName = 'First character cannot be a space';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.businessName)) {
      newErrors.businessName = 'Special characters are not allowed in business name';
    }

    if (!formData.businessType.trim()) {
      newErrors.businessType = 'Business type is required';
    } else if (formData.businessType.charAt(0) === ' ') {
      newErrors.businessType = 'First character cannot be a space';
    }

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required';
    } else if (formData.pickupLocation.charAt(0) === ' ') {
      newErrors.pickupLocation = 'First character cannot be a space';
    } else if (!/^[a-zA-Z0-9\s,.]+$/.test(formData.pickupLocation)) {
      newErrors.pickupLocation = 'Only letters, numbers, spaces, commas, and periods are allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormComplete = (): boolean => {
    return (
      formData.ownerName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phoneNumber.trim() !== '' &&
      formData.nationalId.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      formData.businessName.trim() !== '' &&
      formData.businessType.trim() !== '' &&
      formData.pickupLocation.trim() !== ''
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      const signupData = {
        ownerName: formData.ownerName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        nationalId: formData.nationalId,
        password: formData.password,
        businessName: formData.businessName,
        businessType: formData.businessType,
        pickupLocation: formData.pickupLocation
      };

      const response = await axios.post('/api/auth/signup', signupData);

      if (response.status === 201 && response.data.success) {
        console.log('Signup successful!', response.data);
        navigate('/login');
      } else {
        setApiError(response.data.message || 'Signup failed');
      }
      */

      // remove when api is connected
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Signup successful!', formData);
      navigate('/login');
      
    } catch (error) {
      console.error('Signup error:', error);
      setApiError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <Container fluid className="signup-container">
      <Row className="min-vh-100">
        <Col lg={6} className="welcome-section d-flex flex-column justify-content-center align-items-center">
          <div className="welcome-content text-center">
            <div className="logo-section">
              <img src={logo} alt="Shippix Logo" />
            </div>
            <h1 className="welcome-title m-0">Create your Business Account</h1>
            <p className="welcome-subtitle">Join Shippix-Business to manage your shipping</p>
          </div>
        </Col>

        <Col lg={6} className="signup-form-section d-flex align-items-center p-4">

          <Container>
            <div className="signup-form rounded-4 shadow-sm px-3 py-3">
                <Form onSubmit={handleSubmit}>

                <div className='section-header mb-4 pb-2'>
                    <div className="d-flex align-items-center">
                        <img src={personIcon} alt="Personal Icon"/>
                        <h3 className='ms-2 mb-0'>Personal Information</h3>
                    </div>
                    <p className="section-subtitle">Your contact details</p>
                </div>

                <Form.Group className="mb-3">
                    <Form.Control
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    placeholder="Owner Name"
                    className={`rounded-3 p-2 signup-input ${errors.ownerName ? 'is-invalid' : ''}`}
                    disabled={isLoading}
                    required
                    />
                    {errors.ownerName && (
                    <div className="invalid-feedback d-block">
                        {errors.ownerName}
                    </div>
                    )}
                </Form.Group>

                <Row>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        className={`rounded-3 p-2 signup-input ${errors.email ? 'is-invalid' : ''}`}
                        disabled={isLoading}
                        required
                        />
                        {errors.email && (
                        <div className="invalid-feedback d-block">
                            {errors.email}
                        </div>
                        )}
                    </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className={`rounded-3 p-2 signup-input ${errors.phoneNumber ? 'is-invalid' : ''}`}
                        disabled={isLoading}
                        required
                        />
                        {errors.phoneNumber && (
                        <div className="invalid-feedback d-block">
                            {errors.phoneNumber}
                        </div>
                        )}
                    </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Control
                    type="text"
                    name="nationalId"
                    value={formData.nationalId}
                    onChange={handleInputChange}
                    placeholder="National ID"
                    className={`rounded-3 p-2 signup-input ${errors.nationalId ? 'is-invalid' : ''}`}
                    disabled={isLoading}
                    required
                    />
                    {errors.nationalId && (
                    <div className="invalid-feedback d-block">
                        {errors.nationalId}
                    </div>
                    )}
                </Form.Group>

                <Row>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                        <div className="password-input-container">
                        <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className={`rounded-3 p-2 signup-input password-field ${errors.password ? 'is-invalid' : ''}`}
                            disabled={isLoading}
                            required
                        />
                        <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} disabled={isLoading}>
                            <img src={showPasswordIcon} alt={showPassword ? "Hide Password" : "Show Password"} />
                        </button>
                        </div>
                        {errors.password && (
                        <div className="invalid-feedback d-block">
                            {errors.password}
                        </div>
                        )}
                    </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                        <div className="password-input-container">
                        <Form.Control
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            className={`rounded-3 p-2 signup-input password-field ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            disabled={isLoading}
                            required
                        />
                        <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)} disabled={isLoading}>
                            <img src={showPasswordIcon} alt={showConfirmPassword ? "Hide Password" : "Show Password"} />
                        </button>
                        </div>
                        {errors.confirmPassword && (
                        <div className="invalid-feedback d-block">
                            {errors.confirmPassword}
                        </div>
                        )}
                    </Form.Group>
                    </Col>
                </Row>



                <div className='section-header mb-4 pb-2'>
                    <div className="d-flex align-items-center">
                        <img src={homeIcon} alt="Business Icon"/>
                        <h3 className='ms-2 mb-0'>Business Information</h3>
                    </div>
                    <p className="section-subtitle">Tell us about your business</p>
                </div>

                <Row>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Control
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="Business Name"
                        className={`rounded-3 p-2 signup-input ${errors.businessName ? 'is-invalid' : ''}`}
                        disabled={isLoading}
                        required
                        />
                        {errors.businessName && (
                        <div className="invalid-feedback d-block">
                            {errors.businessName}
                        </div>
                        )}
                    </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className={`rounded-3 p-2 signup-input ${errors.businessType ? 'is-invalid' : ''}`}
                        disabled={isLoading}
                        required
                        >
                        <option value="">Business Type</option>
                        <option value="retail">Retail</option>
                        </Form.Select>
                        {errors.businessType && (
                        <div className="invalid-feedback d-block">
                            {errors.businessType}
                        </div>
                        )}
                    </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-4">
                    <Form.Control
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="Pickup Location"
                    className={`rounded-3 p-2 signup-input ${errors.pickupLocation ? 'is-invalid' : ''}`}
                    disabled={isLoading}
                    required
                    />
                    {errors.pickupLocation && (
                    <div className="invalid-feedback d-block">
                        {errors.pickupLocation}
                    </div>
                    )}
                </Form.Group>


                <Button type="submit" className="signup-btn w-100 mb-3 py-2" disabled={isLoading || !isFormComplete()}>
                    {isLoading ? (
                    <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2"/>
                        Creating Account...
                    </>
                    ) : (
                    'Create Business Account'
                    )}
                </Button>


                <div className="signin-section text-center">
                    <span className="signin-text">Already have an account? </span>
                    <button type="button" className="signin-link fw-bold" onClick={handleSignIn} disabled={isLoading}>
                        Sign In
                    </button>
                </div>
                </Form>
            </div>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;