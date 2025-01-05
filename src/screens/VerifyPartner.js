import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/forms.css';

const VerifyPartner = () => {
  const [partners, setPartners] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('http://localhost:3004/api/partners');
        setPartners(response.data.partners || []);
      } catch (err) {
        setError('Failed to load partner names. Please try again later.');
      }
    };
    fetchPartners();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3004/api/partners/verify', {
        name: selectedName,
        registration_code: registrationCode,
      });
      if (response.data.partner) {
        navigate(`/complete-registration`, { state: { partnerId: response.data.partner.id } });
      }
    } catch (err) {
      setError('Invalid name or registration code');
    }
  };
  

  return (
    <div className="form-container verify-partner-form">
      <h1 className="form-title">Verify Partner</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleVerify}>
        <label htmlFor="partnerName">Partner Name</label>
        <select
          id="partnerName"
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
          required
          className="form-input"
        >
          <option value="" disabled>Select partner name</option>
          {partners.map((partner) => (
            <option key={partner.id} value={partner.name}>
              {partner.name}
            </option>
          ))}
        </select>

        <label htmlFor="registrationCode">Registration Code</label>
        <input
          type="text"
          id="registrationCode"
          placeholder="Enter registration code"
          value={registrationCode}
          onChange={(e) => setRegistrationCode(e.target.value)}
          required
          className="form-input"
        />

        <button type="submit" className="form-button primary">Verify</button>
      </form>
    </div>
  );
};

export default VerifyPartner;
