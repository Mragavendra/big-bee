import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TypeOfAdvertisingTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch data from backend
  useEffect(() => {
    fetchAdvertisingData();
  }, []);

  const fetchAdvertisingData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/type-of-advertising');
      setData(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to load data', severity: 'error' });
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/type-of-advertising/${id}`);
      setSnackbar({ open: true, message: 'Deleted successfully!', severity: 'success' });
      fetchAdvertisingData(); // refresh table
    } catch (error) {
      setSnackbar({ open: true, message: 'Delete failed!', severity: 'error' });
    }
  };

  // Snackbar close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'channel', label: 'Type of Advertising' },
    { id: 'description', label: 'Description' },
  ];

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
          borderColor: '#e0e0e0',
          color: 'text.primary',
          '&:hover': {
            borderColor: '#bdbdbd',
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        } 
      },
    }
  ];

  return (
    <>
      <DynamicTable
        title="Type of Advertising"
        columns={columns}
        data={data}
        rowsPerPage={10}
        headerButtons={headerButtons}
        searchPlaceholder="Search for Item"
        disableView={true}
        actionColumnProps={{
          editButton: {
            render: (row) => (
              <IconButton 
                size="small"
                onClick={() => navigate(`/settings/type-of-advertising/edit/${row.id}`)}
                sx={{ color: '#1976d2' }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            ),
          },
          deleteButton: {
            render: (row) => (
              <IconButton 
                size="small"
                onClick={() => handleDelete(row.id)}
                sx={{ color: '#d32f2f' }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            ),
          },
        }}
      />

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TypeOfAdvertisingTable;
