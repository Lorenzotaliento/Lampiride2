import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Container, ListGroup, Button, Spinner, Form, Row, Col } from 'react-bootstrap';

const Profile = () => {
  const { user, cart, addToCart, removeFromCart } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [lampId, setLampId] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const items = await Promise.all(
        cart.map(async (lampId) => {
          const response = await axios.get(`http://localhost:5001/api/lamps/${lampId}`);
          return response.data;
        })
      );
      setCartItems(items);
    } catch (err) {
      console.error('Error fetching cart items:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cart]);

  const handleAddToCart = () => {
    if (lampId) {
      addToCart(lampId);
      setLampId('');
    }
  };

  if (loading) {
    return <Spinner animation="border" className="text-primary d-block mx-auto my-5" />;
  }

  return (
    <Container className="py-4">
      <h1 className="text-primary mb-4">Profile</h1>
      {user && (
        <div>
          <p className="text-muted">Email: {user.email}</p>
          <h2 className="text-primary mt-4">Cart</h2>
          {cartItems.length > 0 ? (
            <ListGroup className="mb-4">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="d-flex justify-content-between align-items-center">
                  <div>
                    {item.name} - <span className="text-success">${item.price.toFixed(2)}</span>
                  </div>
                  <Button variant="danger" onClick={() => removeFromCart(item._id)} size="sm">
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">Your cart is empty.</p>
          )}
          <h3 className="text-primary mt-4">Add to Cart</h3>
          <Row className="align-items-center">
            <Col xs={8} md={6}>
              <Form.Control
                type="text"
                value={lampId}
                onChange={(e) => setLampId(e.target.value)}
                placeholder="Enter Lamp ID"
                className="mb-2"
              />
            </Col>
            <Col xs={4} md={3}>
              <Button variant="primary" onClick={handleAddToCart} className="w-100">
                Add to Cart
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Profile;