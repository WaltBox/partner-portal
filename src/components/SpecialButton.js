import React, { useState } from "react";
import "../SpecialButton.css";

const SpecialButton = () => {
  const houseTabzLogo =
    "https://housetabz-assets.s3.us-east-1.amazonaws.com/assets/housetabzlogo.png";

  const buttons = [
    {
      label: "Pay with HouseTabz",
      description: "Use this button for one-time payments.",
      postRequest: `
POST /api/partners/:partnerId/staged-request HTTP/1.1
Host: api.housetabz.com
Headers:
  Content-Type: application/json
  api_key: YOUR_API_KEY
  secret_key: YOUR_SECRET_KEY
Body:
{
  "transactionId": "TXN-12345",
  "serviceName": "Electricity Plan",
  "pricing": 99.99,
  "userId": 101,
  "paymentType": "one-time"
}
`,
      fullCode: `
<!-- Pay with HouseTabz Button -->
<div class="house-tabz-button" onclick="stageHouseTabzRequest('one-time')">
  <span>Pay with HouseTabz</span>
  <img src="${houseTabzLogo}" alt="HouseTabz Logo" class="house-tabz-logo" />
</div>

<script>
  function stageHouseTabzRequest(type) {
    fetch('https://api.housetabz.com/api/partners/YOUR_PARTNER_ID/staged-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_key': 'YOUR_API_KEY',
        'secret_key': 'YOUR_SECRET_KEY',
      },
      body: JSON.stringify({
        transactionId: 'TXN-12345',
        serviceName: 'Electricity Plan',
        pricing: 99.99,
        userId: 101,
        paymentType: type,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  }
</script>

<style>
  .house-tabz-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 2px solid #10b981;
    border-radius: 8px;
    padding: 8px 16px;
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-weight: bold;
    color: #065f46;
    transition: background 0.3s ease, border-color 0.3s ease;
    width: 250px;
  }
  .house-tabz-button:hover {
    background: #d1fae5;
    border-color: #065f46;
  }
  .house-tabz-logo {
    width: 20px;
    height: 20px;
  }
</style>
`,
    },
    {
      label: "Connect to HouseTabz",
      description: "Use this button for subscriptions.",
      postRequest: `
POST /api/partners/:partnerId/staged-request HTTP/1.1
Host: api.housetabz.com
Headers:
  Content-Type: application/json
  api_key: YOUR_API_KEY
  secret_key: YOUR_SECRET_KEY
Body:
{
  "transactionId": "TXN-54321",
  "serviceName": "Streaming Service",
  "pricing": 19.99,
  "userId": 102,
  "paymentType": "subscription"
}
`,
      fullCode: `
<!-- Connect to HouseTabz Button -->
<div class="house-tabz-button" onclick="stageHouseTabzRequest('subscription')">
  <span>Connect to HouseTabz</span>
  <img src="${houseTabzLogo}" alt="HouseTabz Logo" class="house-tabz-logo" />
</div>

<script>
  function stageHouseTabzRequest(type) {
    fetch('https://api.housetabz.com/api/partners/YOUR_PARTNER_ID/staged-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api_key': 'YOUR_API_KEY',
        'secret_key': 'YOUR_SECRET_KEY',
      },
      body: JSON.stringify({
        transactionId: 'TXN-54321',
        serviceName: 'Streaming Service',
        pricing: 19.99,
        userId: 102,
        paymentType: type,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('Success:', data))
      .catch((error) => console.error('Error:', error));
  }
</script>

<style>
  .house-tabz-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 2px solid #3b82f6;
    border-radius: 8px;
    padding: 8px 16px;
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-weight: bold;
    color: #1d4ed8;
    transition: background 0.3s ease, border-color 0.3s ease;
    width: 250px;
  }
  .house-tabz-button:hover {
    background: #bfdbfe;
    border-color: #1d4ed8;
  }
  .house-tabz-logo {
    width: 20px;
    height: 20px;
  }
</style>
`,
    },
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  return (
    <div>
      <h2 className="special-button-title">Special Button</h2>
      <p className="special-button-paragraph">
        Below are the buttons you can integrate into your platform. Each button
        triggers a POST request to the HouseTabz API.
      </p>
      {buttons.map((button, index) => (
        <div key={index} className="special-button-container">
          <h3 className="special-button-subtitle">{button.label}</h3>
          <p className="special-button-paragraph">{button.description}</p>

          {/* Button Preview */}
          <div className="house-tabz-button">
            <span>{button.label}</span>
            <img src={houseTabzLogo} alt="HouseTabz Logo" />
          </div>

          {/* Post Request Example */}
          <h4 className="special-button-paragraph mt-4">Example POST Request:</h4>
          <pre className="special-button-code">{button.postRequest}</pre>

          {/* Code Toggle */}
          <button
            className="special-button-toggle"
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            {expandedIndex === index ? "Hide Full Code" : "View Full Code"}
          </button>

          {/* Full Code Snippet */}
          {expandedIndex === index && (
            <pre className="special-button-code">{button.fullCode}</pre>
          )}
        </div>
      ))}
    </div>
  );
};

export default SpecialButton;
