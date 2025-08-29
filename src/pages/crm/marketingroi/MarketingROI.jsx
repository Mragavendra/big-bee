import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import DynamicTable from "../../../table/DynamicTable";
import { useNavigate } from "react-router-dom";
import { Edit as EditIcon, Note as NoteIcon } from "@mui/icons-material";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

const MarketingROI = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Marketing columns based on the image fields
  const marketingColumns = [
    { id: "siNo", label: "SI No", width: 60, align: "center" },
    { id: "month", label: "Month", width: 80, align: "left" },
    { id: "date", label: "Date", width: 100, align: "left" },
    { id: "company", label: "Company", width: 120, align: "left" },
    { id: "campaignType", label: "Campaign Type", width: 120, align: "left" },
    { id: "typeOfAdvertising", label: "Type of Advertising", width: 140, align: "left" },
    { id: "marketingChannel", label: "Marketing Channel", width: 140, align: "left" },
    { id: "budget", label: "Budget", width: 100, align: "right" },
    { id: "spent", label: "Spent", width: 100, align: "right" },
    { id: "leadsGenerated", label: "Leads Generated", width: 120, align: "right" },
    { id: "conversion", label: "Conversion", width: 100, align: "right" },
    { id: "revenueGenerated", label: "Revenue Generated", width: 120, align: "right" },
    { id: "costPerLead", label: "Cost Per Lead", width: 100, align: "right" },
    { id: "costPerConversion", label: "Cost Per Conversion", width: 120, align: "right" },
    { id: "roi", label: "ROI", width: 80, align: "right" },
    { id: "roas", label: "ROAS", width: 80, align: "right" },
    { id: "conversionRate", label: "Conversion Rate", width: 120, align: "right" },
    { id: "actions", label: "Action", width: 100, align: "center" },
  ];

  // Marketing data
  const marketingData = [
    {
      id: "1",
      siNo: "1",
      month: "Aug 2025",
      date: "04-08-2025",
      company: "Bigbee Experience",
      campaignType: "Lead Generation",
      typeOfAdvertising: "Paid Advertising",
      marketingChannel: "Social Media",
      budget: "10000",
      spent: "865",
      leadsGenerated: "50",
      conversion: "10",
      revenueGenerated: "5000",
      costPerLead: "17.3",
      costPerConversion: "86.5",
      roi: "578%",
      roas: "5.78",
      conversionRate: "20%",
      actions: (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <IconButton size="small" sx={{ color: "#ee7110" }}>
            <NoteIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: "#ee7110" }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
      status: "Active",
    },
    {
      id: "2",
      siNo: "2",
      month: "Aug 2025",
      date: "05-08-2025",
      company: "Bigbee Experience",
      campaignType: "Brand Awareness",
      typeOfAdvertising: "Display Ads",
      marketingChannel: "Google Ads",
      budget: "15000",
      spent: "1200",
      leadsGenerated: "35",
      conversion: "7",
      revenueGenerated: "4200",
      costPerLead: "34.29",
      costPerConversion: "171.43",
      roi: "350%",
      roas: "3.5",
      conversionRate: "20%",
      actions: (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <IconButton size="small" sx={{ color: "#ee7110" }}>
            <NoteIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: "#ee7110" }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
      status: "Active",
    },
    {
      id: "3",
      siNo: "3",
      month: "Aug 2025",
      date: "06-08-2025",
      company: "Bigbee Experience",
      campaignType: "Sales Conversion",
      typeOfAdvertising: "Search Ads",
      marketingChannel: "Google Search",
      budget: "8000",
      spent: "650",
      leadsGenerated: "25",
      conversion: "8",
      revenueGenerated: "3200",
      costPerLead: "26",
      costPerConversion: "81.25",
      roi: "492%",
      roas: "4.92",
      conversionRate: "32%",
      actions: (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          <IconButton size="small" sx={{ color: "#ee7110" }}>
            <NoteIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: "#ee7110" }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
      status: "Active",
    },
  ];

  // Monthly Budget data
  const monthlyBudgetData = [
    { month: "Apr 25", budget: "60,000", actual: "23,415", variance: "-36,584", utilisation: "39.03", roi: "-1,321" },
    { month: "May 25", budget: "0", actual: "35,164", variance: "-35,164", utilisation: "0", roi: "0" },
    { month: "Jun 25", budget: "0", actual: "6,560", variance: "-6,560", utilisation: "0", roi: "0" },
    { month: "Jul 25", budget: "0", actual: "0", variance: "0", utilisation: "0", roi: "0" },
    { month: "Aug 25", budget: "0", actual: "0", variance: "0", utilisation: "0", roi: "0" },
    { month: "Sep 25", budget: "0", actual: "0", variance: "0", utilisation: "0", roi: "0" },
    { month: "Oct 25", budget: "0", actual: "0", variance: "0", utilisation: "0", roi: "0" },
    { month: "Nov 25", budget: "0", actual: "0", variance: "0", utilisation: "0", roi: "0" },
    { month: "Dec 25", budget: "0", actual: "0", variance: "0", utilisation: "0", roi: "0" },
    { month: "Jan 25", budget: "0", actual: "0", variance: "0", utilisation: "0", roi: "0" },
    { month: "Feb 25", budget: "0", actual: "0", variance: "0", utilisation: "0", roi: "0" },
    { month: "Mar 25", budget: "0", actual: "0", variance: "0", utilisation: "0", roi: "0" },
  ];

  const totalRow = { month: "Total", budget: "60,000", actual: "65,139", variance: "-5,159", utilisation: "-8,565", roi: "-1,321" };
  
  const handleAddNew = () => {
    navigate("/marketing/add");
  };

  const renderBudgetTable = (title, data) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
        {title}
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Months</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>Budget (¥)</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>Actual</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>Variance</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>Utilisation %</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>ROI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.month}</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>{row.budget}</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>{row.actual}</TableCell>
                <TableCell sx={{ textAlign: 'right', color: row.variance.startsWith('-') ? '#f44336' : '#4caf50' }}>
                  {row.variance}
                </TableCell>
                <TableCell sx={{ textAlign: 'right', color: row.utilisation.startsWith('-') ? '#f44336' : '#4caf50' }}>
                  {row.utilisation}
                </TableCell>
                <TableCell sx={{ textAlign: 'right', color: row.roi.startsWith('-') ? '#f44336' : '#4caf50' }}>
                  {row.roi}
                </TableCell>
              </TableRow>
            ))}
            <TableRow sx={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}>
              <TableCell>{totalRow.month}</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>{totalRow.budget}</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>{totalRow.actual}</TableCell>
              <TableCell sx={{ textAlign: 'right', color: totalRow.variance.startsWith('-') ? '#f44336' : '#4caf50' }}>
                {totalRow.variance}
              </TableCell>
              <TableCell sx={{ textAlign: 'right', color: totalRow.utilisation.startsWith('-') ? '#f44336' : '#4caf50' }}>
                {totalRow.utilisation}
              </TableCell>
              <TableCell sx={{ textAlign: 'right', color: totalRow.roi.startsWith('-') ? '#f44336' : '#4caf50' }}>
                {totalRow.roi}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  // Data for Overall Summary tab
  const marketingSummaryData = [
    { month: "Apr 25", totalSpent: "23,415", totalROI: "548", bigbeeSpent: "21,106", bigbeeROI: "-1,021", kajjaSpent: "2,050", kajjaROI: "584", giftSpent: "0", giftROI: "0" },
    { month: "May 25", totalSpent: "35,164", totalROI: "548", bigbeeSpent: "21,106", bigbeeROI: "-1,021", kajjaSpent: "2,050", kajjaROI: "584", giftSpent: "0", giftROI: "0" },
    { month: "Jun 25", totalSpent: "6,560", totalROI: "0", bigbeeSpent: "6,560", bigbeeROI: "0", kajjaSpent: "0", kajjaROI: "0", giftSpent: "0", giftROI: "0" },
    { month: "Jul 25", totalSpent: "0", totalROI: "0", bigbeeSpent: "0", bigbeeROI: "0", kajjaSpent: "0", kajjaROI: "0", giftSpent: "0", giftROI: "0" },
    { month: "Aug 25", totalSpent: "0", totalROI: "0", bigbeeSpent: "0", bigbeeROI: "0", kajjaSpent: "0", kajjaROI: "0", giftSpent: "0", giftROI: "0" },
    { month: "Sep 25", totalSpent: "0", totalROI: "0", bigbeeSpent: "0", bigbeeROI: "0", kajjaSpent: "0", kajjaROI: "0", giftSpent: "0", giftROI: "0" },
    { month: "Oct 25", totalSpent: "0", totalROI: "0", bigbeeSpent: "0", bigbeeROI: "0", kajjaSpent: "0", kajjaROI: "0", giftSpent: "0", giftROI: "0" },
    { month: "Nov 25", totalSpent: "0", totalROI: "0", bigbeeSpent: "0", bigbeeROI: "0", kajjaSpent: "0", kajjaROI: "0", giftSpent: "0", giftROI: "0" },
    { month: "Dec 25", totalSpent: "0", totalROI: "0", bigbeeSpent: "0", bigbeeROI: "0", kajjaSpent: "0", kajjaROI: "0", giftSpent: "0", giftROI: "0" },
    { month: "Jan 26", totalSpent: "0", totalROI: "0", bigbeeSpent: "0", bigbeeROI: "0", kajjaSpent: "0", kajjaROI: "0", giftSpent: "0", giftROI: "0" },
    { month: "Feb 26", totalSpent: "0", totalROI: "0", bigbeeSpent: "0", bigbeeROI: "0", kajjaSpent: "0", kajjaROI: "0", giftSpent: "0", giftROI: "0" },
    { month: "Mar 26", totalSpent: "0", totalROI: "0", bigbeeSpent: "0", bigbeeROI: "0", kajjaSpent: "0", kajjaROI: "0", giftSpent: "0", giftROI: "0" },
    { month: "Total", totalSpent: "65,139", totalROI: "0", bigbeeSpent: "48,816", bigbeeROI: "-1,021", kajjaSpent: "6,123", kajjaROI: "584", giftSpent: "0", giftROI: "0" },
  ];

  const leadGeneratedData = [
    { month: "Apr 25", total: "42", bigbee: "30", kajja: "12", gift: "0" },
    { month: "May 25", total: "48", bigbee: "11", kajja: "37", gift: "0" },
    { month: "Jun 25", total: "0", bigbee: "0", kajja: "0", gift: "0" },
    { month: "Jul 25", total: "0", bigbee: "0", kajja: "0", gift: "0" },
    { month: "Aug 25", total: "0", bigbee: "0", kajja: "0", gift: "0" },
    { month: "Sep 25", total: "0", bigbee: "0", kajja: "0", gift: "0" },
    { month: "Oct 25", total: "0", bigbee: "0", kajja: "0", gift: "0" },
    { month: "Nov 25", total: "0", bigbee: "0", kajja: "0", gift: "0" },
    { month: "Dec 25", total: "0", bigbee: "0", kajja: "0", gift: "0" },
    { month: "Jan 26", total: "0", bigbee: "0", kajja: "0", gift: "0" },
    { month: "Feb 26", total: "0", bigbee: "0", kajja: "0", gift: "0" },
    { month: "Mar 26", total: "0", bigbee: "0", kajja: "0", gift: "0" },
    { month: "Total", total: "90", bigbee: "41", kajja: "49", gift: "0" },
  ];

  const bigbeeLeadsData = [
    { month: "Apr 25", festival: "0", gifting: "0", leadGen: "28", branding: "0" },
    { month: "May 25", festival: "0", gifting: "0", leadGen: "20", branding: "0" },
    { month: "Jun 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Jul 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Aug 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Sep 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Oct 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Nov 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Dec 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Jan 26", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Feb 26", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Mar 26", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Total", festival: "0", gifting: "0", leadGen: "48", branding: "0" },
  ];

  const kajjaLeadsData = [
    { month: "Apr 25", festival: "0", gifting: "0", leadGen: "14", branding: "0" },
    { month: "May 25", festival: "0", gifting: "0", leadGen: "16", branding: "0" },
    { month: "Jun 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Jul 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Aug 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Sep 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Oct 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Nov 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Dec 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Jan 26", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Feb 26", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Mar 26", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Total", festival: "0", gifting: "0", leadGen: "41", branding: "0" },
  ];

  const giftLeadsData = [
    { month: "Apr 25", festival: "0", gifting: "0", leadGen: "28", branding: "0" },
    { month: "May 25", festival: "0", gifting: "0", leadGen: "20", branding: "0" },
    { month: "Jun 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Jul 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Aug 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Sep 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Oct 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Nov 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Dec 25", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Jan 26", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Feb 26", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Mar 26", festival: "0", gifting: "0", leadGen: "0", branding: "0" },
    { month: "Total", festival: "0", gifting: "0", leadGen: "73", branding: "0" },
  ];

  const renderCompanyLeads = (title, data) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Months</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>Festival</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>Gifting</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>Lead Generation</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', textAlign: 'right' }}>Branding</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: row.month === "Total" ? '#f9f9f9' : 'inherit' }}>
                <TableCell sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.month}</TableCell>
                <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.festival}</TableCell>
                <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.gifting}</TableCell>
                <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.leadGen}</TableCell>
                <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.branding}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Box>
      <Box
        sx={{
          display: 'inline-flex',
          backgroundColor: 'white',
          border: '1px solid #ff6b35',
          borderRadius: '10px',
          padding: '2px',
          mb: 2,
        }}
      >
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="Marketing Tabs"
          sx={{
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .MuiTabs-flexContainer': {
              gap: '2px',
            },
            minHeight: 'auto',
          }}
        >
          <Tab 
            label="Marketing" 
            sx={{
              minHeight: '42px',
              height: '32px',
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '10px',
              minWidth: '70px',
              padding: '6px 16px',
              color: value === 0 ? '#fff' : '#ff6b35',
              backgroundColor: value === 0 ? '#ff6b35' : 'transparent',
              border: 'none',
              '&:hover': {
                backgroundColor: value === 0 ? '#e55a2b' : 'rgba(255, 107, 53, 0.1)',
              },
              '&.Mui-selected': {
                color: '#fff',
                backgroundColor: '#ff6b35',
              },
            }}
          />
          <Tab 
            label="Monthly Budget" 
            sx={{
              minHeight: '42px',
              height: '32px',
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '10px',
              minWidth: '60px',
              padding: '6px 16px',
              color: value === 1 ? '#fff' : '#ff6b35',
              backgroundColor: value === 1 ? '#ff6b35' : 'transparent',
              border: 'none',
              '&:hover': {
                backgroundColor: value === 1 ? '#e55a2b' : 'rgba(255, 107, 53, 0.1)',
              },
              '&.Mui-selected': {
                color: '#fff',
                backgroundColor: '#ff6b35',
              },
            }}
          />
          <Tab 
            label="Overall Summary" 
            sx={{
              minHeight: '42px',
              height: '32px',
              textTransform: 'none',
              fontSize: '13px',
              fontWeight: 500,
              borderRadius: '10px',
              minWidth: '100px',
              padding: '6px 16px',
              color: value === 2 ? '#fff' : '#ff6b35',
              backgroundColor: value === 2 ? '#ff6b35' : 'transparent',
              border: 'none',
              '&:hover': {
                backgroundColor: value === 2 ? '#e55a2b' : 'rgba(255, 107, 53, 0.1)',
              },
              '&.Mui-selected': {
                color: '#fff',
                backgroundColor: '#ff6b35',
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Marketing Tab */}
      <TabPanel value={value} index={0}>
        <DynamicTable
          columns={marketingColumns}
          data={marketingData}
          title="Marketing Campaign Performance"
          rowsPerPage={10}
          addButtonLabel="+ Add Campaign"
          disableEdit={false}
          disableDelete={false}
          disableView={true}
          searchPlaceholder="Search campaigns..."
          categoryLabel="All Campaigns"
          statusLabel="All Status"
          showAssignColumn={false}
          showOverallStatus={false}
          showExtraOverallStatus={false}
          showActionColumn={false}
          headerButtons={[]}
          addButtonProps={{
            variant: "contained",
            sx: {
              backgroundColor: "#ee7110",
              "&:hover": {
                backgroundColor: "#d45a0a",
              },
            },
            onClick: handleAddNew,
          }}
          statusField="status"
          tableProps={{
            sx: {
              '& .MuiTableCell-head': {
                fontWeight: 600,
                backgroundColor: '#F5F5F5',
                color: '#424242',
                fontSize: '0.75rem',
                padding: '8px 4px',
              },
              '& .MuiTableCell-body': {
                color: '#616161',
                fontSize: '0.75rem',
                padding: '8px 4px',
              },
              '& .MuiTableRow-root:hover': {
                backgroundColor: '#FAFAFA',
              },
            }
          }}
        />
      </TabPanel>

      {/* Monthly Budget Tab */}
      <TabPanel value={value} index={1}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Monthly Budget Allocation
        </Typography>

        {/* Total Budget */}
        {renderBudgetTable("Total", monthlyBudgetData)}

        {/* Bigbee Experience */}
        {renderBudgetTable("Bigbee Experience", monthlyBudgetData)}

        {/* Kajja Communication */}
        {renderBudgetTable("Kajja Communication", monthlyBudgetData)}

        {/* GiftBees */}
        {renderBudgetTable("GiftBees", monthlyBudgetData)}
      </TabPanel>

      {/* Overall Summary Tab */}
      <TabPanel value={value} index={2}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
            Marketing Summary
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell rowSpan={2} sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Month</TableCell>
                  <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Total</TableCell>
                  <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Bigbee Experience</TableCell>
                  <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Kajja Communication</TableCell>
                  <TableCell colSpan={2} align="center" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>GiftBees</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Budget Spent</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ROI</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Budget Spent</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ROI</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Budget Spent</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ROI</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Budget Spent</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>ROI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marketingSummaryData.map((row, index) => (
                  <TableRow key={index} sx={{ backgroundColor: row.month === "Total" ? '#f9f9f9' : 'inherit' }}>
                    <TableCell sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.month}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.totalSpent}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal', color: parseInt(row.totalROI.replace(/,/g, '')) < 0 ? '#f44336' : '#4caf50' }}>
                      {row.totalROI}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.bigbeeSpent}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal', color: parseInt(row.bigbeeROI.replace(/,/g, '')) < 0 ? '#f44336' : '#4caf50' }}>
                      {row.bigbeeROI}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.kajjaSpent}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal', color: parseInt(row.kajjaROI.replace(/,/g, '')) < 0 ? '#f44336' : '#4caf50' }}>
                      {row.kajjaROI}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.giftSpent}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal', color: parseInt(row.giftROI.replace(/,/g, '')) < 0 ? '#f44336' : '#4caf50' }}>
                      {row.giftROI}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
            Lead Generated Summary
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Month</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Total</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Bigbee Experience</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Kajja Communication</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>GiftBees</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leadGeneratedData.map((row, index) => (
                  <TableRow key={index} sx={{ backgroundColor: row.month === "Total" ? '#f9f9f9' : 'inherit' }}>
                    <TableCell sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.month}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.total}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.bigbee}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.kajja}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: row.month === "Total" ? 'bold' : 'normal' }}>{row.gift}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {renderCompanyLeads("Bigbee Experience", bigbeeLeadsData)}
          {renderCompanyLeads("Kajja Communication", kajjaLeadsData)}
          {renderCompanyLeads("GiftBees", giftLeadsData)}
        </Box>
      </TabPanel>
    </Box>
  );
};

export default MarketingROI;