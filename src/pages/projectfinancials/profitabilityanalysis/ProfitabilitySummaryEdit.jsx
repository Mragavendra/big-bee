import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ProfitabilitySummaryEdit = () => {
      const navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: 'INV_2024_001',
    invoiceDate: '15-06-2024',
    creditDays: '30',
    month: 'June 2024'
  });

  const [poOwnership, setPoOwnership] = useState({
    poDate: '10-06-2024',
    projectOwner: 'John Smith'
  });

  const [companyEvent, setCompanyEvent] = useState({
    enquiryNo: 'ENQ_2024_045',
    companyName: 'TechCorp Inc.',
    eventName: 'Annual Conference 2024',
    eventDate: '25-06-2024'
  });

  const [profitabilityItems, setProfitabilityItems] = useState([
    {
      elementGroup: 'Venue',
      element: 'Conference Hall',
      subElements: 'Main Hall + Breakout Rooms',
      poNo: 'PO/VEN/001',
      vendorName: 'Grand Convention Center',
      vendorCost: '5,00,000',
      proposalCost: '7,50,000',
      margin: '50.00'
    },
    {
      elementGroup: 'AV Equipment',
      element: 'Sound System',
      subElements: 'Speakers + Mics + Mixer',
      poNo: 'PO/AV/002',
      vendorName: 'Audio Visual Solutions',
      vendorCost: '1,20,000',
      proposalCost: '1,80,000',
      margin: '50.00'
    },
    {
      elementGroup: 'Catering',
      element: 'Lunch & Snacks',
      subElements: 'Buffet + Beverages',
      poNo: 'PO/CAT/003',
      vendorName: 'Gourmet Caterers',
      vendorCost: '2,50,000',
      proposalCost: '3,75,000',
      margin: '50.00'
    },
    {
      elementGroup: 'Marketing',
      element: 'Promotional Materials',
      subElements: 'Banners + Brochures',
      poNo: 'PO/MKT/004',
      vendorName: 'Print Solutions Ltd.',
      vendorCost: '75,000',
      proposalCost: '1,12,500',
      margin: '50.00'
    },
    {
      elementGroup: 'Staffing',
      element: 'Event Coordinators',
      subElements: '10 Staff Members',
      poNo: 'PO/STA/005',
      vendorName: 'Event Professionals',
      vendorCost: '80,000',
      proposalCost: '1,20,000',
      margin: '50.00'
    }
  ]);

  const addNewItem = () => {
    const newItem = {
      elementGroup: '',
      element: '',
      subElements: '',
      poNo: '',
      vendorName: '',
      vendorCost: '',
      proposalCost: '',
      margin: ''
    };
    setProfitabilityItems([...profitabilityItems, newItem]);
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...profitabilityItems];
    updatedItems[index][field] = value;
    
    // Auto-calculate margin if vendorCost or proposalCost changes
    if (field === 'vendorCost' || field === 'proposalCost') {
      const vendorCostNum = parseFloat(updatedItems[index].vendorCost.replace(/[^\d.]/g, '')) || 0;
      const proposalCostNum = parseFloat(updatedItems[index].proposalCost.replace(/[^\d.]/g, '')) || 0;
      
      if (vendorCostNum > 0 && proposalCostNum > 0) {
        const marginValue = ((proposalCostNum - vendorCostNum) / vendorCostNum) * 100;
        updatedItems[index].margin = marginValue.toFixed(2);
      } else {
        updatedItems[index].margin = '';
      }
    }
    
    setProfitabilityItems(updatedItems);
  };

  const calculateTotals = () => {
    const totalVendorCost = profitabilityItems.reduce((sum, item) => {
      const cost = parseFloat(item.vendorCost.replace(/[^\d.]/g, '')) || 0;
      return sum + cost;
    }, 0);

    const totalProposalCost = profitabilityItems.reduce((sum, item) => {
      const cost = parseFloat(item.proposalCost.replace(/[^\d.]/g, '')) || 0;
      return sum + cost;
    }, 0);

    const overallMargin = totalVendorCost > 0 ? ((totalProposalCost - totalVendorCost) / totalVendorCost) * 100 : 0;

    return {
      vendorCost: totalVendorCost.toLocaleString('en-IN'),
      proposalCost: totalProposalCost.toLocaleString('en-IN'),
      margin: overallMargin.toFixed(2)
    };
  };

  const totals = calculateTotals();

  return (
    <div className="mx-auto p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Edit Project Profitability Analysis Report
        </h1>
        <div className="flex space-x-4">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-medium"  onClick={() => navigate("/profitability-analysis")}>
            Cancel
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium">
            Update
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Invoice Details Field */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Invoice Details Field</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice No*
                </label>
                <input
                  type="text"
                  value={invoiceData.invoiceNo}
                  onChange={(e) => setInvoiceData({...invoiceData, invoiceNo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invoice Date*
                </label>
                <input
                  type="text"
                  value={invoiceData.invoiceDate}
                  onChange={(e) => setInvoiceData({...invoiceData, invoiceDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credit Days*
                </label>
                <input
                  type="text"
                  value={invoiceData.creditDays}
                  onChange={(e) => setInvoiceData({...invoiceData, creditDays: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Month*
                </label>
                <input
                  type="text"
                  value={invoiceData.month}
                  onChange={(e) => setInvoiceData({...invoiceData, month: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Company & Event Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Company & Event Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enquiry No
                </label>
                <input
                  type="text"
                  value={companyEvent.enquiryNo}
                  onChange={(e) => setCompanyEvent({...companyEvent, enquiryNo: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyEvent.companyName}
                  onChange={(e) => setCompanyEvent({...companyEvent, companyName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={companyEvent.eventName}
                    onChange={(e) => setCompanyEvent({...companyEvent, eventName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date
                  </label>
                  <input
                    type="text"
                    value={companyEvent.eventDate}
                    onChange={(e) => setCompanyEvent({...companyEvent, eventDate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* PO & Ownership */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">PO & Ownership</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PO Date
                </label>
                <input
                  type="text"
                  value={poOwnership.poDate}
                  onChange={(e) => setPoOwnership({...poOwnership, poDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Owner
                </label>
                <input
                  type="text"
                  value={poOwnership.projectOwner}
                  onChange={(e) => setPoOwnership({...poOwnership, projectOwner: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profitability Breakdown */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Profitability Breakdown (Element-Wise)</h2>
          <button
            onClick={addNewItem}
            className="flex items-center text-orange-600 hover:text-orange-800 font-medium bg-orange-100 hover:bg-orange-200 px-4 py-2 rounded-md"
          >
            <span className="mr-2 text-xl">+</span>
            Add New Item
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-3 py-3 text-left text-sm font-medium text-gray-700">Element Group</th>
                <th className="border border-gray-200 px-3 py-3 text-left text-sm font-medium text-gray-700">Element</th>
                <th className="border border-gray-200 px-3 py-3 text-left text-sm font-medium text-gray-700">Sub Elements</th>
                <th className="border border-gray-200 px-3 py-3 text-left text-sm font-medium text-gray-700">PO No</th>
                <th className="border border-gray-200 px-3 py-3 text-left text-sm font-medium text-gray-700">Vendor Name</th>
                <th className="border border-gray-200 px-3 py-3 text-left text-sm font-medium text-gray-700">Vendor Cost (INR)</th>
                <th className="border border-gray-200 px-3 py-3 text-left text-sm font-medium text-gray-700">Proposal Cost (INR)</th>
                <th className="border border-gray-200 px-3 py-3 text-left text-sm font-medium text-gray-700">Margin %</th>
              </tr>
            </thead>
            <tbody>
              {profitabilityItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.elementGroup}
                      onChange={(e) => updateItem(index, 'elementGroup', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-orange-500 rounded"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.element}
                      onChange={(e) => updateItem(index, 'element', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-orange-500 rounded"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.subElements}
                      onChange={(e) => updateItem(index, 'subElements', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-orange-500 rounded"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.poNo}
                      onChange={(e) => updateItem(index, 'poNo', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-orange-500 rounded"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.vendorName}
                      onChange={(e) => updateItem(index, 'vendorName', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-orange-500 rounded"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.vendorCost}
                      onChange={(e) => updateItem(index, 'vendorCost', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-orange-500 rounded"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.proposalCost}
                      onChange={(e) => updateItem(index, 'proposalCost', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-orange-500 rounded"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.margin}
                      onChange={(e) => updateItem(index, 'margin', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none focus:ring-1 focus:ring-orange-500 rounded"
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-medium">
                <td colSpan={5} className="border border-gray-200 px-3 py-3 text-center">
                  Total
                </td>
                <td className="border border-gray-200 px-3 py-3">
                  ₹{totals.vendorCost}
                </td>
                <td className="border border-gray-200 px-3 py-3">
                  ₹{totals.proposalCost}
                </td>
                <td className="border border-gray-200 px-3 py-3">
                  {totals.margin}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfitabilitySummaryEdit;