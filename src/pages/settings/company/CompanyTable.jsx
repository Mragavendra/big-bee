import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const CompanyTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'siNo', label: 'SINo' },
    { id: 'company', label: 'Company' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },

  ];

  const data = [
    {
      id: '1',
      siNo: '01',
      company: 'Bigbee Experience',
      description: '-',
      status: '✅',
      category: 'Experience' 
    },
    {
      id: '2',
      siNo: '02',
      company: 'Kajja Communication',
      description: '-',
      status: '✅',
      category: 'Communication' 
    },
    {
      id: '3',
      siNo: '03',
      company: 'Giftbees',
      description: '-',
      status: '✅',
      category: 'Gifts' 
    },
  ];

  const handleEdit = (row) => {
    navigate(`${location.pathname}/edit/${row.id}`);
  };

  const handleDelete = (row) => {
    console.log('Deleting:', row.id);
  };

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
      title="Company"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={5}
      headerButtons={headerButtons}
      addButtonLabel="Add Company"
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
      statusLabel="All Status"
      statusField="status" 
      disableEdit={false} // Changed to false to enable edit
      disableDelete={false}
      disableView={true}
    />
  );
};

export default CompanyTable;