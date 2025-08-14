import React from 'react';
import { Typography, Paper, Box } from '@mui/material';
import DynamicTable from '../../../table/DynamicTable'; // adjust path

const KRA = () => {
  const columns = [
    { field: 'kra', headerName: 'KRA' },
    { field: 'description', headerName: 'Description' },
    { field: 'target', headerName: 'Target' }
  ];

  const data = [
    { id: 1, kra: 'Sales Growth', description: 'Increase quarterly sales', target: '15%', overallStatus: 'Pending' },
    { id: 2, kra: 'Customer Retention', description: 'Reduce churn', target: '5%', overallStatus: 'Finalized' }
  ];

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        KRA (Key Result Areas)
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          KRA management and tracking will be implemented here. This page will include performance 
          metrics, goal setting, and achievement tracking features.
        </Typography>

        {/* DynamicTable with optional Overall Status column */}
        <DynamicTable
          columns={columns}
          data={data}
          apiEndpoint="https://api.example.com/kra"
          showOverallStatus={true} // toggle this to false to hide the column
        />
      </Box>
    </Paper>
  );
};

export default KRA;
