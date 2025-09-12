import React from "react";
import { Typography } from "@mui/material";
import DynamicTable from "../../../table/DynamicTable";

const WeeklyReport = () => {
  const columns = [
    { id: "date", label: "Date", width: 100, align: "left" },
    { id: "name", label: "Name", width: 120, align: "left" },
    { id: "department", label: "Department", width: 120, align: "left" },
    { id: "weeklyGoals", label: "Weekly Goals", width: 200, align: "left" },
    { id: "progressUpdates", label: "Progress Updates", width: 200, align: "left" },
    { id: "challenges", label: "Challenges Faced", width: 150, align: "left" },
    { id: "supportNeeded", label: "Support Needed", width: 150, align: "left" },
  ];

  const data = [
    {
      id: "1",
      date: "07-07-2025",
      name: "Rajesh Kumar",
      department: "Business Development",
      weeklyGoals: "Close 2 proposals; generate 5 new leads",
      progressUpdates: "Closed deal with Infosys, 3 new leads added",
      challenges: "Delay in creative mockup",
      supportNeeded: "Faster turnaround from creative team",
    },
    {
      id: "2",
      date: "07-07-2025",
      name: "Priya",
      department: "Client Servicing",
      weeklyGoals: "Finalize 3 event timelines; client meetings",
      progressUpdates: "Completed 2 timelines, 1 meeting pending",
      challenges: "Client delay in approvals",
      supportNeeded: "Need escalation support for client delay",
    },
  ];

  return (
    <>
      <DynamicTable
        columns={columns}
        data={data}
        title="Weekly Report"
        searchPlaceholder="Search weekly reports..."
        disableAdd
        disableEdit
        disableDelete
        showActionColumn={false}
        showOverallStatus={false}
        showExtraOverallStatus={false}
        showAssignColumn={false}
      />
      <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
        Showing 2 out of 312
      </Typography>
    </>
  );
};

export default WeeklyReport;
