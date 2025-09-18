import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  DollarSign,
  ShoppingCart,
  Target,
  Calendar,
  Filter,
  Code,
  Database,
  Server,
  Cpu,
  GitBranch,
  Zap,
  BarChart3,
  Activity,
} from "lucide-react";

const BusinessandDevelopmentDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Sample data
  const revenueData = [
    { name: "Jan", revenue: 125000, profit: 45000 },
    { name: "Feb", revenue: 118000, profit: 42000 },
    { name: "Mar", revenue: 145000, profit: 52000 },
    { name: "Apr", revenue: 138000, profit: 48000 },
    { name: "May", revenue: 162000, profit: 58000 },
    { name: "Jun", revenue: 155000, profit: 55000 },
  ];

  const developmentMetrics = [
    { name: "Week 1", commits: 45, deployments: 3, bugs: 12 },
    { name: "Week 2", commits: 52, deployments: 4, bugs: 8 },
    { name: "Week 3", commits: 38, deployments: 2, bugs: 15 },
    { name: "Week 4", commits: 61, deployments: 5, bugs: 6 },
  ];

  const projectAllocationData = [
    { name: "Frontend", value: 35, color: "#EA580C" },
    { name: "Backend", value: 25, color: "#F59E0B" },
    { name: "Database", value: 20, color: "#FCD34D" },
    { name: "Testing", value: 12, color: "#FBBF24" },
    { name: "DevOps", value: 8, color: "#F97316" },
  ];

  const systemPerformance = [
    {
      name: "API Server",
      uptime: 99.8,
      response: 120,
      errors: 0.2,
      usage: 65,
    },
    {
      name: "Database",
      uptime: 99.9,
      response: 85,
      errors: 0.1,
      usage: 72,
    },
    {
      name: "Cache",
      uptime: 100,
      response: 15,
      errors: 0.0,
      usage: 45,
    },
    {
      name: "File Storage",
      uptime: 99.7,
      response: 210,
      errors: 0.3,
      usage: 38,
    },
  ];

  const MetricCard = ({
    title,
    value,
    change,
    changeType,
    icon: Icon,
    trend,
  }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
          <div className="flex items-center space-x-1">
            {changeType === "positive" ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              {change}
            </span>
            <span className="text-gray-500 text-sm">vs last period</span>
          </div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-orange-600" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#EA580C"
                fill="#EA580C"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );

  const miniTrend = [
    { value: 20 },
    { value: 35 },
    { value: 28 },
    { value: 45 },
    { value: 52 },
    { value: 48 },
    { value: 65 },
  ];

  return (
    <div className="p-4 sm:p-6">
      <div className="">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Business & Development Dashboard
            </h1>
            <p className="text-gray-600">
              Track business performance and development metrics
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Monthly Revenue"
            value="$155K"
            change="+8.5%"
            changeType="positive"
            icon={DollarSign}
            trend={miniTrend}
          />
          <MetricCard
            title="Active Projects"
            value="18"
            change="+2"
            changeType="positive"
            icon={Code}
            trend={miniTrend.map((d) => ({ value: d.value + 10 }))}
          />
          <MetricCard
            title="System Uptime"
            value="99.8%"
            change="-0.1%"
            changeType="negative"
            icon={Server}
            trend={miniTrend.map((d) => ({ value: d.value - 5 }))}
          />
          <MetricCard
            title="Team Velocity"
            value="38 pts"
            change="+12.7%"
            changeType="positive"
            icon={Zap}
            trend={miniTrend.map((d) => ({ value: d.value * 1.2 }))}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue & Profit Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Revenue & Profit
              </h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-600">Profit</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#EA580C"
                  strokeWidth={3}
                  dot={{ fill: "#EA580C", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Project Allocation */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Project Allocation
            </h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {projectAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {projectAllocationData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium text-gray-900 ml-auto">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Development Metrics */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Development Metrics
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={developmentMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="commits" fill="#FED7AA" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="deployments"
                  fill="#EA580C"
                  radius={[4, 4, 0, 0]}
                />
                <Bar dataKey="bugs" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* System Performance */}
          <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-xl p-6 shadow-2xl border border-orange-800">
            <h3 className="text-lg font-semibold text-white mb-6">
              System Performance
            </h3>
            <div className="space-y-4">
              {systemPerformance.map((system, index) => (
                <div
                  key={index}
                  className="p-4 bg-orange-800/50 rounded-lg hover:bg-orange-800/70 transition-all border border-orange-700/50 hover:border-orange-500/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{system.name}</h4>
                    <span className="text-sm font-medium text-orange-400">
                      {system.uptime}% Uptime
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-orange-200">
                    <div>
                      <span className="text-orange-300">Response:</span>
                      <span className="ml-1 font-medium text-white">
                        {system.response}ms
                      </span>
                    </div>
                    <div>
                      <span className="text-orange-300">Usage:</span>
                      <span className="ml-1 font-medium text-white">
                        {system.usage}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-orange-300 mb-1">
                      <span>Error Rate</span>
                      <span>{system.errors}%</span>
                    </div>
                    <div className="w-full bg-orange-800 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-orange-300 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${system.errors * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessandDevelopmentDashboard;