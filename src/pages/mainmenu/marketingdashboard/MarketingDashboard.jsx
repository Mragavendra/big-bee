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
  MousePointer,
  DollarSign,
  ShoppingCart,
  Target,
  Calendar,
  Filter,
} from "lucide-react";

const MarketingDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Sample data
  const websiteTrafficData = [
    { name: "Jan", visitors: 4000, pageViews: 12000, sessions: 3500 },
    { name: "Feb", visitors: 3000, pageViews: 9000, sessions: 2800 },
    { name: "Mar", visitors: 5000, pageViews: 15000, sessions: 4200 },
    { name: "Apr", visitors: 4500, pageViews: 13500, sessions: 3800 },
    { name: "May", visitors: 6000, pageViews: 18000, sessions: 5200 },
    { name: "Jun", visitors: 5500, pageViews: 16500, sessions: 4800 },
  ];

  const conversionData = [
    { name: "Week 1", conversions: 45, leads: 180 },
    { name: "Week 2", conversions: 52, leads: 210 },
    { name: "Week 3", conversions: 38, leads: 165 },
    { name: "Week 4", conversions: 61, leads: 245 },
  ];

  const channelData = [
    { name: "Organic Search", value: 35, color: "#EA580C" },
    { name: "Social Media", value: 25, color: "#F59E0B" },
    { name: "Direct", value: 20, color: "#FCD34D" },
    { name: "Email", value: 12, color: "#FBBF24" },
    { name: "Paid Ads", value: 8, color: "#F97316" },
  ];

  const campaignPerformance = [
    {
      name: "Summer Sale",
      clicks: 1250,
      impressions: 45000,
      ctr: 2.8,
      cost: 890,
    },
    {
      name: "Product Launch",
      clicks: 980,
      impressions: 38000,
      ctr: 2.6,
      cost: 750,
    },
    {
      name: "Brand Awareness",
      clicks: 2100,
      impressions: 95000,
      ctr: 2.2,
      cost: 1200,
    },
    {
      name: "Retargeting",
      clicks: 650,
      impressions: 22000,
      ctr: 3.0,
      cost: 420,
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
              Marketing Dashboard
            </h1>
            <p className="text-gray-600">
              Track your marketing performance and campaign metrics
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
            title="Total Visitors"
            value="28.5K"
            change="+12.5%"
            changeType="positive"
            icon={Users}
            trend={miniTrend}
          />
          <MetricCard
            title="Page Views"
            value="94.2K"
            change="+8.3%"
            changeType="positive"
            icon={Eye}
            trend={miniTrend.map((d) => ({ value: d.value + 10 }))}
          />
          <MetricCard
            title="Conversion Rate"
            value="3.42%"
            change="-2.1%"
            changeType="negative"
            icon={Target}
            trend={miniTrend.map((d) => ({ value: d.value - 5 }))}
          />
          <MetricCard
            title="Revenue"
            value="$45.2K"
            change="+18.7%"
            changeType="positive"
            icon={DollarSign}
            trend={miniTrend.map((d) => ({ value: d.value * 1.2 }))}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Website Traffic Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Website Traffic
              </h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Visitors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-600">Page Views</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={websiteTrafficData}>
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
                  dataKey="visitors"
                  stroke="#EA580C"
                  strokeWidth={3}
                  dot={{ fill: "#EA580C", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="pageViews"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  dot={{ fill: "#F59E0B", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Traffic Sources
            </h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {channelData.map((item, index) => (
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
          {/* Conversion Funnel */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Weekly Conversions
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionData}>
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
                <Bar dataKey="leads" fill="#FED7AA" radius={[4, 4, 0, 0]} />
                <Bar
                  dataKey="conversions"
                  fill="#EA580C"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Campaign Performance */}
          <div className="bg-gradient-to-br from-orange-900 to-red-900 rounded-xl p-6 shadow-2xl border border-orange-800">
            <h3 className="text-lg font-semibold text-white mb-6">
              Top Campaigns
            </h3>
            <div className="space-y-4">
              {campaignPerformance.map((campaign, index) => (
                <div
                  key={index}
                  className="p-4 bg-orange-800/50 rounded-lg hover:bg-orange-800/70 transition-all border border-orange-700/50 hover:border-orange-500/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{campaign.name}</h4>
                    <span className="text-sm font-medium text-orange-400">
                      {campaign.ctr}% CTR
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-orange-200">
                    <div>
                      <span className="text-orange-300">Clicks:</span>
                      <span className="ml-1 font-medium text-white">
                        {campaign.clicks.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-orange-300">Cost:</span>
                      <span className="ml-1 font-medium text-white">
                        ${campaign.cost}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-orange-300 mb-1">
                      <span>Impressions</span>
                      <span>{campaign.impressions.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-orange-800 rounded-full h-1.5">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-orange-300 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            (campaign.clicks / campaign.impressions) * 100 * 30
                          }%`,
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

export default MarketingDashboard;
