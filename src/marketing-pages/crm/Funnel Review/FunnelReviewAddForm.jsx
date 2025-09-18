import React, { useState } from 'react';
import { ChevronDown, Check, Calendar } from 'lucide-react';

const FunnelReviewAddForm = () => {
  const [formData, setFormData] = useState({
    enquiryNo: 'LED044',
    funnelStatus: '',
    action: '',
    lastFollowupDate: '',
    lostOrderDate: '',
    nextFollowupDate: '',
    newFollowupDate: '17-09-2025',
    quotationDate: '',
    quotationVNo: 'LED044',
    closureTarget: '',
    quotationValue: '50000',
    leadSource: '',
    eventDate: '17-09-2025',
    service: '',
    eventLocation: 'Convention Center',
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

  const [showDatePicker, setShowDatePicker] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentField, setCurrentField] = useState(null); // Track which field's calendar is open

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to format date as DD-MM-YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to handle date selection
  const handleDateSelect = (date) => {
    if (currentField) {
      handleInputChange(currentField, formatDate(date));
      setShowDatePicker(null);
      setCurrentField(null);
    }
  };

  // Function to open calendar for a specific field
  const openCalendar = (field) => {
    setCurrentField(field);
    setShowDatePicker(true);
  };

  // Function to generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(
        <div
          key={day}
          className="h-8 flex items-center justify-center cursor-pointer hover:bg-orange-100 rounded"
          onClick={() => handleDateSelect(date)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Get month name
  const getMonthName = () => {
    return currentDate.toLocaleString('default', { month: 'long' });
  };

  const handleSave = () => {
    console.log('Form Data:', formData);
  };

  // Calendar component to avoid duplication
  const renderCalendar = () => {
    if (!showDatePicker) return null;
    
    return (
      <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 w-64">
        <div className="flex justify-between items-center mb-4">
          <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded">
            <ChevronDown className="h-4 w-4 rotate-90" />
          </button>
          <span className="font-medium">{getMonthName()} {currentDate.getFullYear()}</span>
          <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded">
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-500 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {generateCalendarDays()}
        </div>
      </div>
    );
  };

  // Date input component to avoid duplication
  const DateInput = ({ field, value, label }) => (
    <div className="relative">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{label}</h3>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm pr-10"
          readOnly
        />
        <Calendar 
          className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
          onClick={() => openCalendar(field)}
        />
        {showDatePicker && currentField === field && renderCalendar()}
      </div>
    </div>
  );

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
                    onChange={(e) => handleInputChange('enquiryNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Funnel Status</h3>
                  <select 
                    value={formData.funnelStatus}
                    onChange={(e) => handleInputChange('funnelStatus', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none pr-10"
                  >
                    <option value="">Select</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                
                <DateInput 
                  field="lastFollowupDate"
                  value={formData.lastFollowupDate}
                  label="Last Follow-up Date"
                />
                
                <DateInput 
                  field="nextFollowupDate"
                  value={formData.nextFollowupDate}
                  label="Next Follow-up Date"
                />
                
                <DateInput 
                  field="newFollowupDate"
                  value={formData.newFollowupDate}
                  label="New Follow-up Date"
                />
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Action</h3>
                  <select 
                    value={formData.action}
                    onChange={(e) => handleInputChange('action', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none pr-10"
                  >
                    <option value="">Select</option>
                    <option value="call">Call</option>
                    <option value="email">Email</option>
                    <option value="meeting">Meeting</option>
                    <option value="follow-up">Follow Up</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                
                <DateInput 
                  field="lostOrderDate"
                  value={formData.lostOrderDate}
                  label="Lost Order Date"
                />
                
                <DateInput 
                  field="quotationDate"
                  value={formData.quotationDate}
                  label="Quotation Date"
                />
                
                {/* Removed duplicate "New Follow-up Date" field */}
              </div>
            </div>
          </div>

          {/* Question Details Section */}
          <div className="border border-gray-200 bg-white rounded-lg p-6">
            <h3 className="text-md font-semibold text-gray-900 mb-6">Question Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <DateInput 
                  field="quotationDate"
                  value={formData.quotationDate}
                  label="Quotation Date"
                />
                
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quotation V No</h3>
                  <input
                    type="text"
                    value={formData.quotationVNo}
                    onChange={(e) => handleInputChange('quotationVNo', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <DateInput 
                  field="closureTarget"
                  value={formData.closureTarget}
                  label="Closure Target"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quotation Value</h3>
                  <input
                    type="text"
                    value={formData.quotationValue}
                    onChange={(e) => handleInputChange('quotationValue', e.target.value)}
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
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Lead Source</h3>
                  <select 
                    value={formData.leadSource}
                    onChange={(e) => handleInputChange('leadSource', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none pr-10"
                  >
                    <option value="">Select</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="social-media">Social Media</option>
                    <option value="email-campaign">Email Campaign</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                
                <DateInput 
                  field="eventDate"
                  value={formData.eventDate}
                  label="Event Date"
                />
                
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Service</h3>
                  <select 
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none pr-10"
                  >
                    <option value="">Select</option>
                    <option value="consulting">Consulting</option>
                    <option value="development">Development</option>
                    <option value="support">Support</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
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
                <DateInput 
                  field="lastFollowupDate"
                  value={formData.lastFollowupDate}
                  label="Last Follow-up Date"
                />
                
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
                <DateInput 
                  field="nextFollowupDate"
                  value={formData.nextFollowupDate}
                  label="Next Follow-up Date"
                />
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
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Contact Person</h3>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
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
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Landmark*</h3>
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
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Pincode*</h3>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                    placeholder="Enter Pincode"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">City*</h3>
                  <select 
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none pr-10"
                  >
                    <option value="">Select</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="chennai">Chennai</option>
                    <option value="delhi">Delhi</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">State*</h3>
                  <select 
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none pr-10"
                  >
                    <option value="">Select</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="tamil-nadu">Tamil Nadu</option>
                    <option value="delhi">Delhi</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Internal Assignment Section */}
          <div className="border border-gray-200 bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Internal Assignment</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">BDE</h3>
                  <select 
                    value={formData.bde}
                    onChange={(e) => handleInputChange('bde', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none pr-10"
                  >
                    <option value="">Select</option>
                    <option value="bde1">BDE 1 - John Doe</option>
                    <option value="bde2">BDE 2 - Jane Smith</option>
                    <option value="bde3">BDE 3 - Alex Brown</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Client Servicing Person</h3>
                  <select 
                    value={formData.clientServicingPerson}
                    onChange={(e) => handleInputChange('clientServicingPerson', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none pr-10"
                  >
                    <option value="">Select</option>
                    <option value="person1">Person 1 - Emily Davis</option>
                    <option value="person2">Person 2 - Michael Lee</option>
                    <option value="person3">Person 3 - Sarah Wilson</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
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
export default FunnelReviewAddForm;