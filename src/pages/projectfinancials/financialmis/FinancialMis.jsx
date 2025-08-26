import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Download, Eye, ChevronDown, ChevronRight } from "lucide-react";

const bceChartData = [
  { name: "Billing", value: 20000000 },
  { name: "Collection", value: 15000000 },
  { name: "Expenses", value: 28000000 },
];
const bvChartData = [
  { name: "Billing", value: 20000000 },
  { name: "Expenses", value: 28000000 },
];
const cvChartData = [
  { name: "Collection", value: 15000000 },
  { name: "Expenses", value: 28000000 },
  { name: "Profit", value: 5000000 },
];
const incomeAnalysis = {
  planned: 20000000,
  actual: 10000000,
  variance: 10000000,
  percent: 50,
};
const collectionAnalysis = {
  planned: 20000000,
  actual: 10000000,
  variance: 10000000,
  percent: 50,
};
const expensesAnalysis = {
  planned: 30000000,
  actual: 15000000,
  variance: 15000000,
  percent: 50,
};

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

const salesData = [
  { category: "MCA - Govt", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Medical", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Corporate - Regular", jan: 39308039, feb: 23475, mar: 28478, apr: 87453, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Corporate - MCCE", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "GST Difference", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
];

const collectionData = [
  { category: "MCA - Govt", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Medical", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Corporate - Regular", jan: 39308039, feb: 23475, mar: 28478, apr: 87453, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Corporate - MCCE", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "GST Difference", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
];

const expensesData = [
  { category: "Purchase - Vendor", jan: "98,14,238", feb: "78,99,553.72", mar: "98,04,54,951.54", apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Event conducting charges", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Event setup material charges", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Payroll [Fixed]", jan: "76,95,000", feb: "76,95,000", mar: "76,95,000", apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Ranjan S", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Vinay Kumar R", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Variable Pay [KDA]", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "E1", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "E2", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Statutory", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "TDS", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "PT", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Income Tax", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "GST", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Chit and Loan", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Axis finance limited", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Bajaj Finance Ltd", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Cholamandalam Investment", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Kotus loan", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Administrative Expenses", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Rent", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Electricity", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Telephone", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Rent Maintenance", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Printing & Stationery", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Other Natural Expenses", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Other Expenses", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Business Travel Expenses", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Various Maintenance", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Professional Charges", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "CA", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "CS Charges", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Management Consultants", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Printing", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
  { category: "Other Consultants", jan: 0, feb: 0, mar: 0, apr: 0, may: 0, jun: 0, jul: 0, aug: 0, sep: 0 },
];

const calculateTotal = (data, field) => {
  return data.reduce((sum, row) => {
    const value = row[field];
    if (typeof value === "string" && value.includes(",")) {
      return sum + parseFloat(value.replace(/,/g, ""));
    }
    return sum + (typeof value === "number" ? value : 0);
  }, 0);
};

const formatNumber = (num) => {
  if (num === 0) return "0";
  return num.toLocaleString();
};

const BBCAnalysis = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  return (
    <div className="mx-auto p-6 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Monthly Summary</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">2025-26</span>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">All Months</span>
          </div>
        </div>
      </div>

      {[
        { title: "Sales", data: salesData },
        { title: "Collection", data: collectionData },
        { title: "Expenses", data: expensesData },
      ].map(({ title, data }) => (
        <div key={title} className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-4 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-orange-500 cursor-pointer hover:text-orange-600">
                  <Download size={16} />
                </span>
                <span className="text-orange-500 cursor-pointer hover:text-orange-600">
                  <Eye size={16} />
                </span>
              </div>
            </div>
            <div className="flex mt-2 gap-4">
              <button className="bg-orange-500 text-white px-4 py-1 rounded text-sm font-medium">
                Monthly
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded text-sm font-medium hover:bg-gray-300">
                Quarterly
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"].map((m) => (
                    <th key={m} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{m}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.category}</td>
                    {["jan","feb","mar","apr","may","jun","jul","aug","sep"].map((mon) => (
                      <td key={mon} className="px-4 py-3 text-sm text-gray-500 text-center">
                        {typeof row[mon] === "string" ? row[mon] : formatNumber(row[mon])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

const OrderBookings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const orderBookingsData = [
    { category: "", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-medium text-gray-800">Order Bookings</h2>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>
      {isOpen && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Order Bookings
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Budget
                </th>
                <th className="px-4 py-0 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Actual
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Variance
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Actual %
                </th>
              </tr>
            </thead>
            <tbody>
              {orderBookingsData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border">
                    {row.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.budget}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.actual}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.variance}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.actualPercent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 font-medium">Total - Sales</div>
        </div>
      )}
    </div>
  );
};

const SalesBillings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const salesBillingsData = [
    { category: "MCA - Govt", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Medical", budget: "3,00,00,000", actual: "0", variance: "3,00,00,000", actualPercent: "0" },
    { category: "Corporate - Regular", budget: "21,00,00,000", actual: "39,38,039", variance: "20,60,61,961", actualPercent: "1.88" },
    { category: "Corporate - MICE", budget: "20,00,00,000", actual: "0", variance: "20,00,00,000", actualPercent: "0" },
    { category: "GST Difference", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div 
        className=" items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-medium text-gray-800">Sales - Billings</h2>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>
      {isOpen && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Sales - Billings
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Budget
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Actual
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Variance
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Actual %
                </th>
              </tr>
            </thead>
            <tbody>
              {salesBillingsData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border">
                    {row.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.budget}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.actual}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.variance}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.actualPercent}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-medium">
                <td className="px-4 py-3 text-sm text-gray-900 border">Total - Billings</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">44,00,00,000</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">39,38,039</td>
                <td className="px-4 py-3 text-sm text-gray-900 text border">43,60,61,961</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">2</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

const Collection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const collectionData = [
    { category: "MCA - Govt", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Medical", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Corporate - Regular", budget: "0", actual: "90,25,544", variance: "-90,25,544", actualPercent: "0" },
    { category: "Corporate - MICE", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "GST Difference", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-medium text-gray-800">Collection</h2>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>
      {isOpen && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Collection
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Budget
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Actual
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Variance
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Actual %
                </th>
              </tr>
            </thead>
            <tbody>
              {collectionData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border">
                    {row.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.budget}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.actual}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.variance}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.actualPercent}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-medium">
                <td className="px-4 py-3 text-sm text-gray-900 border">Total - Collection</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">0</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">90,25,544</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">-90,25,544</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">0</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const expensesData = [
    { category: "Purchase - Vendor", budget: "35,00,00,000", actual: "29,25,323", variance: "34,70,74,677", actualPercent: "0.84" },
    { category: "MCA - Govt", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Medical", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Payroll [Fixed]", budget: "79,59,986", actual: "18,52,152", variance: "61,07,834", actualPercent: "23.27" },
    { category: "Ranjan S", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Vinay Kumar R", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Incentives", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Bonus", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Variable Pay [KRA]", budget: "25,00,000", actual: "0", variance: "25,00,000", actualPercent: "0" },
    { category: "E1", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "E2", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Statutory", budget: "1,30,32,000", actual: "2,16,201", variance: "1,28,15,799", actualPercent: "1.66" },
    { category: "TDS", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "PT", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Income Tax", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "GST", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Chit and Loan", budget: "20,16,087", actual: "3,22,011", variance: "16,94,076", actualPercent: "15.97" },
    { category: "Axis finance limited", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Bajaj finance Ltd", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Cholamandalam investment", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Kotak loan", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Chit Fund", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "OD Intr", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Administrative Expenses", budget: "23,40,000", actual: "2,62,888", variance: "20,77,112", actualPercent: "11.23" },
    { category: "Rent", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Electricity", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Telephone", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Rent Maintenance", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Printing & Stationary", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Staff Welfare Expenses", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Other Expenses", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Business Travel Expenses", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Vehicle Maintenance", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Professional Charges", budget: "10,00,000", actual: "1,14,500", variance: "8,85,500", actualPercent: "11.45" },
    { category: "CA", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "CS Charges", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Management Consultants", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Trainings", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
    { category: "Other Consultants", budget: "0", actual: "0", variance: "0", actualPercent: "0" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-medium text-gray-800">Expenses</h2>
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>
      {isOpen && (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Expenses
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Budget
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Actual
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Variance
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                  Actual %
                </th>
              </tr>
            </thead>
            <tbody>
              {expensesData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 border">
                    {row.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.budget}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.actual}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.variance}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                    {row.actualPercent}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-medium">
                <td className="px-4 py-3 text-sm text-gray-900 border">Total - Expenses</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">38,64,28,073</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">59,63,572</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">38,04,64,501</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">1.54</td>
              </tr>
              <tr className="bg-gray-50 font-medium">
                <td className="px-4 py-3 text-sm text-gray-900 border">Billing Vs Expenses [Profits]</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">64,28,073</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">-20,25,533</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">90,25,544</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">2.4</td>
              </tr>
              <tr className="bg-gray-50 font-medium">
                <td className="px-4 py-3 text-sm text-gray-900 border">Collection Vs Expenses [Cash Flow]</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">64,28,073</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">30,61,972</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">90,25,544</td>
                <td className="px-4 py-3 text-sm text-gray-900 text-right border">2.5</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

const AnnualSummary = () => {
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [selectedPeriod, setSelectedPeriod] = useState("All FY Months");
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  const annualSummaryData = [
    {
      category: "Order Bookings",
      budget: "0",
      actual: "0",
      variance: "0",
      actualPercent: "0"
    },
    {
      category: "Sales - Billings",
      budget: "0",
      actual: "39,38,039",
      variance: "0",
      actualPercent: "0"
    },
    {
      category: "Collection",
      budget: "0",
      actual: "90,25,544",
      variance: "0",
      actualPercent: "0"
    },
    {
      category: "Expenses",
      budget: "38,64,28,073",
      actual: "59,63,572",
      variance: "38,04,64,501",
      actualPercent: "1.54"
    },
    {
      category: "Profits",
      budget: "0",
      actual: "-20,25,533",
      variance: "0",
      actualPercent: "0"
    },
    {
      category: "Cash Flow",
      budget: "0",
      actual: "30,61,972",
      variance: "0",
      actualPercent: "0"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div 
        className="flex justify-between items-center mb-6 cursor-pointer"
        onClick={() => setIsSummaryOpen(!isSummaryOpen)}
      >
        <h1 className="text-xl font-semibold text-gray-900">Annual Summary</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{selectedYear}</span>
          <span className="text-sm text-gray-600">•</span>
          <span className="text-sm text-gray-600">{selectedPeriod}</span>
          {isSummaryOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {isSummaryOpen && (
        <>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-gray-800">Total</h2>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-ray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Annual Summary
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Actual
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Variance
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Actual %
                  </th>
                </tr>
              </thead>
              <tbody>
                {annualSummaryData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border">
                      {row.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                      {row.budget}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                      {row.actual}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                      {row.variance}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                      {row.actualPercent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <OrderBookings />
      <SalesBillings />
      <Collection />
      <Expenses />
    </div>
  );
};

const OverallSummary = () => {
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [selectedPeriod, setSelectedPeriod] = useState("All FY Months");
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  const overallSummaryData = [
    {
      category: "Order Bookings",
      budget: "0",
      actual: "0",
      variance: "0",
      actualPercent: "0"
    },
    {
      category: "Sales - Billings",
      budget: "0",
      actual: "39,38,039",
      variance: "0",
      actualPercent: "0"
    },
    {
      category: "Collection",
      budget: "0",
      actual: "90,25,544",
      variance: "0",
      actualPercent: "0"
    },
    {
      category: "Expenses",
      budget: "38,64,28,073",
      actual: "59,63,572",
      variance: "38,04,64,501",
      actualPercent: "1.54"
    },
    {
      category: "Profits",
      budget: "0",
      actual: "-20,25,533",
      variance: "0",
      actualPercent: "0"
    },
    {
      category: "Cash Flow",
      budget: "0",
      actual: "30,61,972",
      variance: "0",
      actualPercent: "0"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div 
        className="flex justify-between items-center mb-6 cursor-pointer"
        onClick={() => setIsSummaryOpen(!isSummaryOpen)}
      >
        <h1 className="text-xl font-semibold text-gray-900">Overall Summary</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">{selectedYear}</span>
          <span className="text-sm text-gray-600">•</span>
          <span className="text-sm text-gray-600">{selectedPeriod}</span>
          {isSummaryOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {isSummaryOpen && (
        <>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-medium text-gray-800">Total</h2>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Overall Summary
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Actual
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Variance
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border">
                    Actual %
                  </th>
                </tr>
              </thead>
              <tbody>
                {overallSummaryData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border">
                      {row.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                      {row.budget}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                      {row.actual}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                      {row.variance}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right border">
                      {row.actualPercent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <OrderBookings />
      <SalesBillings />
      <Collection />
      <Expenses />
    </div>
  );
};

const FinancialMis = () => {
  const [value, setValue] = useState(0);
  const [selectedYear, setSelectedYear] = useState("2025-26");
  const [selectedMonth, setSelectedMonth] = useState("Jul");

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/financial-mis/add");
  };

  const handleEditClick = () => {
    console.log("Edit clicked");
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex bg-white border border-orange-500 rounded-lg p-0.5">
          <div className="flex gap-0.5">
            {["Monthly MIS", "Monthly Summary", "Annual", "Overall Summary"].map(
              (tab, index) => (
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
              )
            )}
          </div>
        </div>

        {value === 0 && (
          <div className="items-center gap-2">
            <button className="bg-white border border-gray-300 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-50">
              Export
            </button>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white border border-gray-300 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg"
            >
              <option value="2024-25">2024-25</option>
              <option value="2025-26">2025-26</option>
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white border border-gray-300 text-gray-800 text-sm font-medium px-3 py-2 rounded-lg"
            >
              {[
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <button
              className="border border-orange-400 text-orange-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-50 flex items-center"
              style={{ textTransform: "none" }}
              onClick={handleEditClick}
            >
              <EditIcon className="mr-1" style={{ fontSize: 18 }} />
              Edit
            </button>
            <button
              className="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center"
              style={{ textTransform: "none" }}
              onClick={handleAddClick}
            >
              <AddIcon className="mr-1" style={{ fontSize: 18 }} />
              Add
            </button>
          </div>
        )}
      </div>

      <TabPanel value={value} index={0}>
        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-base font-semib mb-4">
              Billing - Collection - Expenses
            </h3>
            <ResponsiveContainer width="0%" height={160}>
              <BarChart data={bceChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#202020" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-base font-semibold mb-4">Billing Vs Expenses</h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={bvChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#ee7110" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-white rounded-lg shadow border p-6">
            <h3 className="text-base font-semibold mb-4">Collection Vs Expenses</h3>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart
                data={cvChartData}
                layout="horizontal"
                margin={{ left: 60, right: 30 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={60} />
                <Tooltip />
                <Bar dataKey="value" fill="#ee7110" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex gap mb-4">
          <div className="flex-1 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-base font-semibold">Income Analysis</h3>
              <span className="text-xs text-gray-500 cursor-pointer">
                View Breakdown ▼
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray">Planned</span>
                <span className="font-medium">
                  {incomeAnalysis.planned.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Actual</span>
                <span className="font-medium">
                  {incomeAnalysis.actual.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Variance</span>
                <span className="font-medium">
                  {incomeAnalysis.variance.toLocaleString()} (
                  {incomeAnalysis.percent}%)
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-base font-semibold">Collection Analysis</h3>
              <span className="text-xs text-gray-500 cursor-pointer">
                View Breakdown ▼
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Planned</span>
                <span className="font-medium">
                  {collectionAnalysis.planned.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Actual</span>
                <span className="font-medium">
                  {collectionAnalysis.actual.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Variance</span>
                <span className="font-medium">
                  {collectionAnalysis.variance.toLocaleString()} (
                  {collectionAnalysis.percent}%)
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>2025-26</span>
              <span>All FY Months ▼</span>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-base font-semibold">Expenses Analysis</h3>
              <span className="text-xs text-gray-500 cursor-pointer">ℹ️</span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Planned</span>
                <span className="font-medium">
                  {expensesAnalysis.planned.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Actual</span>
                <span className="font-medium">
                  {expensesAnalysis.actual.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Variance</span>
                <span className="font-medium">
                  {expensesAnalysis.variance.toLocaleString()} (
                  {expensesAnalysis.percent}%)
                </span>
              </div>
            </div>
            <div className="text-sm">
              <span className="cursor-pointer">View Breakdown ▼</span>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <BBCAnalysis />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AnnualSummary/>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <OverallSummary />
      </TabPanel>
    </div>
  );
};
export default FinancialMis;