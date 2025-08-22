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
} from "@mui/material";
import DynamicTable from "../../../table/DynamicTable";
import { useNavigate } from "react-router-dom";

// Billing columns (with link)
const billingColumns = [
  {
    id: "billingId",
    label: "Billing Id",
    align: "left",
    render: (val) => (
      <a
        href="#"
        style={{
          color: "#ee7110",
          textDecoration: "underline",
          fontWeight: 500,
        }}
      >
        {val}
      </a>
    ),
  },
  { id: "projectName", label: "Project Name", align: "left" },
  { id: "bdLead", label: "BD Lead", align: "left" },
  { id: "en", label: "EN", align: "center" },
  { id: "month", label: "Month", align: "center" },
  { id: "invoiceDate", label: "Invoice Date", align: "center" },
  { id: "basic", label: "Basic", align: "right" },
  { id: "taxes", label: "Taxes", align: "right" },
  { id: "totalAmt", label: "Total Amt", align: "right" },
  { id: "collected", label: "Collected", align: "right" },
  { id: "balance", label: "Balance", align: "right" },
  { id: "tds", label: "TDS", align: "right" },
  { id: "creditNote", label: "Credit Note", align: "right" },
  { id: "balanceAfterTds", label: "Balance After TDS", align: "right" },
];

// Billing data
const billingData = [
  {
    id: 1,
    billingId: "BO1",
    projectName: "Bewakoof Brands Pvt Ltd",
    bdLead: "Admin",
    en: "E_001",
    month: "May 2025",
    invoiceDate: "24-05-2025",
    basic: 25414,
    taxes: 4574,
    totalAmt: 29990,
    collected: 29990,
    balance: 0,
    tds: 0,
    creditNote: 0,
    balanceAfterTds: 0,
    status: "Active",
  },
  {
    id: 2,
    billingId: "BO2",
    projectName: "Reliance retail limited",
    bdLead: "Admin",
    en: "E_001",
    month: "April 2025",
    invoiceDate: "24-05-2025",
    basic: 41400,
    taxes: 7452,
    totalAmt: 48852,
    collected: 48852,
    balance: 0,
    tds: 0,
    creditNote: 0,
    balanceAfterTds: 0,
    status: "Active",
  },
];

