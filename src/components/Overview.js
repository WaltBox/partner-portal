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

  const [activeTab, setActiveTab] = useState('one-time');
  
  const documentation = {
    introduction: {
      title: "Getting Started with HouseTabz",
      content: (
        <div className="space-y-6">
         <p className="text-lg">
    HouseTabz is an additional payment authorization option that works alongside your existing payment methods. 
    Choose the integration type that matches your service:
  </p>

  {/* Integration Type Tabs */}
  <div className="mt-8">
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab('one-time')}
          className={`${
            activeTab === 'one-time'
              ? 'border-teal-500 text-teal-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
        >
          One-time Payments
        </button>
        <button
          onClick={() => setActiveTab('recurring')}
          className={`${
            activeTab === 'recurring'
              ? 'border-teal-500 text-teal-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
        >
          Recurring Expenses
        </button>
      </nav>
    </div>

    {/* Tab Content */}
    <div className="mt-6">
      {activeTab === 'one-time' ? (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Pay with HouseTabz</h3>
          <p className="text-gray-600">Split single payments among roommates.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold mb-2">1. Add Payment Option</h4>
              <p>Display "Pay with HouseTabz" at checkout</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold mb-2">2. Split Payment</h4>
              <p>Roommates approve their portions</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-bold mb-2">3. Complete Service</h4>
              <p>Proceed with service/delivery</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-medium">Perfect for:</p>
            <ul className="list-disc ml-6 mt-2">
              <li>Cleaning services</li>
              <li>Maintenance fees</li>
              <li>One-time purchases</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
        <div className="bg-[#E7FAE7] bg-opacity-50 rounded-xl p-6 border border-[#4ADE80] border-opacity-20">
          <h3 className="text-xl font-bold text-gray-800">Connect to HouseTabz</h3>
          <p className="text-gray-600 mt-2">Let roommates automatically split their recurring bills.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-lg p-5 shadow-sm border border-[#4ADE80] border-opacity-20">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#4ADE80] bg-opacity-10 rounded-full flex items-center justify-center text-[#4ADE80] font-medium">1</div>
                <h4 className="font-bold ml-3">Customer Links Account</h4>
              </div>
              <p className="text-gray-600">Customer connects their account through HouseTabz - you'll receive their houseId</p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm border border-[#4ADE80] border-opacity-20">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#4ADE80] bg-opacity-10 rounded-full flex items-center justify-center text-[#4ADE80] font-medium">2</div>
                <h4 className="font-bold ml-3">Store HouseTabz ID</h4>
              </div>
              <p className="text-gray-600">Add a houseId field to your accounts to identify HouseTabz customers</p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow-sm border border-[#4ADE80] border-opacity-20">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-[#4ADE80] bg-opacity-10 rounded-full flex items-center justify-center text-[#4ADE80] font-medium">3</div>
                <h4 className="font-bold ml-3">Auto-split Bills</h4>
              </div>
              <p className="text-gray-600">Notify HouseTabz of new bills - we handle the splitting and collection</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <h4 className="font-bold mb-3">Simple Implementation</h4>
          <div className="space-y-2">
            <p>1. Check if account is HouseTabz-enabled:</p>
            <pre className="bg-gray-100 p-3 rounded text-sm">
              {`const isHouseTabz = account.housetabzId !== null;`}
            </pre>
            
            <p>2. If yes, send bill details to our webhook:</p>
            <pre className="bg-gray-100 p-3 rounded text-sm">
              {`await fetch('https://api.housetabz.com/v1/bills', {
method: 'POST',
headers: {
  'Authorization': 'Bearer YOUR_SECRET_KEY',
  'Content-Type': 'application/json'
},
body: JSON.stringify({
  houseId: account.housetabzId,
  billAmount: amount,
  dueDate: dueDate,
  description: 'Monthly Service Bill'
})
});`}
            </pre>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="font-medium">Perfect for:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>Energy providers</li>
            <li>Internet services</li>
            <li>Monthly subscriptions</li>
            <li>Any recurring service</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mt-4">
          <h4 className="font-bold mb-2">Benefits</h4>
          <ul className="list-disc ml-6 space-y-1">
            <li>Minimal integration required - just one API call</li>
            <li>No changes needed to your existing billing system</li>
            <li>Guaranteed full payment for every bill</li>
            <li>Automatic reconciliation and reporting</li>
          </ul>
        </div>
      </div>
      )}
    </div>
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
      title: "Integrating HouseTabz into Your Checkout",
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">How It Works</h3>
            <ol className="list-decimal ml-6 space-y-2">
              <li>Users discover your service on the HouseTabz marketplace</li>
              <li>When they click "Shop Partner", they're directed to your site with HouseTabz parameters</li>
              <li>Your site stores these parameters while they shop normally</li>
              <li>At checkout, your site displays the HouseTabz payment option</li>
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
    // Add to your site's main layout or entry point
    window.addEventListener('load', () => {
        const params = new URLSearchParams(window.location.search);
        
        // Store HouseTabz parameters if present
        if (params.get('ref') === 'housetabz') {
            sessionStorage.setItem('housetabz_user_id', params.get('user_id'));
            sessionStorage.setItem('housetabz_partner_id', params.get('partner_id'));
            sessionStorage.setItem('housetabz_ref', 'housetabz');
        }
    });`
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
    <!-- Add the HouseTabz SDK -->
    <script src="dist/housetabz.min.js"></script>
    
    <!-- Add among your payment options -->
    <div id="housetabz-button"></div>
    
    <script>
      window.addEventListener('load', async () => {
        // Check if user came from HouseTabz
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
              onSuccess: (data) => {
                console.log('HouseTabz payment initiated:', data);
                // Handle successful HouseTabz connection
              },
              onError: (error) => {
                console.error('HouseTabz error:', error);
                // Handle any errors
              }
            });
          } catch (error) {
            console.error('HouseTabz initialization failed:', error);
          }
        }
      });
    </script>`
                },
                {
                  name: "React",
                  code: `
    import { useEffect } from 'react';
    
    function CheckoutPage() {
      useEffect(() => {
        const initHouseTabz = async () => {
          // Check if user came from HouseTabz
          const isHouseTabzUser = sessionStorage.getItem('housetabz_ref') === 'housetabz';
          
          if (!isHouseTabzUser || !window.HouseTabz) {
            return;
          }
    
          try {
            await window.HouseTabz.init({
              apiKey: process.env.REACT_APP_HOUSETABZ_API_KEY,
              secretKey: process.env.REACT_APP_HOUSETABZ_SECRET_KEY,
              environment: 'development'
            });
    
            await window.HouseTabz.mount('#housetabz-button', {
              serviceName: 'Your Service Name',
              pricing: 99.99,
              transactionId: orderId, // Your order ID
              onSuccess: (data) => {
                console.log('HouseTabz payment initiated:', data);
                // Handle successful HouseTabz connection
              },
              onError: (error) => {
                console.error('HouseTabz error:', error);
                // Handle any errors
              }
            });
          } catch (error) {
            console.error('HouseTabz initialization failed:', error);
          }
        };
    
        initHouseTabz();
      }, []);
    
      return (
        <div className="checkout-page">
          {/* Your other payment options */}
          <div id="housetabz-button" />
        </div>
      );
    }`
                }
              ]}
            />
          </div>
    
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Configuration Options</h3>
            <div className="space-y-4">
              <h4 className="font-semibold">Initialization Options</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="font-medium">Option</div>
                <div className="font-medium">Type</div>
                <div className="font-medium">Description</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <code>apiKey</code>
                <div>string</div>
                <div>Your HouseTabz API key</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <code>secretKey</code>
                <div>string</div>
                <div>Your HouseTabz secret key</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <code>environment</code>
                <div>string</div>
                <div>'development' or 'production'</div>
              </div>
            </div>
    
            <div className="space-y-4 mt-6">
              <h4 className="font-semibold">Button Options</h4>
              <div className="grid grid-cols-3 gap-4">
                <code>serviceName</code>
                <div>string</div>
                <div>Name of your service shown to users</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <code>pricing</code>
                <div>number</div>
                <div>Monthly service cost</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <code>transactionId</code>
                <div>string</div>
                <div>Your order/transaction identifier</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <code>onSuccess</code>
                <div>function</div>
                <div>Called when HouseTabz connection is initiated</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <code>onError</code>
                <div>function</div>
                <div>Called if connection fails</div>
              </div>
            </div>
          </div>
    
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Implementation Tips</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>The HouseTabz button only shows for users coming from the HouseTabz marketplace</li>
              <li>Store the HouseTabz parameters in sessionStorage to maintain context during shopping</li>
              <li>Handle both success and error cases in your callbacks</li>
              <li>Test thoroughly in development before going live</li>
              <li>Make sure your API credentials match your environment</li>
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
            HouseTabz acts as a payment authorization method in your checkout flow. When all roommates approve a payment split, 
            we'll send a webhook notification to your server indicating the payment is authorized and ready for service activation.
          </p>
    
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">How It Works</h3>
            <p>
              When a <code>request.authorized</code> webhook is received, it indicates that:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>All roommates have approved their portion of the payment</li>
              <li>The full payment amount is authorized and guaranteed</li>
              <li>You can proceed with service activation for the customer</li>
            </ul>
          </div>
    
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
        const { event, transactionId, pricing, serviceName } = req.body;
    
        if (event === 'request.authorized') {
          // Payment is authorized - activate the service
          await activateService({
            transactionId,
            amount: pricing,
            service: serviceName
          });
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
            # Payment is authorized - activate the service
            activate_service(
              transaction_id: params[:transactionId],
              amount: params[:pricing],
              service: params[:serviceName]
            )
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
                // Payment is authorized - activate the service
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
                <div>
                  All roommates have approved and payment is authorized. 
                  Proceed with service activation.
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <code>request.declined</code>
                <div>
                  Payment declined due to roommate rejection. 
                  No further action needed.
                </div>
              </div>
            </div>
          </div>
    
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold mb-3">Webhook Payload</h3>
            <p className="mb-4">Each webhook event includes the following data:</p>
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
            <p className="mb-4">Every webhook request includes a signature header for verification:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Header name: <code>X-HouseTabz-Signature</code></li>
              <li>Sign requests using your webhook secret (found in dashboard)</li>
              <li>Always verify the signature before processing events</li>
            </ul>
          </div>
    
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Testing</h3>
            <p>
              Use webhook.site to test your endpoint implementation. Copy your test endpoint URL 
              to your HouseTabz dashboard settings to receive test events. We recommend testing 
              both successful authorization and decline scenarios before going live.
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