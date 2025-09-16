import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import {
  AssignmentInd as AssignmentIndIcon,
  UploadFile as UploadFileIcon,
  Add as AddIcon
} from '@mui/icons-material';

const MarketingLeadCapture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { id: 'enquiryNo', label: 'Enquiry No', width: 120 },
    { id: 'leadDate', label: 'Lead Date', width: 120 },
    { id: 'leadType', label: 'Lead Type', width: 120 },
    { id: 'leadSource', label: 'Lead Source', width: 150 },
    { id: 'prospect', label: 'Prospect', width: 180 },
    { id: 'mobileNumber', label: 'Mobile Number', width: 140 },
    { id: 'assignedBde', label: 'Assigned BDE', width: 150 },
    { id: 'assignedCs', label: 'Assigned CS', width: 150 },
  ];

  const headerButtons = [
    {
      label: 'Assign',
      variant: 'outlined',
      size: 'small',
      startIcon: <AssignmentIndIcon fontSize="small" />,
      onClick: () => navigate(`${location.pathname}/assign`),
      props: { 
        sx: { 
          borderColor: '#E0E0E0',
          color: '#616161',
          '&:hover': {
            borderColor: '#BDBDBD',
            backgroundColor: '#FAFAFA'
          },
          textTransform: 'none',
          borderRadius: '8px'
        }
      },
    },
    {
      label: 'Import Leads',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon fontSize="small" />,
      onClick: () => navigate(`${location.pathname}/import`),
      props: { 
        sx: { 
          borderColor: '#E0E0E0',
          color: '#616161',
          '&:hover': {
            borderColor: '#BDBDBD',
            backgroundColor: '#FAFAFA'
          },
          textTransform: 'none',
          borderRadius: '8px'
        }
      },
    },
  ];

  // Fetch leads from backend
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/leads'); // Your GET API endpoint
      const result = await response.json();
      if (response.ok) {
        // Map API fields to table columns
        const mappedData = result.map((lead) => ({
            id: lead.id,  // 🔥 required for edit navigation
          enquiryNo: lead.enquiry_no,
          leadDate: lead.lead_date,
          leadType: lead.lead_type,
          leadSource: lead.lead_source,
          prospect: lead.prospect,
          mobileNumber: lead.mobile,
          assignedBde: lead.bde,
          assignedCs: lead.client_servicing_person,
        }));
        setData(mappedData);
      } else {
        console.error('Failed to fetch leads:', result.message);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <DynamicTable
      title="Leads Management"
      columns={columns}
      data={data}
      loading={loading}
      rowsPerPage={15}
      headerButtons={headerButtons}
      addButtonLabel="Add Leads"
      addButtonProps={{
        color: 'primary',
        size: 'small',
        startIcon: <AddIcon />,
        sx: { textTransform: 'none' },
        onClick: () => navigate(`${location.pathname}/add`),
      }}
      searchPlaceholder="Search leads..."
      categoryLabel="All Categories"
      statusLabel="All Statuses"
      disableEdit={false}
      disableDelete={false}
      disableView={false}
      showAssignColumn={true}
    />
  );
};

export default MarketingLeadCapture;
