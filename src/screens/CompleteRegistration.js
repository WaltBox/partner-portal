import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../styles/forms.css'; // Import the CSS file

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
      await axios.post('http://localhost:3004/api/partners/complete-registration', {
        ...formData,
        id: partnerId,
      });
      navigate('/');
    } catch (err) {
      setError('Failed to complete registration');
    }
  };

  return (
    <div className="form-container">
      <h1>Complete Registration</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
          className="form-input"
        />

        {/* Phone Number Field */}
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

        {/* Email Field */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          className="form-input"
        />

        {/* Password Field */}
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

        {/* Submit Button */}
        <button type="submit" className="form-button">Register</button>
      </form>
    </div>
  );
};

export default CompleteRegistration;
