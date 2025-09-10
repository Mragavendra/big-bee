import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';

const FunnelReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const columns = [
    { id: 'sNo', label: 'Sl No' },
    { id: 'funnelStatus', label: 'Funnel Status', width: 120 },
    { id: 'leadDate', label: 'Lead Date', width: 100 },
    { id: 'orderLostDate', label: 'Order/Lost Date', width: 120 },
    { id: 'enquiryNo', label: 'Enquiry No', width: 100 },
    { id: 'prospect', label: 'Prospect', width: 180 },
    { id: 'officeAddress', label: 'Office Address', width: 120 },
    { id: 'contactPerson', label: 'Contact Person', width: 120 },
    { id: 'mobileNumber', label: 'Mobile Number', width: 120 },
    { id: 'emailId', label: 'Email Id', width: 180 },
    { id: 'department', label: 'Department', width: 100 },
    { id: 'designation', label: 'Designation', width: 100 },
    { id: 'leadSource', label: 'Lead Source', width: 100 },
    { id: 'eventDate', label: 'Event Date', width: 100 },
    { id: 'eventLocation', label: 'Event Location', width: 120 },
    { id: 'services', label: 'Services', width: 150 },
    { id: 'lastFollowupDate', label: 'Last Follow-up Date', width: 120 },
    { id: 'nextFollowupDate', label: 'Next Follow-up Date', width: 120 },
    { id: 'action', label: 'Action', width: 120 },
    { id: 'bde', label: 'BDE', width: 100 },
    { id: 'cse', label: 'CSE', width: 100 },
    { id: 'qtnNo', label: 'Qtn No', width: 80 },
    { id: 'qtnDate', label: 'Qtn Date', width: 100 },
    { id: 'qtnValue', label: 'Qtn Value', width: 100 },
    { id: 'closureTarget', label: 'Closure Target', width: 120 },
    { id: 'priority', label: 'Priority', width: 80 },
    { id: 'brief', label: 'Brief', width: 120 },
    { id: 'comment', label: 'Comment', width: 120 },
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/funnel-tracker", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const apiData = await response.json();
        
        // Map API response to table data structure
        const mappedData = apiData.map((item, index) => ({
          sNo: index + 1, // Add serial number
          id: item.id?.toString() || '',
          funnelStatus: item.funnel_status || 'Enquiry',
          leadDate: item.lead_date ? new Date(item.lead_date).toLocaleDateString('en-GB') : '',
          orderLostDate: item.lost_order_date ? new Date(item.lost_order_date).toLocaleDateString('en-GB') : '',
          enquiryNo: item.enquiry_no || '',
          prospect: item.prospect || '',
          officeAddress: `${item.city || ''}, ${item.state || ''}`.trim() || '',
          contactPerson: item.contact_person || '',
          mobileNumber: item.mobile_number || '',
          emailId: item.email || '',
          department: item.department || '',
          designation: item.designation || '',
          leadSource: item.lead_source || '',
          eventDate: item.event_date ? new Date(item.event_date).toLocaleDateString('en-GB') : '',
          eventLocation: item.event_location || '',
          services: item.service || '',
          lastFollowupDate: item.last_follow_up_date ? new Date(item.last_follow_up_date).toLocaleDateString('en-GB') : '',
          nextFollowupDate: item.next_follow_up_date ? new Date(item.next_follow_up_date).toLocaleDateString('en-GB') : '',
          action: item.action || '',
          bde: item.bde || '',
          cse: item.client_servicing_person || '',
          qtnNo: item.quotation_no || '',
          qtnDate: item.quotation_date ? new Date(item.quotation_date).toLocaleDateString('en-GB') : '',
          qtnValue: item.quotation_value ? item.quotation_value.toString() : '',
          closureTarget: item.closure_target || '',
          priority: item.funnel_status || 'hot',
          brief: item.briefs || '',
          comment: item.comments || '',
          // Additional fields for potential use
          category: 'General', // Default or map from API if available
          status: item.active_status ? 'Active' : 'Inactive',
        }));

        setData(mappedData);
        setError(null);
      } catch (error) {
        console.error("Error fetching funnel tracker data:", error);
        setError("Failed to load funnel tracker data. Please try again.");
        setData([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const headerButtons = [
    {
      label: 'Import',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon />,
      onClick: () => navigate(`${location.pathname}/import`),
      props: { sx: { textTransform: 'none' } },
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-medium text-gray-900">Loading Funnel Tracker Data...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-6">
        <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <DynamicTable
      title="Funnel Tracker"
      columns={columns}
      data={data}
      rowsPerPage={10}
      headerButtons={headerButtons}
      addButtonLabel="Add Funnel Review"
      addButtonProps={{
        color: 'primary',
        size: 'small',
        startIcon: <AddIcon />,
        sx: { textTransform: 'none' },
        onClick: () => navigate(`${location.pathname}/add`), // Navigate to add form
      }}
      searchPlaceholder="Search for item"
      categoryLabel="All Categories"
      statusLabel="All Status"
      disableEdit={false}
      disableDelete={false}
      disableView={true}
      showAssignColumn={false}
    />
  );
};

export default FunnelReview;