// BBC Analysis data - Monthly breakdown
const bbcMonthlyData = [
  { month: "Apr", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { month: "May", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { month: "Jun", bookingGoal: "20,00,000", bookingActual: "10,00,000", bookingGap: 50, bookingAch: 50, billingGoal: 50, billingActual: 50, billingGap: 50, billingAch: 50, collection: 0 },
  { month: "Jul", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { month: "Aug", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { month: "Sep", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { month: "Oct", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { month: "Nov", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { month: "Dec", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { month: "Jan", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { month: "Feb", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { month: "Mar", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
];

// BBC Quarterly data
const bbcQuarterlyData = [
  { quarter: "Q1", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { quarter: "Q2", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
  { quarter: "Q3", bookingGoal: "20,00,000", bookingActual: "10,00,000", bookingGap: 50, bookingAch: 50, billingGoal: 50, billingActual: 50, billingGap: 50, billingAch: 50, collection: 0 },
  { quarter: "Q4", bookingGoal: 0, bookingActual: 0, bookingGap: 0, bookingAch: 0, billingGoal: 0, billingActual: 0, billingGap: 0, billingAch: 0, collection: 0 },
];

// YOY Analysis data
const yoyMonthlyData = [
  { month: "Apr", fy2526: { billing: 0, growth: 0, growthPercent: 0 }, fy2425: { billing: 0, growth: 0, growthPercent: 0 }, fy2324: { billing: 0, growth: 0, growthPercent: 0 }, fy2223: { billing: 0, growth: 0, growthPercent: 0 } },
  { month: "May", fy2526: { billing: 0, growth: 0, growthPercent: 0 }, fy2425: { billing: 0, growth: 0, growthPercent: 0 }, fy2324: { billing: 0, growth: 0, growthPercent: 0 }, fy2223: { billing: 0, growth: 0, growthPercent: 0 } },
  { month: "Jun", fy2526: { billing: "20,00,000", growth: "10,00,000", growthPercent: 50 }, fy2425: { billing: 50, growth: 50, growthPercent: 50 }, fy2324: { billing: 0, growth: 0, growthPercent: 0 }, fy2223: { billing: 0, growth: 0, growthPercent: 0 } },
  { month: "Jul", fy2526: { billing: 0, growth: 0, growthPercent: 0 }, fy2425: { billing: 0, growth: 0, growthPercent: 0 }, fy2324: { billing: 0, growth: 0, growthPercent: 0 }, fy2223: { billing: 0, growth: 0, growthPercent: 0 } },
  { month: "Aug", fy2526: { billing: 0, growth: 0, growthPercent: 0 }, fy2425: { billing: 0, growth: 0, growthPercent: 0 }, fy2324: { billing: 0, growth: 0, growthPercent: 0 }, fy2223: { billing: 0, growth: 0, growthPercent: 0 } },
  { month: "Sep", fy2526: { billing: 0, growth: 0, growthPercent: 0 }, fy2425: { billing: 0, growth: 0, growthPercent: 0 }, fy2324: { billing: 0, growth: 0, growthPercent: 0 }, fy2223: { billing: 0, growth: 0, growthPercent: 0 } },
  { month: "Oct", fy2526: { billing: 0, growth: 0, growthPercent: 0 }, fy2425: { billing: 0, growth: 0, growthPercent: 0 }, fy2324: { billing: 0, growth: 0, growthPercent: 0 }, fy2223: { billing: 0, growth: 0, growthPercent: 0 } },
];

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

const PerformanceMisEdit = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddNew = () => {
    navigate("/performance-mis/add");
  };

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
          aria-label="Performance Tabs"
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
            label="Billing" 
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
            label="BBC" 
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
            label="YOY Analysis" 
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

      {/* Billing Tab */}
      <TabPanel value={value} index={0}>
        <DynamicTable
          columns={billingColumns}
          data={billingData}
          title="Billing Overview"
          rowsPerPage={10}
          addButtonLabel="+ Add Billing Entry"
          disableEdit={false}
          disableDelete={false}
          disableView={true}
          searchPlaceholder="Search for billing records..."
          categoryLabel="All BD Leads"
          statusLabel="All Status"
          showAssignColumn={false}
          showOverallStatus={false}
          showExtraOverallStatus={false}
          showActionColumn={false}
          headerButtons={[
          ]}
          addButtonProps={{
            variant: "contained",
            sx: {
              backgroundColor: "#ee7110",
              "&:hover": {
                backgroundColor: "#d45a0a",
              },
            },
          }}
          statusField="status"
          categoryField="bdLead"
        />
      </TabPanel>

      {/* BBC Tab */}
      <TabPanel value={value} index={1}>
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            BBC Analysis
          </Typography>
          
          {/* Monthly Performance Table */}
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell rowSpan={2} sx={{ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#f5f5f5' }}>
                    Month
                  </TableCell>
                  <TableCell colSpan={4} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                    Booking Details - Total
                  </TableCell>
                  <TableCell colSpan={4} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                    Billing Details - Total
                  </TableCell>
                  <TableCell rowSpan={2} sx={{ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#f5f5f5' }}>
                    Collection
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Booking Goal</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Actual</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Gap</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Bar Analysis</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Ach %</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Billing Goal</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Actual</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Gap</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Bar Analysis</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Ach %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bbcMonthlyData.map((row, index) => (
                  <TableRow key={row.month}>
                    <TableCell sx={{ fontWeight: 500 }}>{row.month}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.bookingGoal}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.bookingActual}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.bookingGap}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>-</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.bookingAch}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.billingGoal}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.billingActual}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.billingGap}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>-</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.billingAch}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.collection}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>-</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>-</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Quarterly Performance Summary */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Quarterly Performance Summary - Total
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell rowSpan={2} sx={{ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#f5f5f5' }}>
                    Quarter
                  </TableCell>
                  <TableCell colSpan={4} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                    Booking Details - Total
                  </TableCell>
                  <TableCell colSpan={4} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                    Billing Details - Total
                  </TableCell>
                  <TableCell rowSpan={2} sx={{ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#f5f5f5' }}>
                    Collection
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Booking Goal</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Actual</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Gap</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Ach %</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Billing Goal</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Actual</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Gap</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>Ach %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bbcQuarterlyData.map((row) => (
                  <TableRow key={row.quarter}>
                    <TableCell sx={{ fontWeight: 500 }}>{row.quarter}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.bookingGoal}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.bookingActual}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.bookingGap}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.bookingAch}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.billingGoal}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.billingActual}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.billingGap}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.billingAch}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.collection}</TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ backgroundColor: '#f9f9f9' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                  <TableCell sx={{ textAlign: 'center', fontWeight: 'bold' }}>0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>

      {/* YOY Analysis Tab */}
      <TabPanel value={value} index={2}>
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            YOY Analysis
          </Typography>

          {/* YOY Bar Charts Section */}
          <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
            {/* YOY Analysis Chart */}
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  YOY Analysis
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', height: 200, gap: 2 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 120, 
                      backgroundColor: '#ff6b35', 
                      mb: 1,
                      borderRadius: '4px 4px 0 0'
                    }} />
                    <Typography variant="caption">FY2122</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ 
                      width: 60, 
                      height: 100, 
                      backgroundColor: '#ff6b35', 
                      mb: 1,
                      borderRadius: '4px 4px 0 0'
                    }} />
                    <Typography variant="caption">FY2223</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, backgroundColor: '#ff6b35' }} />
                    <Typography variant="caption">Apr</Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                  Y-axis: 0 to 40,000,000
                </Typography>
              </CardContent>
            </Card>

            {/* Quarter Analysis Chart */}
            <Card sx={{ flex: 1 }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  Quarter Analysis
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 2, fontSize: '0.75rem' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, backgroundColor: '#3b82f6' }} />
                      <Typography variant="caption">FY2526</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, backgroundColor: '#ef4444' }} />
                      <Typography variant="caption">FY2425</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, backgroundColor: '#10b981' }} />
                      <Typography variant="caption">FY2324</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, backgroundColor: '#f59e0b' }} />
                      <Typography variant="caption">FY2223</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 8, height: 8, backgroundColor: '#8b5cf6' }} />
                      <Typography variant="caption">FY2122</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ height: 160 }}>
                  {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, index) => (
                    <Box key={quarter} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="caption" sx={{ minWidth: 24, fontSize: '0.75rem' }}>
                        {quarter}
                      </Typography>
                      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', ml: 2 }}>
                        {/* Multiple colored bars for each quarter */}
                        <Box sx={{ display: 'flex', width: '100%', height: 20, position: 'relative' }}>
                          <Box sx={{ width: '20%', height: '100%', backgroundColor: '#3b82f6' }} />
                          <Box sx={{ width: '25%', height: '100%', backgroundColor: '#ef4444' }} />
                          <Box sx={{ width: '30%', height: '100%', backgroundColor: '#10b981' }} />
                          <Box sx={{ width: '15%', height: '100%', backgroundColor: '#f59e0b' }} />
                          <Box sx={{ width: '10%', height: '100%', backgroundColor: '#8b5cf6' }} />
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                  0 to 60,000,000
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* YOY Analysis Table */}
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            YOY Analysis
          </Typography>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell rowSpan={2} sx={{ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle', backgroundColor: '#f5f5f5' }}>
                    Month
                  </TableCell>
                  <TableCell colSpan={3} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                    FY2526
                  </TableCell>
                  <TableCell colSpan={3} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                    FY2425
                  </TableCell>
                  <TableCell colSpan={3} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                    FY2324
                  </TableCell>
                  <TableCell colSpan={3} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5' }}>
                    FY2223
                  </TableCell>
                </TableRow>
                <TableRow>
                  {['Billing', 'Growth', 'Growth %', 'Billing', 'Growth', 'Growth %', 'Billing', 'Growth', 'Growth %', 'Billing', 'Growth', 'Growth %'].map((header, idx) => (
                    <TableCell key={idx} sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: '#f5f5f5', fontSize: '0.75rem' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {yoyMonthlyData.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell sx={{ fontWeight: 500 }}>{row.month}</TableCell>
                    {/* FY2526 */}
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2526.billing}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2526.growth}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2526.growthPercent}</TableCell>
                    {/* FY2425 */}
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2425.billing}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2425.growth}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2425.growthPercent}</TableCell>
                    {/* FY2324 */}
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2324.billing}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2324.growth}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2324.growthPercent}</TableCell>
                    {/* FY2223 */}
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2223.billing}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2223.growth}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{row.fy2223.growthPercent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Booking Details Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              BookingDetails 
              <span style={{ marginLeft: '8px', transform: 'rotate(180deg)' }}>^</span>
            </Typography>
            {/* This section would be collapsible in a real implementation */}
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default PerformanceMisEdit;