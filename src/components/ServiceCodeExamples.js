import React from 'react';

const ServiceCodeExamples = ({ type }) => {
  const examples = {
    energy: {
      initialization: `
// Initialize HouseTabz with security deposit
await window.HouseTabz.mount('#housetabz-button', {
  serviceName: 'Energy Plan',
  serviceType: 'energy',
  estimatedAmount: 99.99,  // Monthly estimate
  requiredUpfrontPayment: 200.00,  // Security deposit if required
  transactionId: 'ENERGY-123'
});`,
      webhook: `
// Webhook for monthly billing
app.post('/housetabz/webhook', (req, res) => {
  const { event, billAmount, dueDate } = req.body;

  if (event === 'request.authorized') {
    // Activate service - security deposit collected
    activateService(req.body.transactionId);
  }

  if (event === 'bill.created') {
    // Monthly bill has been split and sent to roommates
    updateBillingStatus(req.body.transactionId);
  }
});`
    },
    cleaning: {
      initialization: `
// Initialize HouseTabz for cleaning service
await window.HouseTabz.mount('#housetabz-button', {
  serviceName: 'Deep Clean Service',
  serviceType: 'cleaning',
  estimatedAmount: 150.00,  // Full service amount
  transactionId: 'CLEANING-123'
});`,
      webhook: `
// Webhook for payment completion
app.post('/housetabz/webhook', (req, res) => {
  const { event, transactionId } = req.body;

  if (event === 'request.authorized') {
    // All roommates have paid - schedule service
    scheduleService(transactionId);
  }

  if (event === 'service.completed') {
    // Service completed - payment released
    completeServiceOrder(transactionId);
  }
});`
    }
  };

  // Add safety check
  if (!type || !examples[type]) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Implementation Example</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-lg mb-3">Initialize HouseTabz</h4>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{examples[type].initialization}</code>
          </pre>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-3">Handle Webhooks</h4>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{examples[type].webhook}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ServiceCodeExamples;