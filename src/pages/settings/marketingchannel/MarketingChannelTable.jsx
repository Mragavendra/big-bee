import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

const MarketingChannelTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: 'slNo', label: 'Sl No' },
    { id: 'channel_name', label: 'Marketing Channel' },
    { id: 'advertising_type', label: 'Type of Advertising' },
    { id: 'description', label: 'Description' },
  ];

  // 🔹 Fetch data from API
  const fetchMarketingChannels = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/marketing-channels");
      const formattedData = response.data.map((item, index) => ({
        ...item,
        slNo: index + 1,
      }));
      setData(formattedData);
    } catch (error) {
      console.error("❌ Error fetching marketing channels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketingChannels();
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
          borderColor: '#e0e0e0',
          color: 'text.primary',
          '&:hover': {
            borderColor: '#bdbdbd',
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        } 
      },
    }
  ];

  return (
    <DynamicTable
      title="Marketing Channel"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={10}
      apiEndpoint="http://localhost:5000/api/marketing-channels"
      headerButtons={headerButtons}
      searchPlaceholder="Search marketing channels"
      categoryLabel="All Category"
      statusLabel="All Status"
      disableView={true}
      loading={loading}
      statusField="is_active"
      statusRenderer={(status) => (
        status ? <CheckBoxIcon color="primary" /> : <CheckBoxIcon color="disabled" />
      )}
      actionColumnProps={{
        editButton: {
          render: (row) => (
            <IconButton 
              size="small"
              onClick={() => console.log('Edit', row.id)}
              sx={{ color: '#1976d2' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          ),
        },
      }}
      sx={{
        '& .MuiTableCell-root': {
          padding: '12px 16px',
          borderBottom: '1px solid rgba(224, 224, 224, 1)'
        },
        '& .MuiTableHead-root': {
          backgroundColor: '#f5f5f5',
          '& .MuiTableCell-head': {
            fontWeight: 600,
            color: 'rgba(0, 0, 0, 0.87)'
          }
        },
      }}
      headerProps={{
        sx: {
          '& .MuiTypography-h5': {
            fontSize: '1.25rem',
            fontWeight: 500
          },
          marginBottom: '16px'
        }
      }}
      filterProps={{
        category: {
          sx: {
            minWidth: 120,
            marginRight: '8px'
          }
        },
        status: {
          sx: {
            minWidth: 120,
            marginRight: '8px'
          }
        }
      }}
    />
  );
};

export default MarketingChannelTable;