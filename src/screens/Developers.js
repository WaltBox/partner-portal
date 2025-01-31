import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import APIKeys from "../components/APIKeys";
import Webhooks from "../components/Webhooks";
import ZapierGuide from "../components/ZapierGuide";
import axios from "axios";

const Developers = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [partnerName, setPartnerName] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");
        
        const response = await axios.get("http://localhost:3004/api/partners/current", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPartnerName(response.data.partner.name || "Unknown Partner");
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching partner data:", error);
        setError("Failed to load partner data. Please log in again.");
        setIsLoading(false);
      }
    };

    fetchPartnerData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview />;
      case "API Keys":
        return <APIKeys />;
      case "Webhooks":
        return <Webhooks />;
      case "Zapier":
        return <ZapierGuide />;
      default:
        return <Overview />;
    }
  };

  if (isLoading) {
    return (
      <div className="ml-64">
        <div className="text-center mt-20">Loading developer dashboard...</div>
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

  const tabs = ["Overview", "API Keys", "Webhooks", "Zapier"];

  return (
    <div className="flex min-h-screen">
      <Sidebar active="Developers" partnerName={partnerName} />
      
      {/* Main content area */}
      <div className="flex-grow ml-64">
        {/* Fixed header - using fixed positioning */}
        <div className="fixed top-0 right-0 left-64 bg-teal-50 p-8 border-b border-gray-200 z-10">
          <h1 className="text-2xl font-bold text-teal-700">Developers</h1>
          {/* Tab navigation */}
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

        {/* Scrollable content area with padding-top for fixed header */}
        <div className="bg-teal-50 min-h-screen pt-[132px]">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;