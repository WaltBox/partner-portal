import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MobilePreview from './MobilePreview';

const MarketplaceSettings = ({ partner }) => {
  // Local state for form fields, image files, previews, and UI states
  const [about, setAbout] = useState(partner?.about || '');
  const [files, setFiles] = useState({
    logo: null,
    marketplace_cover: null,
    company_cover: null,
  });
  const [previews, setPreviews] = useState({
    logo: null,
    marketplace_cover: null,
    company_cover: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Initialize previews when partner data changes
  useEffect(() => {
    setPreviews({
      logo: partner?.logo || null,
      marketplace_cover: partner?.marketplace_cover || null,
      company_cover: partner?.company_cover || null,
    });
    setAbout(partner?.about || '');
  }, [partner]);

  // Handle file input changes and update previews using FileReader
  const handleImagePreview = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [field]: file }));
      const reader = new FileReader();
      reader.onloadend = () =>
        setPreviews(prev => ({ ...prev, [field]: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  // Save updated marketplace settings
  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const formData = new FormData();
      formData.append('about', about);
      if (files.logo) formData.append('logo', files.logo);
      if (files.marketplace_cover) formData.append('marketplace_cover', files.marketplace_cover);
      if (files.company_cover) formData.append('company_cover', files.company_cover);

      const token = localStorage.getItem('authToken');
      const response = await axios.put(
        'http://localhost:3004/api/partners/update-marketplace',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.partner) {
        setPreviews({
          logo: response.data.partner.logo || previews.logo,
          marketplace_cover: response.data.partner.marketplace_cover || previews.marketplace_cover,
          company_cover: response.data.partner.company_cover || previews.company_cover,
        });
      }
      setSuccess('Marketplace settings updated successfully!');
    } catch (err) {
      console.error('Error updating marketplace settings:', err);
      setError(err.response?.data?.error || 'Failed to update marketplace settings');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to render an image preview field
  const renderImagePreview = (field, title, description) => {
    const imageUrl = previews[field];
    const isLogo = field === 'logo';
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <label className="block text-sm font-medium text-gray-700 mb-3">{title}</label>
        <div className="flex items-start space-x-6">
          <div
            className={`${
              isLogo ? 'w-16 h-16 rounded-full' : 'w-[165px] h-[100px] rounded-lg'
            } relative border-2 border-dashed border-gray-300 flex justify-center items-center bg-gray-50 overflow-hidden hover:border-teal-400 transition-colors`}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${title} preview`}
                className={`${isLogo ? 'object-contain rounded-full p-1' : 'object-cover'} w-full h-full`}
              />
            ) : (
              <div className="text-center p-4">
                <div className="text-gray-400 text-4xl mb-2">+</div>
                <span className="text-xs text-gray-600">Upload {title}</span>
              </div>
            )}
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => handleImagePreview(e, field)}
              accept="image/*"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">{description}</p>
            <p className="text-xs text-gray-400 mt-1">Displays at exact mobile app dimensions</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row">
        {/* Left Column: Form */}
        <div className="lg:w-1/2 pr-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Marketplace Presence</h2>
            <p className="mt-2 text-gray-600">
              Customize how your company appears in the HouseTabz mobile app.
            </p>
          </div>

          <div className="space-y-6">
            {/* About Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                About Your Company
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="Tell potential customers about your company and services..."
              />
            </div>

            {/* Image Previews */}
            {renderImagePreview('logo', 'Company Logo', 'Recommended: Square image, at least 400x400px.')}
            {renderImagePreview('marketplace_cover', 'Marketplace Cover Image', 'Recommended: 1200x200px.')}
            {renderImagePreview('company_cover', 'Company Profile Cover', 'Recommended: 1200x200px.')}

            {/* Save Button and Messages */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="mt-4 p-4 bg-green-50 border border-green-100 text-green-700 rounded-lg">
                  {success}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Mobile Preview */}
        <div className="lg:w-1/2 pl-8 mt-12 lg:mt-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Mobile App Preview</h2>
          <MobilePreview
            partner={{
              name: partner?.name,
              description: about,
              logo: previews.logo,
              marketplace_cover: previews.marketplace_cover,
              company_cover: previews.company_cover,
              about: about,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSettings;
