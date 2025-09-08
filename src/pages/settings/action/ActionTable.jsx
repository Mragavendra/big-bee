import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';

const ActionTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);

  const columns = [
    { id: 'sNo', label: 'Sl No' },
    { id: 'action_name', label: 'Funnel Status' },
    { id: 'description', label: 'Description' },
    { id: 'is_active', label: 'Status' },
  ];

  // Fetch actions from API
  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/actions");
        const result = await response.json();

        if (response.ok && result.success) {
          // Transform API data to match table structure
          const formattedData = result.data.map((item, index) => ({
            id: item.id,
            sNo: String(index + 1).padStart(2, "0"),
            action_name: item.action_name,
            description: item.description,
            is_active: item.is_active ? "✅ Active" : "❌ Inactive",
            category: item.action_name, // for category filter
            status: item.is_active ? "✅" : "❌", // for status filter
          }));
          setData(formattedData);
        } else {
          console.error("Failed to fetch actions:", result.message);
        }
      } catch (error) {
        console.error("Error fetching actions:", error);
      }
    };

    fetchActions();
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
