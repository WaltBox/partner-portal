import React from "react";
import {
  FaArrowRight,
  FaCode,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCopy,
  FaCheck,
  FaExternalLinkAlt,
} from "react-icons/fa";

// A simple StepCard component with a minimal badge and title.
const StepCard = ({ number, title, children }) => (
  <div className="mb-10">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
        {number}
      </div>
      <h3 className="text-xl font-medium text-gray-800">{title}</h3>
    </div>
    <div className="ml-12">{children}</div>
  </div>
);

// A CodeBlock component styled to be clear and professional.
const CodeBlock = ({ title, code }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-4">
      {title && (
        <div className="bg-gray-100 px-3 py-1 text-xs text-gray-600 border border-gray-200 rounded-t-md">
          {title}
        </div>
      )}
      <pre className="bg-gray-50 p-4 border border-t-0 border-gray-200 rounded-b-md text-gray-800 font-mono text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-100 hover:bg-gray-200 p-1 rounded transition-colors"
        title="Copy code"
      >
        {copied ? (
          <FaCheck className="text-green-500" />
        ) : (
          <FaCopy className="text-gray-500" />
        )}
      </button>
    </div>
  );
};

const ZapierGuide = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-12">
      {/* Header */}
      <header className="border-b pb-6">
        <div className="flex items-center space-x-3">
          <FaExternalLinkAlt className="text-blue-600 text-2xl" />
          <h1 className="text-3xl font-semibold text-gray-900">
            Connect HouseTabz with Zapier
          </h1>
        </div>
        <p className="mt-3 text-gray-600 text-base">
          Follow these steps to integrate HouseTabz with your Zapier workflow.
          When a payment split is approved, your Zap will trigger automatically.
        </p>
      </header>

      {/* Step 1: Configure Zap Trigger */}
      <StepCard number="1" title="Configure Your Payment Success Zap">
        <div className="bg-white p-6 border rounded shadow-sm">
          <p className="text-gray-700 mb-4 text-sm">
            Update your existing service activation Zap to listen for HouseTabz events.
          </p>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center mt-1 mr-3">
                <FaArrowRight className="text-blue-600 text-sm" />
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-800 mb-1">
                  Locate Your Activation Zap
                </h4>
                <p className="text-gray-600 text-sm">
                  Find the Zap that runs when a payment succeeds (for example, “Stripe Payment Completed”).
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center mt-1 mr-3">
                <FaCode className="text-blue-600 text-sm" />
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-800 mb-1">
                  Add a Webhook Trigger
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  Use Zapier’s "Webhooks by Zapier" to create a trigger.
                </p>
                <CodeBlock
                  title="Zapier Webhook Setup"
                  code={`1. Select "Webhooks by Zapier" as the app.
2. Choose the "Catch Hook" trigger.
3. Copy the webhook URL provided by Zapier.
4. Paste it into your HouseTabz dashboard settings.`}
                />
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center mt-1 mr-3">
                <FaCode className="text-blue-600 text-sm" />
              </div>
              <div>
                <h4 className="text-base font-medium text-gray-800 mb-1">
                  Map the Payload
                </h4>
                <p className="text-gray-600 text-sm mb-2">
                  HouseTabz sends standard payment data. Ensure you map these fields:
                </p>
                <CodeBlock
                  title="Webhook Payload Example"
                  code={`{
  "event": "request.authorized",
  "transactionId": "HT-123456",
  "status": "authorized",
  "pricing": 99.99,
  "customer_id": "user_123"
}`}
                />
              </div>
            </div>
          </div>
        </div>
      </StepCard>

      {/* Step 2: Connect HouseTabz to Zapier */}
      <StepCard number="2" title="Connect HouseTabz to Zapier">
        <div className="bg-white p-6 border rounded shadow-sm">
          <p className="text-gray-700 mb-4 text-sm">
            Configure your HouseTabz dashboard to forward authorization events to your Zapier webhook.
          </p>
          <div className="flex items-start">
            <div className="w-6 h-6 flex-shrink-0 bg-blue-50 rounded-full flex items-center justify-center mt-1 mr-3">
              <FaCheckCircle className="text-blue-600 text-sm" />
            </div>
            <div>
              <h4 className="text-base font-medium text-gray-800 mb-1">
                Quick Setup
              </h4>
              <ol className="list-decimal ml-6 text-sm text-gray-600 space-y-1">
                <li>Log in to your HouseTabz dashboard.</li>
                <li>Navigate to the Zapier integration settings.</li>
                <li>Paste your Zapier webhook URL and save the changes.</li>
              </ol>
            </div>
          </div>
        </div>
      </StepCard>

      {/* Step 3: Test Your Integration */}
      <div className="bg-white p-6 border rounded shadow-sm">
        <div className="flex items-center mb-4">
          <FaCheckCircle className="text-blue-600 mr-3" />
          <h3 className="text-xl font-medium text-gray-900">Test Your Integration</h3>
        </div>
        <ol className="list-decimal ml-6 text-sm text-gray-700 space-y-2">
          <li>Enable test mode in your HouseTabz dashboard.</li>
          <li>Simulate a payment split approval.</li>
          <li>Verify that your Zap is triggered as expected.</li>
          <li>Ensure the service activation proceeds correctly.</li>
        </ol>
      </div>

      {/* Common Issues */}
      <div className="bg-white p-6 border rounded shadow-sm">
        <div className="flex items-center mb-4">
          <FaExclamationTriangle className="text-gray-600 mr-3" />
          <h3 className="text-xl font-medium text-gray-900">Common Issues</h3>
        </div>
        <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
          <li>Ensure the webhook URL in your dashboard is correct.</li>
          <li>Verify that your Zap is active.</li>
          <li>Double-check your field mapping in Zapier.</li>
          <li>Start with small test amounts before scaling up.</li>
        </ul>
      </div>

      {/* Help Section */}
      <div className="text-center">
        <button className="bg-blue-600 text-white px-10 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center shadow">
          Get Integration Help
        </button>
        <p className="mt-3 text-sm text-gray-600">
          Our support team typically responds within 2 hours.
        </p>
      </div>
    </div>
  );
};

export default ZapierGuide;
