// components/Webhooks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Webhooks = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch existing webhook configuration
  useEffect(() => {
    const fetchWebhookConfig = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3004/api/partners/webhook-config', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.webhookUrl) {
          setWebhookUrl(response.data.webhookUrl);
          setWebhookSecret(response.data.webhookSecret);
        }
      } catch (error) {
        console.error('Error fetching webhook config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWebhookConfig();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'http://localhost:3004/api/partners/webhook-config',
        { webhookUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the secret with the new one from the server
      setWebhookSecret(response.data.webhookSecret);
      setSuccessMessage('Webhook configured successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error configuring webhook:', error);
    }
  };

  if (isLoading) {
    return <div>Loading webhook configuration...</div>;
  }

  return (
    <div className="max-w-4xl bg-white rounded-lg shadow p-6">
      {/* Introduction */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Setup Webhooks</h2>
        <p className="text-gray-600">
          We'll notify your server when a HouseTabz connection is approved or declined.
          Just provide a URL where we can send these updates!
        </p>
      </div>

      {/* Webhook URL Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Webhook URL
        </label>
        <div className="flex gap-4">
          <input
            type="url"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="https://your-domain.com/housetabz/webhook"
            className="flex-grow px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
          >
            Set Webhook URL
          </button>
        </div>
      </form>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      {/* Webhook Secret - Only show if configured */}
      {webhookSecret && (
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Webhook Secret
          </label>
          <div className="flex gap-4 items-center">
            <div className="flex-grow px-4 py-2 bg-gray-50 border rounded-md font-mono text-sm">
              {showSecret ? webhookSecret : '••••••••••••••••'}
            </div>
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="text-teal-600 hover:text-teal-700"
            >
              {showSecret ? 'Hide' : 'Show'}
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(webhookSecret);
                setSuccessMessage('Secret copied to clipboard!');
                setTimeout(() => setSuccessMessage(''), 3000);
              }}
              className="px-4 py-2 text-teal-600 hover:text-teal-700 border border-teal-600 rounded-md"
            >
              Copy
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Use this secret to verify webhook events are coming from HouseTabz
          </p>
        </div>
      )}

      {/* Example Code - Only show if webhook is configured */}
      {webhookSecret && (
        <div className="mt-8 bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Example Implementation</h3>
          <pre className="text-sm overflow-x-auto p-4 bg-gray-800 text-gray-100 rounded-md">
{`// Example Express.js webhook handler
app.post('/housetabz/webhook', express.json(), (req, res) => {
  // 1. Get the webhook signature
  const signature = req.headers['x-housetabz-signature'];

  // 2. Verify it's from HouseTabz
  if (isValidSignature(req.body, signature, '${webhookSecret}')) {
    const { event, transactionId } = req.body;
    
    // 3. Handle the event
    if (event === 'request.authorized') {
      // Activate the service!
    }
    
    res.json({ received: true });
  }
});`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Webhooks;