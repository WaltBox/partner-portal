import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const YourDetails = ({ partner }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-teal-700 mb-4">Your Details</h2>
      <p className="text-gray-600 mb-6">Here you can view and update your account details.</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium text-gray-800">{partner?.person_of_contact || "N/A"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium text-gray-800">{partner?.email || "N/A"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <p className="font-medium text-gray-800">{partner?.phone_number || "N/A"}</p>
          </div>
        </div>

        <button className="mt-6 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Edit Details
        </button>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-teal-700 mb-4">Contact Us</h2>
      <p className="text-gray-600 mb-6">Reach out to us using the information below:</p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Email:</span>
          <a href="mailto:support@housetabz.com" className="text-teal-600 hover:text-teal-700">
            support@housetabz.com
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Phone:</span>
          <a href="tel:+18001234567" className="text-teal-600 hover:text-teal-700">
            +1 (800) 123-4567
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Address:</span>
          <span className="text-gray-800">
            123 HouseTabz Lane, Suite 100, Fintech City, USA
          </span>
        </div>
      </div>
    </div>
  );
};

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
      } catch (err) {
        console.error("Error fetching partner details:", err);
        setError("Failed to load partner details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Your Details":
        return <YourDetails partner={partner} />;
      case "Contact":
        return <Contact />;
      default:
        return <YourDetails partner={partner} />;
    }
  };

  if (loading) {
    return (
      <div className="ml-64 min-h-screen bg-teal-50 p-8">
        <div className="text-center">Loading partner details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ml-64 min-h-screen bg-teal-50 p-8">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  const tabs = ["Your Details", "Contact"];

  return (
    <div className="flex min-h-screen">
      <Sidebar active="Settings" partnerName={partner?.name || "Partner"} />
      
      {/* Main Content */}
      <div className="flex-grow ml-64">
        {/* Fixed Header */}
        <div className="bg-teal-50 p-8 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-teal-700">Settings</h1>

          {/* Tab Navigation */}
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

        {/* Scrollable Content */}
        <div className="bg-teal-50 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;