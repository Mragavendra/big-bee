import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import { Snackbar, Alert } from '@mui/material';

const LeadSourceTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const columns = [
    { id: 'sNo', label: 'S1 No' },
    { id: 'leadSource', label: 'Lead Source' },
    { id: 'leadType', label: 'Lead Type' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
  ];

  // Fetch lead sources from API
  useEffect(() => {
    const fetchLeadSources = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lead-sources');
        // Map API response to DynamicTable data structure
        const fetchedData = response.data.map((item, index) => ({
          id: item.id.toString(), // Ensure id is a string
          sNo: (index + 1).toString().padStart(2, '0'), // Generate serial number
          leadSource: item.name || 'N/A',
          leadType: item.type || 'N/A',
          description: item.description || 'N/A',
          status: item.is_active ? 'Active' : 'Inactive',
          category: item.type || 'N/A', // Use type as category (no separate category field in API)
        }));
        setData(fetchedData);
      } catch (err) {
        console.error('Error fetching lead sources:', err);
        setError('Failed to load lead sources');
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadSources();
  }, []);

  // Handle Snackbar close
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setError(null);
  };

  const headerButtons = [
    {
      label: '+ Import Leads',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon />,
      onClick: () => navigate(`${location.pathname}/import`),
      props: {
        sx: {
          textTransform: 'none',
          borderColor: '#000000ff',
          color: '#000000ff',
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.04)',
            borderColor: '#3b82f6',
          },
        },
      },
    },
  ];

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div>
      <DynamicTable
        title="Lead Source"
        subtitle="CRM / Customer Orders"
        columns={columns}
        data={data}
        rowsPerPage={10}
        apiEndpoint="http://localhost:5000/api/lead-sources"
        headerButtons={headerButtons}
        addButtonLabel="Add Lead Source"
        addButtonProps={{
          color: 'warning',
          size: 'small',
          sx: { textTransform: 'none' },
          startIcon: <AddIcon />,
        }}
        searchPlaceholder="Search for lead source"
        categoryLabel="All Category"
        categoryField="category"
        statusLabel="All Status"
        statusField="status"
        disableEdit={false}
        disableDelete={false}
        disableView={true}
        onAdd={() => navigate('/settings/lead-source/add')}
        onEdit={(id) => navigate(`/settings/lead-source/edit/${id}`)}
      />
      {/* Snackbar for Error Messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{
            width: '100%',
            backgroundColor: '#ef4444', // Red for error
            color: '#ffffff', // White text for contrast
            '& .MuiAlert-icon': {
              color: '#ffffff', // White icon for contrast
            },
            '& .MuiAlert-action': {
              color: '#ffffff', // White close button
            },
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LeadSourceTable;