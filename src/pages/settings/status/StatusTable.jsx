import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

const StatusTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'status_name', label: 'Status Name' },
    { id: 'description', label: 'Description' },
    { id: 'is_active', label: 'Active' },
  ];

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/status');
        setData(res.data); // assuming backend sends array of statuses
      } catch (err) {
        console.error('Error fetching status data:', err);
      }
    };
    fetchData();
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

  return (
    <DynamicTable
      title="CRM / Status Management"
      columns={columns}
      data={data}
      rowsPerPage={5}
      apiEndpoint="http://localhost:5000/api/status"
      headerButtons={headerButtons}
      addButtonLabel="Add Status"
      addButtonProps={{ 
        color: 'warning', 
        size: 'small', 
        sx: { textTransform: 'none' },
        startIcon: <AddIcon /> 
      }}
      searchPlaceholder="Search for Status"
      categoryLabel="All Category"
      statusLabel="All Status"
      disableEdit={false}
      disableDelete={false}
      disableView={false}
    />
  );
};

export default StatusTable;