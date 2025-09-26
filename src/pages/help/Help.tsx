import React from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { helpCards } from './HelpCards';
import { browseTopics, faqItems } from './HelpData';
import './Help.css';

const Help: React.FC = () => {
  return (
    <Container className="py-4">
      <Row className="text-center mb-3">
        <Col>
          <h1 className="fw-bold">How can we help?</h1>
          <p className="lead text-muted">Get instant support for your shipments</p>
        </Col>
      </Row>
      <Row className="g-4 justify-content-center mb-5">
        {helpCards.map((card, index) => (
          <Col md={6} lg={4} key={index}>
            <Card className="h-100 text-center p-4 rounded-5 shadow-sm help-card">
              <Card.Body className="d-flex flex-column p-0">
                <div className="icon-placeholder mb-3">
                  <img src={card.icon} alt={card.title} className="help-card-icon" />
                </div>
                <Card.Title as="h5" className="fw-bold">{card.title}</Card.Title>
                <Card.Text className="text-muted mb-4">{card.description}</Card.Text>
                <Button variant="primary" className="w-100 mt-auto help-card-button">{card.buttonText}</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col md={6} className='mb-3'>
          <h2 className="fw-bold mb-3">Browse All Topics</h2>
          <Row>
            {browseTopics.map((topic, index) => (
              <Col xs={6} key={index}>
                <Card className="text-center p-5 topic-card h-100 border-0 rounded-5">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center p-0">
                    <div className="d-flex justify-content-center align-items-center topic-icon mb-4">
                      <div className="topic-question-mark">?</div>
                    </div>
                    <Card.Title className="h5 fw-bold text-dark">{topic.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={6}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">FAQ (Frequently Asked Questions)</h2>
            <Button variant="link" className="text-primary p-0 faq-view-all">View All &gt;</Button>
          </div>
          <Accordion defaultActiveKey="0" className="faq-accordion">
            {faqItems.map((item, index) => (
              <Accordion.Item eventKey={index.toString()} key={index} className="mb-3">
                <Accordion.Header className="faq-question">{item.question}</Accordion.Header>
                <Accordion.Body className="faq-answer">
                  {item.answer}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
      
    </Container>
  );
};

export default Help;