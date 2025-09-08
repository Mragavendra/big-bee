import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Snackbar,
  Alert,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material';

const DepartmentEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [departmentData, setDepartmentData] = useState({
    name: '',
    description: '',
    isActive: true,
  });

  // Fetch department by ID (GET)
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/departments/${id}`);
        if (response.data.success) {
          const dept = response.data.data;
          setDepartmentData({
            name: dept.name,
            description: dept.description,
            isActive: dept.is_active,
          });
        }
      } catch (err) {
        console.error('Error fetching department:', err);
        setError('Failed to load department');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle status
  const toggleActiveStatus = () => {
    setDepartmentData((prev) => ({
      ...prev,
      isActive: !prev.isActive,
    }));
  };

  // Save changes (PUT)
  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/departments/${id}`, {
        name: departmentData.name,
        description: departmentData.description,
        is_active: departmentData.isActive,
      });

      if (response.data.success) {
        setSuccessMessage('Department updated successfully');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/settings/department');
        }, 1500); // Navigate after Snackbar display
      }
    } catch (err) {
      console.error('Error updating department:', err);
      setError('Failed to update department');
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
          <Typography variant="h5" className="text-gray-900">Edit Department</Typography>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/settings/department')}
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
          {/* Left Column - Department Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Typography variant="h6" className="text-gray-900 mb-6">Department Details</Typography>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
                <TextField
                  name="name"
                  value={departmentData.name}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <TextareaAutosize
                  name="description"
                  value={departmentData.description}
                  onChange={handleInputChange}
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
                  departmentData.isActive ? 'bg-orange-500' : 'bg-gray-200'
                }`}
                onClick={toggleActiveStatus}
              >
                <div
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    departmentData.isActive ? 'translate-x-7' : 'translate-x-1'
                  } shadow-sm`}
                >
                  {departmentData.isActive && (
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
            backgroundColor: successMessage ? '#00fc5cff' : '#ef4444', // Green for success, red for error
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

export default DepartmentEdit;