import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DynamicTable from '../../../table/DynamicTable';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const EmployeeMasterTable = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const columns = [
    { id: 'empId', label: 'Emp Id' },
    { id: 'fullName', label: 'Full Name' },
    { id: 'department', label: 'Department' },
    { id: 'designation', label: 'Designation' },
    { id: 'reportsTo', label: 'Reports to' },
  ];

  const data = [
    {
      id: '1',
      empId: 'EMP123',
      fullName: 'Ankit Sharma',
      department: 'Marketing',
      designation: 'Manager',
      reportsTo: 'Rahul (Head)',
      status: 'Active'
    },
    {
      id: '2',
      empId: 'EMP456',
      fullName: 'Anand Kumar',
      department: 'Creative Department',
      designation: 'Manager',
      reportsTo: 'Priya (Head)',
      status: 'Active'
    },
    {
      id: '3',
      empId: 'EMP891',
      fullName: 'Rohan',
      department: 'Marketing',
      designation: 'Department Head',
      reportsTo: '-',
      status: 'Active'
    },
    {
      id: '4',
      empId: 'EMP784',
      fullName: 'Priya Raj',
      department: 'Project Management',
      designation: 'Executive',
      reportsTo: 'Ajay (Manager)',
      status: 'Active'
    },
    {
      id: '5',
      empId: 'EMP784',
      fullName: 'Ajay Verma',
      department: 'Lead Distribution',
      designation: 'Manager',
      reportsTo: 'Rahul (Head)',
      status: 'Active'
    },
  ];

  const headerButtons = [
    {
      label: 'Bulk Upload',
      variant: 'outlined',
      size: 'small',
      startIcon: <UploadFileIcon />,
      onClick: () => navigate(`${location.pathname}/bulk-upload`),
      props: { 
        sx: { 
          textTransform: 'none',
          borderColor: '#000000ff',
          color: '#000000ff',
          '&:hover': {
            backgroundColor: 'rgba(59, 130, 246, 0.04)',
            borderColor: '#3b82f6'
          }
        } 
      },
    }
  ];

  return (
    <DynamicTable
      title="Employee Master"
      subtitle="CRM / Customer Orders"
      columns={columns}
      data={data}
      rowsPerPage={5}
      headerButtons={headerButtons}
      addButtonLabel="Add Employee"
      addButtonProps={{ 
        variant: 'contained',
        color: 'primary',
        size: 'small', 
        startIcon: <PersonAddIcon />,
        sx: { 
          textTransform: 'none',
          backgroundColor: '#F76829',
          '&:hover': {
            backgroundColor: '#2563eb'
          }
        } 
      }}
      searchPlaceholder="Search employees..."
      statusLabel="Status"
      disableView={true}
      statusField="status"
      categoryField="department"
    />
  );
};

export default EmployeeMasterTable;