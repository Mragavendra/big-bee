import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  TextField,
  TextareaAutosize,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';

// Predefined lead source types
const leadSourceTypes = [
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'email_campaign', label: 'Email Campaign' },
  { value: 'event', label: 'Event' },
  { value: 'cold_call', label: 'Cold Call' },
  { value: 'advertisement', label: 'Advertisement' },
  { value: 'partner', label: 'Partner' },
];

const LeadSourceEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get lead source ID from route
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [leadSource, setLeadSource] = useState({
    source: '',
    type: '',
    description: '',
    isActive: true,
  });

  // Fetch lead source by ID (GET)
  useEffect(() => {
    const fetchLeadSource = async () => {
      try {
        console.log(`Fetching lead source with ID: ${id}`); // Debug log
        const response = await axios.get(`http://localhost:5000/api/lead-sources/${id}`);
        console.log('API response:', response.data); // Debug log
        const data = response.data; // Expect direct object
        setLeadSource({
          source: data.name || '',
          type: data.type || '',
          description: data.description || '',
          isActive: data.is_active !== undefined ? data.is_active : true,
        });
      } catch (err) {
        console.error('Error fetching lead source:', err.response?.data || err.message); // Debug log
        const errorMessage = err.response?.status === 404
          ? `Lead source with ID ${id} not found`
          : 'Failed to load lead source';
        setError(errorMessage);
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadSource();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeadSource((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle status
  const toggleActiveStatus = () => {
    setLeadSource((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  // Save changes (PUT)
  const handleSave = async () => {
    if (!leadSource.source || !leadSource.type) {
      setError('Lead Source and Lead Type are required');
      setOpenSnackbar(true);
      return;
    }

    try {
      console.log('Sending PUT request with payload:', {
        name: leadSource.source,
        type: leadSource.type,
        description: leadSource.description,
        is_active: leadSource.isActive,
      }); // Debug log
      const response = await axios.put(`http://localhost:5000/api/lead-sources/${id}`, {
        name: leadSource.source,
        type: leadSource.type,
        description: leadSource.description,
        is_active: leadSource.isActive,
      });
      console.log('PUT response:', response.data); // Debug log
      setSuccessMessage('Lead source updated successfully');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/settings/lead-source');
      }, 1500); // Navigate after Snackbar display
    } catch (err) {
      console.error('Error updating lead source:', err.response?.data || err.message); // Debug log
      const errorMessage = err.response?.status === 404
        ? `Lead source with ID ${id} not found`
        : 'Failed to update lead source';
      setError(errorMessage);
      setOpenSnackbar(true);
    }
  };

  // Handle Snackbar close
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setError(null);
    setSuccessMessage(null);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5" className="text-gray-900">Edit Lead Source</Typography>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/settings/lead-source')}
              variant="contained"
              sx={{ backgroundColor: '#d1d5db', color: '#1f2937', '&:hover': { backgroundColor: '#9ca3af' } }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{ backgroundColor: '#f97316', color: '#ffffff', '&:hover': { backgroundColor: '#ea580c' } }}
            >
              Update
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Lead Source */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Typography variant="h6" className="text-gray-900 mb-6">Lead Source</Typography>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
                <TextField
                  name="source"
                  value={leadSource.source}
                  onChange={handleInputChange}
                  placeholder="Enter Lead Source"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Type</label>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel>Select Lead Type</InputLabel>
                  <Select
                    name="type"
                    value={leadSource.type}
                    onChange={handleInputChange}
                    label="Select Lead Type"
                  >
                    <MenuItem value=""><em>Select Lead Type</em></MenuItem>
                    {leadSourceTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <TextareaAutosize
                  name="description"
                  value={leadSource.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  minRows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Control */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Typography variant="h6" className="text-gray-900 mb-6">Control:</Typography>
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-4">Active Status*</label>
              <div
                className={`relative inline-flex h-7 w-14 items-center rounded-full cursor-pointer transition-colors ${
                  leadSource.isActive ? 'bg-orange-500' : 'bg-gray-200'
                }`}
                onClick={toggleActiveStatus}
              >
                <div
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    leadSource.isActive ? 'translate-x-7' : 'translate-x-1'
                  } shadow-sm`}
                >
                  {leadSource.isActive && (
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

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={successMessage ? 'success' : 'error'}
          sx={{
            width: '100%',
            backgroundColor: successMessage ? '#22c55e' : '#ef4444', // Green for success, red for error
            color: '#ffffff', // White text for contrast
            '& .MuiAlert-icon': {
              color: '#ffffff', // White icon for contrast
            },
            '& .MuiAlert-action': {
              color: '#ffffff', // White close button
            },
          }}
        >
          {successMessage || error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LeadSourceEdit;