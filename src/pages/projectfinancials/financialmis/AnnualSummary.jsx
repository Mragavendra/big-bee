import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const AnnualSummary = () => {
  const [selectedYear] = useState("2025-26");
  const [selectedPeriod] = useState("All FY Months");
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  const annualSummaryData = [
    {
      category: "Order Bookings",
      budget: "0",
      actual: "0",
      variance: "0",
      actualPercent: "0%",
    },
    {
      category: "Sales - Billings",
      budget: "44,00,00,000",
      actual: "39,38,039",
      variance: "43,60,61,961",
      actualPercent: "9%",
    },
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
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
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
              {annualSummaryData.map((row, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
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
      )}
    </div>
  );
};

export default AnnualSummary;
