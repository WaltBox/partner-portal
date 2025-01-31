import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
const VerifyPartner = () => {
  const [partners, setPartners] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get('http://localhost:3004/api/partners');
        setPartners(response.data.partners || []);
      } catch (err) {
        setError('Failed to load partner names. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3004/api/partners/verify', {
        name: selectedName,
        registration_code: registrationCode,
      });
      if (response.data.partner) {
        navigate(`/complete-registration`, { 
          state: { partnerId: response.data.partner.id }
        });
      }
    } catch (err) {
      setError('Invalid name or registration code');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
            <div className="text-center text-gray-600">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      < Navbar />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Verify Partner Access
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please select your organization and enter your registration code
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleVerify}>
            <div>
              <label 
                htmlFor="partnerName" 
                className="block text-sm font-medium text-gray-700"
              >
                Partner Name
              </label>
              <div className="mt-1">
                <select
                  id="partnerName"
                  value={selectedName}
                  onChange={(e) => setSelectedName(e.target.value)}
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                >
                  <option value="" disabled>Select partner name</option>
                  {partners.map((partner) => (
                    <option key={partner.id} value={partner.name}>
                      {partner.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label 
                htmlFor="registrationCode" 
                className="block text-sm font-medium text-gray-700"
              >
                Registration Code
              </label>
              <div className="mt-1">
                <input
                  id="registrationCode"
                  type="text"
                  placeholder="Enter registration code"
                  value={registrationCode}
                  onChange={(e) => setRegistrationCode(e.target.value)}
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
              >
                Verify Access
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center text-sm">
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-teal-600 hover:text-teal-500 focus:outline-none focus:underline transition-colors"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPartner;