import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import YourDetails from "../components/YourDetails";
import Contact from "../components/Contact";
import MarketplaceSettings from "../components/MarketplaceSettings";

const Settings = () => {
  // Tabs that can be expanded later if needed
  const tabs = ["Your Details", "Contact", "Marketplace Presence"];

  const [activeTab, setActiveTab] = useState("Your Details");
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch partner data on component mount
  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No auth token found. Please log in.");
        }

        const { data } = await axios.get("http://localhost:3004/api/partners/current", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPartner(data.partner);
      } catch (err) {
        console.error("Error fetching partner details:", err);
        setError("Failed to load partner details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, []);

  // Render the appropriate component based on the selected tab
  const renderContent = () => {
    switch (activeTab) {
      case "Your Details":
        return <YourDetails partner={partner} />;
      case "Marketplace Presence":
        return <MarketplaceSettings partner={partner} />;
      case "Contact":
        return <Contact />;
      default:
        return <YourDetails partner={partner} />;
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="flex ml-64 items-center justify-center min-h-screen bg-teal-50">
        <p className="text-lg text-gray-700">Loading settings...</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex ml-64 items-center justify-center min-h-screen bg-teal-50">
        <div className="text-center">
          <p className="text-xl text-red-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.href = "/login";
            }}
          >
            Log In Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with partner's name */}
      <Sidebar active="Settings" partnerName={partner?.name || "Partner"} />

      {/* Main Content Area */}
      <div className="flex-grow ml-64">
        {/* Fixed Header */}
        <header className="fixed top-0 left-64 right-0 bg-teal-50 p-8 border-b border-gray-200 z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-teal-700">Settings</h1>
            <nav className="mt-4 sm:mt-0">
              <ul className="flex space-x-6">
                {tabs.map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 px-1 transition-colors text-sm font-medium ${
                        activeTab === tab
                          ? "text-teal-700 border-b-2 border-teal-700"
                          : "text-gray-600 hover:text-teal-600"
                      }`}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="bg-teal-50 min-h-screen pt-[132px] pb-8">
          <div className="p-8 bg-white rounded-xl shadow-sm mx-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
