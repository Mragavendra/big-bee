import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import DynamicTable from "../../../table/DynamicTable";

const MarketingMainRoiTrackerMonyhlyBudjet = () => {
  const columns = [
    { id: "date", label: "Date", width: 100, align: "left" },
    { id: "time", label: "Time", width: 80, align: "left" },
    { id: "name", label: "Name", width: 150, align: "left" },
    { id: "department", label: "Department", width: 160, align: "left" },
    { id: "yesterdayWork", label: "Yesterday's Work", width: 250, align: "left" },
    { id: "todayPlan", label: "Today's Plan", width: 250, align: "left" },
    { id: "blockers", label: "Blockers / Support", width: 200, align: "left" },
  ];

  const allData = [
    {
      id: "1",
      date: "07-07-2025",
      time: "10:00AM",
      name: "Rajesh Kumar",
      department: "Business Development",
      yesterdayWork: "Followed up with Infosys; updated CRM",
      todayPlan: "Prepare Axis Bank proposal; coordinate with Creative",
      blockers: "Waiting on service details from client",
      status: "Pending",
    },
    {
      id: "2",
      date: "07-07-2025",
      time: "10:00AM",
      name: "Priya Sharma",
      department: "Client Servicing",
      yesterdayWork: "Coordinated vendor for Decathlon event",
      todayPlan: "Align production timeline; get agenda finalized",
      blockers: "Need approval from admin for budget",
      status: "Completed",
    },
    {
      id: "3",
      date: "07-07-2025",
      time: "10:00AM",
      name: "Sneha Rao",
      department: "Production",
      yesterdayWork: "Booked vendor; delivered contracts",
      todayPlan: "Conduct recce; finalize logistics",
      blockers: "₹50k advance needed",
      status: "Pending",
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 3, boxShadow: 1 }}>
      {/* Title */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Daily Standup Report
      </Typography>

      {/* Table with built-in search + filters */}
      <DynamicTable
        columns={columns}
        data={allData}
        title=""
        searchPlaceholder="Search standup entries..."
        categoryField="department"
        categoryLabel="All Category"
        statusField="status"
        statusLabel="All Status"
        disableAdd
        disableEdit
        disableDelete
        disableView
        showActionColumn
        showOverallStatus={false}
        showExtraOverallStatus={false}
        showAssignColumn={false}
        rowsPerPage={10}
      />

      {/* Footer */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Showing {allData.length} out of {allData.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default MarketingMainRoiTrackerMonyhlyBudjet;