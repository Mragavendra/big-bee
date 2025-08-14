import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';

const FollowUpModeTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'sNo', label: 'S1 No' },
    { id: 'mode', label: 'Mode' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' }, // Added status column
  ];

  const data = [
    {
      id: 'Q1',
      sNo: 'Q1',
      mode: 'First Call',
      description: 'Inbound examples includes WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: 'Active', // Added status
      category: 'Inbound'
    },
    {
      id: 'Q2',
      sNo: 'Q2',
      mode: 'Meeting Scheduled',
      description: 'Outbound Example includes Cold Call, LinkedIn Outreach, Walk-in Visit, Database Follow-up, Email Campaign',
      status: 'Active', // Added status
      category: 'Outbound'
    },
    // ... other items with status
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
          borderColor: '#050505ff',
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
            backgroundColor: '#2563eb'
          }
        } 
      }}
      searchPlaceholder="Search for Item"
      categoryLabel="All Category"
      categoryField="category"
      statusLabel="All Status" // Added status filter
      statusField="status" // Points to status field
      disableEdit={false}
      disableDelete={false}
      disableView={true}
    />
  );
};

export default FollowUpModeTable;