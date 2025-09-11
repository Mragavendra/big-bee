import React from "react";

const OverallSummary = () => {
  const overallSummaryData = [
    {
      month: "Apr",
      sales: "25,415",
      collection: "58,24,153",
      expenses: "10,56,642",
      profits: "10,31,227",
      profitPercent: "-0.058",
      cashFlow: "47,67,511",
    },
    {
      month: "May",
      sales: "13,70,678",
      collection: "21,33,727",
      expenses: "18,95,224",
      profits: "5,24,546",
      profitPercent: "-38",
      cashFlow: "2,38,503",
    },
    {
      month: "Total",
      sales: "39,39,039",
      collection: "90,25,544",
      expenses: "59,63,572",
      profits: "20,52,533",
      profitPercent: "-51",
      cashFlow: "69,50,056",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Bigbee Financial Summary
        </h1>
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
                Month
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Collection
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expenses
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profits
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profit %
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cash Flow
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {overallSummaryData.map((row, idx) => (
              <tr
                key={idx}
                className={
                  row.month === "Total"
                    ? "bg-gray-50 font-medium"
                    : "hover:bg-gray-50"
                }
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {row.month}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                  {row.sales}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                  {row.collection}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                  {row.expenses}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                  {row.profits}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                  {row.profitPercent}
                </td>
                <td className="px-4 py-3 text-sm text-gray-500 text-right">
                  {row.cashFlow}
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
