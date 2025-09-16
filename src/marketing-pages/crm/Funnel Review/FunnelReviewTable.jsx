import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import {
  AssignmentInd as AssignmentIndIcon,
  UploadFile as UploadFileIcon,
  Add as AddIcon
} from '@mui/icons-material';

const FunnelReviewTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { id: 'funnelStatus', label: 'Funnel Status', width: 130 },
    { id: 'leadDate', label: 'Lead Date', width: 100 },
    { id: 'orderLostDate', label: 'Order/Lost Date', width: 130 },
    { id: 'enquiryNo', label: 'Enquiry No', width: 100 },
    { id: 'prospect', label: 'Prospect', width: 180 },
    { id: 'officeAddress', label: 'Office Address', width: 150 },
    { id: 'person', label: 'Person', width: 120 },
    { id: 'mobileNumber', label: 'Mobile Number', width: 130 },
    { id: 'emailId', label: 'Email Id', width: 180 },
    { id: 'department', label: 'Department', width: 120 },
    { id: 'designation', label: 'Designation', width: 120 },
    { id: 'leadSource', label: 'Lead Source', width: 120 },
    { id: 'eventDate', label: 'Event Date', width: 100 },
    { id: 'eventLocation', label: 'Event Location', width: 130 },
    { id: 'services', label: 'Services', width: 150 },
    { id: 'lastFollowupDate', label: 'Last Follow-up Date', width: 150 },
    { id: 'nextFollowupDate', label: 'Next Follow-up Date', width: 150 },
    { id: 'action', label: 'Action', width: 120 },
    { id: 'bde', label: 'BDE', width: 120 },
    { id: 'cse', label: 'CSE', width: 120 },
    { id: 'qtnNo', label: 'Qtn No', width: 100 },
    { id: 'qtnDate', label: 'Qtn Date', width: 100 },
    { id: 'qtnValue', label: 'Qtn Value', width: 100 },
    { id: 'closureTarget', label: 'Closure Target', width: 130 },
    { id: 'leadType', label: 'Lead Type', width: 100 },
    { id: 'brief', label: 'Brief', width: 100 },
    { id: 'comment', label: 'Comment', width: 100 },
    { id: 'createQtn', label: 'Create Qtn', width: 120 },
    { id: 'actions', label: 'Actions', width: 150 },
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
          id: lead.id,  // Required for edit navigation
          funnelStatus: lead.funnel_status || 'Enquiry',
          leadDate: lead.lead_date || '12/08/2025',
          orderLostDate: lead.order_lost_date || '12/08/2025',
          enquiryNo: lead.enquiry_no || 'L001',
          prospect: lead.prospect || 'ABC Pvt.Ltd.',
          officeAddress: lead.office_address || 'Bangalore',
          person: lead.contact_person || 'Raghu',
          mobileNumber: lead.mobile_number || '9123456789',
          emailId: lead.email_id || 'raghu@gmail.com',
          department: lead.department || 'HR',
          designation: lead.designation || 'Manager',
          leadSource: lead.lead_source || 'Instagram',
          eventDate: lead.event_date || '12/08/2025',
          eventLocation: lead.event_location || 'Bengaluru',
          services: lead.services || 'MICE',
          lastFollowupDate: lead.last_followup_date || '12/08/2025',
          nextFollowupDate: lead.next_followup_date || '12/08/2025',
          action: lead.action || 'Followup',
          bde: lead.bde || 'PriyaMenon',
          cse: lead.cse || 'Priya Menon',
          qtnNo: lead.qtn_no || '01',
          qtnDate: lead.qtn_date || '12/08/2025',
          qtnValue: lead.qtn_value || '12000000',
          closureTarget: lead.closure_target || '12000000',
          leadType: lead.lead_type || 'hot',
          brief: lead.brief || 'Brief',
          comment: lead.comment || 'Comment',
          createQtn: 'Create Quotation',
          actions: 'Delete Edit',
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
      title="Funnel Tracker"
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
      searchPlaceholder="Search for item"
      categoryLabel="All Category"
      statusLabel="All Statuses"
      disableEdit={false}
      disableDelete={false}
      disableView={false}
      showAssignColumn={true}
    />
  );
};

export default FunnelReviewTable;