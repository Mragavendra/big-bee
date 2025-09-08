import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const LeadSourceAdd = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle status
  const toggleActiveStatus = () => {
    setIsActive(!isActive);
  };

  // Save lead source (POST)
  const handleSave = async () => {
    if (!formData.name || !formData.type) {
      setError('Lead Source and Lead Type are required');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/lead-sources/create', {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        is_active: isActive,
      });

      if (response.data.success) {
        setSuccessMessage('Lead source added successfully');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/settings/lead-source');
        }, 1500); // Navigate after Snackbar display
      }
    } catch (err) {
      console.error('Error adding lead source:', err);
      setError('Failed to add lead source');
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

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5" className="text-gray-900">Add Lead Source</Typography>
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
              Save
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
                  name="name"
                  value={formData.name}
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
                    value={formData.type}
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
                  value={formData.description}
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
                  isActive ? 'bg-orange-500' : 'bg-gray-200'
                }`}
                onClick={toggleActiveStatus}
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

export default LeadSourceAdd;