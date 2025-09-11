import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const MonthlySummary = () => {
  const [salesExpanded, setSalesExpanded] = useState(true);
  const [collectionExpanded, setCollectionExpanded] = useState(true);
  const [expensesExpanded, setExpensesExpanded] = useState(true);

  const salesData = [
    { category: "MCA - Govt", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0 },
    { category: "Medical", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0 },
    { category: "Corporate - Regular", jan: 39038039, feb: 25415, mar: 26478, apr: 87455, may: 0, jun: 0, jul: 0, aug: 0 },
    { category: "Corporate - MICE", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0 },
    { category: "GST Difference", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0 },
  ];

  const collectionData = [
    { category: "MCA - Govt", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0 },
    { category: "Medical", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0 },
    { category: "Corporate - Regular", jan: 39038039, feb: 25415, mar: 26478, apr: 87455, may: 0, jun: 0, jul: 0, aug: 0 },
    { category: "Corporate - MICE", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0 },
    { category: "GST Difference", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0 },
  ];

  const expensesData = [
    { category: "Expenses", jan: "Total", feb: "Apr", mar: "May", apr: "Jun", may: "Jul", jun: "Aug", jul: "Sep", aug: "Oct", sep: "Nov" },
    { category: "Business - Vendors", jan: "18,000,000", feb: "18,50,367", mar: "18,50,74,477", apr: "0.84", may: "0.84", jun: "0.84", jul: "0.84", aug: "0.84", sep: "0.84" },
    { category: "Event cancellation charges", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Event setup materials changes", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Payroll Fixed", jan: "18,59,898", feb: "18,62,192", mar: "19,03,834", apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Ranjan S", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Vinay Kumar R", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Incentives", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Bonus", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Variable Pay [PMS]", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "E1", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "E2", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Statutory", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "TDS", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "PF", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Income Tax", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "GST", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Cess and tax", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Asa Finance limited", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Bajaj Finance Ltd", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Cholarmanalam Investment", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Kotak loan", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Chit Fund", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Others", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Administrative Expense", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Rent", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Electricity", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Telephone", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Rent Maintenance", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Printing & Stationary", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Staff Welfare Expenses", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Other Expenses", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Business Travel Expenses", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Vehicle Maintenance", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Professional charges", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "CA", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "CS Charges", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Management Consultants", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Training", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
    { category: "Other Consultants", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  ];

  const formatNumber = (num) => {
    if (typeof num === 'string') return num;
    if (num === 0) return '0';
    return num.toLocaleString('en-IN');
  };

  const calculateTotal = (data, field) => {
    return data.reduce((sum, row) => {
      if (typeof row[field] === 'number') {
        return sum + row[field];
      }
      return sum;
    }, 0);
  };

  const SectionHeader = ({ title, expanded, onToggle, bgColor = "bg-orange-500" }) => (
    <div 
      className={`${bgColor} text-white p-3 rounded-t-lg flex justify-between items-center cursor-pointer`}
      onClick={onToggle}
    >
      <span className="font-medium">{title}</span>
      {expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
    </div>
  );

  const TabButtons = () => (
    <div className="flex mb-4">
      <div className="flex rounded-full border border-gray-300 bg-white overflow-hidden">
        <button className="bg-orange-500 text-white px-6 py-2 text-sm font-medium rounded-full">Revenue</button>
        <button className="bg-transparent text-gray-600 px-6 py-2 text-sm font-medium">Quantity</button>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Monthly Summary</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>2025-26</span>
            <span>•</span>
            <span>All FY Months</span>
          </div>
        </div>

        {/* Sales Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <SectionHeader 
            title="Sales" 
            expanded={salesExpanded} 
            onToggle={() => setSalesExpanded(!salesExpanded)}
          />
          
          {salesExpanded && (
            <div className="p-4">
              <TabButtons />
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2"></th>
                      <th className="text-center py-2 text-gray-600">Total</th>
                      <th className="text-center py-2 text-gray-600">Apr</th>
                      <th className="text-center py-2 text-gray-600">May</th>
                      <th className="text-center py-2 text-gray-600">Jun</th>
                      <th className="text-center py-2 text-gray-600">Jul</th>
                      <th className="text-center py-2 text-gray-600">Aug</th>
                      <th className="text-center py-2 text-gray-600">Sep</th>
                      <th className="text-center py-2 text-gray-600">Oct</th>
                      <th className="text-center py-2 text-gray-600">Nov</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-medium">{row.category}</td>
                        <td className="text-center py-2">{formatNumber(row.jan)}</td>
                        <td className="text-center py-2">{formatNumber(row.feb)}</td>
                        <td className="text-center py-2">{formatNumber(row.mar)}</td>
                        <td className="text-center py-2">{formatNumber(row.apr)}</td>
                        <td className="text-center py-2">{formatNumber(row.may)}</td>
                        <td className="text-center py-2">{formatNumber(row.jun)}</td>
                        <td className="text-center py-2">{formatNumber(row.jul)}</td>
                        <td className="text-center py-2">{formatNumber(row.aug)}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                      <td className="py-2">Total Sales</td>
                      <td className="text-center py-2">39,38,039</td>
                      <td className="text-center py-2">25,415</td>
                      <td className="text-center py-2">26,478</td>
                      <td className="text-center py-2">87,455</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Collection Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <SectionHeader 
            title="Collection" 
            expanded={collectionExpanded} 
            onToggle={() => setCollectionExpanded(!collectionExpanded)}
          />
          
          {collectionExpanded && (
            <div className="p-4">
              <TabButtons />
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2"></th>
                      <th className="text-center py-2 text-gray-600">Total</th>
                      <th className="text-center py-2 text-gray-600">Apr</th>
                      <th className="text-center py-2 text-gray-600">May</th>
                      <th className="text-center py-2 text-gray-600">Jun</th>
                      <th className="text-center py-2 text-gray-600">Jul</th>
                      <th className="text-center py-2 text-gray-600">Aug</th>
                      <th className="text-center py-2 text-gray-600">Sep</th>
                      <th className="text-center py-2 text-gray-600">Oct</th>
                      <th className="text-center py-2 text-gray-600">Nov</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectionData.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-medium">{row.category}</td>
                        <td className="text-center py-2">{formatNumber(row.jan)}</td>
                        <td className="text-center py-2">{formatNumber(row.feb)}</td>
                        <td className="text-center py-2">{formatNumber(row.mar)}</td>
                        <td className="text-center py-2">{formatNumber(row.apr)}</td>
                        <td className="text-center py-2">{formatNumber(row.may)}</td>
                        <td className="text-center py-2">{formatNumber(row.jun)}</td>
                        <td className="text-center py-2">{formatNumber(row.jul)}</td>
                        <td className="text-center py-2">{formatNumber(row.aug)}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                      <td className="py-2">Total Collection</td>
                      <td className="text-center py-2">39,38,039</td>
                      <td className="text-center py-2">25,415</td>
                      <td className="text-center py-2">26,478</td>
                      <td className="text-center py-2">87,455</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Expenses Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <SectionHeader 
            title="Expenses" 
            expanded={expensesExpanded} 
            onToggle={() => setExpensesExpanded(!expensesExpanded)}
          />
          
          {expensesExpanded && (
            <div className="p-4">
              <TabButtons />
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Expenses</th>
                      <th className="text-center py-2 text-gray-600">Total</th>
                      <th className="text-center py-2 text-gray-600">Apr</th>
                      <th className="text-center py-2 text-gray-600">May</th>
                      <th className="text-center py-2 text-gray-600">Jun</th>
                      <th className="text-center py-2 text-gray-600">Jul</th>
                      <th className="text-center py-2 text-gray-600">Aug</th>
                      <th className="text-center py-2 text-gray-600">Sep</th>
                      <th className="text-center py-2 text-gray-600">Oct</th>
                      <th className="text-center py-2 text-gray-600">Nov</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expensesData.slice(1).map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-medium text-xs">{row.category}</td>
                        <td className="text-center py-2 text-xs">{formatNumber(row.jan)}</td>
                        <td className="text-center py-2 text-xs">{formatNumber(row.feb)}</td>
                        <td className="text-center py-2 text-xs">{formatNumber(row.mar)}</td>
                        <td className="text-center py-2 text-xs">{formatNumber(row.apr)}</td>
                        <td className="text-center py-2 text-xs">{formatNumber(row.may)}</td>
                        <td className="text-center py-2 text-xs">{formatNumber(row.jun)}</td>
                        <td className="text-center py-2 text-xs">{formatNumber(row.jul)}</td>
                        <td className="text-center py-2 text-xs">{formatNumber(row.aug)}</td>
                        <td className="text-center py-2 text-xs">{formatNumber(row.sep)}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-gray-300 font-semibold bg-gray-50">
                      <td className="py-2">Total - Expenses</td>
                      <td className="text-center py-2">38,64,28,07,959,63,572</td>
                      <td className="text-center py-2">38,04,64,50,012</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                      <td className="text-center py-2">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlySummary;