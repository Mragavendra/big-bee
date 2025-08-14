import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const CategoryTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'sNo', label: 'SI No' },
    { id: 'category', label: 'Category' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
  ];

  const data = [
    {
      id: '1',
      sNo: '01',
      category: 'Enquiry',
      description: 'Lead is newly contacted and initial conversation has begun.',
      status: ' Active',
    },
    {
      id: '2',
      sNo: '02',
      category: 'Pipeline',
      description: 'Lead is actively engaged and moving through sales stages (meeting, proposal, negotiation).',
      status: ' Active',
    },
    {
      id: '3',
      sNo: '03',
      category: 'Hold',
      description: 'Lead has shown interest but is temporarily paused due to client-side delays.',
      status: 'Active',
    },
    {
      id: '4',
      sNo: '04',
      category: 'Lost Enquiry',
      description: 'Lead dropped without progressing — no meaningful interaction or response.',
      status: 'Active',
    },
    {
      id: '5',
      sNo: '05',
      category: 'Lost Pipeline',
      description: 'Lead dropped after active engagement — proposal rejected or client chose another vendor.',
      status: ' Active',
    },
    {
      id: '6',
      sNo: '06',
      category: 'Order',
      description: 'Lead successfully converted and event order is confirmed.',
      status: 'Active',
      
    },
  ];

  const headerButtons = [
    {
      label: 'Import Leads',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon />,
      onClick: () => navigate(`${location.pathname}/bulk-upload`),
      props: { 
        sx: { 
          textTransform: 'none',
          borderColor: '#3b82f6',
          color: '#3b82f6',
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
      title="Category"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={10}
      headerButtons={headerButtons}
      addButtonLabel="Add Funnel Stage"
      addButtonProps={{ 
        variant: 'contained',
        color: 'primary',
        size: 'mediumI. ', 
        startIcon: <AddIcon />,
        sx: { 
          textTransform: 'none',
          backgroundColor: '#F76829',
          '&:hover': {
            backgroundColor: '#2563eb'
          }
        } 
      }}
      searchPlaceholder="Search for item"
      categoryLabel="All Category"
      statusLabel="All Status"
      statusField="status"
      disableEdit={false}
      disableDelete={false}
      disableView={true}
    />
  );
};

export default CategoryTable;