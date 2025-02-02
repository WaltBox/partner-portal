import React from 'react';

const ServiceCodeExamples = ({ type }) => {
  const examples = {
    oneTime: {
      initialization: `
// Add the HouseTabz button to checkout
await window.HouseTabz.mount('#payment-button', {
  serviceName: 'House Cleaning',
  serviceType: 'one-time',
  amount: 150.00,
  transactionId: 'TX_123'
});`,
      webhook: `
// Handle the authorization webhook
app.post('/webhook/housetabz', async (req, res) => {
  const { event, transactionId } = req.body;

  if (event === 'payment.authorized') {
    // Process the payment once all roommates approve
    await processPayment(transactionId);
    res.status(200).send('OK');
  }
});`
    },
    recurring: {
      initialization: `
// Add the HouseTabz button to checkout
await window.HouseTabz.mount('#payment-button', {
  serviceName: 'Monthly Utilities',
  serviceType: 'recurring',
  amount: 99.99,
  transactionId: 'TX_123'
});`,
      webhook: `
// 1. Handle the authorization webhook
app.post('/webhook/housetabz', async (req, res) => {
  const { event, houseId } = req.body;

  if (event === 'payment.authorized') {
    // Tag account for HouseTabz after approval
    await tagAccountForHouseTabz(houseId);
    res.status(200).send('OK');
  }
});

// 2. Send new bills to HouseTabz
async function notifyNewBill(houseId, amount) {
  await fetch('https://api.housetabz.com/v1/bills', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      houseId,
      amount,
      dueDate: '2025-03-01'
    })
  });
}`
    }
  };

  return (
    <div className="bg-slate-50 rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-6">
        Code Examples
      </h3>
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-teal-100 rounded-md px-2 py-1">
              <code className="text-teal-700 font-bold">SDK Integration</code>
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <pre className="p-4 overflow-x-auto">
              <code className="text-slate-50 text-sm leading-relaxed">
                {examples[type]?.initialization}
              </code>
            </pre>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-teal-100 rounded-md px-2 py-1">
              <code className="text-teal-700 font-bold">Webhook Implementation</code>
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <pre className="p-4 overflow-x-auto">
              <code className="text-slate-50 text-sm leading-relaxed">
                {examples[type]?.webhook}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCodeExamples;