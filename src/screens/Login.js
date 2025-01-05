import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/forms.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3004/api/partners/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      navigate('/dashboard'); // Redirect to dashboard upon successful login
    } catch (err) {
      console.error('Login Error:', err.response?.data || err.message);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="form-container login-form">
      <h1 className="form-title">Partner Portal Login</h1>
      <p className="form-description">
        Access your partner dashboard, manage your services, and explore analytics.
      </p>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button primary">Login</button>
      </form>
      <p className="form-navigation">
        Don’t have an account?{' '}
        <span className="link-text" onClick={() => navigate('/verify-partner')}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
