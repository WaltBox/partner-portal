import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import APIKeys from "../components/APIKeys";
import PlayBook from "../components/PlayBook";
import SpecialButton from "../components/SpecialButton";
import Webhooks from "../components/Webhooks";
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
      case "Special Button":
        return <SpecialButton />;
      case "PlayBook":
        return <PlayBook />;
      default:
        return <Overview />;
    }
  };

  if (isLoading) {
    return <div className="text-center mt-20">Loading developer dashboard...</div>;
  }

  if (error) {
    return (
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
    );
  }

  return (
    <div className="flex">
      <Sidebar active="Developers" partnerName={partnerName} />
      <div className="flex-grow p-8 bg-teal-50 min-h-screen">
        <h1 className="text-2xl font-bold text-teal-700 mb-6">Developers</h1>

        <div className="flex space-x-6 border-b-2 border-gray-300 mb-8">
          {["Overview", "API Keys", "Webhooks", "Special Button", "PlayBook"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 ${
                activeTab === tab
                  ? "text-teal-700 border-b-4 border-teal-700 font-bold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Developers;
