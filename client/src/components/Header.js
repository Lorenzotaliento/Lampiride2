import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand href="/" className="fw-bold text-warning">Lampiride2</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-light">Home</Nav.Link>
            {user ? (
              <>
                <Nav.Link href="/profile" className="text-light">Profile</Nav.Link>
                <Button variant="outline-warning" onClick={handleLogout} className="ms-2">Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link href="/register" className="text-light">Register</Nav.Link>
                <Nav.Link href="/login" className="text-light">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;