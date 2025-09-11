import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const CampaignTypeTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: 'serialNo', label: 'S1 No' },
    { id: 'campaign_type', label: 'Campaign Type' },
    { id: 'description', label: 'Description' },
  ];

  // ✅ Fetch API Data
  useEffect(() => {
    const fetchCampaignTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/campaign-types');
        const campaignTypes = response.data.map((item, index) => ({
          id: item.id,
          serialNo: (index + 1).toString().padStart(2, '0'),
          campaign_type: item.campaign_type,
          description: item.description,
          status: item.is_active ? 'Active' : 'Inactive',
          category: 'Marketing' // you can adjust if you add category column
        }));
        setData(campaignTypes);
      } catch (error) {
        console.error('Error fetching campaign types:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaignTypes();
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
      title="Campaign Type"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={10}
      apiEndpoint="http://localhost:5000/api/campaign-types"
      headerButtons={headerButtons}
      searchPlaceholder="Search for item"
      categoryLabel="All Category"
      statusLabel="All Status"
      disableView={true}
      statusField="status"
      categoryField="category"
      loading={loading}
      statusRenderer={(status) => (
        status === 'Active' ? <CheckBoxIcon color="primary" /> : <CheckBoxOutlineBlankIcon color="disabled" />
      )}
      actionColumnProps={{
        editButton: {
          render: (row) => (
            <IconButton 
              size="small"
              onClick={() => navigate(`/settings/campaign-type/edit/${row.id}`)}
              sx={{ color: '#1976d2' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          ),
        },
        deleteButton: {
          render: (row) => (
            <IconButton 
              size="small"
              onClick={() => {
                setData((prev) => prev.filter((item) => item.id !== row.id));
                axios.delete(`http://localhost:5000/api/campaign-types/${row.id}`)
                  .then(() => console.log(`Deleted campaign type with id ${row.id}`))
                  .catch((error) => {
                    console.error('Error deleting campaign type:', error);
                    // Optionally, revert state if delete fails
                    setData((prev) => [...prev, row]);
                  });
              }}
              sx={{ color: '#d32f2f' }}
            >
              <DeleteIcon fontSize="small" />
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

export default CampaignTypeTable;