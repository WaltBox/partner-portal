import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import PartnerDashboard from './screens/PartnerDashboard';
import Developers from './screens/Developers';
import Settings from './screens/Settings';
import VerifyPartner from './screens/VerifyPartner';
import CompleteRegistration from './screens/CompleteRegistration';
import Login from './screens/Login';
import LandingPage from './screens/LandingPage';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Redirect if not logged in */}
          {!isAuthenticated ? (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-partner" element={<VerifyPartner />} />
              <Route path="/complete-registration" element={<CompleteRegistration />} />
            </>
          ) : (
            <>
              <Route path="/" element={<PartnerDashboard />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/settings" element={<Settings />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>

      {/* Example Footer */}
      <footer className="bg-teal-50 text-gray-700 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} HouseTabz. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
