import React, { useState, useEffect } from "react";
import "../SpecialButton.css";

const SpecialButton = () => {
  const [isHouseTabzUser, setIsHouseTabzUser] = useState(false);
  const [userId, setUserId] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const houseTabzLogo = "https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo.png";

  // Check if user came from HouseTabz and get their user ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    const uid = params.get('user_id');
    
    if (ref === 'housetabz' && uid) {
      setIsHouseTabzUser(true);
      setUserId(uid);
    }
  }, []);

  const buttons = [
    {
      label: "Pay with HouseTabz",
      description: "Use this button for one-time payments",
      type: "one-time",
      color: "emerald",
    },
    {
      label: "Connect to HouseTabz",
      description: "Use this button for subscriptions",
      type: "subscription",
      color: "blue",
    },
  ];

  const stageHouseTabzRequest = async (type, buttonColor) => {
    if (!userId) {
      console.error('No HouseTabz user ID found');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.housetabz.com/api/partners/YOUR_PARTNER_ID/staged-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-HouseTabz-API-Key': 'YOUR_API_KEY',
          'X-HouseTabz-Secret-Key': 'YOUR_SECRET_KEY',
          'X-HouseTabz-SDK-Version': '1.0.0'
        },
        body: JSON.stringify({
          transactionId: `HTZ-${Date.now()}`,
          serviceName: type === 'one-time' ? 'Electricity Plan' : 'Streaming Service',
          pricing: type === 'one-time' ? 99.99 : 19.99,
          userId: userId,
          paymentType: type,
          timestamp: new Date().toISOString(),
          referrer: window.location.href
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create staged request');
      }

      const data = await response.json();
      
      // If we're in the HouseTabz webview, notify the app
      if (window.HouseTabzBridge) {
        window.HouseTabzBridge.postMessage({
          type: 'STAGED_REQUEST_CREATED',
          payload: data
        });
      }

      // Redirect to HouseTabz app if not in webview
      if (!window.HouseTabzBridge) {
        window.location.href = `housetabz://staged-request/${data.stagedRequestId}`;
      }

    } catch (err) {
      setError(err.message);
      console.error('HouseTabz integration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show component for HouseTabz users
  if (!isHouseTabzUser) {
    return null;
  }

  const renderButtonPreview = (button) => {
    const colorClasses = {
      emerald: "border-emerald-500 text-emerald-800 hover:bg-emerald-50",
      blue: "border-blue-500 text-blue-800 hover:bg-blue-50"
    };

    return (
      <button
        onClick={() => stageHouseTabzRequest(button.type, button.color)}
        disabled={isLoading}
        className={`flex items-center justify-between w-64 px-4 py-3 
          bg-white border-2 rounded-lg transition-colors
          ${colorClasses[button.color]}
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="font-medium">{button.label}</span>
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <img src={houseTabzLogo} alt="HouseTabz Logo" className="w-5 h-5" />
        )}
      </button>
    );
  };

  const renderCodeExample = (button) => {
    const code = `
<!-- ${button.label} Button -->
<div class="house-tabz-button" data-type="${button.type}">
  <span>${button.label}</span>
  <img src="${houseTabzLogo}" alt="HouseTabz Logo" class="house-tabz-logo" />
</div>

<script>
  // Initialize HouseTabz
  window.HouseTabz = {
    init: function(config) {
      const buttons = document.querySelectorAll('.house-tabz-button');
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const type = button.dataset.type;
          const urlParams = new URLSearchParams(window.location.search);
          const userId = urlParams.get('user_id');
          
          if (!userId) {
            console.error('No HouseTabz user ID found');
            return;
          }

          fetch('https://api.housetabz.com/api/partners/' + config.partnerId + '/staged-request', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-HouseTabz-API-Key': config.apiKey,
              'X-HouseTabz-Secret-Key': config.secretKey,
              'X-HouseTabz-SDK-Version': '1.0.0'
            },
            body: JSON.stringify({
              transactionId: 'HTZ-' + Date.now(),
              serviceName: type === 'one-time' ? 'Electricity Plan' : 'Streaming Service',
              pricing: type === 'one-time' ? 99.99 : 19.99,
              userId: userId,
              paymentType: type,
              timestamp: new Date().toISOString(),
              referrer: window.location.href
            }),
          })
          .then(response => response.json())
          .then(data => {
            // Handle success
            if (window.HouseTabzBridge) {
              window.HouseTabzBridge.postMessage({
                type: 'STAGED_REQUEST_CREATED',
                payload: data
              });
            } else {
              window.location.href = 'housetabz://staged-request/' + data.stagedRequestId;
            }
          })
          .catch(error => console.error('Error:', error));
        });
      });
    }
  };

  // Initialize with your credentials
  window.HouseTabz.init({
    partnerId: 'YOUR_PARTNER_ID',
    apiKey: 'YOUR_API_KEY',
    secretKey: 'YOUR_SECRET_KEY'
  });
</script>

<style>
  .house-tabz-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 2px solid ${button.color === 'emerald' ? '#10b981' : '#3b82f6'};
    border-radius: 8px;
    padding: 8px 16px;
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-weight: 600;
    color: ${button.color === 'emerald' ? '#065f46' : '#1d4ed8'};
    transition: all 0.2s ease;
    width: 250px;
  }
  .house-tabz-button:hover {
    background: ${button.color === 'emerald' ? '#d1fae5' : '#bfdbfe'};
  }
  .house-tabz-logo {
    width: 20px;
    height: 20px;
  }
</style>`;

    return (
      <pre className="special-button-code overflow-x-auto p-4 bg-gray-50 rounded-lg">
        {code}
      </pre>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">HouseTabz Integration</h2>
      <p className="mb-8 text-gray-600">
        Add these buttons to your checkout flow to enable HouseTabz payments. 
        The buttons will only appear for users coming from the HouseTabz app.
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {buttons.map((button, index) => (
        <div key={index} className="mb-12 pb-8 border-b border-gray-200 last:border-0">
          <h3 className="text-xl font-semibold mb-2">{button.label}</h3>
          <p className="text-gray-600 mb-4">{button.description}</p>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Preview:</h4>
            {renderButtonPreview(button)}
          </div>

          <div>
            <button
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              {expandedIndex === index ? "Hide Implementation Code" : "View Implementation Code"}
            </button>
            
            {expandedIndex === index && (
              <div className="mt-4">
                {renderCodeExample(button)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecialButton;