import React from 'react';

const ServiceImplementationSteps = ({ type }) => {
  const steps = {
    energy: [
      {
        title: "Credit Check Integration",
        description: "Run your standard credit check process",
        details: "Continue using your existing credit check system. If a security deposit is required, include this in the HouseTabz initialization."
      },
      {
        title: "Initialize HouseTabz",
        description: "Add the HouseTabz payment option",
        details: "Include estimated monthly amount and any security deposit required."
      },
      {
        title: "Handle Authorization",
        description: "Await roommate approvals and security deposit collection",
        details: "Service can be activated once all roommates approve and security deposit (if required) is collected."
      }
    ],
    cleaning: [
      {
        title: "Set Service Amount",
        description: "Define the total cost of the cleaning service",
        details: "This amount will be split equally among all roommates."
      },
      {
        title: "Initialize HouseTabz",
        description: "Add the HouseTabz payment option",
        details: "The full amount will be collected upfront and held in escrow."
      },
      {
        title: "Service Activation",
        description: "Receive confirmation when payment is complete",
        details: "Begin service once all roommates have paid their portions."
      }
    ]
  };

  // Add safety check
  if (!type || !steps[type]) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Implementation Steps</h3>
      
      <div className="space-y-8">
        {steps[type].map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold">{index + 1}</span>
            </div>
            <div>
              <h4 className="font-bold text-lg text-gray-900">{step.title}</h4>
              <p className="text-gray-600 mb-2">{step.description}</p>
              <p className="text-sm text-gray-500">{step.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceImplementationSteps;