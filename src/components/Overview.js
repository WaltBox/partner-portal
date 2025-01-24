import React, { useState, useEffect } from "react";
import { FaKey, FaCode, FaCheckCircle, FaRocket, FaBell, FaCopy, FaCheck, FaChevronRight } from "react-icons/fa";
import { format } from 'date-fns';

// Framework tabs component with copy functionality
const FrameworkTabs = ({ examples }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="mt-4 framework-tabs" onClick={e => e.stopPropagation()}>
      <div className="flex space-x-2 mb-2">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-t-lg transition-colors ${
              activeTab === index
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
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

// Feedback component
const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);

  return submitted ? (
    <div className="text-green-600">Thanks for your feedback!</div>
  ) : (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">Was this helpful?</span>
      <button 
        onClick={() => setSubmitted(true)}
        className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
      >
        Yes
      </button>
      <button
        onClick={() => setSubmitted(true)}
        className="text-sm px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
      >
        No
      </button>
    </div>
  );
};

// Main documentation content
const DocContent = ({ section }) => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{section.title}</h1>
      <div className="text-sm text-gray-500 mb-8">
        Last updated: {format(new Date(), 'MMMM d, yyyy')}
      </div>
      
      <div className="prose max-w-none">
        {section.content}
      </div>

      <div className="mt-12 pt-6 border-t">
        <Feedback />
      </div>
    </div>
  );
};

