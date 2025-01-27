import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell, FaKey, FaCheck, FaEye, FaEyeSlash, FaCopy, FaCode, FaExclamationCircle } from 'react-icons/fa';

// Card component for sections
const SectionCard = ({ title, description, children, icon: Icon }) => (
  <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
    <div className="px-6 py-4 border-b border-gray-200 flex items-center">
      {Icon && <Icon className="text-teal-600 mr-2" />}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Webhooks = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookSecret, setWebhookSecret] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [copiedSecret, setCopiedSecret] = useState(false);

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

      setWebhookSecret(response.data.webhookSecret);
      setSuccessMessage('Webhook configured successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error configuring webhook:', error);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(webhookSecret);
    setCopiedSecret(true);
    setTimeout(() => setCopiedSecret(false), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Webhooks</h2>
        <p className="text-gray-600">
          Receive real-time updates when users connect their HouseTabz accounts.
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <FaCheck className="mr-2" />
          {successMessage}
        </div>
      )}

      {/* Webhook URL Configuration */}
      <SectionCard 
        title="Webhook URL" 
        description="Where should we send webhook events?"
        icon={FaBell}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://your-domain.com/housetabz/webhook"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Save Endpoint
          </button>
        </form>
      </SectionCard>

      {/* Webhook Secret */}
      {webhookSecret && (
        <SectionCard title="Webhook Secret" icon={FaKey}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-grow px-4 py-2 bg-gray-50 border rounded-lg font-mono text-sm">
                {showSecret ? webhookSecret : '•'.repeat(32)}
              </div>
              <button
                onClick={() => setShowSecret(!showSecret)}
                className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
              >
                {showSecret ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
              <button
                onClick={copySecret}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:border-teal-600 hover:text-teal-600 transition-colors"
              >
                {copiedSecret ? <FaCheck className="mr-2" /> : <FaCopy className="mr-2" />}
                {copiedSecret ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-sm text-gray-600">
              Use this secret to verify that webhook events came from HouseTabz
            </p>
          </div>
        </SectionCard>
      )}

      {/* Example Implementation */}
      <SectionCard title="Example Implementation" icon={FaCode}>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`// Example Express.js webhook handler
app.post('/housetabz/webhook', express.json(), (req, res) => {
  const signature = req.headers['x-housetabz-signature'];
  const secret = process.env.HOUSETABZ_WEBHOOK_SECRET;

  if (verifySignature(req.body, signature, secret)) {
    const { event, transactionId } = req.body;
    
    switch(event) {
      case 'request.authorized':
        // All roommates approved - activate service
        await activateService(transactionId);
        break;
      
      case 'request.declined':
        // A roommate declined - cancel pending activation
        await cancelPendingRequest(transactionId);
        break;
    }
  }
  
  res.json({ received: true });
});`}
        </pre>
      </SectionCard>

      {/* Testing Tips */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="flex items-start">
          <FaExclamationCircle className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Testing Tips</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>• Use tools like webhook.site to test your endpoint</li>
              <li>• Verify signature validation using your webhook secret</li>
              <li>• Test both approval and decline scenarios</li>
              <li>• Monitor your webhook logs for delivery status</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webhooks;