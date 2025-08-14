import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MarketingChannelTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'slNo', label: 'Sl No' },
    { id: 'marketingChannel', label: 'Marketing Channel' },
    { id: 'advertisingType', label: 'Type of Advertising' },
    { id: 'description', label: 'Description' },
  ];

  const data = [
    {
      id: '1',
      slNo: '01',
      marketingChannel: 'Google Ads',
      advertisingType: 'Paid Advertising',
      description: 'Inbound examples includes WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: 'Active',
      category: 'Digital'
    },
    {
      id: '2',
      slNo: '02',
      marketingChannel: 'Social Media Ads',
      advertisingType: 'Paid Advertising',
      description: 'Inbound examples includes WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: 'Active',
      category: 'Digital'
    },
    {
      id: '3',
      slNo: '03',
      marketingChannel: 'LinkedIn Ads',
      advertisingType: 'Paid Advertising',
      description: 'Inbound examples includes WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: 'Active',
      category: 'Digital'
    },
    {
      id: '4',
      slNo: '04',
      marketingChannel: 'Youtube Ads',
      advertisingType: 'Paid Advertising',
      description: 'Inbound examples includes WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: 'Active',
      category: 'Digital'
    },
    {
      id: '5',
      slNo: '05',
      marketingChannel: 'SEO & Blog Content',
      advertisingType: 'Organic marketing',
      description: 'Inbound examples includes WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: 'Active',
      category: 'Organic'
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
      title="Marketing Channel"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={10}
      headerButtons={headerButtons}
      searchPlaceholder="Search marketing channels"
      categoryLabel="All Category"
      statusLabel="All Status"
      disableView={true}
      statusField="status"
      categoryField="category"
      statusRenderer={(status) => (
        status === 'Active' ? <CheckBoxIcon color="primary" /> : <CheckBoxIcon color="disabled" />
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

export default MarketingChannelTable;