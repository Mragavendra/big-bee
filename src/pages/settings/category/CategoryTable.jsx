import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';

const CategoryTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: 'sNo', label: 'SI No' },
    { id: 'category', label: 'Category' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
  ];

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories/');
        if (res.data.success && Array.isArray(res.data.data)) {
          const formattedData = res.data.data.map((item, index) => ({
            id: item.id,
            sNo: (index + 1).toString().padStart(2, '0'),
            category: item.funnel_stage,
            description: item.description,
            status: item.is_active ? 'Active' : 'Inactive',
          }));
          setData(formattedData);
        } else {
          console.error('Unexpected API response:', res.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
            borderColor: '#3b82f6',
          },
        },
      },
    },
  ];

  return (
    <DynamicTable
      title="Category"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={loading ? [] : data}
      rowsPerPage={10}
      apiEndpoint="http://localhost:5000/api/categories"
      headerButtons={headerButtons}
      addButtonLabel="Add Category"
      addButtonProps={{
        variant: 'contained',
        color: 'primary',
        size: 'medium',
        startIcon: <AddIcon />,
        sx: {
          textTransform: 'none',
          backgroundColor: '#F76829',
          '&:hover': {
            backgroundColor: '#2563eb',
          },
        },
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