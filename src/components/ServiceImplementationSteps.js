import React from 'react';

const ServiceImplementationSteps = ({ type }) => {
  const steps = {
    oneTime: [
      {
        title: "1. Access Your API Keys",
        description: "Head to the 'API Keys' tab in your dashboard",
        details: "You'll find your public and secret keys here - you'll need these to authenticate with our system and initialize the SDK."
      },
      {
        title: "2. Create Authorization Webhook",
        description: "Set up endpoint in 'Webhooks' tab",
        details: "Create an endpoint to receive authorization notifications. Once all roommates approve and funds are secured, we'll send { event: 'payment.authorized', transactionId } to your webhook. This means you can proceed with the transaction."
      },
      {
        title: "3. Add SDK to Checkout",
        description: "Implement the HouseTabz button",
        details: `Add our SDK script to your checkout page:
1. Add <script src="https://cdn.housetabz.com/sdk.js"></script>
2. Create a button with id="housetabz-button"
3. Initialize with your public key`
      },
      {
        title: "4. Handle Authorization",
        description: "Process the authorized payment",
        details: "When you receive our 'payment.authorized' webhook, the funds are secured and you can complete the transaction. Just like processing a regular card payment, but HouseTabz has handled the splitting and collection."
      }
    ],
    recurring: [
      {
        title: "1. Access Your API Keys",
        description: "Head to the 'API Keys' tab in your dashboard",
        details: "You'll find your public and secret keys here - you'll need these to authenticate with our system and initialize the SDK."
      },
      {
        title: "2. Create Authorization Webhook",
        description: "Set up endpoint in 'Webhooks' tab",
        details: "Create an endpoint to receive authorization notifications. Once all roommates approve, we'll send { event: 'payment.authorized', houseId } to your webhook. This means you can tag the account for HouseTabz payments."
      },
      {
        title: "3. Add SDK to Checkout",
        description: "Implement the HouseTabz button",
        details: `Add our SDK script to your checkout page:
1. Add <script src="https://cdn.housetabz.com/sdk.js"></script>
2. Create a button with id="housetabz-button"
3. Initialize with your public key`
      },
      {
        title: "4. Enable HouseTabz Billing",
        description: "Tag account & send bills",
        details: "When you receive our 'payment.authorized' webhook, tag the account for HouseTabz. For all future bills, send the houseId and amount to our bills webhook. We'll handle splitting, collection, and send you consolidated payments."
      }
    ]
  };

  return (
    <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Implementation Checklist
      </h3>
      
      <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
        <p className="text-teal-800 font-medium mb-2">
          How HouseTabz Works With Your System:
        </p>
        <ul className="text-teal-800 text-sm space-y-1">
          <li>• User clicks HouseTabz button at checkout</li>
          <li>• We handle roommate approvals and payment collection</li>
          <li>• You receive authorization when funds are secured</li>
          {type === "recurring" && (
            <li>• Tag authorized accounts to enable automatic bill splitting</li>
          )}
        </ul>
      </div>

      <div className="space-y-6">
        {steps[type]?.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-teal-50 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold">{index + 1}</span>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
              <p className="text-slate-700 mb-1">{step.description}</p>
              <p className="text-sm text-slate-600 whitespace-pre-line">{step.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-900 font-semibold mb-2">Important Notes:</p>
        <ul className="text-blue-800 text-sm space-y-2">
          <li>• Works just like processing a regular payment - we handle the splitting</li>
          <li>• No need to track individual roommate approvals - wait for our authorization</li>
          <li>• Guaranteed payments - we cover missed roommate portions</li>
          {type === "recurring" && (
            <li>• For recurring bills, just tag authorized accounts and send us bill details</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ServiceImplementationSteps;