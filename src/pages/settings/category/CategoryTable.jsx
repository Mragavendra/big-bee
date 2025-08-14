import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddIcon from '@mui/icons-material/Add';

const CategoryTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'enquiryNo', label: 'Enquiry No' },
    { id: 'leadDate', label: 'Lead Date' },
    { id: 'leadType', label: 'Lead Type' },
    { id: 'leadSource', label: 'Lead Source' },
    { id: 'prospect', label: 'Prospect' },
    { id: 'mobileNumber', label: 'Mobile Number' },
    { id: 'assignedBde', label: 'Assigned BDE' },
    { id: 'assignedCs', label: 'Assigned CS' },
  ];

  // example sample rows so UI looks like your screenshot
  const data = [
    {
      id: '1',
      enquiryNo: 'L_001',
      leadDate: '12/08/2025',
      leadType: 'Inbound',
      leadSource: 'Google Ads',
      prospect: 'ABC Pvt. Ltd.',
      mobileNumber: '9123456789',
      assignedBde: 'Anand Kumar',
      assignedCs: 'Priya Menon',
      status: 'Active',
      category: 'General',
    },
    {
      id: '2',
      enquiryNo: 'L_002',
      leadDate: '12/08/2025',
      leadType: 'Inbound',
      leadSource: 'Google Ads',
      prospect: 'Mahindra Logistics',
      mobileNumber: '9123456789',
      assignedBde: '-',
      assignedCs: '-',
      status: 'Inactive',
      category: 'General',
    },
    {
      id: '3',
      enquiryNo: 'L_003',
      leadDate: '12/08/2025',
      leadType: 'Inbound',
      leadSource: 'Google Ads',
      prospect: 'Prestige Group',
      mobileNumber: '9123456789',
      assignedBde: '-',
      assignedCs: '-',
      status: 'Inactive',
      category: 'General',
    },
  ];

  const headerButtons = [
    {
      label: '+ Assign',
      variant: 'outlined',
      size: 'small',
      startIcon: <AssignmentIndIcon />,
      onClick: () => navigate(`${location.pathname}/assign`),
      props: { sx: { textTransform: 'none' } },
    },
    {
      label: '+ Import Leads',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon />,
      onClick: () => navigate(`${location.pathname}/import`),
      props: { sx: { textTransform: 'none' } },
    },
  ];

  return (
    <DynamicTable
      title="Leads Table"
      columns={columns}
      data={data}
      rowsPerPage={5}
      headerButtons={headerButtons}
      addButtonLabel="+ Add Leads"
      addButtonProps={{ color: 'warning', size: 'small', sx: { textTransform: 'none' } }}
      searchPlaceholder="Search for item"
      categoryLabel="All Category"
      statusLabel="All Status"
      // keep built-in action columns (edit/delete/view)
      disableEdit={false}
      disableDelete={false}
      disableView={false}
    />
  );
};

export default CategoryTable;
