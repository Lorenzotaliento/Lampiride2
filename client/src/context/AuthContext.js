import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5001/api/auth/user', {
        headers: { 'x-auth-token': token },
      }).then(res => {
        setUser(res.data);
        setCart(res.data.cart || []);
      }).catch(() => localStorage.removeItem('token'));
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    axios.get('http://localhost:5001/api/auth/user', {
      headers: { 'x-auth-token': token },
    }).then(res => {
      setUser(res.data);
      setCart(res.data.cart || []);
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCart([]);
  };

  const addToCart = async (lampId) => {
    const token = localStorage.getItem('token');
    if (token) {
      const res = await axios.put(`http://localhost:5001/api/auth/cart/add/${lampId}`, {}, {
        headers: { 'x-auth-token': token },
      });
      setCart(res.data);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, cart, addToCart }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};