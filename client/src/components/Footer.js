import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; 2025 Lampiride2. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-end">
            <p>Inspired by the glow of fireflies.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;