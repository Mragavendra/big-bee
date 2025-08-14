import React, { useState } from 'react';

const EmployeeMasterEdit = () => {
  const [isActive, setIsActive] = useState(true);
  
  // Dummy data for the employee
  const [employeeData, setEmployeeData] = useState({
    employeeId: 'SUR145',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '9123456789',
    addressLine1: '123 Main Street',
    landmark: 'Near Central Park',
    street: 'Main Street',
    state: 'Karnataka',
    city: 'Bangalore',
    pincode: '560001',
    department: 'IT',
    designation: 'Software Engineer',
    reportsTo: 'Jane Smith',
    dateOfJoining: '2023-01-15',
    notes: 'Excellent performer',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];
  const designations = ['Software Engineer', 'HR Manager', 'Accountant', 'Marketing Executive', 'Operations Manager'];
  const reportTos = ['Jane Smith', 'Michael Johnson', 'Sarah Williams', 'David Brown', 'Emily Davis'];

  return (
    <div className=" p-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Employee</h1>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium">
            Save
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Employee Basic Details */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Employee basic details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                  <input 
                    type="text" 
                    name="employeeId"
                    value={employeeData.employeeId} 
                    readOnly 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    placeholder="Enter Full Name"
                    value={employeeData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email ID*</label>
                    <input 
                      type="email" 
                      name="email"
                      value={employeeData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number*</label>
                    <input 
                      type="tel" 
                      name="mobile"
                      value={employeeData.mobile}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Address</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address line 1</label>
                  <input 
                    type="text" 
                    name="addressLine1"
                    placeholder="Enter Address"
                    value={employeeData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LandMark*</label>
                    <input 
                      type="text" 
                      name="landmark"
                      value={employeeData.landmark}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street*</label>
                    <input 
                      type="text" 
                      name="street"
                      value={employeeData.street}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State*</label>
                    <input 
                      type="text" 
                      name="state"
                      value={employeeData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                    <input 
                      type="text" 
                      name="city"
                      value={employeeData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode*</label>
                  <input 
                    type="text" 
                    name="pincode"
                    value={employeeData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Organizational Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Organizational Info</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select 
                    name="department"
                    value={employeeData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                  <select 
                    name="designation"
                    value={employeeData.designation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Designation</option>
                    {designations.map(desig => (
                      <option key={desig} value={desig}>{desig}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reports To</label>
                  <select 
                    name="reportsTo"
                    value={employeeData.reportsTo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Manager</option>
                    {reportTos.map(manager => (
                      <option key={manager} value={manager}>{manager}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* HR / Lifecycle Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-6">HR / Lifecycle Info</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Joining</label>
                  <input 
                    type="date" 
                    name="dateOfJoining"
                    value={employeeData.dateOfJoining}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    name="notes"
                    value={employeeData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* Control */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Control:</h2>
              
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-4">Active Status*</label>
                <div 
                  className={`relative inline-flex h-8 w-14 items-center rounded-full cursor-pointer transition-colors ${isActive ? 'bg-orange-500' : 'bg-gray-200'}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <div className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-7' : 'translate-x-1'} shadow-sm`}>
                    {isActive && (
                      <div className="flex items-center justify-center h-full">
                        <svg className="h-3 w-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
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

export default EmployeeMasterEdit;