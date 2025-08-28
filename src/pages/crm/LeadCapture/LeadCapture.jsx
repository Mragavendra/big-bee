import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import { 
  AssignmentInd as AssignmentIndIcon,
  UploadFile as UploadFileIcon,
  Add as AddIcon
} from '@mui/icons-material';

const LeadCapture = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'enquiryNo', label: 'Enquiry No', width: 120 },
    { id: 'leadDate', label: 'Lead Date', width: 120 },
    { id: 'leadType', label: 'Lead Type', width: 120 },
    { id: 'leadSource', label: 'Lead Source', width: 150 },
    { id: 'prospect', label: 'Prospect', width: 180 },
    { id: 'mobileNumber', label: 'Mobile Number', width: 140 },
    { id: 'assignedBde', label: 'Assigned BDE', width: 150 },
    { id: 'assignedCs', label: 'Assigned CS', width: 150 },
  ];

  const data = [
    // your data objects here
  ];

  const headerButtons = [
    {
      label: 'Assign',
      variant: 'outlined',
      size: 'small',
      startIcon: <AssignmentIndIcon fontSize="small" />,
      onClick: () => navigate(`${location.pathname}/assign`),
      props: { 
        sx: { 
          borderColor: '#E0E0E0',
          color: '#616161',
          '&:hover': {
            borderColor: '#BDBDBD',
            backgroundColor: '#FAFAFA'
          },
          textTransform: 'none',
          borderRadius: '8px'
        }
      },
    },
    {
      label: 'Import Leads',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon fontSize="small" />,
      onClick: () => navigate(`${location.pathname}/import`),
      props: { 
        sx: { 
          borderColor: '#E0E0E0',
          color: '#616161',
          '&:hover': {
            borderColor: '#BDBDBD',
            backgroundColor: '#FAFAFA'
          },
          textTransform: 'none',
          borderRadius: '8px'
        }
      },
    },
  ];

  return (
    <DynamicTable
      title="Leads Management"
      columns={columns}
      data={data}
      rowsPerPage={5}
      headerButtons={headerButtons}
      addButtonLabel="Add Leads"
      addButtonProps={{
        variant: 'contained',
        size: 'small',
        startIcon: <AddIcon fontSize="small" />,
        sx: {
          backgroundColor: '#FF9800',
          color: '#FFF',
          '&:hover': {
            backgroundColor: '#F57C00',
          },
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
          boxShadow: 'none',
        },
        onClick: () => navigate(`${location.pathname}/add`),
      }}
      searchPlaceholder="Search leads..."
      categoryLabel="All Categories"
      statusLabel="All Statuses"
      disableEdit={false}
      disableDelete={false}
      disableView={false}
      showAssignColumn={true}
    />
  );
};

export default LeadCapture;
