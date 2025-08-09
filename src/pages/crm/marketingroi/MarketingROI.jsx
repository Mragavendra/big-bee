import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import DataTable from '../../../components/DataTable';

const marketingColumns = [
  { id: 'slNo', label: 'Sl No', minWidth: 80 },
  { id: 'month', label: 'Month', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 120 },
  { id: 'company', label: 'Company', minWidth: 150 },
  { id: 'campaignType', label: 'Campaign Type', minWidth: 140 },
  { id: 'typeOfAdvertising', label: 'type of Advertising', minWidth: 160 },
  { id: 'marketingChannel', label: 'Marketing Channel', minWidth: 160 },
  { id: 'budgetSpent', label: 'Budget Spent', minWidth: 120 },
  { id: 'leadsGenerated', label: 'Leads Generated', minWidth: 140 },
  { id: 'conversion', label: 'Conversion', minWidth: 120 },
  { id: 'revenue', label: 'Revenue', minWidth: 100 },
];

const marketingData = [
  {
    slNo: '01',
    month: 'Aug 2025',
    date: '04-08-2025',
    company: 'Bigbee Experience',
    campaignType: 'Lead Generation',
    typeOfAdvertising: 'Paid Advertising',
    marketingChannel: 'Social Media Ads...',
    budgetSpent: '343',
    leadsGenerated: '01',
    conversion: '01',
    revenue: '10',
  },
  {
    slNo: '01',
    month: 'Aug 2025',
    date: '04-08-2025',
    company: 'Bigbee Experience',
    campaignType: 'Lead Generation',
    typeOfAdvertising: 'Paid Advertising',
    marketingChannel: 'Social Media Ads...',
    budgetSpent: '343',
    leadsGenerated: '01',
    conversion: '01',
    revenue: '10',
  },
];

const MarketingROI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All Category');
  const [status, setStatus] = useState('All Status');
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab
            label="Marketing"
            sx={{
              backgroundColor: tabValue === 0 ? 'primary.main' : 'transparent',
              color: tabValue === 0 ? 'white' : 'text.primary',
              borderRadius: '8px 8px 0 0',
              mr: 1,
            }}
          />
          <Tab
            label="Monthly Budget"
            sx={{
              backgroundColor: tabValue === 1 ? 'primary.main' : 'transparent',
              color: tabValue === 1 ? 'white' : 'text.primary',
              borderRadius: '8px 8px 0 0',
              mr: 1,
            }}
          />
          <Tab
            label="Overall Summary"
            sx={{
              backgroundColor: tabValue === 2 ? 'primary.main' : 'transparent',
              color: tabValue === 2 ? 'white' : 'text.primary',
              borderRadius: '8px 8px 0 0',
            }}
          />
        </Tabs>
      </Box>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Marketing
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search for item"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 250 }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>All Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="All Category"
            >
              <MenuItem value="All Category">All Category</MenuItem>
              <MenuItem value="Lead Generation">Lead Generation</MenuItem>
              <MenuItem value="Brand Awareness">Brand Awareness</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>All Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="All Status"
            >
              <MenuItem value="All Status">All Status</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary">
            + Add Marketing Entries
          </Button>
        </Box>
      </Box>

      {/* Data Table */}
      <DataTable
        columns={marketingColumns}
        rows={marketingData}
        title="Marketing ROI"
      />
    </Box>
  );
};

export default MarketingROI;
