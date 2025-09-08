import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const LeadTypeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get lead type ID from URL

  const [leadType, setLeadType] = useState({
    lead_type: '',
    description: '',
    active_status: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch lead type by ID
  const fetchLeadType = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/lead-types/${id}`);
      setLeadType({
        lead_type: res.data.lead_type,
        description: res.data.description,
        active_status: res.data.active_status,
      });
    } catch (err) {
      console.error('Error fetching lead type:', err);
      alert('Failed to fetch lead type');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadType();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeadType(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleActiveStatus = () => {
    setLeadType(prev => ({
      ...prev,
      active_status: !prev.active_status
    }));
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      const res = await axios.put(`http://localhost:5000/api/lead-types/${id}`, leadType);
      console.log('Updated:', res.data);
      alert('Lead type updated successfully!');
      navigate('/settings/lead-type');
    } catch (err) {
      console.error('Error updating lead type:', err);
      alert('Failed to update lead type');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-gray-700">Loading...</div>;

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Lead Type</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/settings/lead-type')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className={`bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={saving}
            >
              {saving ? 'Updating...' : 'Update'}
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
                  name="lead_type"
                  value={leadType.lead_type}
                  onChange={handleInputChange}
                  placeholder="Enter Lead Type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea 
                  name="description"
                  value={leadType.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
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
                className={`relative inline-flex h-7 w-14 items-center rounded-full cursor-pointer transition-colors ${leadType.active_status ? 'bg-orange-500' : 'bg-gray-200'}`}
                onClick={toggleActiveStatus}
              >
                <div className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${leadType.active_status ? 'translate-x-7' : 'translate-x-1'} shadow-sm`}>
                  {leadType.active_status && (
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

export default LeadTypeEdit;
