import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';

export const PerformanceMisAdd = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    billingNo: '',
    enquiryNo: '',
    invoiceDate: '',
    projectName: '',
    basicAmt: '',
    tax: '',
    totalAmt: '',
    payments: [{ amount: '', date: '' }],
    totalCollectedAmt: '',
    balance: '0',
    tdsAmount: '0',
    creditNote: '0',
    balanceAfterTds: '0'
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  // Calculate totalCollectedAmt whenever payments change
  useEffect(() => {
    const total = formData.payments.reduce((sum, payment) => {
      const amount = parseFloat(payment.amount) || 0;
      return sum + amount;
    }, 0);
    setFormData(prev => ({
      ...prev,
      totalCollectedAmt: total.toFixed(2) // Ensure 2 decimal places
    }));
  }, [formData.payments]);

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

  const handleSave = async () => {
    // Transform formData to match API's snake_case and payment structure
    const apiData = {
      billing_no: formData.billingNo,
      enquiry_no: formData.enquiryNo,
      invoice_date: formData.invoiceDate,
      project_name: formData.projectName,
      basic_amt: parseFloat(formData.basicAmt) || 0,
      tax: parseFloat(formData.tax) || 0,
      total_amt: parseFloat(formData.totalAmt) || 0,
      payments: formData.payments.map(payment => ({
        payment_date: payment.date,
        amount: parseFloat(payment.amount) || 0
      })),
      total_collected_amt: parseFloat(formData.totalCollectedAmt) || 0,
      balance: parseFloat(formData.balance) || 0,
      tds_amount: parseFloat(formData.tdsAmount) || 0,
      credit_note: parseFloat(formData.creditNote) || 0,
      balance_after_tds: parseFloat(formData.balanceAfterTds) || 0
    };

    try {
      const response = await axios.post('http://localhost:5000/api/performance/create', apiData);
      console.log('Form Data Submitted:', response.data);
      setSnackbar({
        open: true,
        message: 'Project profitability report created successfully',
        severity: 'success',
      });
      setTimeout(() => navigate('/performance-mis'), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error submitting form:', error);
      setSnackbar({
        open: true,
        message: 'Failed to create report. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCancel = () => {
    navigate('/performance-mis');
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Add Project Profitability Analysis Report</h1>
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
            >
              Save
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Project Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Project Information</h2>
              
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
                      placeholder="Enter Billing Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      placeholder="Enter Enquiry Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                    placeholder="Select Invoice Date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                    placeholder="Enter Project Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      placeholder="Enter Basic Amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      placeholder="Enter Tax Amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                    placeholder="Enter Total Amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                    <h3 className="text-base font-medium text-gray-800 mb-4">Payment {index + 1}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount
                        </label>
                        <input
                          type="number"
                          value={payment.amount}
                          onChange={(e) => handlePaymentChange(index, 'amount', e.target.value)}
                          placeholder="Enter Payment Amount"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date
                        </label>
                        <input
                          type="date"
                          value={payment.date}
                          onChange={(e) => handlePaymentChange(index, 'date', e.target.value)}
                          placeholder="Select Payment Date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addMorePayments}
                  className="flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm"
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
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Adjustments & Final Summary */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Adjustments & Final Summary</h2>
              
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
                    placeholder="Enter Balance Amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      placeholder="Enter TDS Amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                      placeholder="Enter Credit Note Amount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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
                    placeholder="Enter Balance After TDS"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
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