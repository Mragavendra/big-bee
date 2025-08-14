import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';

const ActionTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'sNo', label: 'S1 No' },
    { id: 'funnelStatus', label: 'Funnel Status' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
  ];

  const data = [
    {
      id: '1',
      sNo: '01',
      funnelStatus: 'First Call',
      description: 'Inbound examples includes WATI (WhatsApp API), Google Ads, Instagram DMs, Referral, Website Enquiry',
      status: '💶️',
      category: 'First Call'
    },
    {
      id: '2',
      sNo: '02',
      funnelStatus: 'Meeting Scheduled',
      description: 'Outbound Example includes Cold Call, LinkedIn Outreach, Walk-in Visit, Database Follow-up, Email Campaign',
      status: '💶️',
      category: 'Meeting'
    },
    {
      id: '3',
      sNo: '03',
      funnelStatus: 'Proposal Sent',
      description: 'Outbound Example includes Cold Call, LinkedIn Outreach, Walk-in Visit, Database Follow-up, Email Campaign',
      status: '💶️',
      category: 'Proposal'
    },
    {
      id: '4',
      sNo: '04',
      funnelStatus: 'Negotiations',
      description: 'Outbound Example includes Cold Call, LinkedIn Outreach, Walk-in Visit, Database Follow-up, Email Campaign',
      status: '💶️',
      category: 'Negotiation'
    },
    {
      id: '5',
      sNo: '05',
      funnelStatus: 'Closed',
      description: 'Outbound Example includes Cold Call, LinkedIn Outreach, Walk-in Visit, Database Follow-up, Email Campaign',
      status: '💶️',
      category: 'Closed'
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
      title="Action"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={10}
      headerButtons={headerButtons}
      addButtonLabel="Add Funnel Stage"
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
      searchPlaceholder="Search for funnel stage"
      categoryLabel="All Category"
      categoryField="category"
      statusLabel="All Status"
      statusField="status"
      disableEdit={false}
      disableDelete={false}
      disableView={true}
    />
  );
};

export default ActionTable;