import React, { useState } from "react";
import "../PlayBook.css";

const PlayBook = () => {
  const [selectedError, setSelectedError] = useState(null);

  const errorResponses = {
    400: {
      title: "400 Bad Request",
      description:
        "This error occurs when the request payload is missing required fields or contains invalid data.",
      example: `
HTTP/1.1 400 Bad Request
{
  "error": "Missing required fields"
}`,
    },
    401: {
      title: "401 Unauthorized",
      description:
        "This error occurs when the API key or secret key is missing or invalid.",
      example: `
HTTP/1.1 401 Unauthorized
{
  "error": "Invalid API key or secret key"
}`,
    },
    404: {
      title: "404 Not Found",
      description:
        "This error occurs when the requested resource (e.g., staged request) does not exist.",
      example: `
HTTP/1.1 404 Not Found
{
  "error": "Staged request not found"
}`,
    },
  };

  const successResponses = {
    201: {
      title: "201 Created",
      description: "The request was successful, and the resource was created.",
      example: `
HTTP/1.1 201 Created
{
  "message": "Staged request created successfully",
  "stagedRequest": {
    "id": 1,
    "transactionId": "TXN-12345",
    "serviceName": "Electricity Plan",
    "pricing": 99.99,
    "userId": 101,
    "status": "staged"
  }
}`,
    },
    200: {
      title: "200 OK",
      description:
        "The webhook payload was received successfully, and no further action is required.",
      example: `
HTTP/1.1 200 OK
{
  "message": "Webhook received successfully"
}`,
    },
  };

  return (
    <div className="playbook-container">
      <h1 className="playbook-title">Integration Playbook</h1>

      {/* Step 1: Staging a Request */}
      <section>
        <h2 className="playbook-subtitle">Step 1: Staging a Request</h2>
        <p className="playbook-paragraph">
          Partners must send a <code>POST</code> request to the following endpoint during the checkout process:
        </p>
        <pre className="playbook-code">
          POST /api/partners/:partnerId/staged-request HTTP/1.1
          <br />
          Host: api.housetabz.com
          <br />
          Headers:
          <br />
          &nbsp;&nbsp;Content-Type: application/json
          <br />
          &nbsp;&nbsp;api_key: YOUR_API_KEY
          <br />
          &nbsp;&nbsp;secret_key: YOUR_SECRET_KEY
          <br />
          Body:
          <br />
          {"{"}
          <br />
          &nbsp;&nbsp;"transactionId": "TXN-12345",
          <br />
          &nbsp;&nbsp;"serviceName": "Electricity Plan",
          <br />
          &nbsp;&nbsp;"pricing": 99.99,
          <br />
          &nbsp;&nbsp;"userId": 101
          <br />
          {"}"}
        </pre>

        {/* Success Response */}
        <h3 className="playbook-subtitle">Success Response</h3>
        <pre className="playbook-code-success">
          {successResponses[201].example}
        </pre>

        {/* Error Responses */}
        <h3 className="playbook-subtitle">Possible Errors</h3>
        <div className="playbook-responses">
          {Object.keys(errorResponses).map((code) => (
            <button
              key={code}
              className="playbook-response"
              onClick={() =>
                setSelectedError(selectedError === code ? null : code)
              }
            >
              {code} - {errorResponses[code].title}
            </button>
          ))}
        </div>
        {selectedError && (
          <div className="playbook-error-details">
            <h4 className="playbook-subtitle">
              {errorResponses[selectedError].title}
            </h4>
            <p className="playbook-paragraph">
              {errorResponses[selectedError].description}
            </p>
            <pre className="playbook-code-error">
              {errorResponses[selectedError].example}
            </pre>
          </div>
        )}
      </section>

      {/* Step 2: Handling Webhooks */}
      <section>
        <h2 className="playbook-subtitle">Step 2: Handling Webhooks</h2>
        <p className="playbook-paragraph">
          Once the transaction is staged, HouseTabz will notify your webhook
          endpoint with the transaction's status. Ensure your server handles the
          following payload correctly:
        </p>
        <pre className="playbook-code">
          POST /your-webhook-endpoint HTTP/1.1
          <br />
          Headers:
          <br />
          &nbsp;&nbsp;Content-Type: application/json
          <br />
          Body:
          <br />
          {"{"}
          <br />
          &nbsp;&nbsp;"stagedRequestId": 123,
          <br />
          &nbsp;&nbsp;"status": "approved",
          <br />
          &nbsp;&nbsp;"transactionId": "TXN-12345",
          <br />
          &nbsp;&nbsp;"timestamp": "2024-01-01T12:00:00Z"
          <br />
          {"}"}
        </pre>

        {/* Success Response */}
        <h3 className="playbook-subtitle">Success Response</h3>
        <pre className="playbook-code-success">
          {successResponses[200].example}
        </pre>

        <p className="playbook-paragraph">
          Your server should respond with an HTTP <code>200 OK</code> status
          within 200ms to acknowledge receipt of the webhook.
        </p>
      </section>
    </div>
  );
};

export default PlayBook;
