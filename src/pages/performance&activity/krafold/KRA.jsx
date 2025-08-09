import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const KRA = () => {
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        KRA (Key Result Areas)
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body1" color="text.secondary">
          KRA management and tracking will be implemented here. This page will include performance 
          metrics, goal setting, and achievement tracking features.
        </Typography>
      </Box>
    </Paper>
  );
};

export default KRA;
