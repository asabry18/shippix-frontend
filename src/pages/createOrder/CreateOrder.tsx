import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/createOrderIcon/back.svg';
import personIcon from '../../assets/createOrderIcon/person.svg';
import locationIcon from '../../assets/createOrderIcon/location.svg';
import packageIcon from '../../assets/createOrderIcon/package.svg';
import dollarIcon from '../../assets/createOrderIcon/dollar.svg';
import './CreateOrder.css';

const CreateOrder: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: '',
    emailAddress: '',
    phoneNumber: '',
    streetAddress: '',
    city: '',
    notesToDriver: '',
    itemsDescription: '',
    packageValue: '',
    totalWeight: ''
  });

  const [showShippingCost, setShowShippingCost] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    const errors = getValidationErrors();
    
    setValidationErrors(prev => ({
      ...prev,
      [name]: errors[name] || ''
    }));
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleCalculateShipping = () => {
    if (!validateForm()) {
      return;
    }
    
    setIsCalculating(true);

    setTimeout(() => {
      const baseRate = 15;
      const weightRate = parseFloat(formData.totalWeight) * 2; 
      const distanceRate = 30 * 0.5; 
      const calculatedCost = baseRate + weightRate + distanceRate;

      setShippingCost(calculatedCost);
      setShowShippingCost(true);
      setIsCalculating(false);
    }, 1500);
  }; 

    const handleNext = () => {
        console.log(shippingCost);
    };

  const validateCustomerName = (name: string): string => {
    if (!name || name.trim() === '') {
      return 'Customer Name must not be blank.';
    }
    if (name[0] === ' ') {
      return 'Customer Name first character cannot have space.';
    }
    if (/\d/.test(name)) {
      return 'Customer Name numbers are not allowed.';
    }
    if (/[^a-zA-Z\s]/.test(name)) {
      return 'Customer Name special characters are not allowed.';
    }
    return '';
  };

  const validatePhoneNumber = (phone: string): string => {
    if (!phone || phone.trim() === '') {
      return 'Customer Phone Number must not be blank.';
    }
    if (phone[0] === ' ') {
      return 'Customer Phone Number first character cannot have space.';
    }
    if (/[a-zA-Z]/.test(phone)) {
      return 'Customer Phone Number characters are not allowed.';
    }
    if (/[^0-9\s+()-]/.test(phone)) {
      return 'Customer Phone Number special characters are not allowed.';
    }
    const digitsOnly = phone.replace(/[^0-9]/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 12) {
      return 'Customer Phone Number must be 10-12 digits long.';
    }
    
    return '';
  };

  const validateDeliveryAddress = (address: string): string => {
    if (!address || address.trim() === '') {
      return 'Delivery Address must not be blank.';
    }
    if (address[0] === ' ') {
      return 'Delivery Address first character cannot have space.';
    }
    if (/[^a-zA-Z0-9\s,.-]/.test(address)) {
      return 'Delivery Address special characters are not allowed (except , . -).';
    }
    return '';
  };

  const validatePackageWeight = (weight: string): string => {
    if (!weight || weight.trim() === '') {
      return 'Package Weight must not be blank.';
    }
    if (/[a-zA-Z]/.test(weight)) {
      return 'Package Weight characters are not allowed.';
    }
    if (/[^0-9.]/.test(weight)) {
      return 'Package Weight special characters are not allowed.';
    }
    return '';
  };

  const validateOrderDescription = (description: string): string => {
    if (!description || description.trim() === '') {
      return 'Order Description must not be blank.';
    }
    return '';
  };

  const getValidationErrors = () => {
    const errors: {[key: string]: string} = {};
    
    const customerNameError = validateCustomerName(formData.customerName);
    if (customerNameError) errors.customerName = customerNameError;
    
    const phoneError = validatePhoneNumber(formData.phoneNumber);
    if (phoneError) errors.phoneNumber = phoneError;
    
    const addressError = validateDeliveryAddress(formData.streetAddress);
    if (addressError) errors.streetAddress = addressError;
    
    const weightError = validatePackageWeight(formData.totalWeight);
    if (weightError) errors.totalWeight = weightError;
    
    const descriptionError = validateOrderDescription(formData.itemsDescription);
    if (descriptionError) errors.itemsDescription = descriptionError;
    
    return errors;
  };
  const validateForm = () => {
    const errors = getValidationErrors();
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isFormValid = () => {
    const errors = getValidationErrors();
    return (
      formData.customerName.trim() !== '' &&
      formData.emailAddress.trim() !== '' &&
      formData.phoneNumber.trim() !== '' &&
      formData.streetAddress.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.itemsDescription.trim() !== '' &&
      formData.packageValue.trim() !== '' &&
      formData.totalWeight.trim() !== '' &&
      Object.keys(errors).length === 0
    );
  };

  return (
    <div className="create-order-page">
      <Container className="py-4">

        <div className="page-header py-3">
          <div className="d-flex align-items-center">
            <Button variant="link" className="back-btn p-0 me-2" onClick={handleBack}>
                <img src={backIcon} alt="Back" className="back-icon" />
            </Button>
            <h2 className="page-title mb-1">Create New Order</h2>
          </div>
            <p className="page-subtitle m-0">Add a customer order to your system</p>
        </div>

        <Row className="g-4">

          <Col lg={6}>
            <Card className="info-card h-100 rounded-4">
              <Card.Body>
                <div className="card-header-custom pb-2 mb-3">
                  <div className="d-flex align-items-center">
                    <img src={personIcon} alt="Customer" className="section-icon me-2" />
                    <h5 className="section-title mb-1">Customer Information</h5>
                  </div>
                    <p className="section-subtitle m-0">Details about your customer</p>
                </div>

                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="Enter customer name"
                      className={`form-control-custom rounded-3 py-2 ${validationErrors.customerName ? 'is-invalid' : ''}`}
                    />
                    {validationErrors.customerName && (
                      <div className="invalid-feedback d-block">
                        {validationErrors.customerName}
                      </div>
                    )}
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleInputChange}
                          placeholder="Enter email address"
                          className="form-control-custom rounded-3 py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          onBlur={handleInputBlur}
                          placeholder="Enter phone number"
                          className={`form-control-custom rounded-3 py-2 ${validationErrors.phoneNumber ? 'is-invalid' : ''}`}
                        />
                        {validationErrors.phoneNumber && (
                          <div className="invalid-feedback d-block">
                            {validationErrors.phoneNumber}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="info-card h-100 rounded-4">
              <Card.Body>
                <div className="card-header-custom pb-2 mb-3">
                  <div className="d-flex align-items-center">
                    <img src={locationIcon} alt="Delivery" className="section-icon me-2" />
                    <h5 className="section-title mb-1">Delivery Information</h5>
                  </div>
                    <p className="section-subtitle mb-0">Where should we deliver this order?</p>
                </div>

                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      placeholder="Enter street address"
                      className={`form-control-custom rounded-3 py-2 ${validationErrors.streetAddress ? 'is-invalid' : ''}`}
                    />
                    {validationErrors.streetAddress && (
                      <div className="invalid-feedback d-block">
                        {validationErrors.streetAddress}
                      </div>
                    )}
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Enter city"
                          className="form-control-custom rounded-3 py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Notes to Driver (Optional)</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={1}
                          name="notesToDriver"
                          value={formData.notesToDriver}
                          onChange={handleInputChange}
                          placeholder="Add notes"
                          className="form-control-custom rounded-3 py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="distance-info">
                    <span className="distance-text">Total Distance: 30Km</span>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

        </Row>

        <Row className="mt-4">
          <Col>
            <Card className="info-card rounded-4">
              <Card.Body>
                <div className="card-header-custom pb-2 mb-3">
                  <div className="d-flex align-items-center">
                    <img src={packageIcon} alt="Package" className="section-icon me-2" />
                    <h5 className="section-title mb-1">Package Information</h5>
                  </div>
                    <p className="section-subtitle m-0">Details about what you are shipping</p>
                </div>

                <Row>
                  <Col lg={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>Items Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={1}
                        name="itemsDescription"
                        value={formData.itemsDescription}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder="e.g. Electronics, Clothing, Books"
                        className={`form-control-custom rounded-3 py-2 ${validationErrors.itemsDescription ? 'is-invalid' : ''}`}
                      />
                      {validationErrors.itemsDescription && (
                        <div className="invalid-feedback d-block">
                          {validationErrors.itemsDescription}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>Package Value (EGP)</Form.Label>
                      <Form.Control
                        type="number"
                        name="packageValue"
                        value={formData.packageValue}
                        onChange={handleInputChange}
                        placeholder="Enter package value"
                        className="form-control-custom rounded-3 py-2"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={4}>
                    <Form.Group className="mb-2">
                      <Form.Label>Total Weight (kg)</Form.Label>
                      <Form.Control
                        type="number"
                        name="totalWeight"
                        value={formData.totalWeight}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder="Enter total weight"
                        className={`form-control-custom rounded-3 py-2 ${validationErrors.totalWeight ? 'is-invalid' : ''}`}
                      />
                      {validationErrors.totalWeight && (
                        <div className="invalid-feedback d-block">
                          {validationErrors.totalWeight}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button 
            className="calculate-btn rounded-5 border-0 py-2 px-5" 
            size="lg" 
            onClick={handleCalculateShipping}
            disabled={isCalculating || !isFormValid()}
          >
            {isCalculating ? 'Calculating...' : 'Calculate Shipping Cost'}
          </Button>
          <p className="calculate-note mt-2">
            {!isFormValid() && !isCalculating ? 
              'Please fill in all required fields to calculate shipping cost' :
              'We take into account the Package Weight and Delivery Distance'
            }
          </p>
        </div>

        {showShippingCost && (
          <Row className="mt-4">
            <Col>
              <Card className="shipping-cost-card rounded-4">
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="cost-icon me-3">
                        <img src={dollarIcon} alt="Dollar" className="dollar-icon" />
                      </div>
                      <div>
                        <h5 className="shipping-title mb-1">Shipping Cost</h5>
                        <h5 className="shipping-price mb-0">{shippingCost.toFixed(2)} EGP</h5>
                      </div>
                    </div>
                    <div className="text-end">
                      <Button className="next-btn rounded-5 border-0 py-2 px-4" onClick={handleNext}>
                        Next
                      </Button>
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <p className="competition-text mb-0 pt-2">15% Below Market. Stand Out from Competition!</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default CreateOrder;