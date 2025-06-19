import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/Register.css';

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
      setError(`Registrazione fallita: ${err.response?.data?.msg || 'Errore server'}`);
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Crea il tuo Account</h2>
        <Form onSubmit={handleSubmit} className="register-form">
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
              placeholder="Crea una password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="custom-input"
              required
            />
          </Form.Group>
          {error && <p className="error-message">{error}</p>}
          <Button className="register-button" type="submit">
            Registrati
          </Button>
        </Form>
        <p className="login-link">
          Hai già un account? <a href="/login">Accedi</a>
        </p>
      </div>
    </div>
  );
};

export default Register;