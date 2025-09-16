import React, { useState } from 'react';
import { ChevronDown, Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FunnelReviewEdit = () => {
  const navigate = useNavigate();
  
  // Dummy data for editing
  const [formData, setFormData] = useState({
    enquiryNo: 'LED044',
    funnelStatus: 'quotation',
    action: 'followup',
    lastFollowupDate: '15-06-2025',
    lostOrderDate: '',
    nextFollowupDate: '25-06-2025',
    newFollowupDate: '20-06-2025',
    quotationDate: '18-06-2025',
    quotationVNo: 'QTN-2025-001',
    closureTarget: '500000',
    quotationValue: '450000',
    leadSource: 'Website',
    eventDate: '30-07-2025',
    service: 'Corporate Event Management',
    eventLocation: 'Bangalore Convention Center',
    prospect: 'Global Tech Solutions Inc.',
    contactPerson: 'Sarah Johnson',
    emailId: 'sarah.johnson@globaltech.com',
    department: 'Marketing',
    mobileNumber: '+1 (555) 123-4567',
    designation: 'Marketing Manager',
    addressLine1: '123 Tech Boulevard, Silicon Valley',
    landmark: 'Near Tech Park',
    state: 'california',
    pincode: '94043',
    street: 'Tech Boulevard',
    city: 'san-francisco',
    bde: 'bde2',
    clientServicingPerson: 'person3',
    briefs: 'Corporate annual event for 200+ attendees with AV setup and catering',
    comments: 'Client requested detailed quotation with multiple package options',
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
    alert('Funnel review saved successfully!');
  };

  const handleNavigateBack = () => {
    navigate('/funnel-review');
  };

  return (
    <div className="p-6">
      <div className="mx-auto rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white rounded-t-lg">
          <h1 className="text-xl font-semibold text-gray-900">Edit Funnel Review</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleNavigateBack}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600"
            >
              Update
            </button>
          </div>
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
                    onChange={(e) => handleInputChange('enquiryNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Funnel Status</h3>
                  <div className="relative">
                    <select
                      value={formData.funnelStatus}
                      onChange={(e) => handleInputChange('funnelStatus', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="enquiry">Enquiry</option>
                      <option value="quotation">Quotation</option>
                      <option value="order">Order</option>
                      <option value="lost">Lost</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Last Follow-up Date</h3>
                  <input
                    type="text"
                    value={formData.lastFollowupDate}
                    onChange={(e) => handleInputChange('lastFollowupDate', e.target.value)}
                    placeholder="Enter"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Next Follow-up Date</h3>
                  <input
                    type="text"
                    value={formData.nextFollowupDate}
                    onChange={(e) => handleInputChange('nextFollowupDate', e.target.value)}
                    placeholder="Enter"
                    className="w-full px极-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-极2">New Follow-up Date</h3>
                  <input
                    type="text"
                    value={formData.newFollowupDate}
                    onChange={(e) => handleInputChange('newFollowupDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Action</h3>
                  <div className="relative">
                    <select
                      value={formData.action}
                      onChange={(e) => handleInputChange('action', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="followup">Follow Up</option>
                      <option value="meeting">Meeting</option>
                      <option value="quotation">Quotation</option>
                      <option value="closure">Closure</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4极 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Lost/Order Date</h3>
                  <input
                    type="text"
                    value={formData.lostOrderDate}
                    onChange={(e) => handleInputChange('lostOrderDate', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Lost/Order Date</h3>
                  <input
                    type="text"
                    value={formData.lostOrderDate}
                    onChange={(e) => handleInputChange('lostOrderDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">New Follow-up Date</h3>
                  <input
                    type="text"
                    value={formData.newFollowupDate}
                    onChange={(e) => handleInputChange('newFollowupDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Question Details Section */}
          <div className="border border-gray-200 bg-white rounded-lg p-6">
            <h3 className="text-md font-semibold text-gray-900 mb-6">Question Details</h3>
            <div className="grid grid极-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quotation Date</h3>
                  <input
                    type="text"
                    value={formData.quotationDate}
                    onChange={(e) => handleInputChange('quotationDate', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quotation V No</h3>
                  <input
                    type="text"
                    value={formData.quotationVNo}
                    onChange={(e) => handleInputChange('quotationVNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Closure Target</h3>
                  <input
                    type="text"
                    value={formData.closureTarget}
                    onChange={(e) => handleInputChange('closureTarget', e.target.value)}
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
                    onChange={(e) => ('quotationValue', e.target.value)}
                    className="w-full px-3 py-2 border border极-gray-300 rounded-md text-sm"
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
                    value={formData.leadSource}
                    onChange={(e) => handleInputChange('leadSource', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Event Date</h3>
                  <input
                    type="text"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange('eventDate', e.target.value)}
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
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Event Location</h3>
                  <input
                    type="text"
                    value={formData.eventLocation}
                    onChange={(e) => handleInputChange('eventLocation', e.target.value)}
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
                    value={formData.lastFollowupDate}
                    onChange={(e) => handleInputChange('lastFollowupDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">X</span>
                  <input
                    type="text"
                    value={formData.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
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
                    onChange={(e) => handleInputChange('nextFollowupDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
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
                    value={formData.prospect}
                    onChange={(e) => handleInputChange('prospect', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
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
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Person</h3>
                  <input
                    type="极text"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Department</h3>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(极e) => handleInputChange('department', e.target.value)}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">State*</h3>
                    <div className="relative">
                      <select
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none"
                      >
                        <option value="">Select</option>
                        <option value="california">California</option>
                        <option value="new-york">New York</option>
                        <option value="texas">Texas</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700极 mb-2">Pincode*</h3>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="Enter Pincode"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
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
                      <option value="san-francisco">San Francisco</option>
                      <option value="los-angeles">Los Angeles</option>
                      <option value="new-york">New York</option>
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
                    <select
                      value={formData.bde}
                      onChange={(e) => handleInputChange('bde', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="bde1">BDE 1</option>
                      <option value="bde2">BDE 2</option>
                      <option value="bde3">BDE 3</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Client Servicing Person</h3>
                  <div className="relative">
                    <select
                      value={formData.clientServicingPerson}
                      onChange={(e) => handleInputChange('clientServicingPerson', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none"
                    >
                      <option value="">Select</option>
                      <option value="person1">Person 1</option>
                      <option value="person2">Person 2</option>
                      <option value="person3">Person 3</option>
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
                    value={formData.briefs}
                    onChange={(e) => handleInputChange('briefs', e.target.value)}
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
                    value={formData.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
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

export default FunnelReviewEdit;