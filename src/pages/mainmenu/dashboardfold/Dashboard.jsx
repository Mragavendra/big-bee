import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUp, ArrowDown, FileText, Users, TrendingUp, DollarSign, MoreHorizontal } from 'lucide-react';

const revenueData = [
  { month: 'Mar', income: 10000, expense: 5000 },
  { month: 'Apr', income: 9500, expense: 7000 },
  { month: 'May', income: 12000, expense: 9000 },
  { month: 'Jun', income: 8500, expense: 8000 },
  { month: 'Jul', income: 16580, expense: 8500 },
  { month: 'Aug', income: 11000, expense: 5000 },
  { month: 'Sep', income: 18000, expense: 4000 },
  { month: 'Oct', income: 17500, expense: 5000 },
];

const pieData = [
  { name: 'Total Vendor Cost', value: 40, color: '#FF6B35' },
  { name: 'Margin Value', value: 40, color: '#FF8A65' },
  { name: 'Incentives Paid', value: 10, color: '#424242' },
];

const projectsData = [
  {
    invoice: 'P001',
    project: 'Adwik',
    month: 'May',
    owner: 'Manoj',
    vendorCost: '8,24,267',
    proposalCost: '12,76,496',
    marginCost: '4,52,229',
    margin: '55',
  },
  {
    invoice: 'P002',
    project: 'Adwik',
    month: 'May',
    owner: 'Manoj',
    vendorCost: '8,24,267',
    proposalCost: '12,76,496',
    marginCost: '4,52,229',
    margin: '55',
  },
  {
    invoice: 'P003',
    project: 'Adwik',
    month: 'May',
    owner: 'Manoj',
    vendorCost: '8,24,267',
    proposalCost: '12,76,496',
    marginCost: '4,52,229',
    margin: '55',
  },
];

function MetricCard({ title, value, change, isPositive, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-500 text-xs mb-1">{title}</p>
          <p className="text-xl font-bold text-gray-900 mb-1">{value}</p>
          <div className="flex items-center">
            {isPositive ? (
              <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
            ) : (
              <ArrowDown className="w-3 h-3 text-red-500 mr-1" />
            )}
            <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change}
            </span>
          </div>
        </div>
        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full mx-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Revenue (This Month)"
            value="₹12.4L"
            change="1.58%"
            isPositive={true}
            icon={FileText}
          />
          <MetricCard
            title="Total Vendor Cost"
            value="₹9.2L"
            change="0.42%"
            isPositive={false}
            icon={Users}
          />
          <MetricCard
            title="Total Margin Value"
            value="₹3.2L"
            change="2.36%"
            isPositive={true}
            icon={DollarSign}
          />
          <MetricCard
            title="Incentives Paid"
            value="₹1.8L"
            change="2.36%"
            isPositive={true}
            icon={DollarSign}
          />
        </div>

        {/* Second Row - 3 Charts/Sections */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Total Revenue Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
              <button className="px-3 py-1 text-xs bg-gray-100 rounded-md flex items-center gap-1">
                Last 8 Months 
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-4">₹58L</p>
            
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#FF6B35"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3, fill: '#FF6B35' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#424242"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3, fill: '#424242' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Income</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-700 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Expense</span>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              July 2035: <span className="font-semibold">₹16,580</span>
            </div>
          </div>

          {/* Revenue Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Distribution</h3>
              <button className="px-3 py-1 text-xs bg-gray-100 rounded-md flex items-center gap-1">
                This Month
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            
            <div className="relative h-48 flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-900">₹30.2 L</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Total Vendor Cost</span>
                </div>
                <span className="text-xs font-medium">40%(12.2L)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Margin Value</span>
                </div>
                <span className="text-xs font-medium">40%(12.3L)</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-700 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600">Incentives Paid</span>
                </div>
                <span className="text-xs font-medium">10%(6L)</span>
              </div>
            </div>
          </div>

          {/* BD Target */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">BD Target</h3>
              <button className="px-3 py-1 text-xs bg-gray-100 rounded-md flex items-center gap-1">
                This Year
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-6">₹80 Lakhs</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Achieved</span>
                  <span className="text-xs font-medium">45%</span>
                  <span className="text-xs font-medium">35L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Remaining</span>
                  <span className="text-xs font-medium">55%</span>
                  <span className="text-xs font-medium">45L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-600">Incentive Earned</span>
                  <span className="text-xs font-medium">25%</span>
                  <span className="text-xs font-medium">2L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Table and Quick Actions Side by Side */}
        <div className="flex gap-6 mb-6">
          {/* Projects Table - Takes 2/3 width */}
          <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Projects This Month:</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-gray-100 rounded-md flex items-center gap-1">
                  This Week
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button className="px-4 py-1 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600">
                  View All
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Invoice No</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Project name</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Month</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Project Owner</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Total Vendor Cost</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Proposal Cost</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Margin Cost</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">margin %</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsData.map((project, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 text-sm text-gray-900 font-medium">{project.invoice}</td>
                      <td className="py-4 text-sm text-gray-900">{project.project}</td>
                      <td className="py-4 text-sm text-gray-900">{project.month}</td>
                      <td className="py-4 text-sm text-gray-900">{project.owner}</td>
                      <td className="py-4 text-sm text-gray-900">{project.vendorCost}</td>
                      <td className="py-4 text-sm text-gray-900">{project.proposalCost}</td>
                      <td className="py-4 text-sm text-gray-900">{project.marginCost}</td>
                      <td className="py-4 text-sm text-gray-900">{project.margin}</td>
                      <td className="py-4">
                        <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions - Takes 1/3 width */}
          <div className="w-1/3 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">Add Employee</h4>
                  <p className="text-xs text-gray-500">Add new team member to organization structure</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">Create Quotation</h4>
                  <p className="text-xs text-gray-500">Open new quotation form linked to lead or client</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">Reporting Summary</h4>
                  <p className="text-xs text-gray-500">Shortcut to Daily/Weekly/Monthly/ Summary</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reporting Summary - Full Width Below */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Reporting Summary</h3>
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mb-2">Started to Daily/Weekly/Monthly / Quantity table</p>
          <button className="text-sm text-orange-500 font-medium hover:underline">
            Review KRA - See all employee KRAs for current month
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;