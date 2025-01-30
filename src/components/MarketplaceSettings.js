import React, { useState } from 'react';
import axios from 'axios';
const MarketplaceSettings = ({ partner }) => {
  const [about, setAbout] = useState(partner?.about || '');
  const [logoPreview, setLogoPreview] = useState(partner?.logo || null);
  const [marketplaceCoverPreview, setMarketplaceCoverPreview] = useState(partner?.marketplace_cover || null);
  const [companyCoverPreview, setCompanyCoverPreview] = useState(partner?.company_cover || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const formData = new FormData();
      formData.append('about', about);

      // Append files if they exist
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

      setSuccess('Marketplace settings updated successfully!');
    } catch (err) {
      console.error('Error updating marketplace settings:', err);
      setError(err.response?.data?.error || 'Failed to update marketplace settings');
    } finally {
      setLoading(false);
    }
  };
  
  const [files, setFiles] = useState({
    logo: null,
    marketplace_cover: null,
    company_cover: null
  });
  
  const handleImagePreview = (e, setPreview, field) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({
        ...prev,
        [field]: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold text-teal-700 mb-4">Marketplace Presence</h2>
      <p className="text-gray-600 mb-6">
        Customize how your company appears in the HouseTabz mobile app.
      </p>

      <div className="space-y-8">
        {/* About Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About Your Company
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Tell potential customers about your company and services..."
          />
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Logo
          </label>
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32 relative rounded-lg border-2 border-dashed border-gray-300 flex justify-center items-center bg-gray-50">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="text-gray-400 text-4xl mb-2">+</div>
                  <span className="text-xs text-gray-600">Upload Logo</span>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handleImagePreview(e, setLogoPreview, 'logo')}
                accept="image/*"
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                Recommended: Square image, at least 400x400px. Will be displayed as your company identifier.
              </p>
            </div>
          </div>
        </div>

        {/* Marketplace Cover */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marketplace Cover Image
          </label>
          <div className="flex flex-col space-y-4">
            <div className="w-full h-48 relative rounded-lg border-2 border-dashed border-gray-300 flex justify-center items-center bg-gray-50">
              {marketplaceCoverPreview ? (
                <img
                  src={marketplaceCoverPreview}
                  alt="Marketplace cover preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="text-gray-400 text-4xl mb-2">+</div>
                  <span className="text-xs text-gray-600">Upload Marketplace Cover</span>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handleImagePreview(e, setMarketplaceCoverPreview, 'marketplace_cover')}
                accept="image/*"
              />
            </div>
            <p className="text-sm text-gray-500">
              Recommended: 1200x400px. This image will be displayed at the top of your marketplace listing.
            </p>
          </div>
        </div>

        {/* Company Cover */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Profile Cover
          </label>
          <div className="flex flex-col space-y-4">
            <div className="w-full h-48 relative rounded-lg border-2 border-dashed border-gray-300 flex justify-center items-center bg-gray-50">
              {companyCoverPreview ? (
                <img
                  src={companyCoverPreview}
                  alt="Company cover preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center p-4">
                  <div className="text-gray-400 text-4xl mb-2">+</div>
                  <span className="text-xs text-gray-600">Upload Company Cover</span>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => handleImagePreview(e, setCompanyCoverPreview, 'company_cover')}
                accept="image/*"
              />
            </div>
            <p className="text-sm text-gray-500">
              Recommended: 1200x400px. This image will be displayed on your detailed company profile.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceSettings;