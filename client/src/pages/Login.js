import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Login.css'; // File CSS personalizzato

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError('Accesso fallito. Controlla le tue credenziali.');
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Accedi al tuo Account</h2>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group className="mb-4 position-relative">
            <FaEnvelope className="input-icon" />
            <Form.Control
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="custom-input"
              required
            />
          </Form.Group>
          <Form.Group className="mb-4 position-relative">
            <FaLock className="input-icon" />
            <Form.Control
              type="password"
              placeholder="Inserisci la password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="custom-input"
              required
            />
          </Form.Group>
          {error && <p className="error-message">{error}</p>}
          <Button className="login-button" type="submit">
            Accedi
          </Button>
        </Form>
        <p className="register-link">
          Non hai un account? <a href="/register">Registrati</a>
        </p>
      </div>
    </div>
  );
};

export default Login;