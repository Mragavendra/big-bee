import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const DepartmentTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Table column definitions
  const columns = [
    { id: 'sNo', label: 'Sl No' },
    { id: 'department', label: 'Department' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
  ];

  // Fetch departments from API
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/departments');
      if (response.data.success) {
        const formattedData = response.data.data.map((item, index) => ({
          id: item.id.toString(),
          sNo: (index + 1).toString().padStart(2, '0'),
          department: item.name,
          description: item.description,
          category: item.category || 'Operations', // default if not provided
          status: item.is_active ? 'Active' : 'Inactive',
        }));
        setData(formattedData);
      }
    } catch (err) {
      console.error('Failed to fetch departments:', err);
      setError('Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  // Update department API
  const updateDepartment = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/departments/${id}`, {
        name: updatedData.department,
        description: updatedData.description,
        is_active: updatedData.status === 'Active',
      });

      if (response.data.success) {
        // update local state after successful API call
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id
              ? {
                  ...item,
                  department: updatedData.department,
                  description: updatedData.description,
                  status: updatedData.status,
                }
              : item
          )
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to update department:', err);
      setError('Failed to update department');
      return false;
    }
  };

  // Fetch on mount
  useEffect(() => {
    fetchDepartments();
  }, []);

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

  const categoryOptions = [
    { value: '', label: 'All Category' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Creative', label: 'Creative' },
    { value: 'Operations', label: 'Operations' },
  ];

  // Edit handler
  const handleEdit = async (id, updatedData) => {
    return await updateDepartment(id, updatedData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <DynamicTable
      title="Department"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={5}
      apiEndpoint="http://localhost:5000/api/departments"
      headerButtons={headerButtons}
      addButtonLabel="Add Department"
      addButtonProps={{
        color: 'warning',
        size: 'small',
        sx: { textTransform: 'none' },
      }}
      searchPlaceholder="Search for item"
      statusLabel="All Status"
      categoryLabel="All Category"
      categoryField="category"
      categoryOptions={categoryOptions}
      disableEdit={false}
      disableDelete={false}
      disableView={false}
      onEdit={handleEdit}
    />
  );
};

export default DepartmentTable;