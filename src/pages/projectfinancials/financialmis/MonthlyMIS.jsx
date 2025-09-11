import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyMIS = () => {
  // Data for the main charts
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

  return (
    <div className=" p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Monthly MIS</h1>
        <div className="flex items-center gap-2">
          <button className="text-blue-600 text-sm">Export</button>
          <select className="text-sm border rounded px-2 py-1 bg-white">
            <option>2025-26</option>
          </select>
          <select className="text-sm border rounded px-2 py-1 bg-white">
            <option>Jul</option>
          </select>
          <button className="text-blue-600 text-sm">Edit</button>
          <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm">Add</button>
        </div>
      </div>

      {/* Top Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Billing - Collection - Expenses Chart */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-4 text-gray-800">
            Billing - Collection - Expenses
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
                tickFormatter={formatYAxis}
                domain={[0, 30000000]}
                ticks={[0, 10000000, 20000000, 30000000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill={(entry) => entry.color} radius={[0, 0, 0, 0]}>
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
            <BarChart data={bvData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
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

      {/* Collection Vs Expenses Chart */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <h3 className="text-base font-semibold mb-4 text-gray-800">
          Collection Vs Expenses
        </h3>
        <div className="space-y-3">
          {/* Collection Bar */}
          <div className="flex items-center">
            <div className="w-20 text-sm text-gray-600">Collection</div>
            <div className="flex-1 bg-gray-100 rounded h-6 relative">
              <div 
                className="bg-orange-100 h-full rounded"
                style={{ width: '80%' }}
              ></div>
            </div>
          </div>
          
          {/* Expenses Bar */}
          <div className="flex items-center">
            <div className="w-20 text-sm text-gray-600">Expenses</div>
            <div className="flex-1 bg-gray-100 rounded h-6 relative">
              <div 
                className="bg-orange-500 h-full rounded"
                style={{ width: '60%' }}
              ></div>
            </div>
          </div>
          
          {/* Profit Bar */}
          <div className="flex items-center">
            <div className="w-20 text-sm text-gray-600">Profit</div>
            <div className="flex-1 bg-gray-100 rounded h-6 relative">
              <div 
                className="bg-gray-800 h-full rounded"
                style={{ width: '20%' }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Scale */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>0</span>
          <span className="ml-auto">20,00,000</span>
        </div>
      </div>

      {/* Analysis Cards Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Income Analysis */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-4 text-gray-800">Income Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Planned</span>
              </div>
              <span className="font-semibold">20,00,000</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Actual</span>
              </div>
              <span className="font-semibold">10,00,000</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Variance</span>
              </div>
              <span className="font-semibold">10,00,000 (50%)</span>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-blue-600 text-sm flex items-center">
              View Breakdown <span className="ml-1">›</span>
            </button>
          </div>
        </div>

        {/* Collection Analysis */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-base font-semibold mb-4 text-gray-800">Collection Analysis</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Planned</span>
              </div>
              <span className="font-semibold">20,00,000</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Actual</span>
              </div>
              <span className="font-semibold">10,00,000</span>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Variance</span>
              </div>
              <span className="font-semibold">10,00,000 (50%)</span>
            </div>
          </div>
          <div className="mt-4">
            <button className="text-blue-600 text-sm flex items-center">
              View Breakdown <span className="ml-1">›</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expenses Analysis */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold text-gray-800">Expenses Analysis</h3>
          <div className="text-orange-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Planned</span>
            </div>
            <span className="font-semibold">30,00,000</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Actual</span>
            </div>
            <span className="font-semibold">15,00,000</span>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Variance</span>
            </div>
            <span className="font-semibold">15,00,000 (50%)</span>
          </div>
        </div>
        <div className="mt-4">
          <button className="text-blue-600 text-sm flex items-center">
            View Breakdown <span className="ml-1">›</span>
          </button>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex justify-center mt-6 space-x-4 text-sm text-gray-600">
        <select className="border rounded px-2 py-1 bg-white">
          <option>2025-26</option>
        </select>
        <select className="border rounded px-2 py-1 bg-white">
          <option>All FY Months</option>
        </select>
      </div>
    </div>
  );
};

export default MonthlyMIS;