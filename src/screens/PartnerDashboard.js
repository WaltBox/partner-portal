import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Line } from "react-chartjs-2";
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
    name: "Sample Partner",
    housesUsingService: 25,
    totalRevenue: "$12,500",
    activeServices: 15,
    webhookStats: {
      totalRequests: 200,
      successRate: "95%",
      errorRate: "5%",
    },
    recentWebhooks: [
      { id: 1, event: "Service Update", status: "Success", timestamp: "2024-01-01T12:00:00Z" },
      { id: 2, event: "Payment Notification", status: "Error", timestamp: "2024-01-01T11:00:00Z" },
    ],
    topHousesBySpend: [
      { houseName: "House Alpha", spend: "$1,200" },
      { houseName: "House Beta", spend: "$950" },
      { houseName: "House Gamma", spend: "$880" },
    ],
    recentPayments: [
      { id: 1, houseName: "House Alpha", amount: "$500", date: "2024-01-01T12:00:00Z" },
      { id: 2, houseName: "House Beta", amount: "$300", date: "2024-01-01T10:30:00Z" },
      { id: 3, houseName: "House Gamma", amount: "$200", date: "2023-12-31T16:45:00Z" },
    ],
    paymentsReceived: [
      { date: "2024-01-01", amount: 1500 },
      { date: "2024-01-02", amount: 2000 },
      { date: "2024-01-03", amount: 1800 },
      { date: "2024-01-04", amount: 2200 },
    ],
    newAccounts: [
      { date: "2024-01-01", count: 5 },
      { date: "2024-01-02", count: 7 },
      { date: "2024-01-03", count: 6 },
      { date: "2024-01-04", count: 8 },
    ],
  });

  // Data for the charts
  const paymentsData = {
    labels: partnerData.paymentsReceived.map((payment) => payment.date),
    datasets: [
      {
        label: "Payments",
        data: partnerData.paymentsReceived.map((payment) => payment.amount),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
      },
    ],
  };

  const accountsData = {
    labels: partnerData.newAccounts.map((account) => account.date),
    datasets: [
      {
        label: "New Accounts",
        data: partnerData.newAccounts.map((account) => account.count),
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
                {partnerData.topHousesBySpend.map((house, index) => (
                  <li key={index} className="flex justify-between text-gray-800 font-medium">
                    <span>{house.houseName}</span>
                    <span>{house.spend}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg border-2 border-teal-50 hover:border-green-500 transition">
              <h3 className="text-lg font-bold text-teal-700">Recent Payments</h3>
              <ul className="mt-4 space-y-2">
                {partnerData.recentPayments.map((payment) => (
                  <li key={payment.id} className="flex justify-between text-gray-800 font-medium">
                    <span>{payment.houseName}</span>
                    <span>{payment.amount}</span>
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
