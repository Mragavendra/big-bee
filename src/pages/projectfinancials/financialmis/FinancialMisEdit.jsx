import React, { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FinancialMisEdit = () => {
  const [selectedMonth, setSelectedMonth] = useState("january");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    salesBilling: {
      "MCA - Govt": { plan: "100000", actual: "95000", ach: "95" },
      Medical: { plan: "50000", actual: "48000", ach: "96" },
      "Corporate - Regular": { plan: "75000", actual: "70000", ach: "93" },
      "Corporate - MCCE": { plan: "60000", actual: "58000", ach: "97" },
      "GST Difference": { plan: "20000", actual: "18000", ach: "90" },
    },
    collection: {
      "MCA - Govt": { plan: "95000", actual: "90000", ach: "95" },
      Medical: { plan: "48000", actual: "46000", ach: "96" },
      "Corporate - Regular": { plan: "70000", actual: "68000", ach: "97" },
      "Corporate - MCCE": { plan: "58000", actual: "55000", ach: "95" },
      "GST Difference": { plan: "18000", actual: "17000", ach: "94" },
    },
    expenses: {
      "Purchase - Vendor": {
        plan: "Auto value add",
        actual: "Auto value add",
        ach: "Auto value add",
      },
      "Event conducting charges": { plan: "15000", actual: "14000", ach: "93" },
      "Event setup materials charges": { plan: "10000", actual: "9500", ach: "95" },
    },
    payrollFixed: {
      "Payroll [Fixed]": {
        plan: "Auto value add",
        actual: "Auto value add",
        ach: "Auto value add",
      },
      "Ranjan S": { plan: "30000", actual: "30000", ach: "100" },
      "Vinay Kumar R": { plan: "28000", actual: "28000", ach: "100" },
    },
    variablePay: {
      "Variable Pay [KDA]": {
        plan: "Auto value add",
        actual: "Auto value add",
        ach: "Auto value add",
      },
      E1: { plan: "5000", actual: "4500", ach: "90" },
      E2: { plan: "6000", actual: "5500", ach: "92" },
    },
    statutory: {
      Statutory: {
        plan: "Auto value add",
        actual: "Auto value add",
        ach: "Auto value add",
      },
      TDS: { plan: "8000", actual: "8000", ach: "100" },
      PT: { plan: "2000", actual: "2000", ach: "100" },
      "Income Tax": { plan: "15000", actual: "14500", ach: "97" },
      GST: { plan: "12000", actual: "11500", ach: "96" },
    },
    chitAndLoan: {
      "Chit and Loan": {
        plan: "Auto value add",
        actual: "Auto value add",
        ach: "Auto value add",
      },
      "Axis finance limited": { plan: "10000", actual: "10000", ach: "100" },
      "Bajaj finance Ltd": { plan: "8000", actual: "8000", ach: "100" },
      "Cholamandalam Investment": { plan: "9000", actual: "8500", ach: "94" },
      "Kotus loan": { plan: "7000", actual: "7000", ach: "100" },
    },
    administrative: {
      "Administrative Expenses": {
        plan: "Auto value add",
        actual: "Auto value add",
        ach: "Auto value add",
      },
      Rent: { plan: "25000", actual: "25000", ach: "100" },
      Electricity: { plan: "5000", actual: "4800", ach: "96" },
      Telephone: { plan: "2000", actual: "1900", ach: "95" },
      "Rent Maintenance": { plan: "3000", actual: "2900", ach: "97" },
    },
    otherExpenses: {
      "Other Expenses": {
        plan: "Auto value add",
        actual: "Auto value add",
        ach: "Auto value add",
      },
      "Business Travel Expenses": { plan: "12000", actual: "11000", ach: "92" },
      "Various Maintenance": { plan: "6000", actual: "5800", ach: "97" },
    },
    professional: {
      "Professional Charges": {
        plan: "Auto value add",
        actual: "Auto value add",
        ach: "Auto value add",
      },
      CA: { plan: "10000", actual: "9500", ach: "95" },
      "CS Charges": { plan: "8000", actual: "7500", ach: "94" },
    },
  });

  const handleInputChange = (section, item, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [item]: {
          ...prev[section][item],
          [field]: value,
        },
      },
    }));
  };

  const renderTwoColumnSection = (
    leftTitle,
    rightTitle,
    leftData,
    rightData,
    leftKey,
    rightKey
  ) => (
    <div className="grid grid-cols-2 gap-6 mb-8">
      {/* Left Column */}
      <div className="bg-white">
        <div className="mb-4">
          <h3 className="text-base font-medium text-gray-800 mb-3">
            {leftTitle}
          </h3>
          <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-600 mb-2 px-2">
            <div></div>
            <div className="text-center">Plan</div>
            <div className="text-center">Actual</div>
            <div className="text-center">Ach %</div>
          </div>
          {Object.entries(leftData).map(([item, values]) => (
            <div
              key={item}
              className="grid grid-cols-4 gap-2 items-center py-2 hover:bg-gray-50"
            >
              <div className="text-sm text-gray-700 px-2">{item}</div>
              <div>
                <input
                  type="text"
                  value={values.plan}
                  onChange={(e) =>
                    handleInputChange(leftKey, item, "plan", e.target.value)
                  }
                  placeholder="Enter value"
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  disabled={values.plan === "Auto value add"}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={values.actual}
                  onChange={(e) =>
                    handleInputChange(leftKey, item, "actual", e.target.value)
                  }
                  placeholder="Enter value"
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  disabled={values.actual === "Auto value add"}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={values.ach}
                  onChange={(e) =>
                    handleInputChange(leftKey, item, "ach", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-center"
                  disabled={values.ach === "Auto value add"}
                />
              </div>
            </div>
          ))}
          <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm mt-2 px-2">
            <Plus size={14} className="mr-1" />
            Add
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div className="bg-white">
        <div className="mb-4">
          <h3 className="text-base font-medium text-gray-800 mb-3">
            {rightTitle}
          </h3>
          <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-600 mb-2 px-2">
            <div></div>
            <div className="text-center">Plan</div>
            <div className="text-center">Actual</div>
            <div className="text-center">Ach %</div>
          </div>
          {Object.entries(rightData).map(([item, values]) => (
            <div
              key={item}
              className="grid grid-cols-4 gap-2 items-center py-2 hover:bg-gray-50"
            >
              <div className="text-sm text-gray-700 px-2">{item}</div>
              <div>
                <input
                  type="text"
                  value={values.plan}
                  onChange={(e) =>
                    handleInputChange(rightKey, item, "plan", e.target.value)
                  }
                  placeholder="Enter value"
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={values.actual}
                  onChange={(e) =>
                    handleInputChange(rightKey, item, "actual", e.target.value)
                  }
                  placeholder="Enter value"
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={values.ach}
                  onChange={(e) =>
                    handleInputChange(rightKey, item, "ach", e.target.value)
                  }
                  placeholder="0"
                  className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-center"
                />
              </div>
            </div>
          ))}
          <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm mt-2 px-2">
            <Plus size={14} className="mr-1" />
            Add
          </button>
        </div>
      </div>
    </div>
  );

  const renderExpenseSection = (title, data, sectionKey, showTitle = true) => (
    <div className="mb-6">
      {showTitle && (
        <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
      )}
      <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-600 mb-2 px-2">
        <div></div>
        <div className="text-center">Plan</div>
        <div className="text-center">Actual</div>
        <div className="text-center">Ach %</div>
      </div>
      {Object.entries(data).map(([item, values]) => (
        <div
          key={item}
          className="grid grid-cols-4 gap-2 items-center py-2 hover:bg-gray-50"
        >
          <div className="text-sm text-gray-700 px-2">{item}</div>
          <div>
            <input
              type="text"
              value={values.plan}
              onChange={(e) =>
                handleInputChange(sectionKey, item, "plan", e.target.value)
              }
              placeholder={
                values.plan === "Auto value add"
                  ? "Auto value add"
                  : "Enter value"
              }
              className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              disabled={values.plan === "Auto value add"}
            />
          </div>
          <div>
            <input
              type="text"
              value={values.actual}
              onChange={(e) =>
                handleInputChange(sectionKey, item, "actual", e.target.value)
              }
              placeholder={
                values.actual === "Auto value add"
                  ? "Auto value add"
                  : "Enter value"
              }
              className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              disabled={values.actual === "Auto value add"}
            />
          </div>
          <div>
            <input
              type="text"
              value={values.ach}
              onChange={(e) =>
                handleInputChange(sectionKey, item, "ach", e.target.value)
              }
              placeholder={
                values.ach === "Auto value add"
                  ? "Auto value add"
                  : "Enter value"
              }
              className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-center"
              disabled={values.ach === "Auto value add"}
            />
          </div>
        </div>
      ))}
      <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm mt-2 px-2">
        <Plus size={14} className="mr-1" />
        Add one more
      </button>
    </div>
  );

  return (
    <div className="mx-auto p-6 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Edit Monthly MIS
          </h1>
          <div className="flex gap-3">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded font-medium text-sm"
              onClick={() => navigate("/financial-mis")}
            >
              Cancel
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-medium text-sm">
              Update
            </button>
          </div>
        </div>

        {/* Month Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Month*
          </label>
          <div className="relative max-w-sm">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none pr-10"
            >
              <option value="">Select</option>
              <option value="january">January</option>
              <option value="february">February</option>
              <option value="march">March</option>
              <option value="april">April</option>
              <option value="may">May</option>
              <option value="june">June</option>
              <option value="july">July</option>
              <option value="august">August</option>
              <option value="september">September</option>
              <option value="october">October</option>
              <option value="november">November</option>
              <option value="december">December</option>
            </select>
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        {/* Sales - Billing and Collection (Two Column Layout) */}
        {renderTwoColumnSection(
          "Sales - Billings",
          "Collection",
          formData.salesBilling,
          formData.collection,
          "salesBilling",
          "collection"
        )}

        {/* Expenses Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Expenses</h2>

          {/* Main Expenses */}
          {renderExpenseSection("", formData.expenses, "expenses", false)}

          {/* Payroll [Fixed] */}
          {renderExpenseSection(
            "Payroll [Fixed]",
            formData.payrollFixed,
            "payrollFixed"
          )}

          {/* Variable Pay [KDA] */}
          {renderExpenseSection(
            "Variable Pay [KDA]",
            formData.variablePay,
            "variablePay"
          )}

          {/* Statutory */}
          {renderExpenseSection("Statutory", formData.statutory, "statutory")}

          {/* Chit and Loan */}
          {renderExpenseSection(
            "Chit and Loan",
            formData.chitAndLoan,
            "chitAndLoan"
          )}

          {/* Administrative Expenses */}
          {renderExpenseSection(
            "Administrative Expenses",
            formData.administrative,
            "administrative"
          )}

          {/* Other Expenses */}
          {renderExpenseSection(
            "Other Expenses",
            formData.otherExpenses,
            "otherExpenses"
          )}

          {/* Professional Charges */}
          {renderExpenseSection(
            "Professional Charges",
            formData.professional,
            "professional"
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialMisEdit;