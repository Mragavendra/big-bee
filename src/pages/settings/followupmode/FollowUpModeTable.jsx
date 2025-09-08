import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

const FollowUpModeTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

  const columns = [
    { id: 'sNo', label: 'S1 No' },
    { id: 'mode', label: 'Mode' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
  ];

  const fetchFollowUpModes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/followup-modes');
      if (response.data) {
        const tableData = response.data.map((item, index) => ({
          id: item.id,
          sNo: index + 1,
          mode: item.mode_name,
          description: item.description,
          status: item.is_active ? 'Active' : 'Inactive',
          category: item.mode_name, // Optional: use mode_name for category filter
        }));
        setData(tableData);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to fetch follow-up modes',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowUpModes();
  }, []);

  const headerButtons = [
    {
      label: 'Import Leads',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon />,
      onClick: () => navigate(`${location.pathname}/import`),
      props: {
        sx: {
          textTransform: 'none',
          borderColor: '#050505ff',
          color: '#000000ff',
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.04)',
            borderColor: '#3b82f6',
          },
        },
      },
    },
  ];

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <DynamicTable
        title="FollowUp Mode"
        subtitle="CRM / Customer Orders"
        columns={columns}
        data={data}
        rowsPerPage={5}
        headerButtons={headerButtons}
        addButtonLabel="Add FollowUp Mode"
        addButtonProps={{
          variant: 'contained',
          color: 'primary',
          size: 'small',
          startIcon: <AddIcon />,
          sx: {
            textTransform: 'none',
            backgroundColor: '#F76829',
            '&:hover': {
              backgroundColor: '#2563eb',
            },
          },
        }}
        searchPlaceholder="Search for Item"
        categoryLabel="All Category"
        categoryField="category"
        statusLabel="All Status"
        statusField="status"
        disableEdit={false}
        disableDelete={false}
        disableView={true}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FollowUpModeTable;
