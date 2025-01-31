import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/Sidebar";
import YourDetails from "../components/YourDetails";
import Contact from "../components/Contact";
import MarketplaceSettings from "../components/MarketplaceSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Your Details");
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found. Please log in.");

        const response = await axios.get("http://localhost:3004/api/partners/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPartner(response.data.partner);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching partner details:", err);
        setError("Failed to load partner details.");
        setLoading(false);
      }
    };

    fetchPartner();
  }, []);

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

  if (loading) {
    return (
      <div className="ml-64">
        <div className="text-center mt-20">Loading settings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64">
        <div className="text-center mt-20">
          <p className="text-red-500">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded"
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

  const tabs = ["Your Details", "Contact", "Marketplace Presence"];

  return (
    <div className="flex min-h-screen">
      <Sidebar active="Settings" partnerName={partner?.name || "Partner"} />
      
      {/* Main content area */}
      <div className="flex-grow ml-64">
        {/* Fixed header - now using fixed instead of flex */}
        <div className="fixed top-0 right-0 left-64 bg-teal-50 p-8 border-b border-gray-200 z-10">
          <h1 className="text-2xl font-bold text-teal-700">Settings</h1>
          <div className="flex space-x-6 mt-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`pb-2 px-1 transition-colors ${
                  activeTab === tab
                    ? "text-teal-700 border-b-2 border-teal-700 font-semibold"
                    : "text-gray-600 hover:text-teal-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content - with padding-top to account for fixed header */}
        <div className="bg-teal-50 min-h-screen pt-[132px]"> {/* Adjust pt value based on your header height */}
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;