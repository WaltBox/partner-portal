import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import APIKeys from "../components/APIKeys";
import Webhooks from "../components/Webhooks";
import ZapierGuide from "../components/ZapierGuide";
import SDKGuide from "../components/SDKGuide";
import RecurringExpensesGuide from "../components/RecurringExpensesGuide";

const Developers = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [partnerName, setPartnerName] = useState("Loading...");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Added SDK Guide to tabs
  const tabs = ["Overview", "API Keys", "SDK Guide", "Recurring Bills", "Webhooks", "Zapier"];

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found");
        }
        const response = await axios.get("http://localhost:3004/api/partners/current", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPartnerName(response.data.partner.name || "Unknown Partner");
      } catch (error) {
        console.error("Error fetching partner data:", error);
        setError("Failed to load partner data. Please log in again.");
      } finally {
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
      case "SDK Guide":
        return <SDKGuide />;
      case "Recurring Bills":
        return <RecurringExpensesGuide />;
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
      <div className="ml-64 flex items-center justify-center min-h-screen bg-teal-50">
        <p className="text-lg text-gray-700">Loading developer dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 flex flex-col items-center justify-center min-h-screen bg-teal-50">
        <p className="text-xl text-red-600">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors"
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
    <div className="flex min-h-screen">
      <Sidebar active="Developers" partnerName={partnerName} />

      <div className="flex-grow ml-64">
        <header className="fixed top-0 left-64 right-0 bg-teal-50 p-8 border-b border-gray-200 z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-2xl font-bold text-teal-700">Developers</h1>
            <nav className="mt-4 sm:mt-0">
              <ul className="flex space-x-6">
                {tabs.map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 px-1 text-sm font-medium transition-colors ${
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

        <main className="bg-teal-50 min-h-screen pt-20">
          <div className="p-8">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Developers;