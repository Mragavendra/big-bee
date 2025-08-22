import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PerformanceMisEdit = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    billingNo: 'BILL-1234',
    enquiryNo: 'ENQ-5678',
    invoiceDate: '2025-08-15',
    projectName: 'Metro Rail Project Phase 2',
    basicAmt: '500000',
    tax: '90000',
    totalAmt: '590000',
    payments: [
      { amount: '200000', date: '2025-08-20' },
      { amount: '150000', date: '2025-09-05' }
    ],
    totalCollectedAmt: '350000',
    balance: '240000',
    tdsAmount: '15000',
    creditNote: '10000',
    balanceAfterTds: '215000'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (index, field, value) => {
    const newPayments = [...formData.payments];
    newPayments[index][field] = value;
    setFormData(prev => ({
      ...prev,
      payments: newPayments
    }));
  };

  const addMorePayments = () => {
    setFormData(prev => ({
      ...prev,
      payments: [...prev.payments, { amount: '', date: '' }]
    }));
  };

  const handleSave = () => {
    console.log('Updated Form Data:', formData);
    // Save / Update API Call here
  };

  const handleCancel = () => {
    navigate('/performance-mis');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Project Profitability Analysis Report
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              Update
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Project Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Project Information
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing No*
                    </label>
                    <input
                      type="text"
                      name="billingNo"
                      value={formData.billingNo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enquiry No*
                    </label>
                    <input
                      type="text"
                      name="enquiryNo"
                      value={formData.enquiryNo}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Date*
                  </label>
                  <input
                    type="date"
                    name="invoiceDate"
                    value={formData.invoiceDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Billing Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Billing Details</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Basic Amt
                    </label>
                    <input
                      type="number"
                      name="basicAmt"
                      value={formData.basicAmt}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax
                    </label>
                    <input
                      type="number"
                      name="tax"
                      value={formData.tax}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Amt
                  </label>
                  <input
                    type="number"
                    name="totalAmt"
                    value={formData.totalAmt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Collection Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Collection Section</h2>

              <div className="space-y-6">
                {formData.payments.map((payment, index) => (
                  <div key={index}>
                    <h3 className="text-base font-medium text-gray-800 mb-4">
                      Payment {index + 1}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount
                        </label>
                        <input
                          type="number"
                          value={payment.amount}
                          onChange={(e) =>
                            handlePaymentChange(index, 'amount', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={payment.date}
                          onChange={(e) =>
                            handlePaymentChange(index, 'date', e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addMorePayments}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  <span className="mr-2">+</span>
                  Add more Payments
                </button>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Collected Amt
                  </label>
                  <input
                    type="number"
                    name="totalCollectedAmt"
                    value={formData.totalCollectedAmt}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Adjustments & Final Summary */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Adjustments & Final Summary
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Balance
                  </label>
                  <input
                    type="number"
                    name="balance"
                    value={formData.balance}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      TDS Amount
                    </label>
                    <input
                      type="number"
                      name="tdsAmount"
                      value={formData.tdsAmount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credit Note
                    </label>
                    <input
                      type="number"
                      name="creditNote"
                      value={formData.creditNote}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Balance After TDS
                  </label>
                  <input
                    type="number"
                    name="balanceAfterTds"
                    value={formData.balanceAfterTds}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};
export default PerformanceMisEdit;