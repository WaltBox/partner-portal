import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/forms.css';

const CompleteRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const partnerId = location.state?.partnerId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3004/api/partners/${partnerId}/complete-registration`, {
        person_of_contact: formData.name, // Assign formData.name to person_of_contact
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number,
      });
      navigate('/');
    } catch (err) {
      setError('Failed to complete registration');
    }
  };
  

  return (
    <div className="form-container complete-registration">
      <h1>Complete Registration</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="form-input"
        />

        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="text"
          id="phone_number"
          placeholder="Enter phone number"
          value={formData.phone_number}
          onChange={(e) =>
            setFormData({ ...formData, phone_number: e.target.value })
          }
          required
          className="form-input"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="form-input"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          className="form-input"
        />

        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  );
};

export default CompleteRegistration;
