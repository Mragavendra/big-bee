import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
} from '@mui/material';
import { Add, MoreHoriz } from '@mui/icons-material';

const quickActions = [
  {
    title: 'Add Employee',
    description: 'Add new team member to organization structure',
    color: '#FF5722',
  },
  {
    title: 'Create Quotation',
    description: 'Open new quotation template lead or client',
    color: '#FF5722',
  },
  {
    title: 'Reporting Summary',
    description: 'Shortcut to Daily/Weekly/Monthly',
    color: '#FF5722',
  },
];

const QuickActions = () => {
  return (
    <Card sx={{ height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Quick Actions
          </Typography>
          <IconButton size="small">
            <MoreHoriz />
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {quickActions.map((action, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                borderRadius: 2,
                backgroundColor: 'grey.50',
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {action.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </Box>
              <Avatar
                sx={{
                  bgcolor: action.color,
                  width: 36,
                  height: 36,
                  ml: 2,
                }}
              >
                <Add sx={{ fontSize: 20 }} />
              </Avatar>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
