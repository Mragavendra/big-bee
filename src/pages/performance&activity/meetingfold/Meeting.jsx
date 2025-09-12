import React, { useState } from "react";
import { Box, Tabs, Tab, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import DailyStandupTab from "../meetingfold/DailyStandup";
import WeeklyReportTab from "../meetingfold/WeeklyReport";
import MonthlyReviewTab from "../meetingfold/MonthlyReview";
import QuarterlyReviewTab from "../meetingfold/QuarterlyReview";

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

  return (
    <Box>
      {/* Tabs Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            display: "inline-flex",
            backgroundColor: "white",
            border: "1px solid #ff6b35",
            borderRadius: "10px",
            padding: "2px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Meeting Tabs"
            sx={{
              "& .MuiTabs-indicator": { display: "none" },
              "& .MuiTabs-flexContainer": { gap: "2px" },
              minHeight: "auto",
            }}
          >
            <Tab label="Daily" sx={tabStyle(value === 0)} />
            <Tab label="Weekly" sx={tabStyle(value === 1)} />
            <Tab label="Monthly" sx={tabStyle(value === 2)} />
            <Tab label="Quarterly" sx={tabStyle(value === 3)} />
          </Tabs>
        </Box>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={value} index={0}>
        <DailyStandupTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WeeklyReportTab />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MonthlyReviewTab selectedMonth={selectedMonth} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <QuarterlyReviewTab selectedQuarter={selectedQuarter} />
      </TabPanel>
    </Box>
  );
};

// Tab style
function tabStyle(selected) {
  return {
    minHeight: "42px",
    height: "32px",
    textTransform: "none",
    fontSize: "13px",
    fontWeight: 500,
    borderRadius: "10px",
    minWidth: "100px",
    padding: "6px 16px",
    color: selected ? "#fff" : "#ff6b35",
    backgroundColor: selected ? "#ff6b35" : "transparent",
    border: "none",
    "&:hover": {
      backgroundColor: selected ? "#e55a2b" : "rgba(255, 107, 53, 0.1)",
    },
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: "#ff6b35",
    },
  };
}

export default Meeting;
