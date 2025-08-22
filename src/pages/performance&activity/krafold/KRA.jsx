import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import DynamicTable from '../../../table/DynamicTable';

const KRA = () => {
  const columns = [
    { id: 'employee', label: 'Employee', align: 'left' },
    { id: 'department', label: 'Department', align: 'center' },
    { id: 'month', label: 'Month', align: 'center' },
    { id: 'submittedOn', label: 'Submitted On', align: 'center' },
    { id: 'selfRating', label: 'Self Rating', align: 'center' },
    { id: 'finalScore', label: 'Final Score', align: 'center' },
    { id: 'finalRating', label: 'Final Rating', align: 'center' },
  ];

  const data = [
    { 
      id: 1, 
      employee: 'Ankit Sharma', 
      department: 'Sales',
      month: 'July 2025', 
      submittedOn: '29-Jul-25', 
      selfRating: 30, 
      finalScore: '-', 
      finalRating: '-',
      status: 'Pending',
      overallStatus: 'Pending',
      rating: 0
    },
    { 
      id: 2, 
      employee: 'Neha Pillai', 
      department: 'Marketing',
      month: 'July 2025', 
      submittedOn: '28-Jul-25', 
      selfRating: 35, 
      finalScore: '-', 
      finalRating: '-',
      status: 'Pending',
      overallStatus: 'Pending',
      rating: 0
    },
    { 
      id: 3, 
      employee: 'Karan Patel', 
      department: 'Engineering',
      month: 'July 2025', 
      submittedOn: '28-Jul-25', 
      selfRating: 36, 
      finalScore: 92, 
      finalRating: 'Top Performer',
      status: 'Finalized',
      overallStatus: 'Finalized',
      rating: 5
    },
    { 
      id: 4, 
      employee: 'Neha Joshi', 
      department: 'Human Resources',
      month: 'July 2025', 
      submittedOn: '25-Jul-25', 
      selfRating: 28, 
      finalScore: 50, 
      finalRating: 'Improvement Plan Required',
      status: 'Approved',
      overallStatus: 'Pending',
      rating: 3
    },
    { 
      id: 5, 
      employee: 'Vishal Rao', 
      department: 'Finance',
      month: 'July 2025', 
      submittedOn: '24-Jul-25', 
      selfRating: 25, 
      finalScore: 70, 
      finalRating: 'Keep Developing',
      status: 'Finalized',
      overallStatus: 'Finalized',
      rating: 4
    },
    { 
      id: 6, 
      employee: 'Sneha Reddy', 
      department: 'Sales',
      month: 'July 2025', 
      submittedOn: '24-Jul-25', 
      selfRating: 32, 
      finalScore: 80, 
      finalRating: 'Exceeds Standard',
      status: 'Finalized',
      overallStatus: 'Finalized',
      rating: 4
    },
    { 
      id: 7, 
      employee: 'Mehul S', 
      department: 'Engineering',
      month: 'July 2025', 
      submittedOn: '24-Jul-25', 
      selfRating: 28, 
      finalScore: 65, 
      finalRating: 'Exceeds Standard',
      status: 'Rejected',
      overallStatus: 'Pending',
      rating: 2
    },
  ];

  return (
    <Paper sx={{ p: 4 }}>
      <Box sx={{ mt: 3 }}>
        <DynamicTable
          columns={columns}
          data={data}
          showOverallStatus={true}        
          showExtraOverallStatus={false}  
          showActionColumn={true}
          disableAdd={true}
          disableDelete={true}
          disableEdit={true}
          disableView={true}
          searchPlaceholder="Search employees..."
          rowsPerPage={10}
          categoryField="department"
          categoryLabel="Department"
          statusField="status"
          statusLabel="Status"
        />
      </Box>
    </Paper>
  );
};
export default KRA;