import React, { useState, useEffect } from "react";
import axios from "axios";

const APIKeys = () => {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revealedKeys, setRevealedKeys] = useState({});

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3004/api/partners/1/api-keys",
          {
            headers: {
              api_key: "TEST_API_KEY_1",
              secret_key: "TEST_SECRET_KEY_1",
            },
          }
        );
        setApiKeys(response.data.apiKeys);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching API keys:", err);
        setError("Failed to load API keys. Please try again later.");
        setLoading(false);
      }
    };

    fetchApiKeys();
  }, []);

  const toggleReveal = (id) => {
    setRevealedKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) {
    return <p className="text-gray-600">Loading API keys...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-teal-700 mb-6">API Keys</h2>
      {apiKeys.length > 0 ? (
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-3 px-4 font-medium text-gray-600">Key Type</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Value</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {apiKeys.map((key) => (
              <React.Fragment key={key.id}>
                {/* API Key Row */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">API Key</td>
                  <td className="py-3 px-4">{key.api_key}</td>
                  <td className="py-3 px-4">
                    <button
                      className="text-blue-600 underline focus:outline-none"
                      onClick={() => navigator.clipboard.writeText(key.api_key)}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
                {/* Secret Key Row */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Secret Key</td>
                  <td className="py-3 px-4">
                    {revealedKeys[key.id] ? (
                      key.secret_key
                    ) : (
                      <button
                        onClick={() => toggleReveal(key.id)}
                        className="text-blue-600 underline focus:outline-none"
                      >
                        Reveal
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {revealedKeys[key.id] && (
                      <button
                        className="text-blue-600 underline focus:outline-none"
                        onClick={() => navigator.clipboard.writeText(key.secret_key)}
                      >
                        Copy
                      </button>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No API keys found.</p>
      )}
    </div>
  );
};

export default APIKeys;
