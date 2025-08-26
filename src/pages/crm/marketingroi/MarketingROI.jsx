import React, { useState } from 'react';
import DynamicTable from '../../../table/DynamicTable';
import { Plus, ChevronDown, Download } from 'lucide-react';
import {
  Button,
  Typography,
  Box,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  IconButton,
  Paper,
  styled
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const MarketingROI = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All Category');
  const [status, setStatus] = useState('All Status');

  // Marketing Data
  const marketingColumns = [
    { id: 'slNo', label: 'Sl No', width: 80 },
    { id: 'month', label: 'Month', width: 100 },
    { id: 'date', label: 'Date', width: 100 },
    { id: 'company', label: 'Company', width: 150 },
    { id: 'campaignType', label: 'Campaign Type', width: 150 },
    { id: 'typeOfAdvertising', label: 'Type of Advertising', width: 150 },
    { id: 'marketingChannel', label: 'Marketing Channel', width: 180 },
    { id: 'budgetSpent', label: 'Budget Spent', width: 120 },
    { id: 'leadsGenerated', label: 'Leads Generated', width: 120 },
    { id: 'conversion', label: 'Conversion', width: 100 },
    { id: 'revenue', label: 'Revenue', width: 100 },
  ];

  const marketingData = [
    {
      id: '1',
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
      category: 'Lead Generation',
      status: 'Active'
    },
    {
      id: '2',
      slNo: '02',
      month: 'Aug 2025',
      date: '05-08-2025',
      company: 'Bigbee Experience',
      campaignType: 'Lead Generation',
      typeOfAdvertising: 'Paid Advertising',
      marketingChannel: 'Google Ads',
      budgetSpent: '500',
      leadsGenerated: '05',
      conversion: '02',
      revenue: '50',
      category: 'Lead Generation',
      status: 'Active'
    },
  ];

  // Monthly Budget Data
  const monthlyBudgetColumns = [
    { id: 'month', label: 'Months', width: 100 },
    { id: 'budget', label: 'Budget (₹)', width: 120 },
    { id: 'actual', label: 'Actual', width: 120 },
    { id: 'variance', label: 'Variance', width: 120 },
    { id: 'utilisation', label: 'Utilisation %', width: 120 },
    { id: 'roi', label: 'ROI', width: 100 },
  ];

  const monthlyBudgetData = [
    { id: '1', month: 'Apr 25', budget: '60,000', actual: '23,415', variance: '36,584', utilisation: '39.03', roi: '-1,321' },
    { id: '2', month: 'May 25', budget: '0', actual: '35,164', variance: '-35164', utilisation: '0', roi: '0' },
    { id: '3', month: 'Jun 25', budget: '0', actual: '6,560', variance: '-6,560', utilisation: '0', roi: '0' },
    { id: '4', month: 'Jul 25', budget: '0', actual: '0', variance: '0', utilisation: '0', roi: '0' },
    { id: '5', month: 'Aug 25', budget: '0', actual: '0', variance: '0', utilisation: '0', roi: '0' },
    { id: '6', month: 'Sep 25', budget: '0', actual: '0', variance: '0', utilisation: '0', roi: '0' },
    { id: '7', month: 'Oct 25', budget: '0', actual: '0', variance: '0', utilisation: '0', roi: '0' },
    { id: '8', month: 'Nov 25', budget: '0', actual: '0', variance: '0', utilisation: '0', roi: '0' },
    { id: '9', month: 'Dec 25', budget: '0', actual: '0', variance: '0', utilisation: '0', roi: '0' },
    { id: '10', month: 'Jan 25', budget: '0', actual: '0', variance: '0', utilisation: '0', roi: '0' },
    { id: '11', month: 'Feb 25', budget: '0', actual: '0', variance: '0', utilisation: '0', roi: '0' },
    { id: '12', month: 'Mar 25', budget: '0', actual: '0', variance: '0', utilisation: '0', roi: '0' },
    { id: '13', month: 'Total', budget: '60,000', actual: '65,139', variance: '-5,159', utilisation: '-8.565', roi: '-1,321' },
  ];

  // Summary Data
  const summaryColumns = [
    { id: 'month', label: 'Month', width: 100 },
    { id: 'col1', label: 'Leads', width: 100 },
    { id: 'col2', label: 'Converted', width: 100 },
    { id: 'col3', label: 'Not Converted', width: 120 },
    { id: 'col4', label: 'Pending', width: 100 },
  ];

  const summaryData = [
    { id: '1', month: 'Apr 25', col1: '15', col2: '8', col3: '7', col4: '0' },
    { id: '2', month: 'May 25', col1: '25', col2: '12', col3: '13', col4: '0' },
    { id: '3', month: 'Jun 25', col1: '10', col2: '5', col3: '5', col4: '0' },
    { id: '4', month: 'Jul 25', col1: '5', col2: '3', col3: '2', col4: '0' },
    { id: '5', month: 'Aug 25', col1: '8', col2: '4', col3: '4', col4: '0' },
    { id: '6', month: 'Sep 25', col1: '12', col2: '6', col3: '6', col4: '0' },
    { id: '7', month: 'Oct 25', col1: '0', col2: '0', col3: '0', col4: '0' },
    { id: '8', month: 'Nov 25', col1: '0', col2: '0', col3: '0', col4: '0' },
    { id: '9', month: 'Dec 25', col1: '0', col2: '0', col3: '0', col4: '0' },
    { id: '10', month: 'Jan 25', col1: '5', col2: '2', col3: '3', col4: '0' },
    { id: '11', month: 'Feb 25', col1: '0', col2: '0', col3: '0', col4: '0' },
    { id: '12', month: 'Mar 25', col1: '0', col2: '0', col3: '0', col4: '0' },
    { id: '13', month: 'Total', col1: '90', col2: '41', col3: '49', col4: '0' },
  ];

  // Styled Components
  const StyledTab = styled(Button)(({ theme, active }) => ({
    borderRadius: '8px 8px 0 0',
    textTransform: 'none',
    fontWeight: 'medium',
    boxShadow: 'none',
    backgroundColor: active ? '#F97316' : 'white',
    color: active ? 'white' : '#4B5563',
    border: active ? 'none' : '1px solid #D1D5DB',
    '&:hover': {
      backgroundColor: active ? '#EA580C' : '#F3F4F6',
    },
    marginRight: theme.spacing(1),
    padding: theme.spacing(1, 3),
  }));

  const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-select': {
      padding: theme.spacing(1, 4, 1, 2),
      fontSize: '0.875rem',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#D1D5DB',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#9CA3AF',
    },
  }));

  const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-root': {
      paddingLeft: theme.spacing(1),
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      borderColor: '#D1D5DB',
    },
    '& .MuiOutlinedInput-input': {
      padding: theme.spacing(1),
      fontSize: '0.875rem',
    },
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    borderRadius: '8px',
    padding: theme.spacing(1, 2),
    fontSize: '0.875rem',
    fontWeight: '500',
  }));

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Header with Tabs */}
      <Box sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider', px: 4, py: 2 }}>
        <Stack direction="row" spacing={1}>
          <StyledTab active={activeTab === 0} onClick={() => setActiveTab(0)}>
            Marketing
          </StyledTab>
          <StyledTab active={activeTab === 1} onClick={() => setActiveTab(1)}>
            Monthly Budget
          </StyledTab>
          <StyledTab active={activeTab === 2} onClick={() => setActiveTab(2)}>
            Overall Summary
          </StyledTab>
        </Stack>
      </Box>

      {/* Content */}
      <Box sx={{ p: 4 }}>
        {/* Marketing Tab */}
        {activeTab === 0 && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight="600" color="text.primary">
                Marketing
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <StyledTextField
                  placeholder="Search for item"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <IconButton size="small" sx={{ color: 'text.secondary' }}>
                        <SearchIcon fontSize="small" />
                      </IconButton>
                    ),
                  }}
                  sx={{ width: 200 }}
                />
                <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel sx={{ fontSize: '0.875rem' }}>Category</InputLabel>
                  <StyledSelect
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="All Category">All Category</MenuItem>
                    <MenuItem value="Lead Generation">Lead Generation</MenuItem>
                    <MenuItem value="Brand Awareness">Brand Awareness</MenuItem>
                  </StyledSelect>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel sx={{ fontSize: '0.875rem' }}>Status</InputLabel>
                  <StyledSelect
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="All Status">All Status</MenuItem>
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </StyledSelect>
                </FormControl>
                <StyledButton
                  variant="contained"
                  startIcon={<Plus size={16} />}
                  sx={{ bgcolor: '#F97316', '&:hover': { bgcolor: '#EA580C' } }}
                >
                  Add Marketing Entries
                </StyledButton>
              </Box>
            </Box>

            <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider' }}>
              <DynamicTable
                columns={marketingColumns}
                data={marketingData}
                title=""
                disableAdd={true}
                disableEdit={true}
                disableDelete={true}
                disableView={true}
                categoryField="category"
                statusField="status"
                searchPlaceholder="Search marketing data"
                hideHeaderButtons={true}
                hidePagination={true}
              />
            </Paper>
          </Box>
        )}

        {/* Monthly Budget Tab */}
        {activeTab === 1 && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight="600" color="text.primary">
                Monthly Budget
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <StyledButton
                  variant="outlined"
                  startIcon={<Download size={16} />}
                  sx={{ borderColor: 'divider', color: 'text.primary' }}
                >
                  Export
                </StyledButton>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" color="text.primary">2025-26</Typography>
                  <ChevronDown size={16} color="#6B7280" />
                </Box>
              </Box>
            </Box>

            <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider', mb: 3 }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight="600">Total</Typography>
              </Box>
              <DynamicTable
                columns={monthlyBudgetColumns}
                data={monthlyBudgetData}
                title=""
                disableAdd={true}
                disableEdit={true}
                disableDelete={true}
                disableView={true}
                disableStatus={true}
                hideHeaderButtons={true}
                hidePagination={true}
              />
            </Paper>

            <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider' }}>
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="600">Bigbee Experience</Typography>
                <ChevronDown size={20} color="#6B7280" />
              </Box>
            </Paper>
          </Box>
        )}

        {/* Overall Summary Tab */}
        {activeTab === 2 && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" fontWeight="600" color="text.primary">
                Summary
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <StyledButton
                  variant="outlined"
                  startIcon={<Download size={16} />}
                  sx={{ borderColor: 'divider', color: 'text.primary' }}
                >
                  Export Leads
                </StyledButton>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" color="text.primary">2025-26</Typography>
                  <ChevronDown size={16} color="#6B7280" />
                </Box>
              </Box>
            </Box>

            <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider', mb: 3 }}>
              <DynamicTable
                columns={summaryColumns}
                data={summaryData}
                title=""
                disableAdd={true}
                disableEdit={true}
                disableDelete={true}
                disableView={true}
                disableStatus={true}
                hideHeaderButtons={true}
                hidePagination={true}
              />
            </Paper>

            <Stack spacing={2}>
              <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider' }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight="600">Bigbee Experience</Typography>
                  <ChevronDown size={20} color="#6B7280" />
                </Box>
              </Paper>
              <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider' }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight="600">Kajja Communication</Typography>
                  <ChevronDown size={20} color="#6B7280" />
                </Box>
              </Paper>
              <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: 1, borderColor: 'divider' }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight="600">Giftbees</Typography>
                  <ChevronDown size={20} color="#6B7280" />
                </Box>
              </Paper>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MarketingROI;