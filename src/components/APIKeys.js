import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCopy, FaEye, FaEyeSlash, FaKey, FaCheckCircle } from "react-icons/fa";

const APIKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("User not authenticated. Please log in.");

        const currentUserResponse = await axios.get(
          "http://localhost:3004/api/partners/current",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const partnerId = currentUserResponse.data.partner.id;
        
        const apiKeysResponse = await axios.get(
          `http://localhost:3004/api/partners/${partnerId}/api-keys`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setApiKeys(apiKeysResponse.data.apiKeys);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching API keys:", err);
        setError("Failed to load API keys. Please try again later.");
        setLoading(false);
      }
    };

    fetchApiKeys();
  }, []);

  const handleCopy = (key, type) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const maskKey = (key) => {
    return `${key.slice(0, 8)}${'•'.repeat(24)}`;
  };

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
            {/* Public Key Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <FaKey className="text-teal-600 mr-2" />
                  <h3 className="text-sm font-semibold text-gray-900">Public Key</h3>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center justify-between bg-gray-50">
                <code className="font-mono text-sm text-gray-800">{key.api_key}</code>
                <button
                  onClick={() => handleCopy(key.api_key, 'public')}
                  className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-teal-600 transition-colors"
                >
                  {copiedKey === 'public' ? (
                    <FaCheckCircle className="mr-1 text-green-500" />
                  ) : (
                    <FaCopy className="mr-1" />
                  )}
                  {copiedKey === 'public' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Secret Key Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <FaKey className="text-red-600 mr-2" />
                  <h3 className="text-sm font-semibold text-gray-900">Secret Key</h3>
                </div>
              </div>
              <div className="px-6 py-4 flex items-center justify-between bg-gray-50">
                <code className="font-mono text-sm text-gray-800">
                  {showSecretKey ? key.secret_key : maskKey(key.secret_key)}
                </code>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    {showSecretKey ? (
                      <><FaEyeSlash className="mr-1" /> Hide</>
                    ) : (
                      <><FaEye className="mr-1" /> Show</>
                    )}
                  </button>
                  <button
                    onClick={() => handleCopy(key.secret_key, 'secret')}
                    className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    {copiedKey === 'secret' ? (
                      <FaCheckCircle className="mr-1 text-green-500" />
                    ) : (
                      <FaCopy className="mr-1" />
                    )}
                    {copiedKey === 'secret' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
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