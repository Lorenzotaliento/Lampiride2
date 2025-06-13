import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/auth/register', { email, password });
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError(`Registration failed: ${err.response?.data?.msg || 'Server error'}`);
      console.log(err);
    }
  };

  return (
    <div className="text-center mt-5">
      <h2 style={{ color: '#fff' }}>Register</h2>
      <Form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ background: '#444', color: '#fff', border: 'none' }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ background: '#444', color: '#fff', border: 'none' }}
          />
        </Form.Group>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="outline-light" type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default Register;

