import React from "react";

const OverallSummary = () => {
  const overallSummaryData = [
    { category: "Purchases - Vendor", budget: "35,00,00,000", actual: "29,25,923", variance: "34,70,74,677", actualPercent: 0.84 },
    { category: "MCA - Govt", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Medical", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Payroll [Fixed]", budget: "79,59,986", actual: "18,52,152", variance: "61,07,834", actualPercent: 23.27 },
    { category: "Rajan S", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Vinay Kumar R", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Incentives", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Bonus", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Variable Pay [KRA]", budget: "25,00,000", actual: 0, variance: "25,00,000", actualPercent: 0 },
    { category: "EI", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Statutory", budget: "1,30,32,000", actual: "2,16,201", variance: "1,28,15,799", actualPercent: 1.66 },
    { category: "TDS", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "PT", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Income Tax", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "GST", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Chit and Loan", budget: "20,16,087", actual: "3,22,011", variance: "16,94,076", actualPercent: 15.97 },
    { category: "Axis Finance Ltd", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Bajaj Finance Ltd", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Cholamandalam Investment", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Kotak Loan", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Chit Fund", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "OD Intr", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Administrative Expenses", budget: "23,40,000", actual: "2,52,868", variance: "20,87,132", actualPercent: 11.23 },
    { category: "Rent", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Electricity", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Telephone", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Rent Maintenance", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Printing & Stationary", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Staff Welfare Expenses", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Other Expenses", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Business Travel Expenses", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Vehicle Maintenance", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Professional Charges", budget: "10,00,000", actual: "1,14,500", variance: "8,85,500", actualPercent: 11.45 },
    { category: "CA", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "CS Charges", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Management Consultants", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Trainings", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Other Consultants", budget: 0, actual: 0, variance: 0, actualPercent: 0 },
    { category: "Total - Expenses", budget: "38,64,28,073", actual: "59,63,572", variance: "38,04,64,501", actualPercent: 1.54 },
    { category: "Billing Vs Expenses [Profits]", budget: "64,28,073", actual: "-20,25,533", variance: "90,25,544", actualPercent: 2.4 },
    { category: "Collection Vs Expenses [Cash Flow]", budget: "64,28,073", actual: "30,61,972", variance: "90,25,544", actualPercent: 2.5 },
  ];

  const formatNumber = (num) => {
    if (typeof num === "string") return num;
    if (num === 0) return "0";
    return num.toLocaleString("en-IN");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Bigbee Financial Summary</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">2025-26</span>
          <span className="text-sm text-gray-600">•</span>
          <span className="text-sm text-gray-600">All Months</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actual
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Variance
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actual %
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {overallSummaryData.map((row, idx) => (
              <tr
                key={idx}
                className={
                  row.category === "Total - Expenses"
                    ? "bg-gray-50 font-medium"
                    : "hover:bg-gray-50"
                }
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {row.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                  {formatNumber(row.budget)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                  {formatNumber(row.actual)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                  {formatNumber(row.variance)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                  {formatNumber(row.actualPercent)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverallSummary;