import React from 'react';

const ServiceIntegrationDetails = ({ type }) => {
  const details = {
    recurring: {
      paymentFlow: [
        "User selects HouseTabz at checkout",
        "Roommates approve their portions",
        "You receive 'authorized' webhook",
        "Tag account for HouseTabz payments",
        "Send new bills to HouseTabz webhook"
      ],
      keyPoints: [
        "Same integration as one-time payments",
        "Simple account tagging post-approval",
        "Automatic bill notifications",
        "Consolidated monthly payments"
      ]
    },
    oneTime: {
      paymentFlow: [
        "User selects HouseTabz at checkout",
        "Roommates approve their portions",
        "You receive 'authorized' webhook",
        "Process the payment",
        "Transaction complete"
      ],
      keyPoints: [
        "Quick split payments",
        "Simple webhook integration",
        "Automatic notifications",
        "Immediate processing"
      ]
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-200 p-6">
        <h4 className="font-bold text-slate-900 mb-4">How It Works</h4>
        <ul className="space-y-3">
          {details[type]?.paymentFlow.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-teal-600 mt-1">•</span>
              <span className="text-slate-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-200 p-6">
        <h4 className="font-bold text-slate-900 mb-4">Key Features</h4>
        <ul className="space-y-3">
          {details[type]?.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-teal-600">✓</span>
              <span className="text-slate-700">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceIntegrationDetails;