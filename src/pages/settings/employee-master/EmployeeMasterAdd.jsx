import React, { useState } from 'react';

const EmployeeMasterAdd = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className=" p-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Add Employee</h1>
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
                    value="SUR145" 
                    readOnly 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email ID*</label>
                    <input 
                      type="email" 
                      value="SUR145" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number*</label>
                    <input 
                      type="tel" 
                      value="9123456789" 
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
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LandMark*</label>
                    <input 
                      type="text" 
                      value="LED044" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street*</label>
                    <input 
                      type="text" 
                      value="20-06-2025" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State*</label>
                    <input 
                      type="text" 
                      value="Karnataka" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                    <input 
                      type="text" 
                      value="SUR145" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode*</label>
                  <input 
                    type="text" 
                    value="SUR145" 
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
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400">
                    <option>Select</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400">
                    <option>Select</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reports To</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400">
                    <option>Select</option>
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
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400">
                    <option>Select</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <div className="relative">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-400 pr-10">
                      <option>Select</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
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

export default EmployeeMasterAdd;