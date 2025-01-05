import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar from '../components/Navbar';
import '../styles/landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to the Partner Portal</h1>
          <p>
            Supercharge your marketing strategy with the ultimate platform built for shared living. 
            Revolutionize how you reach roommates everywhere.
          </p>
          <Link to="/login" className="cta-button">Login</Link> {/* Updated to navigate to Login */}
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/HouseTabzmarket.png"
            alt="HouseTabz Marketplace"
            className="mockup-image"
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
