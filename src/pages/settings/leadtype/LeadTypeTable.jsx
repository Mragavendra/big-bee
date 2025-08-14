import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';

const LeadTypeTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'sNo', label: 'S1 No' },
    { id: 'leadType', label: 'Lead Type' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' }, // Keep if you want status column
  ];

  const data = [
    {
      id: '1',
      sNo: '01',
      leadType: 'Inbound',
      description: 'Examples include WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: 'Active',
      category: 'Inbound'
    },
    {
      id: '2',
      sNo: '02',
      leadType: 'Outbound',
      description: 'Examples include Cold Call, LinkedIn Outreach, Walk-in Visit, Database Follow-up, Email Campaign',
      status: 'Active',
      category: 'Outbound'
    },
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
          color: '#030303ff',
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
      title="Lead Type"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={5}
      headerButtons={headerButtons}
      addButtonLabel=" Add Lead Type"
      addButtonProps={{ 
        color: 'warning', 
        size: 'small', 
        sx: { textTransform: 'none' },
        startIcon: <AddIcon />,
      }}
      searchPlaceholder="Search for lead type"
      categoryLabel="All Categories"
      statusLabel="All Status"
      categoryField="category" // Field to use for category filtering
      disableEdit={false}
      disableDelete={false}
      disableView={true} // Disable view if not needed
    />
  );
};

export default LeadTypeTable;