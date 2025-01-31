import React from 'react';

const YourDetails = ({ partner }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-teal-700 mb-4">Your Details</h2>
      <p className="text-gray-600 mb-6">Here you can view and update your account details.</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium text-gray-800">{partner?.person_of_contact || "N/A"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium text-gray-800">{partner?.email || "N/A"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <p className="font-medium text-gray-800">{partner?.phone_number || "N/A"}</p>
          </div>
        </div>

        <button className="mt-6 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default YourDetails;