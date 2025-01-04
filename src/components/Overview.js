import React from "react";
import { FaUserCircle, FaKey, FaLink, FaCode, FaCheckCircle, FaRocket } from "react-icons/fa";

const Overview = () => {
  const steps = [

    {
      icon: <FaKey className="text-teal-600 text-2xl" />,
      text: "Generate your API keys from the 'API Keys' section.",
    },
    {
      icon: <FaLink className="text-teal-600 text-2xl" />,
      text: "Set up your webhook endpoint and test it using the sandbox environment.",
    },
    {
      icon: <FaCode className="text-teal-600 text-2xl" />,
      text: "Follow the API documentation for making requests to endpoints.",
    },
    {
      icon: <FaCheckCircle className="text-teal-600 text-2xl" />,
      text: "Test your integration thoroughly using the provided test suite.",
    },
    {
      icon: <FaRocket className="text-teal-600 text-2xl" />,
      text: "Move to production by contacting support for final approval.",
    },
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-teal-700 mb-6">Integration Steps</h2>
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start space-x-4">
            <div>{step.icon}</div>
            <p className="text-gray-800 font-medium">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Overview;
