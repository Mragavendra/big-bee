import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import DynamicTable from "../../../table/DynamicTable"; // Adjust the import path as needed

// Tab panel component
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

// Main Profitability Analysis Component
const ProfitabilityAnalysis = () => {
  const [value, setValue] = useState(0);

  // Sample data - exactly matching your image
  const tableData = [
    {
      id: 1,
      invoiceNo: "P001",
      enquiryNo: "enq_001",
      projectName: "Advik",
      poDate: "01-Jan-2025",
      month: "May",
      eventDate: "24-05-2025",
      projectOwner: "Manoj",
      production: "5,72,167",
      artistManpower: "2,23,600",
      venue: "0",
      others: "28,500",
      totalVendorCost: "8,24,267",
      proposalCost: "12,76,496",
      marginCost: "4,52,229",
      marginPercent: "55",
      status: "Active",
      category: "Corporate"
    },
    {
      id: 2,
      invoiceNo: "P002",
      enquiryNo: "enq_001",
      projectName: "Advik",
      poDate: "01-Jan-2025",
      month: "May",
      eventDate: "24-05-2025",
      projectOwner: "Manoj",
      production: "5,72,167",
      artistManpower: "2,23,600",
      venue: "0",
      others: "28,500",
      totalVendorCost: "8,24,267",
      proposalCost: "12,76,496",
      marginCost: "4,52,229",
      marginPercent: "55",
      status: "Active",
      category: "Corporate"
    },
    {
      id: 3,
      invoiceNo: "P003",
      enquiryNo: "enq_001",
      projectName: "Advik",
      poDate: "01-Jan-2025",
      month: "May",
      eventDate: "24-05-2025",
      projectOwner: "Manoj",
      production: "5,72,167",
      artistManpower: "2,23,600",
      venue: "0",
      others: "28,500",
      totalVendorCost: "8,24,267",
      proposalCost: "12,76,496",
      marginCost: "4,52,229",
      marginPercent: "55",
      status: "Completed",
      category: "Wedding"
    },
    {
      id: 4,
      invoiceNo: "P004",
      enquiryNo: "enq_001",
      projectName: "Advik",
      poDate: "01-Jan-2025",
      month: "May",
      eventDate: "24-05-2025",
      projectOwner: "Manoj",
      production: "5,72,167",
      artistManpower: "2,23,600",
      venue: "0",
      others: "28,500",
      totalVendorCost: "8,24,267",
      proposalCost: "12,76,496",
      marginCost: "4,52,229",
      marginPercent: "55",
      status: "Pending",
      category: "Concert"
    }
  ];

  // Monthly summary data - matching the image
  const monthlySummaryData = [
    {
      id: 1,
      month: "Jul 25",
      noOfProjects: 5,
      artistManpower: "21,00,000",
      venue: "18,00,000",
      others: "3,00,000",
      totalVendorCost: "22,00,000",
      marginPercent: "95.74",
      marginCost: "95,74",
      status: "Completed",
      category: "Q2"
    },
    {
      id: 2,
      month: "Jun 25",
      noOfProjects: 4,
      artistManpower: "21,00,000",
      venue: "17,00,000",
      others: "4,00,000",
      totalVendorCost: "25,80,805",
      marginPercent: "95.74",
      marginCost: "95,74",
      status: "Completed",
      category: "Q2"
    },
    {
      id: 3,
      month: "May 25",
      noOfProjects: 3,
      artistManpower: "21,00,000",
      venue: "16,00,000",
      others: "5,00,000",
      totalVendorCost: "4,58,412",
      marginPercent: "95.74",
      marginCost: "95,74",
      status: "Completed",
      category: "Q2"
    },
    {
      id: 4,
      month: "Apr 25",
      noOfProjects: 3,
      artistManpower: "15,00,000",
      venue: "14,00,000",
      others: "1,00,000",
      totalVendorCost: "75,96,324",
      marginPercent: "95.74",
      marginCost: "95,74",
      status: "Completed",
      category: "Q1"
    }
  ];

  // BD Target Tracker data - matching the image
  const bdTargetTrackerData = [
    {
      id: 1,
      empId: "E_001",
      projectName: "Manoj",
      target: "21,00,000",
      actual: "18,00,000",
      gap: "3,00,000",
      actPercent: "70",
      incentiveAchieved: "9,574",
      status: "Active",
      category: "Sales"
    },
    {
      id: 2,
      empId: "E_002",
      projectName: "Akhilesh",
      target: "21,00,000",
      actual: "17,00,000",
      gap: "4,00,000",
      actPercent: "75",
      incentiveAchieved: "9,574",
      status: "Active",
      category: "Sales"
    },
    {
      id: 3,
      empId: "E_003",
      projectName: "Arun",
      target: "21,00,000",
      actual: "16,00,000",
      gap: "5,00,000",
      actPercent: "65",
      incentiveAchieved: "9,574",
      status: "Active",
      category: "Sales"
    },
    {
      id: 4,
      empId: "E_004",
      projectName: "Shruthi",
      target: "15,00,000",
      actual: "14,00,000",
      gap: "1,00,000",
      actPercent: "90",
      incentiveAchieved: "9,574",
      status: "Active",
      category: "Sales"
    },
    {
      id: 5,
      empId: "E_005",
      projectName: "Akshata",
      target: "10,00,000",
      actual: "8,00,000",
      gap: "2,00,000",
      actPercent: "80",
      incentiveAchieved: "9,574",
      status: "Active",
      category: "Sales"
    }
  ];

  // Incentive Tracker data - matching the image
  const incentiveTrackerData = [
    {
      id: 1,
      invoiceNo: "P001",
      projectName: "Adwik",
      month: "May",
      projectOwner: "Manoj",
      totalVendorCost: "8,24,267",
      proposalCost: "12,76,496",
      marginPercent: "55",
      marginValue: "4,52,229",
      revenueIncentivePercent: "0.75",
      revenueIncentiveValue: "9,574",
      status: "Completed",
      category: "Corporate"
    },
    {
      id: 2,
      invoiceNo: "P002",
      projectName: "Aditya Birla Ed Trust",
      month: "May",
      projectOwner: "Manoj",
      totalVendorCost: "8,24,267",
      proposalCost: "12,76,496",
      marginPercent: "55",
      marginValue: "4,52,229",
      revenueIncentivePercent: "0.75",
      revenueIncentiveValue: "9,574",
      status: "Completed",
      category: "Education"
    },
    {
      id: 3,
      invoiceNo: "P003",
      projectName: "TCS",
      month: "April",
      projectOwner: "Arun",
      totalVendorCost: "8,24,267",
      proposalCost: "12,76,496",
      marginPercent: "55",
      marginValue: "4,52,229",
      revenueIncentivePercent: "0.75",
      revenueIncentiveValue: "9,574",
      status: "Completed",
      category: "IT"
    },
    {
      id: 4,
      invoiceNo: "P004",
      projectName: "Wipro",
      month: "March",
      projectOwner: "Shruthi",
      totalVendorCost: "8,24,267",
      proposalCost: "12,76,496",
      marginPercent: "55",
      marginValue: "4,52,229",
      revenueIncentivePercent: "0.75",
      revenueIncentiveValue: "9,574",
      status: "Completed",
      category: "IT"
    }
  ];

  // Define columns for the main DynamicTable
  const columns = [
    { id: "invoiceNo", label: "Invoice No", align: "left" },
    { id: "enquiryNo", label: "Enquiry No", align: "left" },
    { id: "projectName", label: "Project name", align: "left" },
    { id: "poDate", label: "PO Date", align: "left" },
    { id: "month", label: "Month", align: "center" },
    { id: "eventDate", label: "Event Date", align: "left" },
    { id: "projectOwner", label: "Project Owner", align: "left" },
    { id: "production", label: "Production", align: "right" },
    { id: "artistManpower", label: "Artist & Manpower", align: "right" },
    { id: "venue", label: "Venue", align: "right" },
    { id: "others", label: "Others", align: "right" },
    { id: "totalVendorCost", label: "Total Vendor Cost", align: "right" },
    { id: "proposalCost", label: "Proposal Cost", align: "right" },
    { id: "marginCost", label: "Margin Cost", align: "right" },
    { id: "marginPercent", label: "Margin %", align: "right" },
  ];

  // Define columns for the Monthly Summary DynamicTable
  const monthlySummaryColumns = [
    { id: "month", label: "Month", align: "left" },
    { id: "noOfProjects", label: "No of projects", align: "right" },
    { id: "artistManpower", label: "Artist & Manpower", align: "right" },
    { id: "venue", label: "Venue", align: "right" },
    { id: "others", label: "Others", align: "right" },
    { id: "totalVendorCost", label: "Total vendor Cost", align: "right" },
    { id: "marginPercent", label: "Margin %", align: "right" },
    { id: "marginCost", label: "Margin Cost", align: "right" },
  ];

  // Define columns for BD Target Tracker
  const bdTargetTrackerColumns = [
    { id: "empId", label: "Emp Id", align: "left" },
    { id: "projectName", label: "Project name", align: "left" },
    { id: "target", label: "Target", align: "right" },
    { id: "actual", label: "Actual", align: "right" },
    { id: "gap", label: "Gap", align: "right" },
    { id: "actPercent", label: "Act%", align: "right" },
    { id: "incentiveAchieved", label: "Incentive Achieved", align: "right" },
    { 
      id: "action", 
      label: "Action", 
      align: "center",
      render: (value, row) => (
        <Button 
          variant="text" 
          color="primary"
          sx={{ 
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 400
          }}
        >
          view full Breakdown
        </Button>
      )
    },
  ];

  // Define columns for Incentive Tracker
  const incentiveTrackerColumns = [
    { id: "invoiceNo", label: "Invoice No", align: "left" },
    { id: "projectName", label: "Project name", align: "left" },
    { id: "month", label: "month", align: "center" },
    { id: "projectOwner", label: "Project Owner", align: "left" },
    { id: "totalVendorCost", label: "Total Vendor Cost", align: "right" },
    { id: "proposalCost", label: "Proposal Cost", align: "right" },
    { id: "marginPercent", label: "Margin %", align: "right" },
    { id: "marginValue", label: "Margin Value", align: "right" },
    { id: "revenueIncentivePercent", label: "Revenue Incentive %", align: "right" },
    { id: "revenueIncentiveValue", label: "Revenue Incentive Value", align: "right" },
  ];

  // Custom renderer for month column to show as chip
  const monthColumnIndex = columns.findIndex(col => col.id === "month");
  if (monthColumnIndex !== -1) {
    columns[monthColumnIndex].render = (value, row) => (
      <Box 
        sx={{
          display: 'inline-flex',
          padding: '4px 12px',
          backgroundColor: '#e5e7eb',
          color: '#374151',
          fontWeight: 500,
          borderRadius: '4px',
          fontSize: '0.75rem',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {value}
      </Box>
    );
  }

  // Custom renderer for numeric columns to add ₹ symbol
  const numericColumns = ["production", "artistManpower", "venue", "others", "totalVendorCost", "proposalCost", "marginCost"];
  numericColumns.forEach(colName => {
    const colIndex = columns.findIndex(col => col.id === colName);
    if (colIndex !== -1) {
      columns[colIndex].render = (value, row) => `₹${value}`;
    }
  });

  // Custom renderer for margin percent to add % symbol with styling
  const marginPercentIndex = columns.findIndex(col => col.id === "marginPercent");
  if (marginPercentIndex !== -1) {
    columns[marginPercentIndex].render = (value, row) => (
      <Box 
        sx={{
          display: 'inline-flex',
          padding: '4px 8px',
          backgroundColor: '#dcfce7',
          color: '#166534',
          fontWeight: 600,
          borderRadius: '4px',
          fontSize: '0.75rem',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {value}%
      </Box>
    );
  }

  // Custom renderers for Monthly Summary table
  monthlySummaryColumns.forEach(col => {
    if (col.id === "month") {
      col.render = (value, row) => (
        <Box 
          sx={{
            display: 'inline-flex',
            padding: '4px 12px',
            backgroundColor: '#e5e7eb',
            color: '#374151',
            fontWeight: 500,
            borderRadius: '4px',
            fontSize: '0.75rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {value}
        </Box>
      );
    }
    
    if (["artistManpower", "venue", "others", "totalVendorCost", "marginCost"].includes(col.id)) {
      col.render = (value, row) => `₹${value}`;
    }
    
    if (col.id === "marginPercent") {
      col.render = (value, row) => (
        <Box 
          sx={{
            display: 'inline-flex',
            padding: '4px 8px',
            backgroundColor: '#dcfce7',
            color: '#166534',
            fontWeight: 600,
            borderRadius: '4px',
            fontSize: '0.75rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {value}%
        </Box>
      );
    }
  });

  // Custom renderers for BD Target Tracker table
  bdTargetTrackerColumns.forEach(col => {
    if (["target", "actual", "gap", "incentiveAchieved"].includes(col.id)) {
      col.render = (value, row) => `₹${value}`;
    }
    
    if (col.id === "actPercent") {
      col.render = (value, row) => `${value}%`;
    }
  });

  // Custom renderers for Incentive Tracker table
  incentiveTrackerColumns.forEach(col => {
    if (col.id === "month") {
      col.render = (value, row) => (
        <Box 
          sx={{
            display: 'inline-flex',
            padding: '4px 12px',
            backgroundColor: '#e5e7eb',
            color: '#374151',
            fontWeight: 500,
            borderRadius: '4px',
            fontSize: '0.75rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {value}
        </Box>
      );
    }
    
    if (["totalVendorCost", "proposalCost", "marginValue", "revenueIncentiveValue"].includes(col.id)) {
      col.render = (value, row) => `₹${value}`;
    }
    
    if (col.id === "marginPercent" || col.id === "revenueIncentivePercent") {
      col.render = (value, row) => `${value}%`;
    }
  });

  return (
    <Box className="p-4 min-h-screen ">
      {/* Header */}
      <Box className="mb-4">
        <Typography variant="h5" className="font-semibold">
          Profitability Analysis Report
        </Typography>
      </Box>

      {/* Tabs */}
      <Box className="flex items-center justify-start mb-6 bg-white p-2 rounded-lg border">
        <Box className="inline-flex bg-white border border-orange-500 rounded-lg p-0.5">
          <Box className="flex gap-0.5">
            {["Summary", "Monthly Summary", "BD Target Tracker", "Incentive Tracker"].map(
              (tab, index) => (
                <Box
                  key={index}
                  onClick={() => setValue(index)}
                  className={`min-h-10 h-10 text-sm font-medium rounded-lg px-4 py-2 transition-colors cursor-pointer ${
                    value === index
                      ? "bg-orange-500 text-white"
                      : "text-orange-500 hover:bg-orange-50"
                  }`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 'auto',
                    backgroundColor: value === index ? '#f97316' : 'transparent',
                    color: value === index ? '#fff' : '#f97316',
                    borderRadius: '8px',
                    fontWeight: 500
                  }}
                >
                  {tab}
                </Box>
              )
            )}
          </Box>
        </Box>
      </Box>

      {/* Tab Content */}
      <TabPanel value={value} index={0}>
        <DynamicTable
          columns={columns}
          data={tableData}
          title=""
          searchPlaceholder="Search"
          categoryLabel="All Months"
          statusLabel="All Status"
          addButtonLabel="Add New"
          disableView={true}
          disableEdit={false}
          disableDelete={false}
          disableAdd={false}
          statusField="status"
          categoryField="category"
          addButtonProps={{
            variant: "contained",
            sx: {
              backgroundColor: "#f97316",
              "&:hover": { backgroundColor: "#ea580c" }
            }
          }}
          headerButtons={[]}
        />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <DynamicTable
          columns={monthlySummaryColumns}
          data={monthlySummaryData}
          title="Monthly Summary"
          searchPlaceholder="Search months..."
          categoryLabel="All Quarters"
          statusLabel="All Status"
          addButtonLabel=""
          disableView={true}
          disableEdit={true}
          disableDelete={true}
          disableAdd={true}
          statusField="status"
          categoryField="category"
          headerButtons={[]}
          showEntriesInfo={true}
          totalEntries={312}
          hideActions={true}
        />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <DynamicTable
          columns={bdTargetTrackerColumns}
          data={bdTargetTrackerData}
          title="BD Target Tracker"
          searchPlaceholder="Search employees..."
          categoryLabel="All Categories"
          statusLabel="All Status"
          addButtonLabel=""
          disableView={true}
          disableEdit={true}
          disableDelete={true}
          disableAdd={true}
          statusField="status"
          categoryField="category"
          headerButtons={[]}
          showEntriesInfo={true}
          totalEntries={312}
          hideActions={true}
        />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <DynamicTable
          columns={incentiveTrackerColumns}
          data={incentiveTrackerData}
          title="Incentive Tracker"
          searchPlaceholder="Search projects..."
          categoryLabel="All Categories"
          statusLabel="All Status"
          addButtonLabel=""
          disableView={true}
          disableEdit={true}
          disableDelete={true}
          disableAdd={true}
          statusField="status"
          categoryField="category"
          headerButtons={[]}
          showEntriesInfo={true}
          totalEntries={312}
          hideActions={true}
        />
      </TabPanel>
    </Box>
  );
};

export default ProfitabilityAnalysis;