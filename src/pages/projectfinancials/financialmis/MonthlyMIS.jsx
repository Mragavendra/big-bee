import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DynamicTable from "../../../table/DynamicTable";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyMIS = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Filters state
  const [year, setYear] = useState("2025-26");
  const [month, setMonth] = useState("Jul");

  // Example data (same as before)
  const bceData = [
    { name: "Billing", value: 21000000, color: "#2d2d2d" },
    { name: "Collection", value: 24000000, color: "#f5ddd1" },
    { name: "Expenses", value: 29000000, color: "#ff6b1a" }
  ];

  const bvData = [
    { name: "Billing", value: 0 },
    { name: "Collection", value: 0 },
    { name: "Expenses", value: 0 }
  ];

  const cvData = [
    { name: "Collection", value: 20000000, color: "#f5ddd1" },
    { name: "Expenses", value: 15000000, color: "#ff6b1a" },
    { name: "Profit", value: 5000000, color: "#2d2d2d" }
  ];

  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)},00,000`;
    }
    return value.toLocaleString();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="text-sm">{`${label}: ${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  // DynamicTable header buttons
  const headerButtons = [
    {
      label: "Export",
      variant: "outlined",
      size: "small",
      startIcon: <UploadFileIcon />,
      onClick: () => console.log("Export clicked"),
      props: { sx: { textTransform: "none" } },
    },
    {
      label: "Edit",
      variant: "outlined",
      size: "small",
      startIcon: <EditIcon />,
      onClick: () => navigate(`${location.pathname}/edit`),
      props: { sx: { textTransform: "none" } },
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Header with DynamicTable style */}
      <DynamicTable
        title="Monthly MIS"
        columns={[]} // not using table, just to reuse header system
        data={[]}    // no data for table
        headerButtons={headerButtons}
        addButtonLabel="Add MIS"
        addButtonProps={{
          color: "primary",
          size: "small",
          startIcon: <AddIcon />,
          sx: { textTransform: "none" },
          onClick: () => navigate(`${location.pathname}/add`),
        }}
        filters={[
          {
            label: "Year",
            value: year,
            options: ["2025-26", "2024-25", "2023-24"],
            onChange: (e) => setYear(e.target.value),
          },
          {
            label: "Month",
            value: month,
            options: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
            onChange: (e) => setMonth(e.target.value),
          },
        ]}
        disableSearch
        disableCategory
        disableStatus
        disablePagination
      />

      {/* Top Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Billing - Collection - Expenses Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-4 text-gray-800">
            Billing - Collection - Expenses
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={bceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                tickFormatter={formatYAxis}
                domain={[0, 30000000]}
                ticks={[0, 10000000, 20000000, 30000000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                radius={[0, 0, 0, 0]}
              >
                {bceData.map((entry, index) => (
                  <Bar key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Billing Vs Expenses Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-4 text-gray-800">
            Billing Vs Expenses
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={bvData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                domain={[0, 30000000]}
                ticks={[0, 10000000, 20000000, 30000000]}
                tickFormatter={formatYAxis}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#ff6b1a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rest of your existing content remains same (Collection Vs Expenses, Analysis Cards, Expenses Analysis, Footer Controls) */}
      {/* ... keep your original JSX code here ... */}
    </div>
  );
};

export default MonthlyMIS;
