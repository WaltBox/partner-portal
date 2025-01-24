import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation for query parameters
import Navbar from '../components/Navbar';
import AcceptHouseTabz from '../segments/AcceptHouseTabz';
import '../styles/landing.css';

const LandingPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get('message'); // Get the "message" query parameter

  return (
    <div className="landing-page">
      <Navbar />

      {/* Display the success message if it exists */}
      {message && (
        <div className="alert-message bg-green-100 text-green-800 p-4 rounded shadow mb-4">
          {message}
        </div>
      )}

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to the Partner Portal</h1>
          <p>
            Supercharge your marketing strategy with the ultimate platform built for shared living. 
            Revolutionize how you reach roommates everywhere.
          </p>
          <Link to="/login" className="cta-button">Login</Link> {/* Navigate to Login */}
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/HouseTabzmarket.png"
            alt="HouseTabz Marketplace"
            className="mockup-image"
          />
        </div>
      </section>


      <AcceptHouseTabz />
      
    </div>
  );
};

export default LandingPage;
