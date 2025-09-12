import React from "react";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import DynamicTable from "../../../table/DynamicTable";
const QuarterlyReview = ({ selectedQuarter }) => {
  const scorecardColumns = [
    { id: "department", label: "Department", width: 150, align: "left" },
    { id: "kpi", label: "KPI", width: 150, align: "left" },
    { id: "target", label: "Target (Q)", width: 80, align: "center" },
    { id: "achieved", label: "Achieved", width: 80, align: "center" },
    { id: "gap", label: "Gap", width: 80, align: "center" },
    { id: "remarks", label: "Remarks", width: 200, align: "left" },
  ];
  const scorecardData = [
    {
      id: "1",
      department: "Business Development",
      kpi: "New Clients Acquired",
      target: "10",
      achieved: "8",
      gap: "2",
      remarks: "Missed TCS deal",
    },
    {
      id: "2",
      department: "Client Servicing",
      kpi: "Client Retention Rate",
      target: "95%",
      achieved: "92%",
      gap: "3%",
      remarks: "Delay in approvals",
    },
  ];
  const agendaItems = [
    "Segment",
    "Opening Address",
    "Departmental Reviews",
    "Financial Overview",
    "Client & Market Insights",
    "Product/Service Innovation",
    "Operational Challenges",
    "Next Quarter Goals",
    "Rewards & Recognition",
    "Q&A & Feedback Session",
  ];
  return (
    <>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Quarterly Review - {selectedQuarter}
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
            Performance Scorecard
          </Typography>
          <Card>
            <CardContent>
              <DynamicTable
                columns={scorecardColumns}
                data={scorecardData}
                title="Quarterly Performance"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default QuarterlyReview;
