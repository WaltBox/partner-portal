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
      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold mr-3">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="ml-11">{children}</div>
  </div>
);

const CodeBlock = ({ title, code }) => (
  <div className="mt-4 bg-gray-900 rounded-lg overflow-hidden">
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
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-8 mb-8 text-black">
        <div className="flex items-center mb-4">
          <FaBolt className="text-3xl mr-3" />
          <h2 className="text-2xl font-bold">Zapier Integration</h2>
        </div>
        <p className="text-black">
          Automate your workflow with HouseTabz and Zapier. Follow these steps to connect your systems.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <StepCard number="1" title="Send Bills to HouseTabz">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-4">
              When a new bill is created in your system, send it to HouseTabz:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-1 mr-3">
                  <FaArrowRight className="text-teal-600 text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Create Your Zap</h4>
                  <p className="text-gray-600">Choose your trigger (e.g., "New Invoice Created")</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-1 mr-3">
                  <FaCode className="text-teal-600 text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Configure Webhook</h4>
                  <CodeBlock
                    title="Your HouseTabz Webhook URL"
                    code="https://api.housetabz.com/webhooks/YOUR_PARTNER_ID"
                  />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-1 mr-3">
                  <FaCode className="text-teal-600 text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Format Your Data</h4>
                  <CodeBlock
                    title="Request Body"
                    code={`{
  "customerId": "{{customer_id}}",
  "billAmount": "{{amount}}",
  "dueDate": "{{due_date}}",
  "serviceType": "{{service_name}}"
}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        <StepCard number="2" title="Receive HouseTabz Updates">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-4">
              Get notified when roommates approve bills:
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-1 mr-3">
                  <FaCheckCircle className="text-teal-600 text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Setup Webhook Trigger</h4>
                  <ol className="list-decimal ml-4 text-gray-600 space-y-2">
                    <li>Create a new Zap with "Webhook" trigger</li>
                    <li>Copy the webhook URL Zapier provides</li>
                    <li>Add it to your HouseTabz dashboard</li>
                  </ol>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-1 mr-3">
                  <FaCode className="text-teal-600 text-sm" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Expected Payload</h4>
                  <CodeBlock
                    title="Webhook Data Format"
                    code={`{
  "event": "request.authorized",
  "customerId": "123",
  "transactionId": "YOUR-TXN-ID",
  "status": "approved",
  "timestamp": "2024-01-23T12:34:56Z"
}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        {/* Testing Section */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaCheckCircle className="text-blue-500 mr-2" />
            <h3 className="text-lg font-semibold text-blue-900">Testing Your Integration</h3>
          </div>
          <ol className="list-decimal ml-6 space-y-3 text-blue-800">
            <li>Send a test bill through your Zap</li>
            <li>Verify the data in HouseTabz</li>
            <li>Test the approval flow in the HouseTabz test app</li>
            <li>Confirm your system receives the approval webhook</li>
          </ol>
        </div>

        {/* Common Issues */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <FaExclamationTriangle className="text-yellow-500 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-900">Troubleshooting</h3>
          </div>
          <ul className="list-disc ml-6 space-y-2 text-yellow-800">
            <li>Verify webhook URLs are correct in both systems</li>
            <li>Check JSON formatting matches exactly</li>
            <li>Ensure all required fields are included</li>
            <li>Validate data types (especially amounts)</li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="text-center py-8">
          <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors inline-flex items-center">
            <FaBolt className="mr-2" />
            Get Integration Support
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