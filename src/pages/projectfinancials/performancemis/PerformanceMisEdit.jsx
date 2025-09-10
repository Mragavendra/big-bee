import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const PerformanceMisEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    billingNo: '',
    enquiryNo: '',
    invoiceDate: '',
    projectName: '',
    basicAmt: '',
    tax: '',
    totalAmt: '',
    payments: [],
    totalCollectedAmt: '',
    balance: '',
    tdsAmount: '',
    creditNote: '',
    balanceAfterTds: ''
  });
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: '', type: 'info' });
  const [errors, setErrors] = useState({});

  // Fetch data by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/performance/${id}`);
        const data = response.data.data;
        const mappedPayments = data.payments ? data.payments.map(p => ({
          amount: p.amount ? p.amount.toString() : '',
          date: p.payment_date ? p.payment_date.split('T')[0] : ''
        })) : [];
        setFormData({
          billingNo: data.billing_no || '',
          enquiryNo: data.enquiry_no || '',
          invoiceDate: data.invoice_date ? data.invoice_date.split('T')[0] : '',
          projectName: data.project_name || '',
          basicAmt: data.basic_amt ? data.basic_amt.toString() : '',
          tax: data.tax ? data.tax.toString() : '',
          totalAmt: data.total_amt ? data.total_amt.toString() : '',
          payments: mappedPayments,
          totalCollectedAmt: data.total_collected_amt ? data.total_collected_amt.toString() : '',
          balance: data.balance ? data.balance.toString() : '',
          tdsAmount: data.tds_amount ? data.tds_amount.toString() : '',
          creditNote: data.credit_note ? data.credit_note.toString() : '',
          balanceAfterTds: data.balance_after_tds ? data.balance_after_tds.toString() : ''
        });
        setToast({ open: true, message: 'Data loaded successfully', type: 'success' });
      } catch (error) {
        console.error('Error fetching data:', error);
        setToast({ open: true, message: 'Failed to load data', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  // Auto-calculate totalCollectedAmt when payments change
  useEffect(() => {
    const total = formData.payments.reduce((sum, payment) => {
      return sum + (parseFloat(payment.amount) || 0);
    }, 0);
    setFormData(prev => ({
      ...prev,
      totalCollectedAmt: total.toFixed(2)
    }));
  }, [formData.payments]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newFormData = { ...prev, [name]: value };
      // Auto-calculate totalAmt when basicAmt or tax changes
      if (name === 'basicAmt' || name === 'tax') {
        const basic = parseFloat(newFormData.basicAmt) || 0;
        const tax = parseFloat(newFormData.tax) || 0;
        newFormData.totalAmt = (basic + tax).toFixed(2);
      }
      return newFormData;
    });
    // Clear validation error for this field
    setErrors(prev => ({ ...prev, [name]: '' }));
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

  const validateForm = () => {
    const newErrors = {};
    if (!formData.billingNo) newErrors.billingNo = 'Billing No is required';
    if (!formData.enquiryNo) newErrors.enquiryNo = 'Enquiry No is required';
    if (!formData.invoiceDate) newErrors.invoiceDate = 'Invoice Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setToast({ open: true, message: 'Please fill all required fields', type: 'error' });
      return;
    }

    try {
      const payload = {
        billing_no: formData.billingNo,
        enquiry_no: formData.enquiryNo,
        invoice_date: formData.invoiceDate,
        project_name: formData.projectName,
        basic_amt: parseFloat(formData.basicAmt) || 0,
        tax: parseFloat(formData.tax) || 0,
        total_amt: parseFloat(formData.totalAmt) || 0,
        payments: formData.payments.map(payment => ({
          amount: parseFloat(payment.amount) || 0,
          payment_date: payment.date
        })),
        total_collected_amt: parseFloat(formData.totalCollectedAmt) || 0,
        balance: parseFloat(formData.balance) || 0,
        tds_amount: parseFloat(formData.tdsAmount) || 0,
        credit_note: parseFloat(formData.creditNote) || 0,
        balance_after_tds: parseFloat(formData.balanceAfterTds) || 0
      };
      await axios.put(`http://localhost:5000/api/performance/${id}`, payload);
      setToast({ open: true, message: 'Record updated successfully', type: 'success' });
      setTimeout(() => navigate('/performance-mis'), 1500);
    } catch (error) {
      console.error('Error updating data:', error);
      setToast({ open: true, message: 'Failed to update record', type: 'error' });
    }
  };

  const handleCancel = () => {
    navigate('/performance-mis');
  };

  const handleToastClose = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <div className="min-h-screen p-6">
      {/* Toast Notification */}
      {toast.open && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-md text-white ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {toast.message}
          <button
            onClick={handleToastClose}
            className="ml-4 text-white font-bold"
          >
            &times;
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
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
                        className={`w-full px-3 py-2 border ${
                          errors.billingNo ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.billingNo && (
                        <p className="text-red-500 text-xs mt-1">{errors.billingNo}</p>
                      )}
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
                        className={`w-full px-3 py-2 border ${
                          errors.enquiryNo ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      />
                      {errors.enquiryNo && (
                        <p className="text-red-500 text-xs mt-1">{errors.enquiryNo}</p>
                      )}
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
                      className={`w-full px-3 py-2 border ${
                        errors.invoiceDate ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {errors.invoiceDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.invoiceDate}</p>
                    )}
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
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
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
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
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
      )}
    </div>
  );
};

export default PerformanceMisEdit;