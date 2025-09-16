import React, { useState } from 'react';
import { ChevronDown, Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarketingOrderAddCom = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    orderId: 'LED044',
    orderDate: '20-06-2025',
    orderValue: '',
    quotationId: '',
    quotationDate: '20-06-2025',
    prospect: '',
    contactPerson: '',
    emailId: '',
    mobileNumber: '',
    department: '',
    designation: '',
    addressLine1: '',
    landmark: '',
    street: '',
    state: '',
    city: '',
    pincode: '',
    baseAmount: '',
    gstPercent: '',
    gstTaxValue: '', // New field
    discount: '',
    finalTotal: '',
    eventDate: '',
    eventLocation: '', // New field
    service: '',
    bde: '',
    clientServicingPerson: '',
    activeStatus: true
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
    alert('Order saved successfully!');
  };

  const handleNavigateBack = () => {
    navigate('/Marketing-Order');
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="mx-auto rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Edit Order</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleNavigateBack}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Details Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">order ID*</h3>
                  <input
                    type="text"
                    value={formData.orderId}
                    onChange={(e) => handleInputChange('orderId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Order Value</h3>
                  <input
                    type="text"
                    value={formData.orderValue}
                    onChange={(e) => handleInputChange('orderValue', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Order Date*</h3>
                  <input
                    type="text"
                    value={formData.orderDate}
                    onChange={(e) => handleInputChange('orderDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quotation ID*</h3>
                  <input
                    type="text"
                    value={formData.quotationId}
                    onChange={(e) => handleInputChange('quotationId', e.target.value)}
                    placeholder="Enter Quotation ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quotation Date*</h3>
                  <input
                    type="text"
                    value={formData.quotationDate}
                    onChange={(e) => handleInputChange('quotationDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Prospect</h3>
                  <input
                    type="text"
                    value={formData.prospect}
                    onChange={(e) => handleInputChange('prospect', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Person</h3>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Email ID*</h3>
                    <input
                      type="email"
                      value={formData.emailId}
                      onChange={(e) => handleInputChange('emailId', e.target.value)}
                      placeholder="Enter Email address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Mobile Number*</h3>
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                      placeholder="Enter Mobile Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Department</h3>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      placeholder="Enter Department"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Designation</h3>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => handleInputChange('designation', e.target.value)}
                      placeholder="Enter Designation"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Address line 1</h3>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">LandMark*</h3>
                    <input
                      type="text"
                      value={formData.landmark}
                      onChange={(e) => handleInputChange('landmark', e.target.value)}
                      placeholder="Enter Landmark"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Street*</h3>
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => handleInputChange('street', e.target.value)}
                      placeholder="Enter Street"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">State*</h3>
                    <div className="relative">
                      <select
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="maharashtra">Maharashtra</option>
                        <option value="tamil-nadu">Tamil Nadu</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">City*</h3>
                    <div className="relative">
                      <select
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="chennai">Chennai</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Pincode*</h3>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="Enter Pincode"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financials Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Financials</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Base Amount</h3>
                  <input
                    type="text"
                    value={formData.baseAmount}
                    onChange={(e) => handleInputChange('baseAmount', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Discount(if any)</h3>
                  <input
                    type="text"
                    value={formData.discount}
                    onChange={(e) => handleInputChange('discount', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">GST %</h3>
                  <input
                    type="text"
                    value={formData.gstPercent}
                    onChange={(e) => handleInputChange('gstPercent', e.target.value)}
                    placeholder="Enter GST"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">GST / Tax Value</h3>
                  <input
                    type="text"
                    value={formData.gstTaxValue}
                    onChange={(e) => handleInputChange('gstTaxValue', e.target.value)}
                    placeholder="Enter GST Value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Final Total</h3>
                  <input
                    type="text"
                    value={formData.finalTotal}
                    onChange={(e) => handleInputChange('finalTotal', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Details Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Event Date</h3>
                  <input
                    type="text"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange('eventDate', e.target.value)}
                    placeholder="Enter Event date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Event Location</h3>
                  <input
                    type="text"
                    value={formData.eventLocation}
                    onChange={(e) => handleInputChange('eventLocation', e.target.value)}
                    placeholder="Enter Event Location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Service</h3>
                  <input
                    type="text"
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Internal Assignment Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Internal Assignment</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">BDE</h3>
                  <input
                    type="text"
                    value={formData.bde}
                    onChange={(e) => handleInputChange('bde', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Client Servicing Person</h3>
                  <input
                    type="text"
                    value={formData.clientServicingPerson}
                    onChange={(e) => handleInputChange('clientServicingPerson', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Control Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Control:</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Active Status*</h3>
                <div
                  className={`w-11 h-6 ${formData.activeStatus ? 'bg-orange-500' : 'bg-gray-300'} rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out flex items-center`}
                  onClick={() => handleInputChange('activeStatus', !formData.activeStatus)}
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out flex items-center justify-center ${
                      formData.activeStatus ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  >
                    {formData.activeStatus && <Check className="w-3 h-3 text-orange-500" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingOrderAddCom;