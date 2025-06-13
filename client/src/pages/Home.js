import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [lamps, setLamps] = useState([]);
  const { addToCart } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:5001/api/lamps')
      .then(res => setLamps(res.data))
      .catch(err => console.error('Error fetching lamps:', err));
  }, []);

  return (
    <div className="py-4">
      <h1 className="text-center mb-4 text-primary">Nature-Inspired Lighting</h1>
      <p className="text-center mb-4 text-muted">Illumination with the enchantment of fireflies.</p>
      <Row className="g-4 justify-content-center">
        {lamps.map(lamp => (
          <Col key={lamp._id} xs={12} sm={6} md={4} lg={3}>
            <Card className="h-100 shadow-sm border-0">
              <Card.Img variant="top" src={lamp.image} alt={lamp.name} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="text-dark">{lamp.name}</Card.Title>
                <Card.Text className="text-secondary flex-grow-1">{lamp.description}</Card.Text>
                <Card.Text className="text-success fw-bold">Price: ${lamp.price.toFixed(2)}</Card.Text>
                <Button variant="primary" onClick={() => addToCart(lamp._id)} className="mt-auto">
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;