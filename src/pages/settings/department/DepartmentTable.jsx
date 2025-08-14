import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const DepartmentTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'sNo', label: 'Sl No' },
    { id: 'department', label: 'Department' },
    { id: 'description', label: 'Description' },
  ];

  const data = [
    {
      id: '1',
      sNo: '01',
      department: 'Marketing',
      description:
        'Responsible for generating new leads through channels like WhatsApp (WATI), Google Ads, and referrals.',
      category: 'Sales',
      status: 'Active',
    },
    {
      id: '2',
      sNo: '02',
      department: 'Creative Department',
      description:
        'Handles assigning captured leads to the appropriate Business Development Executives for follow-up.',
      category: 'Creative',
      status: 'Active',
    },
    {
      id: '3',
      sNo: '03',
      department: 'Operation & Production',
      description:
        'Oversees end-to-end client projects, coordinating between departments and ensuring timely execution.',
      category: 'Operations',
      status: 'Active',
    },
    {
      id: '4',
      sNo: '04',
      department: 'Lead Distribution',
      description:
        'Develops event creatives, design assets, and visual concepts as per client briefs and brand guidelines.',
      category: 'Creative',
      status: 'Active',
    },
    {
      id: '5',
      sNo: '05',
      department: 'Project Management',
      description:
        'Manages on-ground event setup, vendor coordination, logistics, and technical execution.',
      category: 'Operations',
      status: 'Active',
    },
  ];

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

  return (
    <DynamicTable
      title="Department"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={5}
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
    />
  );
};

export default DepartmentTable;
