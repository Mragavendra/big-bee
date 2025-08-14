import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';

const StatusTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'siNo', label: 'SINo' },
    { id: 'services', label: 'Services' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
  ];

  // Updated sample data with descriptions
  const data = [
    {
      id: '1',
      siNo: '01',
      services: 'Hot',
      description: 'Urgent requirement, needs immediate follow-up',
      status: '☺',
    },
    {
      id: '2',
      siNo: '02',
      services: 'Warm',
      description: 'Interested but needs more information',
      status: '☺',
    },
    {
      id: '3',
      siNo: '03',
      services: 'Cold',
      description: 'Not currently interested, follow up in future',
      status: '☺',
    },
  ];

  const headerButtons = [
    {
      label: 'Import Leads',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon />,
      onClick: () => navigate(`${location.pathname}/import`),
      props: { sx: { textTransform: 'none' } },
    },
  ];

  return (
    <DynamicTable
      title="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={5}
      headerButtons={headerButtons}
      addButtonLabel="+ Add FollowUp mode"
      addButtonProps={{ 
        color: 'warning', 
        size: 'small', 
        sx: { textTransform: 'none' },
        startIcon: <AddIcon /> 
      }}
      searchPlaceholder="Search for Item"
      categoryLabel="All Category"
      statusLabel="All Status"
      // keep built-in action columns (edit/delete/view)
      disableEdit={false}
      disableDelete={false}
      disableView={false}
    />
  );
};

export default StatusTable;