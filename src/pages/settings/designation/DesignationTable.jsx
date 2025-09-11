import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios';

const DesignationTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);

  const columns = [
    { id: 'slNo', label: 'Sl No', width: 80 },
    { id: 'name', label: 'Designation Name', width: 200 },
    { id: 'level', label: 'Level', width: 150 },
    { id: 'description', label: 'Description', width: 300 },
    { id: 'is_active', label: 'Status', width: 100 },
  ];

  // Fetch data from backend
  const fetchDesignations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/designations');
      // Format data with serial numbers and status label
      const formattedData = response.data.data.map((item, index) => ({
        ...item,
        slNo: index + 1,
        is_active: item.is_active ? 'Active' : 'Inactive',
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching designations:', error);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

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

  const renderStatus = (status) => (
    <span style={{ color: status === 'Active' ? '#28a745' : '#dc3545' }}>
      {status}
    </span>
  );

  return (
    <DynamicTable
      title="Designations"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={10}
      apiEndpoint="http://localhost:5000/api/designations"
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
      statusLabel="Status"
      categoryLabel="All Category"
      categoryField="category"
      categoryOptions={categoryOptions}
      disableEdit={false}
      disableDelete={false}
      disableView={true}
      statusField="is_active"
      statusRender={renderStatus}
      showLegend={false}
    />
  );
};

export default DesignationTable;