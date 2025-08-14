import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ServicesTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'serialNo', label: 'SINo' },
    { id: 'service', label: 'Services' },
    { id: 'description', label: 'Description' },
  ];

  const data = [
    {
      id: '1',
      serialNo: '01',
      service: 'MICE',
      description: 'Meetings, Incentives, Conferences & Exhibitions management for corporate clients',
      status: 'Active',
      category: 'Corporate'
    },
    {
      id: '2',
      serialNo: '02',
      service: 'Emp Engagement',
      description: 'Employee engagement programs including team building and wellness activities',
      status: 'Active',
      category: 'HR'
    },
    {
      id: '3',
      serialNo: '03',
      service: 'Exhibitions',
      description: 'End-to-end exhibition management including booth design and logistics',
      status: 'Active',
      category: 'Marketing'
    },
    {
      id: '4',
      serialNo: '04',
      service: 'Product Launches',
      description: 'Complete product launch solutions including venue selection and PR',
      status: 'Active',
      category: 'Marketing'
    },
    {
      id: '5',
      serialNo: '05',
      service: 'Award Ceremonies',
      description: 'Annual award ceremonies with nominee management and live streaming',
      status: 'Active',
      category: 'Corporate'
    }
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
    <DynamicTable
      title="Services"
      columns={columns}
      data={data}
      rowsPerPage={10}
      headerButtons={headerButtons}
      searchPlaceholder="Search for item"
      categoryLabel="All Category"
      statusLabel="All Status"
      disableView={true}
      statusField="status"
      categoryField="category"
      statusRenderer={(status) => (
        status === 'Active' ? <CheckBoxIcon color="success" /> : <CheckBoxIcon color="disabled" />
      )}
      actionColumnProps={{
        editButton: {
          render: (row) => (
            <IconButton 
              size="small"
              onClick={() => console.log('Edit', row.id)}
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
              onClick={() => console.log('Delete', row.id)}
              sx={{ color: '#d32f2f' }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          ),
        },
      }}
      sx={{
        '& .MuiTableCell-root': {
          padding: '12px 16px',
          borderBottom: '1px solid rgba(224, 224, 224, 1)'
        },
        '& .MuiTableHead-root': {
          backgroundColor: '#f5f5f5',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: 'rgba(0, 0, 0, 0.87)'
          }
        },
      }}
      headerProps={{
        sx: {
          '& .MuiTypography-h5': {
            fontSize: '1.25rem',
            fontWeight: 500
          },
          marginBottom: '16px'
        }
      }}
      filterProps={{
        category: {
          sx: {
            minWidth: 120,
            marginRight: '8px'
          }
        },
        status: {
          sx: {
            minWidth: 120,
            marginRight: '8px'
          }
        }
      }}
    />
  );
};

export default ServicesTable;