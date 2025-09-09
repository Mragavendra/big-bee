import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddLeadsFormLayout = () => {
  const navigate = useNavigate(); // Navigation hook
  const [formData, setFormData] = useState({
    enquiryNo: `LED-${Math.floor(100 + Math.random() * 900)}`,
    leadDate: "",
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
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Map your formData to the API's expected field names
    const payload = {
      enquiry_no: formData.enquiryNo,
      lead_date: formData.leadDate,
      lead_type: formData.leadType,
      lead_source: formData.leadSource,
      notes: formData.notes,
      prospect: formData.prospect,
      contact_person: formData.contactPerson,
      email: formData.email,
      mobile: formData.mobile,
      department: formData.department,
      designation: formData.designation,
      address_line1: formData.addressLine1,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      bde: formData.bde,
      client_servicing_person: formData.clientServicingPerson,
      active_status: formData.activeStatus,
    };

    try {
      const response = await fetch("http://localhost:5000/api/leads/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Lead created:", data);
      // Navigate to lead capture list page after success
      navigate("/lead-capture");
    } catch (error) {
      console.error("Error creating lead:", error);
      // Optionally show user feedback on error here
    }
  };

  const handleCancel = () => {
    navigate("/lead-capture");
  };

  // Fetch city and state based on pincode
  useEffect(() => {
    const fetchPincodeData = async () => {
      if (formData.pincode.length === 6) {
        try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`);
          const data = await response.json();
          if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
            const { State, District } = data[0].PostOffice[0];
            handleChange("state", State);
            handleChange("city", District);
          } else {
            handleChange("state", "");
            handleChange("city", "");
          }
        } catch (error) {
          console.error("Error fetching pincode data:", error);
          handleChange("state", "");
          handleChange("city", "");
        }
      } else {
        handleChange("state", "");
        handleChange("city", "");
      }
    };
    fetchPincodeData();
  }, [formData.pincode]);

  return (
    <div className="min-h-screen p-6">
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
        {/* Basic Lead Details */}
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
                  type="date"
                  value={formData.leadDate}
                  onChange={(e) => handleChange("leadDate", e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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

        {/* Client Information and Internal Assignment */}
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
              {/* Address Section */}
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4 text-gray-800">
                  Address
                </h3>
                <div className="space-y-4">
                  {/* Pincode First */}
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
                      maxLength={6}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State*
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        readOnly
                        placeholder="Auto-filled"
                        className="w-full border border-gray-300 p-2 rounded-md bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        readOnly
                        placeholder="Auto-filled"
                        className="w-full border border-gray-300 p-2 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>
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
