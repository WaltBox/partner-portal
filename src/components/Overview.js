import React, { useState, useEffect } from "react";
import { FaKey, FaCode, FaCheckCircle, FaRocket, FaBell, FaCopy, FaCheck, FaChevronRight } from "react-icons/fa";
import { format } from "date-fns";
import ServiceImplementationSteps from "./ServiceImplementationSteps";
import ServiceIntegrationDetails from "./ServiceIntegrationDetails";
import ServiceCodeExamples from "./ServiceCodeExamples";

// =============================================================================
// FrameworkTabs Component - Displays code examples with copy functionality
// =============================================================================
const FrameworkTabs = ({ examples }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="mt-4" onClick={e => e.stopPropagation()}>
      <div className="flex space-x-2 mb-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === index ? "bg-teal-600 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {example.name}
          </button>
        ))}
      </div>
      <div className="relative">
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{examples[activeTab].code}</code>
        </pre>
        <button
          onClick={() => handleCopy(examples[activeTab].code, activeTab)}
          className="absolute top-2 right-2 p-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors"
        >
          {copiedIndex === activeTab ? <FaCheck className="text-green-400" /> : <FaCopy className="text-gray-300" />}
        </button>
      </div>
    </div>
  );
};

// =============================================================================
// Feedback Component - Simple feedback prompt for documentation sections
// =============================================================================
const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);

  return submitted ? (
    <div className="text-green-600 font-medium">Thanks for your feedback!</div>
  ) : (
    <div className="flex items-center space-x-4 mt-6">
      <span className="text-sm text-gray-600">Was this helpful?</span>
      <button
        onClick={() => setSubmitted(true)}
        className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        Yes
      </button>
      <button
        onClick={() => setSubmitted(true)}
        className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
      >
        No
      </button>
    </div>
  );
};

// =============================================================================
// DocContent Component - Displays the documentation content for a section
// =============================================================================
const DocContent = ({ section }) => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{section.title}</h1>
      <div className="text-sm text-gray-500 mb-8">
        Last updated: {format(new Date(), "MMMM d, yyyy")}
      </div>
      <div className="prose max-w-none">{section.content}</div>
      <div className="mt-12 pt-6 border-t">
        <Feedback />
      </div>
    </div>
  );
};

