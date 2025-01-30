import React from "react";
import { 
  FaBolt, 
  FaArrowRight, 
  FaCode, 
  FaCheckCircle, 
  FaExclamationTriangle 
} from "react-icons/fa";

const StepCard = ({ number, title, children }) => (
  <div className="mb-8">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-[#FF4F00] font-bold mr-3">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="ml-11">{children}</div>
  </div>
);

const CodeBlock = ({ title, code }) => (
  <div className="mt-4 bg-[#111111] rounded-lg overflow-hidden">
    {title && (
      <div className="bg-gray-800 px-4 py-2 text-gray-400 text-sm">
        {title}
      </div>
    )}
    <pre className="p-4 text-gray-100 overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

const ZapierGuide = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#FF4F00] to-[#FF6B2B] rounded-lg p-8 mb-8 text-white">
        <div className="flex items-center mb-4">
          <FaBolt className="text-3xl mr-3" />
          <h2 className="text-2xl font-bold">Connect HouseTabz to Your Zaps</h2>
        </div>
        <p className="text-white">
          When roommates approve a payment split through HouseTabz, we'll trigger your existing service activation Zap - 
          working seamlessly with your current automation flow.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <StepCard number="1" title="Add HouseTabz to Your Payment Success Zap">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-4">
              Point your existing service activation Zap to listen for HouseTabz authorizations:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1 mr-3">
                  <FaArrowRight className="text-[#FF4F00] text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Find Your Service Activation Zap</h4>
                  <p className="text-gray-600">Locate the Zap that runs when payments succeed (e.g., "When Stripe payment is completed")</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1 mr-3">
                  <FaCode className="text-[#FF4F00] text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Add Webhook Trigger</h4>
                  <p className="text-gray-600 mb-2">Create a new trigger in your Zap:</p>
                  <CodeBlock
                    title="Zapier Webhook Configuration"
                    code={`1. Choose "Webhooks by Zapier" app
2. Select "Catch Raw Hook" trigger
3. Copy the webhook URL Zapier provides`}
                  />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1 mr-3">
                  <FaCode className="text-[#FF4F00] text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Map Our Fields</h4>
                  <p className="text-gray-600 mb-2">HouseTabz sends standard payment success data:</p>
                  <CodeBlock
                    title="Webhook Payload Structure"
                    code={`{
  "event": "request.authorized",     // Payment authorized
  "transactionId": "HT-123456",     // Your transaction reference
  "status": "authorized",           // Always "authorized" for success
  "pricing": 99.99,                // Payment amount
  "customer_id": "user_123"        // Your customer reference
}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        <StepCard number="2" title="Connect HouseTabz to Zapier">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-4">
              Tell HouseTabz where to send authorization events:
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-1 mr-3">
                  <FaCheckCircle className="text-[#FF4F00] text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Quick Setup</h4>
                  <ol className="list-decimal ml-4 text-gray-600 space-y-2">
                    <li>Go to your HouseTabz dashboard settings</li>
                    <li>Paste your Zapier webhook URL</li>
                    <li>Save changes</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        {/* Testing Section */}
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaCheckCircle className="text-[#FF4F00] mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Test the Integration</h3>
          </div>
          <ol className="list-decimal ml-6 space-y-3 text-gray-800">
            <li>Enable test mode in HouseTabz</li>
            <li>Create a test connection with roommates</li>
            <li>Approve all portions in the test environment</li>
            <li>Check if your Zap runs as expected</li>
            <li>Verify service activation works normally</li>
          </ol>
        </div>

        {/* Common Issues */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-900">Common Issues</h3>
          </div>
          <ul className="list-disc ml-6 space-y-2 text-yellow-800">
            <li>Double-check your webhook URL is correct</li>
            <li>Ensure your Zap is turned on</li>
            <li>Verify field mapping in your Zap</li>
            <li>Start with small test amounts</li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="text-center py-8">
          <button className="bg-[#FF4F00] text-white px-8 py-3 rounded-lg hover:bg-[#E64500] transition-colors inline-flex items-center">
            <FaBolt className="mr-2" />
            Get Integration Help
          </button>
          <p className="mt-2 text-gray-600">
            Our team typically responds within 2 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZapierGuide;