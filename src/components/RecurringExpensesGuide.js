import React from 'react';
import CodeBlock from './CodeBlock';

const RecurringExpensesGuide = () => {
  const webhookCode = `// When a user initially authorizes HouseTabz
app.post('/webhook/housetabz', async (req, res) => {
  const { event, houseId, transactionId } = req.body;

  if (event === 'payment.authorized') {
    // Tag this account for HouseTabz recurring payments
    await db.accounts.update({
      where: { transactionId },
      data: {
        isHouseTabzEnabled: true,
        houseTabzId: houseId,    // Store for future bill notifications
      }
    });

    res.status(200).send('OK');
  }
});`;

  const billGenerationCode = `// Your billing system generates new bills
async function processBill(account, billAmount) {
  // If account uses HouseTabz, send bill for splitting
  if (account.isHouseTabzEnabled) {
    await fetch('https://api.housetabz.com/v1/bills', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${process.env.HOUSETABZ_API_KEY}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        houseId: account.houseTabzId,
        amount: billAmount,
        dueDate: getNextDueDate(),
        billReference: generateBillId()  // Your reference number
      })
    });
  } else {
    // Handle regular billing process
    await normalBillingProcess(account, billAmount);
  }
}`;

  const accountStructure = `// How to structure your database
{
  // Your existing account fields
  accountId: "ACC_123",
  customerId: "USER_456",
  
  // Add these fields for HouseTabz
  isHouseTabzEnabled: true,     // Flag for conditional bill sending
  houseTabzId: "HOUSE_789",     // Received during initial authorization
  
  // Your other fields remain unchanged
  status: "active",
  balance: 0
}`;

  return (
    <div className="max-w-4xl space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Implementing Recurring Payments</h2>
        <p className="text-gray-600">
          When a user enables HouseTabz for recurring bills, you'll tag their account in your system. 
          Then, send new bills to our API whenever they're generated. We'll handle splitting, 
          collection, and send you consolidated payments.
        </p>
      </div>

      {/* Step 1: Enable HouseTabz */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">1. Tag Accounts for HouseTabz</h3>
          <p className="text-gray-600 mb-4">
            When we send the 'payment.authorized' webhook, store the houseId and tag the account:
          </p>
        </div>
        <CodeBlock code={webhookCode} />
      </div>

      {/* Step 2: Send Bills */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">2. Send Bills to HouseTabz</h3>
          <p className="text-gray-600 mb-4">
            Whenever you generate a new bill, check if the account uses HouseTabz and send us the details:
          </p>
        </div>
        <CodeBlock code={billGenerationCode} />
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>Note:</strong> We guarantee payment for bills sent to HouseTabz. You'll receive 
            one consolidated payment, even if some roommates are late.
          </p>
        </div>
      </div>

      {/* Database Structure */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Database Changes Needed</h3>
          <p className="text-gray-600 mb-4">
            Add these fields to your accounts table to track HouseTabz-enabled accounts:
          </p>
        </div>
        <CodeBlock code={accountStructure} />
      </div>

      {/* Implementation Tips */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">Best Practices</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-teal-600">•</span>
            <p className="text-gray-600">
              Store the houseId during initial authorization - you'll need it to send future bills
            </p>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600">•</span>
            <p className="text-gray-600">
              Include a unique billReference when sending bills - this helps track payments
            </p>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600">•</span>
            <p className="text-gray-600">
              Add the isHouseTabzEnabled flag to easily identify accounts using split payments
            </p>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-600">•</span>
            <p className="text-gray-600">
              Remember: HouseTabz works alongside your existing billing - only tagged accounts use it
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecurringExpensesGuide;