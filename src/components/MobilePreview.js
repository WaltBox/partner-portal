import React, { useState } from 'react';

const MobilePreview = ({ partner }) => {
  const [showDetailView, setShowDetailView] = useState(false);

  // Phone mockup container styling
  const PhoneMockup = ({ children }) => (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
      {/* Side buttons */}
      <div className="absolute -left-[17px] top-[72px] h-[32px] w-[3px] bg-gray-800 rounded-l-lg"></div>
      <div className="absolute -left-[17px] top-[124px] h-[46px] w-[3px] bg-gray-800 rounded-l-lg"></div>
      <div className="absolute -left-[17px] top-[178px] h-[46px] w-[3px] bg-gray-800 rounded-l-lg"></div>
      <div className="absolute -right-[17px] top-[142px] h-[64px] w-[3px] bg-gray-800 rounded-r-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
        <div className="w-full h-[20px] bg-gray-800 flex justify-center items-center">
          {/* iPhone notch */}
          <div className="w-[148px] h-[18px] bg-black rounded-b-[1rem]"></div>
        </div>
        <div className="h-full w-full overflow-hidden">{children}</div>
      </div>
    </div>
  );

  // Card view for marketplace
  const MarketplaceCard = () => (
    <div className="p-4 animate-fadeIn cursor-pointer" onClick={() => setShowDetailView(true)}>
      <div className="bg-green-500 p-4 rounded-b-3xl mb-4">
        <div className="text-white font-bold text-lg">HouseTabz</div>
        <div className="text-white font-bold text-lg">Marketplace</div>
      </div>
      <div className="w-[165px] h-[220px] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cover Image */}
        <div className="h-[100px] bg-gray-100 overflow-hidden">
          <img
            src={partner?.marketplace_cover || '/placeholder.png'}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Logo */}
        <div className="relative flex justify-center">
          <div className="absolute -top-8 w-16 h-16 rounded-full bg-white shadow-lg overflow-hidden flex items-center justify-center p-1">
            <img
              src={partner?.logo || '/placeholder.png'}
              alt="Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
        {/* Content */}
        <div className="mt-10 p-3 text-center">
          <h3 className="text-sm font-bold truncate">{partner?.name || 'Company Name'}</h3>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
            {partner?.description || 'Company description will appear here'}
          </p>
        </div>
      </div>
    </div>
  );

  // Detailed view inside mobile preview
  const DetailView = () => (
    <div className="h-full bg-gray-50 animate-slideUp relative">
      {/* Cover Image with overlay */}
      <div className="relative h-[200px]">
        <img
          src={partner?.company_cover || '/placeholder.png'}
          alt="Company Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowDetailView(false);
            }}
            className="m-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
          >
            ←
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>
      {/* Content */}
      <div className="relative px-4 -mt-10">
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <h2 className="text-xl font-bold text-center">{partner?.name || 'Company Name'}</h2>
          <p className="text-sm text-gray-600 text-center mt-2">{partner?.description || 'Company description'}</p>
          <p className="text-sm text-green-600 font-semibold text-center mt-2">AVG / Roommate: $50</p>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="text-lg font-bold mb-2">About</h3>
            <p className="text-sm text-gray-600">
              {partner?.about || 'About text will appear here'}
            </p>
          </div>
        </div>
      </div>
      {/* Shop Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-50 pt-8">
        <button className="w-full py-3 border-2 border-purple-700 rounded-lg text-purple-700 font-bold bg-white">
          Shop {partner?.name || 'Company'}
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <PhoneMockup>
        {!showDetailView ? <MarketplaceCard /> : <DetailView />}
      </PhoneMockup>
    </div>
  );
};

export default MobilePreview;
