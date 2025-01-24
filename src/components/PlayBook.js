import React, { useState } from "react";
import "../styles/PlayBook.css";

const PlayBook = () => {
  const [selectedError, setSelectedError] = useState(null);

  const errorResponses = {
    400: {
      title: "400 Bad Request",
      description: "Missing required fields or invalid data.",
      example: `{
  "error": "Missing required fields",
  "details": "transactionId, serviceName, and pricing are required"
}`,
    },
    401: {
      title: "401 Unauthorized",
      description: "Invalid API key or missing credentials.",
      example: `{
  "error": "Invalid API key"
}`,
    },
    404: {
      title: "404 Not Found",
      description: "Partner or staged request not found.",
      example: `{
  "error": "Partner not found"
}`,
    },
  };

  const quickStartCode = `<!-- Add HouseTabz SDK -->
<script src="https://js.housetabz.com/v1/housetabz.min.js"></script>
<div id="housetabz-button"></div>
<script>
  HouseTabz.init({
    partnerId: 'YOUR_PARTNER_ID',
    apiKey: 'YOUR_API_KEY',
    environment: 'production',
  });

  HouseTabz.mount('#housetabz-button', {
    serviceName: 'Your Service Name',
    pricing: 99.99,
    transactionId: 'YOUR-TXN-ID',
  });
</script>`;

  const webhookExample = `const express = require('express');
const crypto = require('crypto');
const app = express();

app.post('/webhooks/housetabz', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-housetabz-signature'];

  if (!verifySignature(req.body, signature, process.env.HOUSETABZ_WEBHOOK_SECRET)) {
    return res.status(400).send('Invalid signature');
  }

  const event = JSON.parse(req.body);

  switch (event.event) {
    case 'request.authorized':
      await activateService(event.transactionId);
      break;
    case 'request.declined':
      await cancelPendingRequest(event.transactionId);
      break;
  }

  res.json({ received: true });
});
`;

  return (
    <div className="playbook-container">
      {/* Header */}
      <header className="playbook-header">
        <h1>HouseTabz Integration Playbook</h1>
        <p className="playbook-subtext">Simplify roommate service payments with HouseTabz.</p>
      </header>

      {/* Overview Section */}
      <section className="playbook-section">
        <h2>Overview</h2>
        <p>
          HouseTabz enables seamless integration of shared service payments. Here's how it works:
        </p>
        <ul className="playbook-list">
          <li>Create a service request at checkout</li>
          <li>Roommates approve the request</li>
          <li>Receive webhook notifications on approval</li>
          <li>Activate the service after approval</li>
        </ul>
      </section>

      {/* Quick Start Section */}
      <section className="playbook-section">
        <h2>Quick Start</h2>
        <pre className="playbook-code-block">{quickStartCode}</pre>
        <p>
          Add the SDK to your checkout page and configure it with your transaction details. Use the
          test environment during development.
        </p>
      </section>

      {/* Error Handling Section */}
      <section className="playbook-section error-handling">
        <h2>Error Handling</h2>
        <p>Here are common errors and their solutions:</p>
        <div className="playbook-errors">
          {Object.keys(errorResponses).map((code) => (
            <button
              key={code}
              className={`playbook-error-btn ${
                selectedError === code ? "active-error" : ""
              }`}
              onClick={() => setSelectedError(selectedError === code ? null : code)}
            >
              {code}: {errorResponses[code].title}
            </button>
          ))}
        </div>
        {selectedError && (
          <div className="playbook-error-details">
            <h3>{errorResponses[selectedError].title}</h3>
            <p>{errorResponses[selectedError].description}</p>
            <pre>{errorResponses[selectedError].example}</pre>
          </div>
        )}
      </section>

      {/* Webhook Integration */}
      <section className="playbook-section">
        <h2>Webhook Integration</h2>
        <p>
          After setting up your webhook endpoint, you’ll receive real-time notifications for
          request approvals. Here’s an example using Express.js:
        </p>
        <pre className="playbook-code-block">{webhookExample}</pre>
      </section>

      {/* Best Practices */}
      <section className="playbook-section best-practices">
        <h2>Best Practices</h2>
        <ul>
          <li>Store the <code>transactionId</code> with pending orders</li>
          <li>Verify webhook signatures for security</li>
          <li>Respond to webhook notifications promptly</li>
          <li>Test extensively in the development environment</li>
        </ul>
      </section>
    </div>
  );
};

export default PlayBook;
