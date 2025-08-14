import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

const DesignationTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'slNo', label: 'Sl No', width: 80 },
    { id: 'designation', label: 'Designation', width: 200 },
    { id: 'level', label: 'Level', width: 80 },
    { id: 'description', label: 'Description', width: 300 },
  ];

  const data = [
    {
      id: '1',
      slNo: '01',
      designation: 'Department Head',
      level: '1',
      description: 'Top-level lead of a department',
      status: 'Active',
      category: 'Management',
    },
    {
      id: '2',
      slNo: '02',
      designation: 'Manager',
      level: '2',
      description: 'Oversees a team, reports to Dept. Head',
      status: 'Active',
      category: 'Management',
    },
    {
      id: '3',
      slNo: '03',
      designation: 'Executive',
      level: '3',
      description: 'Operational staff, reports to Manager',
      status: 'Active',
      category: 'Operations',
    },
    {
      id: '4',
      slNo: '04',
      designation: 'Co ordinator',
      level: '3',
      description: 'Supports execution and team coordination tasks',
      status: 'Active',
      category: 'Operations',
    },
  ];

  const headerButtons = [
    {
      label: 'Import',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon />,
      onClick: () => navigate(`${location.pathname}/import`),
      props: { 
        sx: { 
          textTransform: 'none',
          borderColor: '#9e9e9e',
          color: '#000000',
        } 
      },
    },
  ];

  const categoryOptions = [
    { value: '', label: 'All Category' },
    { value: 'Management', label: 'Management' },
    { value: 'Operations', label: 'Operations' },
  ];

  const renderStatus = () => (
    <ChatBubbleOutlineIcon 
      sx={{ 
        color: '#9e9e9e',
        verticalAlign: 'middle' 
      }} 
    />
  );

  return (
    <DynamicTable
      title="Designation"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={10}
      headerButtons={headerButtons}
      addButtonLabel="Add Designation"
      addButtonProps={{ 
        variant: 'outlined',
        size: 'small', 
        sx: { 
          textTransform: 'none',
          color: '#ffffffff',
          backgroundColor: '#ff8800ff',
        } 
      }}
      searchPlaceholder="Search designation"
      statusLabel="All Status"
      categoryLabel="All Category"
      categoryField="category"
      categoryOptions={categoryOptions}
      disableEdit={false}
      disableDelete={false}
      disableView={true}
      statusField="status"
      statusRender={renderStatus}
      showLegend={false}
    />
  );
};

export default DesignationTable;
