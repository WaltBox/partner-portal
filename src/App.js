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

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Update authentication status based on token presence
  }, []);

  // Helper for Protected Routes
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />}
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          <Route path="/verify-partner" element={<VerifyPartner />} />
          <Route path="/complete-registration" element={<CompleteRegistration />} />

          {/* Authenticated Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<PartnerDashboard />} />}
          />
          <Route
            path="/developers"
            element={<ProtectedRoute element={<Developers />} />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute element={<Settings />} />}
          />

          {/* Catch-all Route */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? '/dashboard' : '/'} />}
          />
        </Routes>
      </Router>

      {/* Footer */}
      <footer className="bg-teal-50 text-gray-700 py-4 text-center">
        <p>&copy; {new Date().getFullYear()} HouseTabz. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
