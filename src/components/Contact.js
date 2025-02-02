import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      {/* Header */}
      <div className="mb-6 border-b border-gray-200 pb-4">
        <h2 className="text-2xl font-semibold text-teal-700">Contact Us</h2>
        <p className="mt-2 text-gray-600">
          Reach out to us using the information below.
        </p>
      </div>
      {/* Contact Details */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <EnvelopeIcon className="h-6 w-6 text-teal-600" />
          <span className="text-gray-500">Email:</span>
          <a
            href="mailto:support@housetabz.com"
            className="text-teal-600 hover:underline"
          >
            support@housetabz.com
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <PhoneIcon className="h-6 w-6 text-teal-600" />
          <span className="text-gray-500">Phone:</span>
          <a
            href="tel:+18001234567"
            className="text-teal-600 hover:underline"
          >
            +1 (800) 123-4567
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <MapPinIcon className="h-6 w-6 text-teal-600" />
          <span className="text-gray-500">Address:</span>
          <span className="text-gray-800">
            123 HouseTabz Lane, Suite 100, Fintech City, USA
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
