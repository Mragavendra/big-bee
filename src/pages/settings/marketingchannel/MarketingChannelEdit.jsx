import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

const MarketingChannelEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get ID from route param

  const [isActive, setIsActive] = useState(true);
  const [channelData, setChannelData] = useState({
    channel_name: '',
    advertising_type: '',
    description: ''
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const advertisingTypes = [
    'Social Media',
    'Email Marketing',
    'Content Marketing',
    'PPC Advertising',
    'Influencer Marketing'
  ];

  // 🔹 Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/marketing-channels/${id}`);
        setChannelData({
          channel_name: res.data.channel_name,
          advertising_type: res.data.advertising_type,
          description: res.data.description
        });
        setIsActive(res.data.is_active);
      } catch (err) {
        console.error("Error fetching record:", err);
        setSnackbar({ open: true, message: 'Failed to fetch data', severity: 'error' });
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChannelData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 Update API
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/marketing-channels/${id}`, {
        ...channelData,
        is_active: isActive
      });
      setSnackbar({ open: true, message: 'Marketing Channel updated successfully!', severity: 'success' });
      setTimeout(() => navigate('/settings/marketing-channel'), 1000); // navigate after 1 sec
    } catch (err) {
      console.error("Error updating record:", err);
      setSnackbar({ open: true, message: 'Failed to update Marketing Channel', severity: 'error' });
    }
  };

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Marketing Channel</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/settings/marketing-channel')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
            >
              Update
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Marketing Channel Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Marketing Channel</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marketing Channel</label>
                <input
                  type="text"
                  name="channel_name"
                  value={channelData.channel_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type of Advertising</label>
                <select
                  name="advertising_type"
                  value={channelData.advertising_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                >
                  <option value="">Select Advertising Type</option>
                  {advertisingTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={channelData.description}
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

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity={snackbar.severity} sx={{ bgcolor: snackbar.severity === 'success' ? 'green' : 'red' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default MarketingChannelEdit;
