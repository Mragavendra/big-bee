import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import DynamicTable from "../../../table/DynamicTable";

// TabPanel component
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

const Meeting = () => {
  const [value, setValue] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState("July 2025");
  const [selectedQuarter, setSelectedQuarter] = useState("Q1 2025");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Table columns and data
  const dailyStandupColumns = [
    { id: "date", label: "Date", width: 100, align: "left" },
    { id: "time", label: "Time", width: 80, align: "left" },
    { id: "name", label: "Name", width: 120, align: "left" },
    { id: "department", label: "Department", width: 120, align: "left" },
    { id: "yesterdayWork", label: "Yesterday's Work", width: 200, align: "left" },
    { id: "todayPlan", label: "Today's Plan", width: 200, align: "left" },
    { id: "blockers", label: "Blockers / Support", width: 150, align: "left" },
    { id: "action", label: "Action", width: 80, align: "center" },
  ];

  const dailyStandupData = [
    {
      id: "1",
      date: "07-07-2025",
      time: "10:00AM",
      name: "Rajesh Kumar",
      department: "Business Development",
      yesterdayWork: "Followed up with Infosys; updated CRM",
      todayPlan: "Prepare Axis Bank proposal; coordinate with Creative",
      blockers: "Waiting on service details from client",
      action: "Eat",
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
      action: "Eat",
    },
    {
      id: "3",
      date: "07-07-2025",
      time: "10:00AM",
      name: "Sneha Rao",
      department: "Production",
      yesterdayWork: "Booked vendor; delivered contracts",
      todayPlan: "Conduct recce; finalize logistics",
      blockers: "$50k advance needed",
      action: "Eat",
    },
    {
      id: "4",
      date: "07-07-2025",
      time: "10:00AM",
      name: "Ankit Mehra",
      department: "Creative",
      yesterdayWork: "Finalized Bosch pitch deck",
      todayPlan: "Work on Tanishq mockups",
      blockers: "Waiting for color feedback from CS",
      action: "Eat",
    },
    {
      id: "5",
      date: "07-07-2025",
      time: "10:00AM",
      name: "Rohini Menon",
      department: "Finance",
      yesterdayWork: "Processed 2 vendor payments",
      todayPlan: "Prepare GST docs for next event",
      blockers: "Awaiting invoices, bank details",
      action: "Eat",
    },
  ];

  const weeklyReportColumns = [
    { id: "date", label: "Date", width: 100, align: "left" },
    { id: "name", label: "Name", width: 120, align: "left" },
    { id: "department", label: "Department", width: 120, align: "left" },
    { id: "weeklyGoals", label: "Weekly Goals", width: 200, align: "left" },
    { id: "progressUpdates", label: "Progress Updates", width: 200, align: "left" },
    { id: "challenges", label: "Challenges Faced", width: 150, align: "left" },
    { id: "supportNeeded", label: "Support needed", width: 150, align: "left" },
  ];

  const weeklyReportData = [
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
    {
      id: "3",
      date: "07-07-2025",
      name: "Anusha",
      department: "Production",
      weeklyGoals: "Launch email campaign; increase social engagement",
      progressUpdates: "Campaign launched, engagement up by 18%",
      challenges: "Low CTR on LinkedIn ads",
      supportNeeded: "Creative refresh for advertising",
    },
  ];

  const monthlyDiscussionColumns = [
    { id: "sno", label: "S.No", width: 60, align: "center" },
    { id: "keyUpdates", label: "Key Updates / Achievements", width: 200, align: "left" },
    { id: "challenges", label: "Challenges / Issues", width: 200, align: "left" },
    { id: "support", label: "Support / Decisions Made", width: 200, align: "left" },
  ];

  const monthlyDiscussionData = [
    {
      id: "1",
      sno: "01",
      keyUpdates: "Project Management",
      challenges: "Delay in creative approval",
      support: "Creative team to share deck by 15th June",
    },
    {
      id: "2",
      sno: "02",
      keyUpdates: "Client Servicing",
      challenges: "Delay in receiving client agenda",
      support: "CS to escalate to client by Monday",
    },
    {
      id: "3",
      sno: "03",
      keyUpdates: "Events/Production",
      challenges: "Logistics vendor late for Bosch event",
      support: "Shift to alternate vendor for July event",
    },
    {
      id: "4",
      sno: "04",
      keyUpdates: "Marketing",
      challenges: "Low LinkedIn ad CTR",
      support: "Plan A/B creative testing from next week",
    },
    {
      id: "5",
      sno: "05",
      keyUpdates: "Creative",
      challenges: "Feedback delay from CS",
      support: "CS to share approvals by tomorrow",
    },
    {
      id: "6",
      sno: "06",
      keyUpdates: "Finance/Admin",
      challenges: "2 invoices pending from BD",
      support: "BD to submit pending bills by Friday",
    },
  ];

  const monthlyActionColumns = [
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

  const monthlyActionItems = [
    {
      id: "1",
      task: "Finalize Bosch proposal",
      assignedTo: "BD Team",
      deadline: "18th June",
      status: "In Progress",
    },
    {
      id: "2",
      task: "Launch A/B marketing test",
      assignedTo: "Marketing",
      deadline: "20th June",
      status: "Planned",
    },
    {
      id: "3",
      task: "Clear pending invoices",
      assignedTo: "BD / Finance",
      deadline: "15th June",
      status: "Pending",
    },
    {
      id: "4",
      task: "Event deck for TCS",
      assignedTo: "Creative",
      deadline: "17th June",
      status: "Planned",
    },
  ];

  const quarterlyScorecardColumns = [
    { id: "department", label: "Department", width: 150, align: "left" },
    { id: "kpi", label: "KPI", width: 150, align: "left" },
    { id: "target", label: "Target (Q)", width: 80, align: "center" },
    { id: "achieved", label: "Achieved", width: 80, align: "center" },
    { id: "gap", label: "Gap", width: 80, align: "center" },
    { id: "remarks", label: "Remarks", width: 200, align: "left" },
  ];

  const quarterlyScorecardData = [
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
    {
      id: "3",
      department: "Event Execution",
      kpi: "Events Completed",
      target: "12",
      achieved: "11",
      gap: "1",
      remarks: "One event postponed",
    },
    {
      id: "4",
      department: "Marketing",
      kpi: "Leads Generated",
      target: "300",
      achieved: "280",
      gap: "20",
      remarks: "Low ad performance in June",
    },
    {
      id: "5",
      department: "Creative",
      kpi: "Design Approvals",
      target: "50",
      achieved: "52",
      gap: "-2",
      remarks: "Exceeded target",
    },
    {
      id: "6",
      department: "Finance/Admin",
      kpi: "Vendor Payments Settled",
      target: "100%",
      achieved: "96%",
      gap: "4%",
      remarks: "Pending documentation",
    },
  ];

  const quarterlyAgendaItems = [
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
    <Box>
      {/* Tab headers and actions */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            display: 'inline-flex',
            backgroundColor: 'white',
            border: '1px solid #ff6b35',
            borderRadius: '10px',
            padding: '2px',
          }}
        >
          <Tabs 
            value={value}
            onChange={handleChange}
            aria-label="Meeting Tabs"
            sx={{
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTabs-flexContainer': { gap: '2px' },
              minHeight: 'auto',
            }}
          >
            <Tab label="Daily Standup" sx={tabStyle(value === 0)} />
            <Tab label="Weekly Report" sx={tabStyle(value === 1)} />
            <Tab label="Monthly Review" sx={tabStyle(value === 2)} />
            <Tab label="Quarterly Review" sx={tabStyle(value === 3)} />
          </Tabs>
        </Box>

        {value === 2 && (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              label="Month"
            >
              <MenuItem value="June 2025">June 2025</MenuItem>
              <MenuItem value="July 2025">July 2025</MenuItem>
              <MenuItem value="August 2025">August 2025</MenuItem>
            </Select>
          </FormControl>
        )}
        {value === 3 && (
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Quarter</InputLabel>
            <Select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              label="Quarter"
            >
              <MenuItem value="Q1 2025">Q1 2025</MenuItem>
              <MenuItem value="Q2 2025">Q2 2025</MenuItem>
              <MenuItem value="Q3 2025">Q3 2025</MenuItem>
              <MenuItem value="Q4 2025">Q4 2025</MenuItem>
            </Select>
          </FormControl>
        )}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#ee7110",
            "&:hover": { backgroundColor: "#d45a0a" },
          }}
        >
          Add New
        </Button>
      </Box>

      {/* TabPanels */}
      <TabPanel value={value} index={0}>
        <DynamicTable
          columns={dailyStandupColumns}
          data={dailyStandupData}
          title="Daily Standup Report"
          searchPlaceholder="Search standup entries..."
          disableAdd={true}
          disableEdit={true}
          disableDelete={true}
          showActionColumn={false}
          showOverallStatus={false}
          showExtraOverallStatus={false}
          showAssignColumn={false}
        />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Showing 5 out of 312
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <DynamicTable
          columns={weeklyReportColumns}
          data={weeklyReportData}
          title="Weekly Report"
          searchPlaceholder="Search weekly reports..."
          disableAdd={true}
          disableEdit={true}
          disableDelete={true}
          showActionColumn={false}
          showOverallStatus={false}
          showExtraOverallStatus={false}
          showAssignColumn={false}
        />
        <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
          Showing 3 out of 312
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Monthly Review - {selectedMonth}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
          Discussion Notes
        </Typography>
        <DynamicTable
          columns={monthlyDiscussionColumns}
          data={monthlyDiscussionData}
          title=""
          searchPlaceholder="Search discussion notes..."
          disableAdd={true}
          disableEdit={true}
          disableDelete={true}
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
          columns={monthlyActionColumns}
          data={monthlyActionItems}
          title=""
          searchPlaceholder="Search action items..."
          disableAdd={true}
          disableEdit={true}
          disableDelete={true}
          showActionColumn={false}
          showOverallStatus={false}
          showExtraOverallStatus={false}
          showAssignColumn={false}
        />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Quarterly Review - {selectedQuarter}
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
              Quarterly Agenda
            </Typography>
            <Card>
              <CardContent>
                {quarterlyAgendaItems.map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    • {item}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
              Performance Scorecard
            </Typography>
            <Card>
              <CardContent>
                {quarterlyScorecardData.map((row, idx) => (
                  <Typography key={idx} variant="body2">
                    {row.department} - {row.kpi}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#ee7110" }}>
          Performance Details
        </Typography>
        <DynamicTable
          columns={quarterlyScorecardColumns}
          data={quarterlyScorecardData}
          title=""
          searchPlaceholder="Search performance details..."
          disableAdd={true}
          disableEdit={true}
          disableDelete={true}
          showActionColumn={false}
          showOverallStatus={false}
          showExtraOverallStatus={false}
          showAssignColumn={false}
        />
      </TabPanel>
    </Box>
  );
};

// Tab style reuse function
function tabStyle(selected) {
  return {
    minHeight: '42px',
    height: '32px',
    textTransform: 'none',
    fontSize: '13px',
    fontWeight: 500,
    borderRadius: '10px',
    minWidth: '100px',
    padding: '6px 16px',
    color: selected ? '#fff' : '#ff6b35',
    backgroundColor: selected ? '#ff6b35' : 'transparent',
    border: 'none',
    '&:hover': {
      backgroundColor: selected ? '#e55a2b' : 'rgba(255, 107, 53, 0.1)',
    },
    '&.Mui-selected': {
      color: '#fff',
      backgroundColor: '#ff6b35',
    },
  };
}

export default Meeting;
