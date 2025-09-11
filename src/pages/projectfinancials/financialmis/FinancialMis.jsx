import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import MonthlyMIS from "../financialmis/MonthlyMIS";
import MonthlySummary from "../financialmis/MonthlySummary";
import AnnualSummary from "../financialmis/AnnualSummary";
import OverallSummary from "../financialmis/OverallSummary";

const TabPanel = ({ value, index, children }) => {
  return value === index ? <div>{children}</div> : null;
};

const FinancialMis = () => {
  const [value, setValue] = useState(0);
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [selectedMonth, setSelectedMonth] = useState("Jul");

  const navigate = useNavigate();

  const handleAddClick = () => navigate("/financial-mis/add");
  const handleEditClick = () => console.log("Edit clicked");

  return (
    <div className="p-4">
      {/* Tabs Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex bg-white border border-orange-500 rounded-lg p-0.5">
          {[
            "Monthly MIS",
            "Monthly Summary",
            "Annual Summary",
            "Overall Summary",
          ].map((tab, index) => (
            <button
              key={index}
              onClick={() => setValue(index)}
              className={`min-h-10 h-10 text-sm font-medium rounded-lg px-4 py-2 transition-colors ${
                value === index
                  ? "bg-orange-500 text-white"
                  : "text-orange-500 hover:bg-orange-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <TabPanel value={value} index={0}>
        <MonthlyMIS />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MonthlySummary />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AnnualSummary />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <OverallSummary />
      </TabPanel>
    </div>
  );
};

export default FinancialMis;
