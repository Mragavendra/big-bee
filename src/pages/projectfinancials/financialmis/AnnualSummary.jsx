import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const AnnualSummary = () => {
  const [orderBookingsExpanded, setOrderBookingsExpanded] = useState(true);
  const [orderBookings2Expanded, setOrderBookings2Expanded] = useState(true);
  const [salesBillingsExpanded, setSalesBillingsExpanded] = useState(true);
  const [salesBillings2Expanded, setSalesBillings2Expanded] = useState(true);
  const [collectionsExpanded, setCollectionsExpanded] = useState(true);
  const [collections2Expanded, setCollections2Expanded] = useState(true);
  const [expensesExpanded, setExpensesExpanded] = useState(true);
  const [expenses2Expanded, setExpenses2Expanded] = useState(true);

  const orderBookingsData = [
    { category: "Apr 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "May 25", budget: 0, actual: 14, variance: 0, actualPercent: 0 },
    { category: "Jun 25", budget: 0, actual: 16, variance: 0, actualPercent: 0 },
    { category: "Jul 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Aug 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Sep 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Oct 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Nov 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Dec 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Jan 26", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Feb 26", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Mar 26", budget: 0, actual: 11, variance: 0, actualPercent: 0 },
  ];

  const orderBookings2Data = [
    { category: "Budget", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Target - Sales", budget: 0, actual: 41, variance: 0, actualPercent: 0 },
    { category: "Sales - Billings", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  ];

  const salesBillingsData = [
    { category: "Apr 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "May 25", budget: 0, actual: 14, variance: 0, actualPercent: 0 },
    { category: "Jun 25", budget: 0, actual: 16, variance: 0, actualPercent: 0 },
    { category: "Jul 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Aug 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Sep 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Oct 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Nov 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Dec 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Jan 26", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Feb 26", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Mar 26", budget: 0, actual: 11, variance: 0, actualPercent: 0 },
  ];

  const salesBillings2Data = [
    { category: "MCA - Govt", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Medical", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Corporate - Regular", budget: "44,00,00,000", actual: "39,38,039", variance: "43,60,61,961", actualPercent: 9 },
    { category: "Corporate - MICE", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "GST Difference", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Total - Billings", budget: "44,00,00,000", actual: "39,38,039", variance: "43,60,61,961", actualPercent: 0 },
  ];

  const collectionsData = [
    { category: "Apr 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "May 25", budget: 0, actual: 14, variance: 0, actualPercent: 0 },
    { category: "Jun 25", budget: 0, actual: 16, variance: 0, actualPercent: 0 },
    { category: "Jul 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Aug 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Sep 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Oct 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Nov 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Dec 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Jan 26", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Feb 26", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Mar 26", budget: 0, actual: 11, variance: 0, actualPercent: 0 },
  ];

  const collections2Data = [
    { category: "MCA - Govt", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Medical", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Corporate - Regular", budget: "44,00,00,000", actual: "39,38,039", variance: "43,60,61,961", actualPercent: 9 },
    { category: "Corporate - MICE", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "GST Difference", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Total - Collections", budget: "44,00,00,000", actual: "39,38,039", variance: "43,60,61,961", actualPercent: 0 },
  ];

  const expensesData = [
    { category: "Apr 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "May 25", budget: 0, actual: 14, variance: 0, actualPercent: 0 },
    { category: "Jun 25", budget: 0, actual: 16, variance: 0, actualPercent: 0 },
    { category: "Jul 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Aug 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Sep 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Oct 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Nov 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Dec 25", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Jan 26", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Feb 26", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Mar 26", budget: 0, actual: 11, variance: 0, actualPercent: 0 },
  ];

  const expenses2Data = [
  { category: "Purchases - Vendors", budget: "56,59,694", actual: "25,923", variance: "56,33,771", actualPercent: 0.46 },
  { category: "MCA - Govt", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Medical", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Payroll Fixed", budget: "56,59,694", actual: "56,25,925", variance: "33,769", actualPercent: 99.4 },
  { category: "Vijay Kumar R", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Rajan S", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Business - Vendors", budget: "56,59,694", actual: 0.54, variance: "56,59,693.46", actualPercent: 0 },
  { category: "Billing in Expenses [Reversal]", budget: "-56,59,694", actual: "-56,25,925", variance: "-33,769", actualPercent: 0 },
  { category: "TDS", budget: "-1,50,000", actual: "-1,50,000", variance: 0, actualPercent: 100 },
  { category: "GST", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "CGST & SGST", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "OFC Loan", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Kotak Loan", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Axis Finance Ltd", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "ID Fund", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Administrative Expenses", budget: "24,50,000", actual: "2,42,868", variance: "22,07,132", actualPercent: 9.91 },
  { category: "Rent", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Electricity", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Telephone", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Staff & Welfare Expenses", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Business Travel Expenses", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Professional Charges", budget: "10,00,000", actual: "1,14,500", variance: "8,85,500", actualPercent: 11.45 },
  { category: "CA", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Tax Charges", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Other Consultants", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
  { category: "Other Expenses (Profits)", budget: "36,42,073", actual: "59,63,572", variance: "-23,21,499", actualPercent: 163.74 },
  { category: "Total Expenses", budget: "64,28,073", actual: "90,25,944", variance: "-25,97,871", actualPercent: 140.41 },
];

  const formatNumber = (num) => {
    if (typeof num === "string") return num;
    if (num === 0) return "0";
    return num.toLocaleString("en-IN");
  };

  const SectionHeader = ({ title, expanded, onToggle, bgColor = "bg-orange-500" }) => (
    <div
      className={`${bgColor} text-white p-3 flex justify-between items-center cursor-pointer text-sm font-medium`}
      onClick={onToggle}
    >
      <span>{title}</span>
      {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </div>
  );

  return (
    <div>
      <div className="mx-auto space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Annual Summary</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>2025-26</span>
            <span>•</span>
            <span>All FY Months</span>
          </div>
        </div>

        {/* Order Bookings Section 1 */}
        <div className="border border-gray-200 rounded">
          <SectionHeader
            title="Order Bookings"
            expanded={orderBookingsExpanded}
            onToggle={() => setOrderBookingsExpanded(!orderBookingsExpanded)}
          />
          {orderBookingsExpanded && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left py-2"></th>
                      <th className="text-center py-2">Budget</th>
                      <th className="text-center py-2">Actual</th>
                      <th className="text-center py-2">Variance</th>
                      <th className="text-center py-2">Actual %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderBookingsData.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-medium">{row.category}</td>
                        <td className="text-center py-2">{formatNumber(row.budget)}</td>
                        <td className="text-center py-2">{formatNumber(row.actual)}</td>
                        <td className="text-center py-2">{formatNumber(row.variance)}</td>
                        <td className="text-center py-2">{formatNumber(row.actualPercent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Order Bookings Section 2 */}
        <div className="border border-gray-200 rounded">
          <SectionHeader
            title="Order Bookings"
            expanded={orderBookings2Expanded}
            onToggle={() => setOrderBookings2Expanded(!orderBookings2Expanded)}
          />
          {orderBookings2Expanded && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left py-2"></th>
                      <th className="text-center py-2">Budget</th>
                      <th className="text-center py-2">Actual</th>
                      <th className="text-center py-2">Variance</th>
                      <th className="text-center py-2">Actual %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderBookings2Data.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-medium">{row.category}</td>
                        <td className="text-center py-2">{formatNumber(row.budget)}</td>
                        <td className="text-center py-2">{formatNumber(row.actual)}</td>
                        <td className="text-center py-2">{formatNumber(row.variance)}</td>
                        <td className="text-center py-2">{formatNumber(row.actualPercent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sales - Billings Section 1 */}
        <div className="border border-gray-200 rounded">
          <SectionHeader
            title="Sales - Billings"
            expanded={salesBillingsExpanded}
            onToggle={() => setSalesBillingsExpanded(!salesBillingsExpanded)}
          />
          {salesBillingsExpanded && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left py-2"></th>
                      <th className="text-center py-2">Budget</th>
                      <th className="text-center py-2">Actual</th>
                      <th className="text-center py-2">Variance</th>
                      <th className="text-center py-2">Actual %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesBillingsData.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-medium">{row.category}</td>
                        <td className="text-center py-2">{formatNumber(row.budget)}</td>
                        <td className="text-center py-2">{formatNumber(row.actual)}</td>
                        <td className="text-center py-2">{formatNumber(row.variance)}</td>
                        <td className="text-center py-2">{formatNumber(row.actualPercent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sales - Billings Section 2 */}
        <div className="border border-gray-200 rounded">
          <SectionHeader
            title="Sales - Billings"
            expanded={salesBillings2Expanded}
            onToggle={() => setSalesBillings2Expanded(!salesBillings2Expanded)}
          />
          {salesBillings2Expanded && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left py-2"></th>
                      <th className="text-center py-2">Budget</th>
                      <th className="text-center py-2">Actual</th>
                      <th className="text-center py-2">Variance</th>
                      <th className="text-center py-2">Actual %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesBillings2Data.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b hover:bg-gray-50 ${
                          row.category === "Total - Billings" ? "font-semibold bg-gray-50" : ""
                        }`}
                      >
                        <td className="py-2 font-medium">{row.category}</td>
                        <td className="text-center py-2">{formatNumber(row.budget)}</td>
                        <td className="text-center py-2">{formatNumber(row.actual)}</td>
                        <td className="text-center py-2">{formatNumber(row.variance)}</td>
                        <td className="text-center py-2">{formatNumber(row.actualPercent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Collections Section 1 */}
        <div className="border border-gray-200 rounded">
          <SectionHeader
            title="Collections"
            expanded={collectionsExpanded}
            onToggle={() => setCollectionsExpanded(!collectionsExpanded)}
          />
          {collectionsExpanded && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left py-2"></th>
                      <th className="text-center py-2">Budget</th>
                      <th className="text-center py-2">Actual</th>
                      <th className="text-center py-2">Variance</th>
                      <th className="text-center py-2">Actual %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collectionsData.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-medium">{row.category}</td>
                        <td className="text-center py-2">{formatNumber(row.budget)}</td>
                        <td className="text-center py-2">{formatNumber(row.actual)}</td>
                        <td className="text-center py-2">{formatNumber(row.variance)}</td>
                        <td className="text-center py-2">{formatNumber(row.actualPercent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Collections Section 2 */}
        <div className="border border-gray-200 rounded">
          <SectionHeader
            title="Collections"
            expanded={collections2Expanded}
            onToggle={() => setCollections2Expanded(!collections2Expanded)}
          />
          {collections2Expanded && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left py-2"></th>
                      <th className="text-center py-2">Budget</th>
                      <th className="text-center py-2">Actual</th>
                      <th className="text-center py-2">Variance</th>
                      <th className="text-center py-2">Actual %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collections2Data.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b hover:bg-gray-50 ${
                          row.category === "Total - Collections" ? "font-semibold bg-gray-50" : ""
                        }`}
                      >
                        <td className="py-2 font-medium">{row.category}</td>
                        <td className="text-center py-2">{formatNumber(row.budget)}</td>
                        <td className="text-center py-2">{formatNumber(row.actual)}</td>
                        <td className="text-center py-2">{formatNumber(row.variance)}</td>
                        <td className="text-center py-2">{formatNumber(row.actualPercent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Expenses Section 1 */}
        <div className="border border-gray-200 rounded">
          <SectionHeader
            title="Expenses"
            expanded={expensesExpanded}
            onToggle={() => setExpensesExpanded(!expensesExpanded)}
          />
          {expensesExpanded && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left py-2"></th>
                      <th className="text-center py-2">Budget</th>
                      <th className="text-center py-2">Actual</th>
                      <th className="text-center py-2">Variance</th>
                      <th className="text-center py-2">Actual %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expensesData.map((row, idx) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="py-2 font-medium">{row.category}</td>
                        <td className="text-center py-2">{formatNumber(row.budget)}</td>
                        <td className="text-center py-2">{formatNumber(row.actual)}</td>
                        <td className="text-center py-2">{formatNumber(row.variance)}</td>
                        <td className="text-center py-2">{formatNumber(row.actualPercent)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Expenses Section 2 */}
        <div className="border border-gray-200 rounded">
          <SectionHeader
            title="Expenses"
            expanded={expenses2Expanded}
            onToggle={() => setExpenses2Expanded(!expenses2Expanded)}
          />
          {expenses2Expanded && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b text-gray-600">
                      <th className="text-left py-2"></th>
                      <th className="text-center py-2">Budget</th>
                      <th className="text-center py-2">Actual</th>
                      <th className="text-center py-2">Variance</th>
                      <th className="text-center py-2">Actual %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses2Data.map((row, idx) => (
                      <tr
                        key={idx}
                        className={`border-b hover:bg-gray-50 ${
                          row.category === "Total Expenses" ? "font-semibold bg-gray-50" : ""
                        }`}
                      >
                        <td className="py-2 font-medium">{row.category}</td>
                        <td className="text-center py-2">{formatNumber(row.budget)}</td>
                        <td className="text-center py-2">{formatNumber(row.actual)}</td>
                        <td className="text-center py-2">{formatNumber(row.variance)}</td>
                        <td className="text-center py-2">{formatNumber(row.actualPercent)}</td>
                      </tr>
                    ))}
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

export default AnnualSummary;