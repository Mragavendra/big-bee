import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const CompanyTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);

  const columns = [
    { id: 'siNo', label: 'SINo' },
    { id: 'company', label: 'Company' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
  ];

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/company');
      // Map API response to match your table structure
      const tableData = response.data.map((item, index) => ({
        id: item.id,
        siNo: index + 1,
        company: item.company_name,
        description: item.description || '-',
        status: item.is_active ? '✅' : '❌',
        category: item.category || 'General' // optional field
      }));
      setData(tableData);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

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
      apiEndpoint="http://localhost:5000/api/company"
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
      disableEdit={false} 
      disableDelete={false}
      disableView={true}
    />
  );
};

export default CompanyTable;