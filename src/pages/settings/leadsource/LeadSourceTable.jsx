import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';

const LeadSourceTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'sNo', label: 'S1 No' },
    { id: 'leadSource', label: 'Lead Source' },
    { id: 'leadType', label: 'Lead Type' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' }, // Added status column
  ];

  const data = [
    {
      id: '1',
      sNo: '01',
      leadSource: 'Whatsapp API',
      leadType: 'Inbound',
      description: 'Inbound examples includes WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: 'Active', // Added status field
      category: 'Inbound'
    },
    {
      id: '2',
      sNo: '02',
      leadSource: 'Google Ads',
      leadType: 'Inbound',
      description: 'Inbound examples includes WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: 'Active', // Added status field
      category: 'Inbound'
    },
    {
      id: '3',
      sNo: '03',
      leadSource: 'Instagram DMs',
      leadType: 'Inbound',
      description: 'Inbound examples includes WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: 'Inactive', // Added status field
      category: 'Inbound'
    },
    // ... other data items with status fields
  ];

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
            borderColor: '#3b82f6'
          }
        } 
      },
    }
  ];

  return (
    <DynamicTable
      title="Lead Source"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={10}
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
      statusLabel="All Status" // Enabled status filter
      statusField="status" // Points to the status field in data
      disableEdit={false}
      disableDelete={false}
      disableView={true}
    />
  );
};

export default LeadSourceTable;