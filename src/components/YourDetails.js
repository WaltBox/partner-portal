import React from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/solid'; // v2 import

const YourDetails = ({ partner }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-teal-700">Your Details</h2>
        <p className="mt-2 text-gray-600">
          Manage your account information and keep your details up-to-date.
        </p>
      </div>

      {/* Details Section */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Name</label>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {partner?.person_of_contact || "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Email</label>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {partner?.email || "N/A"}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Phone</label>
            <p className="mt-1 text-lg font-medium text-gray-800">
              {partner?.phone_number || "N/A"}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="pt-4 border-t border-gray-200">
          <button className="inline-flex items-center px-5 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors">
            <PencilSquareIcon className="h-5 w-5 mr-2" />
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourDetails;
