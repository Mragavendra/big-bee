import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

const CompanyEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);
  const [companyData, setCompanyData] = useState({
    name: '',
    description: ''
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchCompany = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/company/${id}`);
      setCompanyData({
        name: response.data.company_name,
        description: response.data.description || ''
      });
      setIsActive(response.data.is_active);
    } catch (error) {
      console.error('Error fetching company:', error);
      setSnackbar({ open: true, message: 'Failed to fetch company data', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        company_name: companyData.name,
        description: companyData.description,
        is_active: isActive
      };
      await axios.put(`http://localhost:5000/api/company/${id}`, payload);
      setSnackbar({ open: true, message: 'Company updated successfully!', severity: 'success' });
      setTimeout(() => navigate('/settings/company'), 1000); // Redirect after 1s
    } catch (error) {
      console.error('Error updating company:', error);
      setSnackbar({ open: true, message: 'Failed to update company', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Company</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/settings/company')}
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
          {/* Left Column */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Company Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={companyData.description}
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
                className={`relative inline-flex h-7 w-14 items-center rounded-full cursor-pointer transition-colors ${
                  isActive ? 'bg-orange-500' : 'bg-gray-200'
                }`}
                onClick={() => setIsActive(!isActive)}
              >
                <div
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    isActive ? 'translate-x-7' : 'translate-x-1'
                  } shadow-sm`}
                >
                  {isActive && (
                    <div className="flex items-center justify-center h-full">
                      <svg
                        className="h-3 w-3 text-orange-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // changed position
>
  <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
    {snackbar.message}
  </Alert>
</Snackbar>

    </div>
  );
};

export default CompanyEdit;
