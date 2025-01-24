import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const YourDetails = ({ partner }) => {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-lg font-bold text-teal-700 mb-4">Your Details</h2>
      <p className="text-gray-800">Here you can view and update your account details.</p>
      <ul className="space-y-2 mt-4 text-gray-600">
        <li>
          <strong>Name:</strong> {partner?.person_of_contact || "N/A"}
        </li>
        <li>
          <strong>Email:</strong> {partner?.email || "N/A"}
        </li>
        <li>
          <strong>Phone:</strong> {partner?.phone_number || "N/A"}
        </li>
      </ul>
      <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
        Edit Details
      </button>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-lg font-bold text-teal-700 mb-4">Contact Us</h2>
      <p className="text-gray-800">Reach out to us using the information below:</p>
      <ul className="space-y-2 mt-4 text-gray-600">
        <li>
          <strong>Email:</strong> support@housetabz.com
        </li>
        <li>
          <strong>Phone:</strong> +1 (800) 123-4567
        </li>
        <li>
          <strong>Address:</strong> 123 HouseTabz Lane, Suite 100, Fintech City, USA
        </li>
      </ul>
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
    return <div className="p-6 text-center text-gray-600">Loading partner details...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar active="Settings" partnerName={partner?.name || "Partner"} />

      {/* Main Content */}
      <div className="flex-grow p-8 bg-teal-50 min-h-screen">
        <h1 className="text-2xl font-bold text-teal-700 mb-6">Settings</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-6 border-b-2 border-gray-300 mb-8">
          {["Your Details", "Contact"].map((tab) => (
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

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
