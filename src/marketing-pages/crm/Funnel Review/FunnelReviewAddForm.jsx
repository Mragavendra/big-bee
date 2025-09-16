import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const FunnelReviewAddForm = () => {
  const [formData, setFormData] = useState({
    enquiryNo: 'LED044',
    funnelStatus: '',
    action: '',
    lastFollowupDate: '',
    lostOrderDate: '',
    nextFollowupDate: '',
    newFollowupDate: '20-06-2025',
    quotationDate: '',
    quotationVNo: 'LED044',
    closureTarget: '',
    quotationValue: '20-06-2025',
    leadSource: '',
    eventDate: 'LED044',
    service: '',
    eventLocation: '20-06-2025',
    prospect: '',
    contactPerson: '',
    emailId: '',
    department: '',
    mobileNumber: '',
    designation: '',
    addressLine1: '',
    landmark: '',
    state: '',
    pincode: '',
    street: '',
    city: '',
    bde: '',
    clientServicingPerson: '',
    briefs: '',
    comments: '',
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
  };

  return (
    <div className="p-6">
      <div className="mx-auto rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Add Funnel Review</h1>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600"
          >
            Save
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Lead Details Section */}
          <div className="border bg-white border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Lead Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Enquiry No</h3>
                  <input
                    type="text"
                    value={formData.enquiryNo}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Funnel Status</h3>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none">
                      <option>Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Last Follow-up Date</h3>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Next Follow-up Date</h3>
                  <input
                    type="text"
                    placeholder="Enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">New Follow-up Date</h3>
                  <input
                    type="text"
                    value={formData.newFollowupDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Action</h3>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none">
                      <option>Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Lost/Order Date</h3>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Lost/Order Date</h3>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">New Follow-up Date</h3>
                  <input
                    type="text"
                    value={formData.newFollowupDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Question Details Section */}
          <div className="border border-gray-200 bg-white rounded-lg p-6">
            <h3 className="text-md font-semibold text-gray-900 mb-6">Question Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quotation Date</h3>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quotation V No</h3>
                  <input
                    type="text"
                    value={formData.quotationVNo}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Closure Target</h3>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quotation Value</h3>
                  <input
                    type="text"
                    value={formData.quotationValue}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lead Qualification Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Lead Qualification</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Lead Source</h3>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Event Date</h3>
                  <input
                    type="text"
                    value={formData.eventDate}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Service</h3>
                  <input
                    type="text"
                    placeholder="Enter Description"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Follow Up Details Section */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Follow Up Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Last Follow-up Date</h3>
                  <input
                    type="text"
                    value={formData.enquiryNo}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">X</span>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Next Follow-up Date</h3>
                  <input
                    type="text"
                    value={formData.nextFollowupDate}
                    className="w-full px极-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="border border-gray-200 bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Prospect</h3>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Email ID*</h3>
                  <input
                    type="email"
                    placeholder="Enter Email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Mobile Number*</h3>
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Address line 1</h3>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">LandMark*</h3>
                  <input
                    type="text"
                    placeholder="Enter Landmark"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Street*</h3>
                  <input
                    type="text"
                    placeholder="Enter Street"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Person</h3>
                  <input
                    type="text"
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border极-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Department</h3>
                  <input
                    type="text"
                    placeholder="Enter Department"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Designation</h3>
                  <input
                    type="text"
                    placeholder="Enter Designation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">State*</h3>
                    <div className="relative">
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none">
                        <option>Select</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Pincode*</h3>
                    <input
                      type="text"
                      placeholder="Enter Pincode"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">City*</h3>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none">
                      <option>Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Internal Assignment Section */}
          <div className="border border-gray-200 bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Internal Assignment</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">BDE</h3>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none">
                      <option>Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Client Servicing Person</h3>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none">
                      <option>Select</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Briefs & Comments Section */}
          <div className="border border-gray-200 bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Additional Briefs & Comments</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Briefs</h3>
                  <textarea
                    placeholder="Enter Brief"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Comments</h3>
                  <textarea
                    placeholder="Enter Comments"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Control Section */}
          <div className="border border-gray-200 bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Control:</h3>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Active Status*</h3>
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
  );
};

export default FunnelReviewAddForm;