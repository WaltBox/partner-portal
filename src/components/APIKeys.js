import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaCopy, FaEye, FaEyeSlash, FaKey, FaCheckCircle } from "react-icons/fa";

// Constants
const API_BASE_URL = "http://localhost:3004/api";
const AUTH_TOKEN = localStorage.getItem("authToken");

// Reusable KeyCard Component
const KeyCard = ({ type, keyValue, showSecretKey, onToggleVisibility, onCopy, copiedKey }) => {
  const isSecret = type === "secret";
  const maskedKey = `${keyValue.slice(0, 8)}${'•'.repeat(24)}`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <FaKey className={`${isSecret ? "text-red-600" : "text-teal-600"} mr-2`} />
          <h3 className="text-sm font-semibold text-gray-900">{isSecret ? "Secret Key" : "Public Key"}</h3>
        </div>
      </div>
      <div className="px-6 py-4 flex items-center justify-between bg-gray-50">
        <code className="font-mono text-sm text-gray-800">
          {isSecret && !showSecretKey ? maskedKey : keyValue}
        </code>
        <div className="flex items-center space-x-4">
          {isSecret && (
            <button
              onClick={onToggleVisibility}
              className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-teal-600 transition-colors"
              aria-label={showSecretKey ? "Hide Secret Key" : "Show Secret Key"}
            >
              {showSecretKey ? <FaEyeSlash className="mr-1" /> : <FaEye className="mr-1" />}
              {showSecretKey ? "Hide" : "Show"}
            </button>
          )}
          <button
            onClick={onCopy}
            className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-teal-600 transition-colors"
            aria-label={`Copy ${type} key`}
          >
            {copiedKey === type ? (
              <FaCheckCircle className="mr-1 text-green-500" />
            ) : (
              <FaCopy className="mr-1" />
            )}
            {copiedKey === type ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
};

const APIKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Fetch API keys
  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        if (!AUTH_TOKEN) throw new Error("User not authenticated. Please log in.");

        const currentUserResponse = await axios.get(`${API_BASE_URL}/partners/current`, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });

        const partnerId = currentUserResponse.data.partner.id;
        const apiKeysResponse = await axios.get(`${API_BASE_URL}/partners/${partnerId}/api-keys`, {
          headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
        });

        setApiKeys(apiKeysResponse.data.apiKeys);
      } catch (err) {
        console.error("Error fetching API keys:", err);
        setError("Failed to load API keys. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApiKeys();
  }, []);

  // Copy key to clipboard
  const handleCopy = useCallback((key, type) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  }, []);

  // Toggle secret key visibility
  const toggleSecretKeyVisibility = useCallback(() => {
    setShowSecretKey((prev) => !prev);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">API Keys</h2>
        <p className="text-gray-600">
          Use these keys to authenticate your requests. Keep your secret key safe – don't commit it to
          version control or share it in client-side code.
        </p>
      </div>

      {/* Key Cards */}
      <div className="space-y-6">
        {apiKeys.map((key) => (
          <div key={key.id} className="space-y-4">
            <KeyCard
              type="public"
              keyValue={key.api_key}
              onCopy={() => handleCopy(key.api_key, "public")}
              copiedKey={copiedKey}
            />
            <KeyCard
              type="secret"
              keyValue={key.secret_key}
              showSecretKey={showSecretKey}
              onToggleVisibility={toggleSecretKeyVisibility}
              onCopy={() => handleCopy(key.secret_key, "secret")}
              copiedKey={copiedKey}
            />
          </div>
        ))}
      </div>

      {/* Usage Guidelines */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Using Your API Keys</h3>
        <ul className="text-blue-800 space-y-2 text-sm">
          <li>• Use your public key for frontend initialization</li>
          <li>• Keep your secret key secure and only use it on your server</li>
          <li>• Never share your secret key or commit it to version control</li>
          <li>• Rotate your keys immediately if they're ever compromised</li>
        </ul>
      </div>
    </div>
  );
};

export default APIKeys;