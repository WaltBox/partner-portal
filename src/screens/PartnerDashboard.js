import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PartnerDashboard = () => {
  const [partnerData, setPartnerData] = useState({
    name: "Loading...",
    housesUsingService: 0,
    totalRevenue: "$0",
    activeServices: 0,
    webhookStats: {
      totalRequests: 0,
      successRate: "0%",
      errorRate: "0%",
    },
    recentWebhooks: [],
    topHousesBySpend: [],
    recentPayments: [],
    paymentsReceived: [],
    newAccounts: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPartnerData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found. Please log in.");
      }

      const response = await axios.get("http://localhost:3004/api/partners/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPartnerData(response.data.partner);
    } catch (error) {
      console.error("Error fetching partner data:", error);
      setError("Failed to load dashboard. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerData();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-20">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded"
          onClick={() => {
            localStorage.removeItem("authToken");
            window.location.href = "/login"; // Redirect to login
          }}
        >
          Log In Again
        </button>
      </div>
    );
  }

  const paymentsData = {
    labels: (partnerData.paymentsReceived || []).map((payment) => payment.date || "N/A"),
    datasets: [
      {
        label: "Payments",
        data: (partnerData.paymentsReceived || []).map((payment) => payment.amount || 0),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
      },
    ],
  };

  const accountsData = {
    labels: (partnerData.newAccounts || []).map((account) => account.date || "N/A"),
    datasets: [
      {
        label: "New Accounts",
        data: (partnerData.newAccounts || []).map((account) => account.count || 0),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="flex">
      <Sidebar active="Dashboard" partnerName={partnerData.name} />

      <div className="flex-grow min-h-screen bg-teal-50 p-8">
        {/* Charts Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border-2 border-teal-50 hover:border-green-500 transition">
            <h2 className="text-lg font-bold text-teal-700 mb-4">New Accounts</h2>
            <Line data={accountsData} />
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-teal-50 hover:border-green-500 transition">
            <h2 className="text-lg font-bold text-teal-700 mb-4">Payments Received</h2>
            <Line data={paymentsData} />
          </div>
        </div>

        {/* Your Overview Section */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-teal-700">Your Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg border-2 border-teal-50 hover:border-green-500 transition">
              <h3 className="text-lg font-bold text-teal-700">Top Houses by Spend</h3>
              <ul className="mt-4 space-y-2">
                {(partnerData.topHousesBySpend || []).map((house, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-gray-800 font-medium"
                  >
                    <span>{house.houseName || "Unknown House"}</span>
                    <span>{house.spend || 0}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-teal-50 hover:border-green-500 transition">
              <h3 className="text-lg font-bold text-teal-700">Recent Payments</h3>
              <ul className="mt-4 space-y-2">
                {(partnerData.recentPayments || []).map((payment) => (
                  <li
                    key={payment.id}
                    className="flex justify-between text-gray-800 font-medium"
                  >
                    <span>{payment.houseName || "Unknown House"}</span>
                    <span>{payment.amount || 0}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;
