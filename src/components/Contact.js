import React from 'react';

const Contact = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-teal-700 mb-4">Contact Us</h2>
      <p className="text-gray-600 mb-6">Reach out to us using the information below:</p>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Email:</span>
          <a href="mailto:support@housetabz.com" className="text-teal-600 hover:text-teal-700">
            support@housetabz.com
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Phone:</span>
          <a href="tel:+18001234567" className="text-teal-600 hover:text-teal-700">
            +1 (800) 123-4567
          </a>
        </div>
        <div className="flex items-center space-x-2">
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