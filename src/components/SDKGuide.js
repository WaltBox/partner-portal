import React from 'react';
import CodeBlock from './CodeBlock';

const SDKGuide = () => {
  const scriptCode = `<!-- Add to your checkout page's <head> section -->
<script src="https://cdn.housetabz.com/sdk.js"></script>`;

  const urlCode = `https://yoursite.com/checkout
  ?user_id=123      // Your user's unique identifier
  &partner_id=456   // Your HouseTabz partner ID
  &ref=housetabz    // Required for SDK initialization`;

  const initCode = `// Initialize when your checkout page loads
await HouseTabz.init({
  apiKey: 'your_api_key',    // Found in API Keys tab
  secretKey: 'your_secret_key',
  environment: 'production'   // Use 'development' for testing
});`;

  const mountCode = `// First, add the button container
<div id="housetabz-button"></div>

// Then mount the button with your service details
await HouseTabz.mount('#housetabz-button', {
  // Required: Basic service information
  serviceName: 'Monthly Electric',  // Display name for users
  serviceType: 'energy',           // Type of service
  estimatedAmount: 150.00,        // Total amount to split
  transactionId: 'TX_123',       // Your reference number

  // Optional: For services requiring deposits
  requiredUpfrontPayment: 50.00,  

  // Callbacks for staged request status
  onSuccess: (data) => {
    // Staged request created successfully
    console.log('Request ID:', data.requestId);
    // You might want to show a success message
  },
  
  onError: (error) => {
    // Handle any errors
    console.error('Error:', error);
    // Show error message to user
  }
});`;

  const webhookCode = `// Example webhook handler
app.post('/webhook/housetabz', async (req, res) => {
  const { event, transactionId } = req.body;

  if (event === 'payment.authorized') {
    // Complete the transaction
    await completeTransaction(transactionId);
  }

  res.status(200).send('OK');
});`;

  return (
    <div className="max-w-4xl space-y-8">
      {/* Introduction */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">HouseTabz SDK Implementation Guide</h2>
        <p className="text-gray-600">
          Follow these steps to add HouseTabz split payments to your checkout. Each step builds on the previous one 
          to create a complete integration.
        </p>
      </div>

      {/* Step 1: Add Script */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Step 1: Add the Script</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700">What it does:</h4>
              <p className="text-gray-600">
                Loads the HouseTabz SDK into your checkout page. This gives you access to all HouseTabz functionality.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Why it's important:</h4>
              <p className="text-gray-600">
                This is the foundation of the integration. The script provides the HouseTabz object that you'll use 
                for initialization and button creation.
              </p>
            </div>
          </div>
          <CodeBlock code={scriptCode} language="html" />
        </div>
      </div>

      {/* Step 2: URL Parameters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Step 2: Add URL Parameters</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700">What it does:</h4>
              <p className="text-gray-600">
                Provides essential identification information to HouseTabz about who's making the request.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Why it's important:</h4>
              <p className="text-gray-600">
                These parameters let us link the transaction to your partner account and the specific user making the request. 
                Without these, we can't create the staged request.
              </p>
            </div>
          </div>
          <CodeBlock code={urlCode} />
        </div>
      </div>

      {/* Step 3: Initialize */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Step 3: Initialize the SDK</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700">What it does:</h4>
              <p className="text-gray-600">
                Sets up the SDK with your authentication credentials and configures the environment.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Why it's important:</h4>
              <p className="text-gray-600">
                This step authenticates your requests and determines whether you're in development or production. 
                The SDK won't work without proper initialization.
              </p>
            </div>
          </div>
          <CodeBlock code={initCode} />
        </div>
      </div>

      {/* Step 4: Mount Button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Step 4: Add the HouseTabz Button</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700">What it does:</h4>
              <p className="text-gray-600">
                Creates the HouseTabz button and configures it with your service details. When clicked, 
                it creates a staged request and starts the roommate approval process.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Why it's important:</h4>
              <p className="text-gray-600">
                This is where you specify the service details and amount to be split. The button handles 
                user interaction and kicks off the HouseTabz payment flow.
              </p>
            </div>
          </div>
          <CodeBlock code={mountCode} />
        </div>
      </div>

      {/* Step 5: Handle Webhook */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Step 5: Handle Authorization Webhook</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-700">What it does:</h4>
              <p className="text-gray-600">
                Receives notification when all roommates have approved and funds are secured.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Why it's important:</h4>
              <p className="text-gray-600">
                This is how you know when to complete the transaction. The webhook tells you that all roommates 
                have approved and funds are ready.
              </p>
            </div>
          </div>
          <CodeBlock code={webhookCode} />

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              <strong>Tip:</strong> Set up your webhook endpoint in the HouseTabz dashboard under the 
              'Webhooks' tab. This is where you'll receive authorization notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDKGuide;