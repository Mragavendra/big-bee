import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";



const ProfitabilitySummaryAdd = () => {
const navigate = useNavigate();
    
  const [invoiceData, setInvoiceData] = useState({
    invoiceNo: 'Q_001',
    invoiceDate: '20-06-2025',
    creditDays: 'Q_001',
    month: '20-06-2025'
  });

  const [poOwnership, setPoOwnership] = useState({
    poDate: '',
    projectOwner: ''
  });

  const [companyEvent, setCompanyEvent] = useState({
    enquiryNo: 'LED044',
    companyName: 'Adwik',
    eventName: 'ABCD',
    eventDate: '20-06-2025'
  });

  const [profitabilityItems, setProfitabilityItems] = useState([
    {
      elementGroup: 'Artist & manpower',
      element: 'VJ',
      subElements: 'Navyatha Sagar',
      poNo: 'PO/543/ART/001',
      vendorName: 'SGV',
      vendorCost: '12.000',
      proposalCost: '18.000',
      margin: '50'
    },
    {
      elementGroup: 'Production',
      element: 'Fabrication',
      subElements: 'Infrastructure',
      poNo: 'PO/543/ART/002',
      vendorName: 'SGV',
      vendorCost: '30.000',
      proposalCost: '40.000',
      margin: '33.33333'
    },
    {
      elementGroup: 'Others',
      element: 'Catering',
      subElements: '-',
      poNo: 'PO/543/ART/003',
      vendorName: 'Praveen',
      vendorCost: '2.50.000',
      proposalCost: '3.87.458',
      margin: '54.9832'
    },
    {
      elementGroup: 'Artist & manpower',
      element: 'Photography & videography',
      subElements: '-',
      poNo: 'PO/543/ART/004',
      vendorName: 'Oxygen',
      vendorCost: '1.59.000',
      proposalCost: '1.87.460',
      margin: '17.456714035'
    },
    {
      elementGroup: 'Production',
      element: 'Corporate Gifting',
      subElements: 'Trinket box',
      poNo: 'PO/543/ART/005',
      vendorName: 'Naveen',
      vendorCost: '60.400',
      proposalCost: '1.00.000',
      margin: '100.1655629'
    },
    {
      elementGroup: 'Production',
      element: 'Printing',
      subElements: '-',
      poNo: 'PO/543/ART/006',
      vendorName: 'Pushpa',
      vendorCost: '12.000',
      proposalCost: '18.000',
      margin: '50'
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

    return {
      vendorCost: totalVendorCost.toLocaleString(),
      proposalCost: totalProposalCost.toLocaleString()
    };
  };

  const totals = calculateTotals();

  return (
    <div className=" mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-medium text-gray-800">
          Add Project Profitability Analysis Report
        </h1>


<div className="flex space-x-4">



     <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-medium"  onClick={() => navigate("/profitability-analysis")}>
            Cancel
          </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium">
          Save
        </button>

</div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Invoice Details Field */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Invoice Details Field</h2>
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
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Company & Event Details</h2>
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
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-medium text-gray-800 mb-4">PO & Ownership</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PO Date
                </label>
                <input
                  type="text"
                  placeholder="Enter Description"
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
                  placeholder="Enter Description"
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
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Profitability Breakdown (Element-Wise)</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">Element Group</th>
                <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">Element</th>
                <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">Sub Elements</th>
                <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">PO No</th>
                <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">Vendor Name</th>
                <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">Vendor Cost (INR)</th>
                <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">Proposal Cost (INR)</th>
                <th className="border border-gray-200 px-3 py-2 text-left text-sm font-medium text-gray-700">Margin %</th>
              </tr>
            </thead>
            <tbody>
              {profitabilityItems.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.elementGroup}
                      onChange={(e) => updateItem(index, 'elementGroup', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.element}
                      onChange={(e) => updateItem(index, 'element', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.subElements}
                      onChange={(e) => updateItem(index, 'subElements', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.poNo}
                      onChange={(e) => updateItem(index, 'poNo', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.vendorName}
                      onChange={(e) => updateItem(index, 'vendorName', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.vendorCost}
                      onChange={(e) => updateItem(index, 'vendorCost', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.proposalCost}
                      onChange={(e) => updateItem(index, 'proposalCost', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none"
                    />
                  </td>
                  <td className="border border-gray-200 px-3 py-2">
                    <input
                      type="text"
                      value={item.margin}
                      onChange={(e) => updateItem(index, 'margin', e.target.value)}
                      className="w-full px-2 py-1 text-sm border-0 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 font-medium">
                <td colSpan={5} className="border border-gray-200 px-3 py-3 text-center">
                  Total
                </td>
                <td className="border border-gray-200 px-3 py-3">
                  {totals.vendorCost}
                </td>
                <td className="border border-gray-200 px-3 py-3">
                  {totals.proposalCost}
                </td>
                <td className="border border-gray-200 px-3 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <button
          onClick={addNewItem}
          className="mt-4 flex items-center text-gray-600 hover:text-gray-800 font-medium"
        >
          <span className="mr-2 text-xl">+</span>
          Add
        </button>
      </div>
    </div>
  );
};

export default ProfitabilitySummaryAdd;