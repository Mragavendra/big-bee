import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const EmployeeMasterAdd = () => {
  // Function to generate random employee_id (EMP + 6-digit number)
  const generateEmployeeId = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
    return `EMP-${randomNum}`;
  };

  const [formData, setFormData] = useState({
    employee_id: generateEmployeeId(), // Initialize with random ID
    full_name: "",
    email: "",
    mobile_number: "",
    address_line1: "",
    landmark: "",
    street: "",
    state: "",
    city: "",
    pincode: "",
    department: "",
    designation: "",
    reports_to: "",
    date_of_joining: null,
    notes: "",
    is_active: true,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Sample dropdown options
  const departments = ["Sales", "Marketing", "HR", "Finance", "IT"];
  const designations = ["Intern", "Junior", "Senior", "Manager", "Director"];
  const reportsTo = ["John Doe", "Jane Smith", "Robert Brown", "Alice Johnson", "Michael Lee"];
  const notesOptions = ["Note 1", "Note 2", "Note 3", "Note 4", "Note 5"];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle date change
  const handleDateChange = (date) => {
    setFormData({ ...formData, date_of_joining: date });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic client-side validation
    if (!formData.full_name || !formData.email || !formData.mobile_number) {
      setError("Please fill in all required fields (Full Name, Email, Mobile Number).");
      return;
    }

    // Format date_of_joining to YYYY-MM-DD
    const formattedDate = formData.date_of_joining
      ? formData.date_of_joining.toISOString().split("T")[0]
      : null;

    const payload = {
      employee_id: formData.employee_id,
      full_name: formData.full_name,
      email: formData.email,
      mobile_number: formData.mobile_number,
      address_line1: formData.address_line1,
      landmark: formData.landmark,
      street: formData.street,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      department: formData.department,
      designation: formData.designation,
      reports_to: formData.reports_to,
      date_of_joining: formattedDate,
      notes: formData.notes,
      is_active: formData.is_active,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/employees/create", payload);
      setSuccess("Employee added successfully!");
      // Reset form with a new random employee_id
      setFormData({
        employee_id: generateEmployeeId(),
        full_name: "",
        email: "",
        mobile_number: "",
        address_line1: "",
        landmark: "",
        street: "",
        state: "",
        city: "",
        pincode: "",
        department: "",
        designation: "",
        reports_to: "",
        date_of_joining: null,
        notes: "",
        is_active: true,
      });
      setTimeout(() => navigate("/settings/employee-master"), 2000);
    } catch (err) {
      if (err.response?.data?.error?.name === "SequelizeUniqueConstraintError") {
        const field = err.response?.data?.error?.errors[0]?.path || "field";
        setError(`The ${field} already exists. Please use a unique value.`);
      } else {
        setError(err.response?.data?.message || "Failed to add employee. Please try again.");
      }
    }
  };

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
            <button
              onClick={handleSubmit}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
            >
              Save
            </button>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && <div className="mb-4 text-green-600">{success}</div>}
        {error && <div className="mb-4 text-red-600">{error}</div>}

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
                    name="employee_id"
                    value={formData.employee_id}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name*</label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="Enter Full Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email ID*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number*</label>
                    <input
                      type="tel"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleInputChange}
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
                    name="address_line1"
                    value={formData.address_line1}
                    onChange={handleInputChange}
                    placeholder="Enter Address line 1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LandMark*</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="Enter Landmark"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street*</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
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
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter State"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter City"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode*</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
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
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, i) => (
                      <option key={i} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                  <select
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="">Select Designation</option>
                    {designations.map((desig, i) => (
                      <option key={i} value={desig}>
                        {desig}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reports To</label>
                  <select
                    name="reports_to"
                    value={formData.reports_to}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="">Select Reports To</option>
                    {reportsTo.map((person, i) => (
                      <option key={i} value={person}>
                        {person}
                      </option>
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
                  <DatePicker
                    selected={formData.date_of_joining}
                    onChange={handleDateChange}
                    placeholderText="Select Date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    dateFormat="dd-MM-yyyy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <select
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                  >
                    <option value="">Select Note</option>
                    {notesOptions.map((note, i) => (
                      <option key={i} value={note}>
                        {note}
                      </option>
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
                    formData.is_active ? "bg-orange-500" : "bg-gray-200"
                  }`}
                  onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                >
                  <div
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      formData.is_active ? "translate-x-7" : "translate-x-1"
                    } shadow-sm`}
                  >
                    {formData.is_active && (
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