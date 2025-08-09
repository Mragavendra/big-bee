import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';

const FunnelReview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
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

  const data = [
    {
      id: '1',
      funnelStatus: 'Enquiry',
      leadDate: '12/08/2025',
      orderLostDate: '12/08/2025',
      enquiryNo: 'L001',
      prospect: 'ABC Pvt. Ltd.',
      officeAddress: 'Bangalore',
      contactPerson: 'Raghu',
      mobileNumber: '9123456789',
      emailId: 'raghu@gmail.com',
      department: 'HR',
      designation: 'Manager',
      leadSource: 'Instagram',
      eventDate: '12/08/2025',
      eventLocation: 'Bengaluru',
      services: 'MICE',
      lastFollowupDate: '12/08/2025',
      nextFollowupDate: '12/08/2025',
      action: 'Followup',
      bde: 'PriyaMenon',
      cse: 'Priya Menon',
      qtnNo: '01',
      qtnDate: '12/08/2025',
      qtnValue: '12000000',
      closureTarget: '12000000',
      priority: 'hot',
      brief: 'Brief',
      comment: 'Comment',
      category: 'General'
    },
    {
      id: '2',
      funnelStatus: 'Enquiry',
      leadDate: '12/08/2025',
      orderLostDate: '12/08/2025',
      enquiryNo: 'L001',
      prospect: 'ABC Pvt. Ltd.',
      officeAddress: 'Bangalore',
      contactPerson: 'Raghu',
      mobileNumber: '9123456789',
      emailId: 'raghu@gmail.com',
      department: 'HR',
      designation: 'Manager',
      leadSource: 'Instagram',
      eventDate: '12/08/2025',
      eventLocation: 'Bengaluru',
      services: 'Emp Engagement',
      lastFollowupDate: '12/08/2025',
      nextFollowupDate: '12/08/2025',
      action: 'Meeting',
      bde: 'PriyaMenon',
      cse: 'PriyaMenon',
      qtnNo: '01',
      qtnDate: '12/08/2025',
      qtnValue: '12000000',
      closureTarget: '12000000',
      priority: 'hot',
      brief: 'Brief',
      comment: 'Comment',
      category: 'General'
    },
    {
      id: '3',
      funnelStatus: 'Enquiry',
      leadDate: '12/08/2025',
      orderLostDate: '12/08/2025',
      enquiryNo: 'L001',
      prospect: 'ABC Pvt. Ltd.',
      officeAddress: 'Bangalore',
      contactPerson: 'Raghu',
      mobileNumber: '9123456789',
      emailId: 'raghu@gmail.com',
      department: 'Sales',
      designation: 'Manager',
      leadSource: 'Instagram',
      eventDate: '12/08/2025',
      eventLocation: 'Bengaluru',
      services: 'Exhibitions',
      lastFollowupDate: '12/08/2025',
      nextFollowupDate: '12/08/2025',
      action: 'Quotation',
      bde: 'PriyaMenon',
      cse: 'PriyaMenon',
      qtnNo: '01',
      qtnDate: '12/08/2025',
      qtnValue: '12000000',
      closureTarget: '12000000',
      priority: 'hot',
      brief: 'Brief',
      comment: 'Comment',
      category: 'General'
    }
  ];

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

  return (
    <DynamicTable
      title="Funnel Tracker"
      columns={columns}
      data={data}
      rowsPerPage={10}
      headerButtons={headerButtons}
      addButtonLabel="Add"
      addButtonProps={{
        color: 'primary',
        size: 'small',
        startIcon: <AddIcon />,
        sx: { textTransform: 'none' },
      }}
      searchPlaceholder="Search for item"
      categoryLabel="All Categories"
      statusLabel="" // Removed status filter
      disableEdit={false}
      disableDelete={false}
      disableView={true} // Disabled view column
      disableStatus="" // Disabled status column
      showPagination={true}
      paginationText="Showing 10 out of 312"
    />
  );
};

export default FunnelReview;