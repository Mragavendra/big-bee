import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const LeadTypeTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: 'sNo', label: 'S1 No' },
    { id: 'leadType', label: 'Lead Type' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
  ];

  const fetchLeadTypes = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/lead-types');
      // Map API response to table format
      const tableData = res.data.map((item, index) => ({
        id: item.id,
        sNo: index + 1 < 10 ? `0${index + 1}` : `${index + 1}`,
        leadType: item.lead_type,
        description: item.description,
        status: item.active_status ? 'Active' : 'Inactive',
        category: item.lead_type, // Or any field you want to use for category filtering
      }));
      setData(tableData);
    } catch (err) {
      console.error('Error fetching lead types:', err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadTypes();
  }, []);

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
      loading={loading}
      rowsPerPage={5}
      apiEndpoint="http://localhost:5000/api/lead-types"
      headerButtons={headerButtons}
      addButtonLabel=" Add Lead Type"
      addButtonProps={{ 
        color: 'warning', 
        size: 'small', 
        sx: { textTransform: 'none' },
        startIcon: <AddIcon />,
        onClick: () => navigate(`${location.pathname}/add`), // Navigate to Add page
      }}
      searchPlaceholder="Search for lead type"
      categoryLabel="All Categories"
      statusLabel="All Status"
      categoryField="category"
      disableEdit={false}
      disableDelete={false}
      disableView={true}
    />
  );
};

export default LeadTypeTable;