// Sidebar navigation item
const NavItem = ({ item, isActive, onClick, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          onClick();
          setIsOpen(!isOpen);
        }}
        className={`w-full text-left px-4 py-2 flex items-center justify-between 
          ${isActive ? 'bg-teal-50 text-teal-600' : 'hover:bg-gray-50'}
          ${depth > 0 ? 'pl-8' : ''}`}
      >
        <span className="text-sm">{item.title}</span>
        {item.children && (
          <FaChevronRight
            className={`transition-transform ${isOpen ? 'transform rotate-90' : ''}`}
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

// Main component
const IntegrationMenu = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  
  const documentation = {
    introduction: {
      title: "Getting Started with HouseTabz",
      content: (
        <div className="space-y-6">
          <p className="text-lg">
            HouseTabz helps your users split their service costs with roommates. When users connect through HouseTabz:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-2">1. Connect</h3>
              <p>Users click "Connect to HouseTabz" at your checkout</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-2">2. Approve</h3>
              <p>Roommates approve the connection in their HouseTabz app</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-2">3. Activate</h3>
              <p>We notify you when approved, and you activate the service</p>
            </div>
          </div>
  
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Integration Overview</h3>
            <p>You'll need to:</p>
            <ul className="list-disc ml-6">
              <li>Add our button to your checkout</li>
              <li>Set up a webhook endpoint to receive approvals</li>
              <li>Activate services when approved</li>
            </ul>
          </div>
        </div>
      )
    },
    
    apiKeys: {
      title: "API Keys",
      content: (
        <div className="space-y-6">
          <p>To connect with HouseTabz, you'll need two types of API keys:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg mb-3">Public Key</h3>
              <div className="space-y-4">
                <p>Used in your frontend code to initialize the HouseTabz button.</p>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <code>pk_test_abc123...</code>
                </div>
                <ul className="text-sm space-y-2">
                  <li>✅ Safe to include in frontend code</li>
                  <li>✅ Used to initialize the HouseTabz button</li>
                  <li>❌ Cannot make authenticated API calls</li>
                </ul>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="font-bold text-lg mb-3">Secret Key</h3>
              <div className="space-y-4">
                <p>Used on your server for secure API calls and webhook verification.</p>
                <div className="bg-white p-3 rounded border border-gray-200">
                  <code>sk_test_xyz789...</code>
                </div>
                <ul className="text-sm space-y-2">
                  <li>✅ Used for webhook verification</li>
                  <li>✅ Used for API calls from your server</li>
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
      title: "Adding the HouseTabz Button",
      content: (
        <div className="space-y-6">
          <p>The HouseTabz button appears automatically when users come from the HouseTabz app.</p>
  
          <FrameworkTabs
            examples={[
              {
                name: "HTML",
                code: 
  `<!-- Add the HouseTabz SDK -->
  <script src="https://js.housetabz.com/v1/housetabz.min.js"></script>
  
  <!-- Add the button container -->
  <div id="housetabz-button"></div>
  
  <script>
    HouseTabz.init({
      publicKey: 'YOUR_PUBLIC_KEY'
    });
  
    HouseTabz.mount('#housetabz-button', {
      serviceName: 'Energy Plan',
      pricing: 99.99,
      transactionId: 'YOUR-INTERNAL-ID'
    });
  </script>`
              },
              {
                name: "React",
                code:
  `import { HouseTabzButton } from '@housetabz/react';
  
  function Checkout() {
    return (
      <HouseTabzButton
        publicKey={process.env.REACT_APP_HOUSETABZ_PUBLIC_KEY}
        serviceName="Energy Plan"
        pricing={99.99}
        transactionId="YOUR-INTERNAL-ID"
        onSuccess={(result) => {
          console.log('Connection initiated:', result);
        }}
      />
    );
  }`
              }
            ]}
          />
  
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Button Options</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Option</div>
                <div className="font-medium">Type</div>
                <div className="font-medium">Description</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <code>serviceName</code>
                <div>string</div>
                <div>Name of your service</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <code>pricing</code>
                <div>number</div>
                <div>Monthly cost of service</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <code>transactionId</code>
                <div>string</div>
                <div>Your internal order/transaction ID</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
  
    webhooks: {
      title: "Setting Up Webhooks",
      content: (
        <div className="space-y-6">
          <p>
            When roommates approve a connection, we'll send a webhook to your server. 
            Here's how to handle these notifications:
          </p>
  
          <FrameworkTabs
            examples={[
              {
                name: "Node/Express",
                code:
  `const express = require('express');
  const app = express();
  
  app.post('/housetabz/webhook', express.json(), (req, res) => {
    const signature = req.headers['x-housetabz-signature'];
    const webhookSecret = process.env.HOUSETABZ_WEBHOOK_SECRET;
  
    // Verify webhook signature
    if (isValidSignature(req.body, signature, webhookSecret)) {
      const { event, transactionId } = req.body;
  
      if (event === 'request.authorized') {
        // All roommates approved! Activate the service
        await activateService(transactionId);
      }
    }
  
    res.json({ received: true });
  });
  
  // Verify webhook signature
  function isValidSignature(payload, signature, secret) {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = hmac.update(JSON.stringify(payload)).digest('hex');
    return signature === digest;
  }`
              },
              {
                name: "Ruby/Rails",
                code:
  `# app/controllers/webhooks_controller.rb
  class WebhooksController < ApplicationController
    skip_before_action :verify_authenticity_token
  
    def receive
      signature = request.headers['X-HouseTabz-Signature']
      payload = request.raw_post
      
      if valid_signature?(payload, signature)
        case params[:event]
        when 'request.authorized'
          # All roommates approved! Activate the service
          activate_service(params[:transactionId])
        end
      end
      
      render json: { received: true }
    end
  
    private
  
    def valid_signature?(payload, signature)
      digest = OpenSSL::HMAC.hexdigest(
        'SHA256',
        ENV['HOUSETABZ_WEBHOOK_SECRET'],
        payload
      )
      ActiveSupport::SecurityUtils.secure_compare(digest, signature)
    end
  end`
              },
              {
                name: "PHP/Laravel",
                code:
  `// routes/web.php
  Route::post('/housetabz/webhook', 'WebhookController@handle');
  
  // app/Http/Controllers/WebhookController.php
  public function handle(Request $request)
  {
      $signature = $request->header('X-HouseTabz-Signature');
      $payload = $request->getContent();
      
      if ($this->validSignature($payload, $signature)) {
          if ($request->event === 'request.authorized') {
              // All roommates approved! Activate the service
              $this->activateService($request->transactionId);
          }
      }
      
      return response()->json(['received' => true]);
  }
  
  private function validSignature($payload, $signature)
  {
      $computed = hash_hmac(
          'sha256',
          $payload,
          config('services.housetabz.webhook_secret')
      );
      return hash_equals($computed, $signature);
  }`
              }
            ]}
          />
  
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Webhook Events</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-medium">Event</div>
                <div className="font-medium">Description</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <code>request.authorized</code>
                <div>All roommates have approved the connection</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <code>request.declined</code>
                <div>A roommate has declined the connection</div>
              </div>
            </div>
          </div>
  
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Testing Webhooks</h3>
            <p>
              Use tools like webhook.site to test your webhook endpoint before going live.
              We'll send test events to help you verify your implementation.
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
                <li>Open your test HouseTabz app</li>
                <li>Navigate to your site through HouseTabz</li>
                <li>Verify the button appears on your checkout page</li>
                <li>Click the button to initiate a connection</li>
              </ol>
            </div>
  
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3">2. Test Webhooks</h3>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Set up your webhook endpoint</li>
                <li>Create a test connection</li>
                <li>Approve it in the test HouseTabz app</li>
                <li>Verify your webhook receives the approval</li>
              </ol>
            </div>
  
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3">3. Test Service Activation</h3>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Receive webhook notification</li>
                <li>Verify signature validation</li>
                <li>Test your service activation logic</li>
                <li>Confirm the service is activated</li>
              </ol>
            </div>
          </div>
  
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Common Issues</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>Button not appearing: Check your public key and URL parameters</li>
              <li>Webhook errors: Verify your secret key and signature validation</li>
              <li>Connection issues: Ensure your test app is properly configured</li>
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
                Replace test API keys with production keys
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Update webhook URL to production endpoint
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Test the complete flow in production
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Set up monitoring for webhook endpoints
              </li>
            </ul>
          </div>
  
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">We're Here to Help</h3>
            <p className="mb-4">
              Our integration team is ready to help you go live. We'll:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Review your integration</li>
              <li>Help troubleshoot any issues</li>
              <li>Ensure everything is working perfectly</li>
              <li>Support you after launch</li>
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


    // ... other sections
  };


  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r overflow-y-auto flex-shrink-0">
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
      </div>

      {/* Main content */}
      <div className="flex-grow overflow-y-auto">
        <DocContent section={documentation[activeSection]} />
      </div>
    </div>
  );
};

export default IntegrationMenu;