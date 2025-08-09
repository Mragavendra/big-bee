import React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import DynamicTable from "../../../table/DynamicTable"; // adjust path

// Table column definition
const orderColumns = [
  { id: "orderId", label: "Order ID", minWidth: 100 },
  { id: "orderDate", label: "Order Date", minWidth: 120 },
  { id: "quotationId", label: "Quotation ID", minWidth: 120 },
  { id: "prospect", label: "Prospect", minWidth: 150 },
  { id: "mobileNumber", label: "Mobile Number", minWidth: 130 },
  { id: "bde", label: "BDE", minWidth: 120 },
  { id: "cse", label: "CSE", minWidth: 120 },
  { id: "orderValue", label: "Order Value", minWidth: 120 },
];

// Sample data (must have `id`, `status`, and `category`)
const orderRows = [
  {
    id: 1,
    orderId: "Q_001",
    orderDate: "12/08/2025",
    quotationId: "L_001",
    prospect: "ABC Pvt. Ltd.",
    mobileNumber: "9123456789",
    bde: "Anand Kumar",
    cse: "Priya Menon",
    orderValue: "20,40,000",
    status: "Active",
    category: "New Order",
  },
  {
    id: 2,
    orderId: "Q_001",
    orderDate: "12/08/2025",
    quotationId: "L_001",
    prospect: "ABC Pvt. Ltd.",
    mobileNumber: "9123456789",
    bde: "Anand Kumar",
    cse: "Priya Menon",
    orderValue: "45,00,000",
    status: "Pending",
    category: "Processing",
  },
  {
    id: 3,
    orderId: "Q_001",
    orderDate: "12/08/2025",
    quotationId: "L_001",
    prospect: "ABC Pvt. Ltd.",
    mobileNumber: "9123456789",
    bde: "Anand Kumar",
    cse: "Priya Menon",
    orderValue: "15,00,000",
    status: "Active",
    category: "Completed",
  },
];

export default function Order() {
  return (
    <Box sx={{ flexGrow: 1, px: 3, pt: 2 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" href="#">
          CRM
        </Link>
        <Typography color="text.primary">Funnel Tracker</Typography>
      </Breadcrumbs>

      {/* Title */}
      

      {/* Dynamic Table with "+ Create Order" button positioned after Status */}
      <DynamicTable
        columns={orderColumns}
        data={orderRows}
        title=""
        rowsPerPage={10}
        disableView
        categoryField="category"
        statusField="status"
        searchPlaceholder="Search for item"
        categoryLabel="All Category"
        statusLabel="All Status"
        addButtonLabel="+ Create Order"
        addButtonProps={{
          variant: "contained",
          sx: {
            background: "#fa6400",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": { background: "#ea580c" },
          },
        }}
        // Don't disable Add — so it renders after Status dropdown
      />
    </Box>
  );
}
