import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLeadsFormLayout = () => {
  const navigate = useNavigate(); // Navigation hook
  const [formData, setFormData] = useState({
    enquiryNo: "LED044",
    leadDate: "20-06-2025",
    leadType: "",
    leadSource: "",
    notes: "",
    prospect: "",
    contactPerson: "",
    email: "",
    mobile: "",
    department: "",
    designation: "",
    addressLine1: "",
    state: "",
    city: "",
    pincode: "",
    bde: "",
    clientServicingPerson: "",
    activeStatus: true,
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleCancel = () => {
    navigate("/lead-capture");
  };

  return (
    <div className=" min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium text-gray-800">crm/leadcapture/add lead</h1>
        <div className="flex gap-3">
          <button 
            onClick={handleCancel} 
            className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-2 rounded-md font-medium"
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
      {/* Form Content */}
      <div className="space-y-6">
        {/* Basic Lead Details - Constrained Width */}
        <div className="w-full max-w-2xl">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4 text-gray-800">
              Basic Lead Details
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enquiry No*
                </label>
                <input
                  type="text"
                  value={formData.enquiryNo}
                  readOnly
                  className="w-full border border-gray-300 p-2 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lead Date*
                </label>
                <input
                  type="text"
                  value={formData.leadDate}
                  onChange={(e) => handleChange("leadDate", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lead Type*
                </label>
                <input
                  type="text"
                  value={formData.leadType}
                  onChange={(e) => handleChange("leadType", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lead Source*
                </label>
                <input
                  type="text"
                  value={formData.leadSource}
                  onChange={(e) => handleChange("leadSource", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Enter Description"
                className="w-full border border-gray-300 p-2 rounded-md"
                rows={3}
              />
            </div>
          </div>
        </div>
        {/* Client Information and Internal Assignment Side by Side */}
        <div className="grid grid-cols-2 gap-6">
          {/* Client Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4 text-gray-800">
              Client Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prospect
                </label>
                <input
                  type="text"
                  value={formData.prospect}
                  onChange={(e) => handleChange("prospect", e.target.value)}
                  placeholder="Enter Description"
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    handleChange("contactPerson", e.target.value)
                  }
                  placeholder="Enter Description"
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID*
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter Email address"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number*
                  </label>
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    placeholder="Enter Mobile Number"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    placeholder="Enter Department"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) =>
                      handleChange("designation", e.target.value)
                    }
                    placeholder="Enter Designation"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
              </div>
            </div>
            {/* Address Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4 text-gray-800">
                Address
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address line 1
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) =>
                      handleChange("addressLine1", e.target.value)
                    }
                    placeholder="Enter Description"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State*
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="State1">State 1</option>
                      <option value="State2">State 2</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City*
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded-md"
                    >
                      <option value="">Select</option>
                      <option value="City1">City 1</option>
                      <option value="City2">City 2</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode*
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleChange("pincode", e.target.value)}
                    placeholder="Enter Pincode"
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Right Side Column */}
          <div className="space-y-6">
            {/* Internal Assignment */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4 text-gray-800">
                Internal Assignment
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    BDE
                  </label>
                  <select
                    value={formData.bde}
                    onChange={(e) => handleChange("bde", e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="BDE1">BDE 1</option>
                    <option value="BDE2">BDE 2</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Client Servicing Person
                  </label>
                  <select
                    value={formData.clientServicingPerson}
                    onChange={(e) =>
                      handleChange("clientServicingPerson", e.target.value)
                    }
                    className="w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="Person1">Person 1</option>
                    <option value="Person2">Person 2</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Control */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4 text-gray-800">
                Control:
              </h2>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">
                  Active Status*
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.activeStatus}
                    onChange={(e) =>
                      handleChange("activeStatus", e.target.checked)
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeadsFormLayout;