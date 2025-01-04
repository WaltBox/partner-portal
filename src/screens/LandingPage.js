import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/forms.css'; // Import the CSS file

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <h1>Welcome to HouseTabz Partner Portal</h1>
      <p className="text-gray-600 mb-8">
        Manage your partnership details, track API usage, and more. Log in or sign up to get started.
      </p>
      <div className="button-group">
        <button
          className="primary-btn"
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
        <button
          className="secondary-btn"
          onClick={() => navigate('/verify-partner')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
