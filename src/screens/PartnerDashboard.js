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

// Chart configuration
const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  plugins: {
    legend: {
      position: "top",
      labels: {
        boxWidth: 10,
        usePointStyle: true,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};


const StatCard = ({ title, value, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="text-teal-500">{icon}</div>
    </div>
  </div>
);

// Helper functions for data processing
const processWebhookLogs = (logs) => {
  if (!logs) return null;

  // Group webhook logs by date
  const groupedByDate = logs.reduce((acc, log) => {
    const date = new Date(log.created_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { count: 0, revenue: 0 };
    }
    acc[date].count += 1;
    acc[date].revenue += parseFloat(log.payload?.pricing || 0);
    return acc;
  }, {});

  // Convert to arrays for charts
  const dates = Object.keys(groupedByDate).sort((a, b) => new Date(a) - new Date(b));
  const accountCounts = dates.map(date => groupedByDate[date].count);
  const revenues = dates.map(date => groupedByDate[date].revenue);

  return {
    dates,
    accountCounts,
    revenues,
    totalAccounts: accountCounts.reduce((a, b) => a + b, 0),
    totalRevenue: revenues.reduce((a, b) => a + b, 0),
  };
};

const calculateWebhookStats = (logs = []) => {
  if (!Array.isArray(logs) || logs.length === 0) {
    return {
      totalRequests: 0,
      successRate: "0%",
      errorRate: "0%"
    };
  }

  const total = logs.length;
  const successful = logs.filter(log => log.status === "success").length;
  const successRate = ((successful / total) * 100).toFixed(1);
  const errorRate = (100 - parseFloat(successRate)).toFixed(1);

  return {
    totalRequests: total,
    successRate: `${successRate}%`,
    errorRate: `${errorRate}%`
  };
};

const PartnerDashboard = () => {
  const [partnerData, setPartnerData] = useState({
    name: "Loading...",
    housesUsingService: 0,
    totalRevenue: "$0",
    activeServices: 0,
    webhookStats: {
      totalRequests: 0,
      successRate: "0%",
      errorRate: "0%"
    },
    webhookLogs: [],
    paymentsReceived: [],
    newAccounts: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No auth token found. Please log in.");

        // Fetch both partner data and webhook logs
        const [partnerResponse, logsResponse] = await Promise.all([
          axios.get("http://localhost:3004/api/partners/current", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3004/api/partners/current/webhookLogs", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const partner = partnerResponse.data.partner;
        const webhookLogs = logsResponse.data.webhookLogs;

        // Process webhook data
        const processedData = processWebhookLogs(webhookLogs);
        const webhookStats = calculateWebhookStats(webhookLogs);

        setPartnerData(prevData => ({
          ...prevData,
          ...partner,
          webhookLogs,
          webhookStats,
          housesUsingService: processedData?.totalAccounts || 0,
          totalRevenue: `$${(processedData?.totalRevenue || 0).toFixed(2)}`,
          activeServices: processedData?.totalAccounts || 0,
          newAccounts: processedData?.dates?.map((date, index) => ({
            date,
            count: processedData.accountCounts[index],
          })) || [],
          paymentsReceived: processedData?.dates?.map((date, index) => ({
            date,
            amount: processedData.revenues[index],
          })) || [],
        }));
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);

  // Prepare chart data
  const paymentsData = {
    labels: partnerData.paymentsReceived?.map((payment) => payment.date),
    datasets: [
      {
        label: "Payments ($)",
        data: partnerData.paymentsReceived?.map((payment) => payment.amount),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
      },
    ],
  };

  const accountsData = {
    labels: partnerData.newAccounts?.map((account) => account.date),
    datasets: [
      {
        label: "New Service Requests",
        data: partnerData.newAccounts?.map((account) => account.count),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  if (isLoading) return <div className="text-center mt-20">Loading dashboard...</div>;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <div className="flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <svg 
                className="h-6 w-6 text-red-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Unable to Load Dashboard</h3>
            <p className="text-gray-500 text-sm mb-6">You've probably been logged out</p>
            <div className="space-y-3 w-full">
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  window.location.href = "/login";
                }}
                className="w-full px-4 py-2 bg-teal-600 text-white rounded-md font-medium hover:bg-teal-700 transition-colors"
              >
                Log In Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Optional: Format webhook log details for display
  const formatLogDetails = (log) => {
    return {
      ...log.payload,
      response: log.response,
      error: log.error,
    };
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar active="Dashboard" partnerName={partnerData.name} />
      
      {/* Main content area */}
      <div className="flex-grow ml-64">
        {/* Fixed header */}
        <div className="fixed top-0 right-0 left-64 bg-teal-50 p-8 border-b border-gray-200 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="text-sm text-gray-500">
              Welcome back, {partnerData.name}
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="bg-teal-50 min-h-screen pt-[88px]">
          <div className="p-8 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard 
                title="Houses Using Service" 
                value={partnerData.housesUsingService}
                icon="🏠"
              />
              <StatCard 
                title="Total Revenue" 
                value={partnerData.totalRevenue}
                icon="💰"
              />
              <StatCard 
                title="Active Services" 
                value={partnerData.activeServices}
                icon="⚡"
              />
              <StatCard 
                title="Webhook Success Rate" 
                value={partnerData?.webhookStats?.successRate || "0%"}
                icon="✓"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">New Service Requests</h2>
                <div className="h-64">
                  <Line data={accountsData} options={chartOptions} />
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Over Time</h2>
                <div className="h-64">
                  <Line data={paymentsData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Webhook Logs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Webhook Logs</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Code</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {partnerData.webhookLogs?.map((log, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {new Date(log.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                            {log.event_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                            log.status === "success"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {log.status_code}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => alert(JSON.stringify(formatLogDetails(log), null, 2))}
                            className="text-teal-600 hover:text-teal-800 font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {(!partnerData.webhookLogs || partnerData.webhookLogs.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No webhook logs found
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboard;