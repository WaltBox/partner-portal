import React from 'react';

const ServiceIntegrationDetails = ({ type }) => {
  const details = {
    energy: {
      paymentFlow: [
        "Credit check determines security deposit requirement",
        "Security deposit is split equally among roommates",
        "Each roommate must approve and pay their portion",
        "Monthly bills are automatically split through webhook",
        "HouseTabz handles monthly payment collection"
      ],
      keyPoints: [
        "Retain your existing credit check system",
        "Automated monthly billing splits",
        "Guaranteed monthly payments",
        "Simplified roommate management"
      ]
    },
    cleaning: {
      paymentFlow: [
        "Total service cost is split equally",
        "Each roommate pays their portion upfront",
        "Funds are held in escrow by HouseTabz",
        "Service is authorized once all payments received",
        "Payment released after service completion"
      ],
      keyPoints: [
        "Guaranteed payment before service",
        "No risk of partial payments",
        "Automated splitting and collection",
        "Simple refund process if needed"
      ]
    }
  };

  // Add safety check
  if (!type || !details[type]) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-bold text-lg mb-4">Payment Flow</h4>
        <ul className="space-y-3">
          {details[type].paymentFlow.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-teal-600">•</span>
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-bold text-lg mb-4">Key Benefits</h4>
        <ul className="space-y-3">
          {details[type].keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-teal-600">✓</span>
              <span className="text-gray-600">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceIntegrationDetails;