import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServicesEdit = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  
  // Pre-filled data for editing
  const [serviceData, setServiceData] = useState({
    type: 'Premium Support',
    description: '24/7 dedicated support with SLA guarantees'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Services</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/settings/services')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium">
              Update
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Service Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Service Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <input 
                  type="text" 
                  name="type"
                  value={serviceData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description"
                  value={serviceData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Control */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Control:</h2>
            
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-4">Active Status*</label>
              <div 
                className={`relative inline-flex h-8 w-14 items-center rounded-full cursor-pointer transition-colors ${isActive ? 'bg-orange-500' : 'bg-gray-200'}`}
                onClick={() => setIsActive(!isActive)}
              >
                <div className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-7' : 'translate-x-1'} shadow-sm`}>
                  {isActive && (
                    <div className="flex items-center justify-center h-full">
                      <svg className="h-3 w-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesEdit;
