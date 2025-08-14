import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CampaignTypeTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'serialNo', label: 'S1 No' },
    { id: 'campaignType', label: 'Campaign Type' },
    { id: 'description', label: 'Description' },
  ];

  const data = [
    {
      id: '1',
      serialNo: '01',
      campaignType: 'Festival',
      description: 'Seasonal festival campaigns and promotions',
      status: 'Active',
      category: 'Marketing'
    },
    {
      id: '2',
      serialNo: '02',
      campaignType: 'Gifting',
      description: 'Corporate gifting and loyalty programs',
      status: 'Active',
      category: 'Sales'
    },
    {
      id: '3',
      serialNo: '03',
      campaignType: 'Lead Generation',
      description: 'Targeted campaigns for customer acquisition',
      status: 'Active',
      category: 'Marketing'
    },
    {
      id: '4',
      serialNo: '04',
      campaignType: 'Branding',
      description: 'Brand awareness and positioning campaigns',
      status: 'Active',
      category: 'Brand'
    },
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
      title="Campaign Type"
      subtitle="CRM / Customer Orders"
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
        status === 'Active' ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="disabled" />
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

export default CampaignTypeTable;