// =============================================================================
// NavItem Component - Sidebar navigation item with optional nested items
// =============================================================================
const NavItem = ({ item, isActive, onClick, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          onClick();
          if (item.children) setIsOpen(!isOpen);
        }}
        className={`w-full text-left px-4 py-2 flex items-center justify-between transition-colors ${
          isActive ? "bg-teal-50 text-teal-600" : "hover:bg-gray-50"
        } ${depth > 0 ? "pl-8" : ""}`}
      >
        <span className="text-sm">{item.title}</span>
        {item.children && (
          <FaChevronRight
            className={`transition-transform ${isOpen ? "transform rotate-90" : ""}`}
            size={12}
          />
        )}
      </button>
      {item.children && isOpen && (
        <div className="ml-4">
          {Object.entries(item.children).map(([key, child]) => (
            <NavItem
              key={key}
              item={{ title: key, ...child }}
              isActive={false}
              onClick={() => {}}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// IntegrationMenu Component - Main integration guide for partners
// =============================================================================
const IntegrationMenu = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [activeTab, setActiveTab] = useState("one-time"); // currently used for service selection

  // Documentation data for each section
  const documentation = {
    introduction: {
      title: "Getting Started with HouseTabz",
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            HouseTabz is a payment authorization solution that integrates seamlessly with your existing systems to ensure fair expense splitting. Whether you need to manage recurring bills or process a one-time payment, HouseTabz adapts to your business model. Choose the appropriate service type below to view the tailored integration steps and code examples.
          </p>
  
          {/* Service Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setActiveTab("recurring")}
              className={`p-6 rounded-xl border transition-all ${
                activeTab === "recurring"
                  ? "border-teal-500 bg-teal-50 shadow-md"
                  : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/50"
              }`}
            >
              <div className="text-left">
                <h3 className="text-xl font-bold mb-4">Recurring Expenses</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Recurring payments</li>
                  <li>• Optional security deposit (if needed)</li>
                  <li>• Automatic webhook triggers for each bill</li>
                </ul>
              </div>
            </button>
  
            <button
              onClick={() => setActiveTab("oneTime")}
              className={`p-6 rounded-xl border transition-all ${
                activeTab === "oneTime"
                  ? "border-teal-500 bg-teal-50 shadow-md"
                  : "border-gray-200 hover:border-teal-300 hover:bg-teal-50/50"
              }`}
            >
              <div className="text-left">
                <h3 className="text-xl font-bold mb-4">One-Time Payments</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Full payment collected upfront</li>
                  <li>• Single authorization event</li>
                  <li>• Immediate service activation</li>
                </ul>
              </div>
            </button>
          </div>
  
          {/* Display integration steps for the selected service */}
          {activeTab && (
            <div className="mt-8 space-y-6">
              <ServiceImplementationSteps type={activeTab} />
              <ServiceIntegrationDetails type={activeTab} />
              <ServiceCodeExamples type={activeTab} />
            </div>
          )}
        </div>
      )
    },
    

    apiKeys: {
      title: "API Keys",
      content: (
        <div className="space-y-6">
          <p>
            To connect with HouseTabz, you'll need two types of API keys:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Public Key */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg mb-3">Public Key</h3>
              <div className="space-y-4">
                <p>Used in your frontend code to initialize the HouseTabz button.</p>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <code>pk_test_abc123...</code>
                </div>
                <ul className="text-sm space-y-2">
                  <li>✅ Safe for frontend</li>
                  <li>✅ Initializes the HouseTabz button</li>
                  <li>❌ Not for authenticated API calls</li>
                </ul>
              </div>
            </div>
            {/* Secret Key */}
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg mb-3">Secret Key</h3>
              <div className="space-y-4">
                <p>Used on your server for secure API calls and webhook verification.</p>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <code>sk_test_xyz789...</code>
                </div>
                <ul className="text-sm space-y-2">
                  <li>✅ For webhook verification</li>
                  <li>✅ For secure API calls</li>
                  <li>❌ Never expose in frontend code</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Important</h3>
            <p>Keep your secret key secure! Never commit it to version control or expose it in client-side code.</p>
          </div>
        </div>
      )
    },

    button: {
      title: "Integrating HouseTabz into Your Checkout",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">How It Works</h3>
            <ol className="list-decimal ml-6 space-y-2">
              <li>Users discover your service on the HouseTabz marketplace.</li>
              <li>Clicking "Shop Partner" redirects them to your site with HouseTabz parameters.</li>
              <li>Your site stores these parameters while they shop.</li>
              <li>At checkout, the HouseTabz payment option is displayed.</li>
            </ol>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Step 1: Store HouseTabz Parameters</h3>
            <p className="mb-4">Add this code to your main site layout to preserve the HouseTabz context:</p>
            <FrameworkTabs
              examples={[
                {
                  name: "JavaScript",
                  code: `
window.addEventListener('load', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('ref') === 'housetabz') {
    sessionStorage.setItem('housetabz_user_id', params.get('user_id'));
    sessionStorage.setItem('housetabz_partner_id', params.get('partner_id'));
    sessionStorage.setItem('housetabz_ref', 'housetabz');
  }
});
                  `
                }
              ]}
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Step 2: Add HouseTabz to Checkout</h3>
            <p className="mb-4">On your checkout page, initialize the HouseTabz button:</p>
            <FrameworkTabs
              examples={[
                {
                  name: "HTML",
                  code: `
<!-- Include HouseTabz SDK -->
<script src="dist/housetabz.min.js"></script>
<div id="housetabz-button"></div>
<script>
  window.addEventListener('load', async () => {
    const isHouseTabzUser = sessionStorage.getItem('housetabz_ref') === 'housetabz';
    if (isHouseTabzUser && window.HouseTabz) {
      try {
        await window.HouseTabz.init({
          apiKey: 'YOUR_API_KEY',
          secretKey: 'YOUR_SECRET_KEY',
          environment: 'development'
        });
        await window.HouseTabz.mount('#housetabz-button', {
          serviceName: 'Your Service Name',
          pricing: 99.99,
          transactionId: 'YOUR-ORDER-ID',
          onSuccess: (data) => { console.log('Payment initiated:', data); },
          onError: (error) => { console.error('Error:', error); }
        });
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    }
  });
</script>
                  `
                },
                {
                  name: "React",
                  code: `
import { useEffect } from 'react';
function CheckoutPage() {
  useEffect(() => {
    const initHouseTabz = async () => {
      const isHouseTabzUser = sessionStorage.getItem('housetabz_ref') === 'housetabz';
      if (!isHouseTabzUser || !window.HouseTabz) return;
      try {
        await window.HouseTabz.init({
          apiKey: process.env.REACT_APP_HOUSETABZ_API_KEY,
          secretKey: process.env.REACT_APP_HOUSETABZ_SECRET_KEY,
          environment: 'development'
        });
        await window.HouseTabz.mount('#housetabz-button', {
          serviceName: 'Your Service Name',
          pricing: 99.99,
          transactionId: orderId,
          onSuccess: (data) => { console.log('Payment initiated:', data); },
          onError: (error) => { console.error('Error:', error); }
        });
      } catch (error) {
        console.error('Initialization failed:', error);
      }
    };
    initHouseTabz();
  }, []);
  return <div id="housetabz-button" />;
}
                  `
                }
              ]}
            />
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Configuration Options</h3>
            <div className="space-y-4">
              <h4 className="font-semibold">Initialization Options</h4>
              <div className="grid grid-cols-3 gap-4 text-sm font-medium">
                <div>Option</div>
                <div>Type</div>
                <div>Description</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <code>apiKey</code>
                <div>string</div>
                <div>Your HouseTabz API key</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <code>secretKey</code>
                <div>string</div>
                <div>Your HouseTabz secret key</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <code>environment</code>
                <div>string</div>
                <div>'development' or 'production'</div>
              </div>
            </div>
            <div className="space-y-4 mt-6">
              <h4 className="font-semibold">Button Options</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <code>serviceName</code>
                <div>string</div>
                <div>Name of your service shown to users</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <code>pricing</code>
                <div>number</div>
                <div>Monthly service cost</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <code>transactionId</code>
                <div>string</div>
                <div>Your order/transaction identifier</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <code>onSuccess</code>
                <div>function</div>
                <div>Called when connection is initiated</div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <code>onError</code>
                <div>function</div>
                <div>Called if connection fails</div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Implementation Tips</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>The HouseTabz button shows only for users coming from the HouseTabz marketplace.</li>
              <li>Store HouseTabz parameters in sessionStorage to maintain context during shopping.</li>
              <li>Handle both success and error cases in your callbacks.</li>
              <li>Test thoroughly in development before going live.</li>
              <li>Ensure your API credentials match your environment.</li>
            </ul>
          </div>
        </div>
      )
    },

    webhooks: {
      title: "Setting Up Webhooks",
      content: (
        <div className="space-y-6">
          <p>
            HouseTabz acts as a payment authorization method. When all roommates approve a payment split, your server
            receives a webhook indicating the payment is authorized.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">How It Works</h3>
            <p>
              A <code>request.authorized</code> webhook indicates that:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>All roommates approved their portion of the payment</li>
              <li>The full payment amount is authorized</li>
              <li>You can proceed with activating the service</li>
            </ul>
          </div>
          <FrameworkTabs
            examples={[
              {
                name: "Node/Express",
                code: `
const express = require('express');
const crypto = require('crypto');
const app = express();

app.post('/housetabz/webhook', express.json(), async (req, res) => {
  const signature = req.headers['x-housetabz-signature'];
  const webhookSecret = process.env.HOUSETABZ_WEBHOOK_SECRET;
  
  if (isValidSignature(req.body, signature, webhookSecret)) {
    const { event, transactionId, pricing, serviceName } = req.body;
    if (event === 'request.authorized') {
      await activateService({ transactionId, amount: pricing, service: serviceName });
    }
  }
  
  res.json({ received: true });
});

function isValidSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(JSON.stringify(payload)).digest('hex');
  return signature === digest;
}
                `
              },
              {
                name: "Ruby/Rails",
                code: `
class WebhooksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def receive
    signature = request.headers['X-HouseTabz-Signature']
    if valid_signature?(request.raw_post, signature)
      case params[:event]
      when 'request.authorized'
        activate_service(transaction_id: params[:transactionId], amount: params[:pricing], service: params[:serviceName])
      end
    end
    render json: { received: true }
  end

  private

  def valid_signature?(payload, signature)
    digest = OpenSSL::HMAC.hexdigest('SHA256', ENV['HOUSETABZ_WEBHOOK_SECRET'], payload)
    ActiveSupport::SecurityUtils.secure_compare(digest, signature)
  end
end
                `
              },
              {
                name: "PHP/Laravel",
                code: `
// routes/web.php
Route::post('/housetabz/webhook', 'WebhookController@handle');

// app/Http/Controllers/WebhookController.php
public function handle(Request $request)
{
    $signature = $request->header('X-HouseTabz-Signature');
    $payload = $request->getContent();
    
    if ($this->validSignature($payload, $signature)) {
        if ($request->event === 'request.authorized') {
            $this->activateService([
                'transactionId' => $request->transactionId,
                'amount' => $request->pricing,
                'service' => $request->serviceName
            ]);
        }
    }
    return response()->json(['received' => true]);
}

private function validSignature($payload, $signature)
{
    $computed = hash_hmac('sha256', $payload, config('services.housetabz.webhook_secret'));
    return hash_equals($computed, $signature);
}
                `
              }
            ]}
          />
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Webhook Events</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 font-medium">
                <div>Event</div>
                <div>Description</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <code>request.authorized</code>
                <div>All roommates approved and payment is authorized.</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <code>request.declined</code>
                <div>Payment declined due to roommate rejection.</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Webhook Payload</h3>
            <p className="mb-4">Example webhook payload:</p>
            <pre className="bg-gray-100 p-4 rounded">
{`{
  "event": "request.authorized",
  "transactionId": "HT-123456",
  "status": "authorized",
  "serviceName": "Energy Plan",
  "pricing": 99.99,
  "customer_id": "user_123"
}`}
            </pre>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Security</h3>
            <p className="mb-4">Each webhook includes a signature header for verification:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Header: <code>X-HouseTabz-Signature</code></li>
              <li>Sign requests using your webhook secret (find it in the dashboard)</li>
              <li>Always verify the signature before processing</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Testing</h3>
            <p>
              Use webhook.site to test your endpoint. Copy your test endpoint URL into your HouseTabz dashboard settings to receive test events.
            </p>
          </div>
        </div>
      )
    },

    testing: {
      title: "Testing Your Integration",
      content: (
        <div className="space-y-6">
          <p>Before going live, test your integration thoroughly:</p>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3">1. Test the Button</h3>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Open your test HouseTabz app.</li>
                <li>Navigate to your site via HouseTabz.</li>
                <li>Verify the HouseTabz button appears on checkout.</li>
                <li>Click to initiate a connection.</li>
              </ol>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3">2. Test Webhooks</h3>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Set up your webhook endpoint.</li>
                <li>Create a test connection.</li>
                <li>Approve the test in HouseTabz.</li>
                <li>Verify receipt of the webhook.</li>
              </ol>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3">3. Test Service Activation</h3>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Receive the webhook notification.</li>
                <li>Verify signature validation.</li>
                <li>Test your activation logic.</li>
                <li>Confirm the service is activated.</li>
              </ol>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Common Issues</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>Button not appearing: Check your public key and URL parameters.</li>
              <li>Webhook errors: Verify your secret key and signature.</li>
              <li>Connection issues: Ensure your test app is properly configured.</li>
            </ul>
          </div>
        </div>
      )
    },

    goingLive: {
      title: "Going Live",
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Launch Checklist</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Replace test API keys with production keys.
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Update webhook URL to your production endpoint.
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Test the complete flow in production.
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Set up monitoring for your webhook endpoints.
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">We're Here to Help</h3>
            <p className="mb-4">
              Our integration team is available to help you go live. We'll review your integration, troubleshoot issues, and provide ongoing support.
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Integration review</li>
              <li>Troubleshooting support</li>
              <li>Post-launch monitoring</li>
            </ul>
          </div>
          <div className="mt-8 text-center">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-teal-700 transition-colors">
              Schedule Launch Review
            </button>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r overflow-y-auto flex-shrink-0">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-teal-600">Integration Guide</h1>
        </div>
        <nav className="py-4">
          {Object.entries(documentation).map(([key, section]) => (
            <NavItem
              key={key}
              item={section}
              isActive={activeSection === key}
              onClick={() => setActiveSection(key)}
            />
          ))}
        </nav>
      </aside>

      {/* Main Documentation Content */}
      <main className="flex-grow overflow-y-auto">
        <DocContent section={documentation[activeSection]} />
      </main>
    </div>
  );
};

export default IntegrationMenu;
