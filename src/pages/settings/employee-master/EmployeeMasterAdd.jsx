import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeMasterAdd = () => {
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();

  // Sample dropdown options
  const departments = ["Sales", "Marketing", "HR", "Finance", "IT"];
  const designations = ["Intern", "Junior", "Senior", "Manager", "Director"];
  const reportsTo = ["John Doe", "Jane Smith", "Robert Brown", "Alice Johnson", "Michael Lee"];
  const dateOfJoiningOptions = ["01-01-2023", "01-02-2023", "01-03-2023", "01-04-2023", "01-05-2023"];
  const notesOptions = ["Note 1", "Note 2", "Note 3", "Note 4", "Note 5"];

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Add Employee</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate("/settings/employee-master")}
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </button>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium">
              Save
            </button>
          </div>
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
                    placeholder="Enter Full Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email ID*</label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number*</label>
                    <input
                      type="tel"
                      placeholder="Enter Mobile Number"
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
                    placeholder="Enter Address line 1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LandMark*</label>
                    <input
                      type="text"
                      placeholder="Enter Landmark"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street*</label>
                    <input
                      type="text"
                      placeholder="Enter Street"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State*</label>
                    <input
                      type="text"
                      placeholder="Enter State"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                    <input
                      type="text"
                      placeholder="Enter City"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode*</label>
                  <input
                    type="text"
                    placeholder="Enter Pincode"
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
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700">
                    {departments.map((dept, i) => (
                      <option key={i} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700">
                    {designations.map((desig, i) => (
                      <option key={i} value={desig}>{desig}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reports To</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700">
                    {reportsTo.map((person, i) => (
                      <option key={i} value={person}>{person}</option>
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
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700">
                    {dateOfJoiningOptions.map((date, i) => (
                      <option key={i} value={date}>{date}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700">
                    {notesOptions.map((note, i) => (
                      <option key={i} value={note}>{note}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Control */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Control:</h2>
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-4">Active Status*</label>
                <div
                  className={`relative inline-flex h-7 w-14 items-center rounded-full cursor-pointer transition-colors ${
                    isActive ? "bg-orange-500" : "bg-gray-200"
                  }`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <div
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      isActive ? "translate-x-7" : "translate-x-1"
                    } shadow-sm`}
                  >
                    {isActive && (
                      <div className="flex items-center justify-center h-full">
                        <svg
                          className="h-3 w-3 text-orange-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
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
