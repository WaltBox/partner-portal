import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css'; // Separate CSS for the navbar

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <span className="navbar-logo" onClick={() => navigate('/')}>
          partner.housetabz
        </span>
      </div>
      <div className="navbar-right">
        <button className="navbar-button" onClick={() => navigate('/login')}>
          Log In
        </button>
        <button className="navbar-button" onClick={() => navigate('/verify-partner')}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
