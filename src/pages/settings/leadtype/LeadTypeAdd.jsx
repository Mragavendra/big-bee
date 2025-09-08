import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeadTypeAdd = () => {
  const [leadType, setLeadType] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!leadType) {
      alert('Lead Type is required');
      return;
    }

    const data = {
      lead_type: leadType,
      description: description,
      active_status: isActive,
    };

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/lead-types/create', data);
      console.log('Created:', res.data);

      // Navigate back to list page after creation
      navigate('/settings/lead-type');
    } catch (err) {
      console.error('Error creating lead type:', err);
      alert('Failed to create lead type');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Add Lead Type</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/settings/lead-type')}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Lead Type */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Lead Type</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Type</label>
                <input 
                  type="text" 
                  placeholder="Enter Lead Type"
                  value={leadType}
                  onChange={(e) => setLeadType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  placeholder="Enter Description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 resize-none"
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
                className={`relative inline-flex h-7 w-14 items-center rounded-full cursor-pointer transition-colors ${isActive ? 'bg-orange-500' : 'bg-gray-200'}`}
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

export default LeadTypeAdd;
