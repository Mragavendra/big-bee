import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import MarketingMonthlyBudget from "./MarketingMainRoiTrackerMonthlyBudjet";
import MarketingOverallSummary from "./MarketingMainRoiTrackerOverallSummary";
import MarketingRoiTrackerMarketing from "./MarketingRoiTrackerMarketing";
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}
// Tab style function
const tabStyle = (selected) => ({
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
});
const MarketingMainRoiTracker = () => {
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
            <Tab label="Marketing" sx={tabStyle(value === 0)} />
            <Tab label="Monthly Budjet" sx={tabStyle(value === 1)} />
            <Tab label="Overall Summary" sx={tabStyle(value === 2)} />
          </Tabs>
        </Box>
      </Box>
      {/* Tab Panels */}
      <TabPanel value={value} index={0}>
        <MarketingRoiTrackerMarketing/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MarketingMonthlyBudget/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MarketingOverallSummary/>
      </TabPanel>
    </Box>
  );
};
export default MarketingMainRoiTracker;