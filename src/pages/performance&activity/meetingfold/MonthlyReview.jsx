import React from "react";
import { Typography, Box, Card, CardContent, Chip } from "@mui/material";
import DynamicTable from "../../../table/DynamicTable";

const MonthlyReview = ({ selectedMonth }) => {
  const discussionColumns = [
    { id: "sno", label: "S.No", width: 60, align: "center" },
    { id: "keyUpdates", label: "Key Updates / Achievements", width: 200, align: "left" },
    { id: "challenges", label: "Challenges / Issues", width: 200, align: "left" },
    { id: "support", label: "Support / Decisions Made", width: 200, align: "left" },
  ];

  const discussionData = [
    { id: "1", sno: "01", keyUpdates: "Project Management", challenges: "Delay in creative approval", support: "Creative team to share deck by 15th June" },
    { id: "2", sno: "02", keyUpdates: "Client Servicing", challenges: "Delay in receiving client agenda", support: "CS to escalate to client by Monday" },
  ];

  const actionColumns = [
    { id: "id", label: "S.No", width: 60, align: "center" },
    { id: "task", label: "Task", width: 200, align: "left" },
    { id: "assignedTo", label: "Assigned To", width: 120, align: "left" },
    { id: "deadline", label: "Deadline", width: 100, align: "left" },
    {
      id: "status",
      label: "Status",
      width: 100,
      align: "center",
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={
            value === "In Progress" ? "warning" :
            value === "Planned" ? "info" :
            value === "Pending" ? "error" :
            value === "Completed" ? "success" : "default"
          }
        />
      ),
    },
  ];

  const actionItems = [
    { id: "1", task: "Finalize Bosch proposal", assignedTo: "BD Team", deadline: "18th June", status: "In Progress" },
    { id: "2", task: "Launch A/B marketing test", assignedTo: "Marketing", deadline: "20th June", status: "Planned" },
  ];

  return (
    <>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Monthly Review - {selectedMonth}
      </Typography>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
        Discussion Notes
      </Typography>
      <DynamicTable
        columns={discussionColumns}
        data={discussionData}
        title=""
        searchPlaceholder="Search discussion notes..."
        disableAdd
        disableEdit
        disableDelete
        showActionColumn={false}
        showOverallStatus={false}
        showExtraOverallStatus={false}
        showAssignColumn={false}
      />

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
          Recognitions
        </Typography>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Star Performer(s)
            </Typography>
            <Typography variant="body2">Ankit Mehra (Creative)</Typography>
            <Typography variant="body2">Priya Sharma (Client Servicing)</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
              Client Appreciation
            </Typography>
            <Typography variant="body2">Decathlon for smooth execution</Typography>
            <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 600 }}>
              Work Anniversaries / Birthdays
            </Typography>
            <Typography variant="body2">Rohini Menon – 1 year</Typography>
            <Typography variant="body2">Rajesh Kumar – Birthday on 12th</Typography>
          </CardContent>
        </Card>
      </Box>

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
        Action Items
      </Typography>
      <DynamicTable
        columns={actionColumns}
        data={actionItems}
        title=""
        searchPlaceholder="Search action items..."
        disableAdd
        disableEdit
        disableDelete
        showActionColumn={false}
        showOverallStatus={false}
        showExtraOverallStatus={false}
        showAssignColumn={false}
      />
    </>
  );
};

export default MonthlyReview;
