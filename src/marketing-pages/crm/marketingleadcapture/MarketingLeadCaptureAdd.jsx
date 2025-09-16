import React, { useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MarketingLeadCaptureAdd = () => {
  const [formData, setFormData] = useState({
    enquiryNo: "LED044",
    leadDate: new Date(),
    leadType: "",
    leadSource: "",
    notes: "",
    prospect: "",
    contactPerson: "",
    emailId: "",
    mobileNumber: "",
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

  const [loadingPincode, setLoadingPincode] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Form Data:", formData);
  };

  const fetchAddressFromPincode = async (pincode) => {
    if (pincode.length !== 6) return;

    setLoadingPincode(true);
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = await response.json();

      if (
        data[0].Status === "Success" &&
        data[0].PostOffice &&
        data[0].PostOffice.length > 0
      ) {
        const postOffice = data[0].PostOffice[0];
        handleInputChange("state", postOffice.State);
        handleInputChange("city", postOffice.District || postOffice.Name);
      }
    } catch (error) {
      console.error("Error fetching pincode details:", error);
    } finally {
      setLoadingPincode(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.pincode && formData.pincode.length === 6) {
        fetchAddressFromPincode(formData.pincode);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [formData.pincode]);

  return (
    <div className="min-h-screen p-4">
      {/* Header with rounded corners */}
      <div className="mx-auto">
        <div className="bg-white rounded-t-lg shadow-sm">
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            <h1 className="text-lg font-medium text-gray-900">Add Lead</h1>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600"
            >
              Save
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white shadow-sm border-x border-gray-200">
          <div className="px-6 py-4">
            {/* Basic Lead Details */}
            <div className="mb-6">
              <h2 className="text-base font-medium text-black mb-3">
                Basic Lead Details
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-1">
                    Enquiry No*
                  </label>
                  <input
                    type="text"
                    value={formData.enquiryNo}
                    onChange={(e) => handleInputChange("enquiryNo", e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-1">
                    Lead Date*
                  </label>
                  <DatePicker
                    selected={formData.leadDate}
                    onChange={(date) => handleInputChange("leadDate", date)}
                    dateFormat="dd-MM-yyyy"
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-1">
                    Lead Type*
                  </label>
                  <div className="relative">
                    <select
                      value={formData.leadType}
                      onChange={(e) => handleInputChange("leadType", e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white"
                    >
                      <option value=""></option>
                      <option value="hot">Hot Lead</option>
                      <option value="warm">Warm Lead</option>
                      <option value="cold">Cold Lead</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-2 h-3 w-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-1">
                    Lead Source*
                  </label>
                  <div className="relative">
                    <select
                      value={formData.leadSource}
                      onChange={(e) =>
                        handleInputChange("leadSource", e.target.value)
                      }
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white"
                    >
                      <option value=""></option>
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="social">Social Media</option>
                      <option value="email">Email Campaign</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-2 h-3 w-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-800 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Enter Description"
                  rows={2}
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 resize-none placeholder-gray-400"
                />
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-8">
              {/* Client Information */}
              <div>
                <h2 className="text-base font-medium text-black mb-3">
                  Client Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-1">
                      Prospect
                    </label>
                    <input
                      type="text"
                      value={formData.prospect}
                      onChange={(e) =>
                        handleInputChange("prospect", e.target.value)
                      }
                      placeholder="Enter Description"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        handleInputChange("contactPerson", e.target.value)
                      }
                      placeholder="Enter Description"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-1">
                        Email ID*
                      </label>
                      <input
                        type="email"
                        value={formData.emailId}
                        onChange={(e) =>
                          handleInputChange("emailId", e.target.value)
                        }
                        placeholder="Enter Email address"
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-1">
                        Mobile Number*
                      </label>
                      <input
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          handleInputChange("mobileNumber", e.target.value)
                        }
                        placeholder="Enter Mobile Number"
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-1">
                        Department
                      </label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) =>
                          handleInputChange("department", e.target.value)
                        }
                        placeholder="Enter Department"
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-800 mb-1">
                        Designation
                      </label>
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) =>
                          handleInputChange("designation", e.target.value)
                        }
                        placeholder="Enter Designation"
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal Assignment */}
              <div>
                <h2 className="text-base font-medium text-black mb-3">
                  Internal Assignment
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-1">
                      BDE
                    </label>
                    <div className="relative">
                      <select
                        value={formData.bde}
                        onChange={(e) =>
                          handleInputChange("bde", e.target.value)
                        }
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white text-gray-400"
                      >
                        <option value="">Select</option>
                        <option value="bde1">BDE 1</option>
                        <option value="bde2">BDE 2</option>
                        <option value="bde3">BDE 3</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-2 h-3 w-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-1">
                      Client Servicing Person
                    </label>
                    <div className="relative">
                      <select
                        value={formData.clientServicingPerson}
                        onChange={(e) =>
                          handleInputChange(
                            "clientServicingPerson",
                            e.target.value
                          )
                        }
                        className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white text-gray-400"
                      >
                        <option value="">Select</option>
                        <option value="person1">Person 1</option>
                        <option value="person2">Person 2</option>
                        <option value="person3">Person 3</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-2 h-3 w-3 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Control Section */}
                <div className="mt-8">
                  <h3 className="text-base font-medium text-black mb-3">
                    Control:
                  </h3>
                  <div>
                    <label className="block text-xs font-medium text-gray-800 mb-2">
                      Active Status*
                    </label>
                    <div
                      className={`w-10 h-5 ${
                        formData.activeStatus ? "bg-orange-500" : "bg-gray-300"
                      } rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out flex items-center`}
                      onClick={() =>
                        handleInputChange(
                          "activeStatus",
                          !formData.activeStatus
                        )
                      }
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out flex items-center justify-center ${
                          formData.activeStatus
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      >
                        {formData.activeStatus && (
                          <Check className="w-2.5 h-2.5 text-orange-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Address Section - separate container */}
        <div className="bg-white shadow-sm border border-gray-200 border-t-0">
          <div className="px-6 py-4">
            <h2 className="text-base font-medium text-black mb-3">Address</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-800 mb-1">
                  Address line 1
                </label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    handleInputChange("addressLine1", e.target.value)
                  }
                  placeholder="Enter Description"
                  className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-1">
                    Pincode*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) =>
                        handleInputChange("pincode", e.target.value)
                      }
                      placeholder="Enter Pincode"
                      maxLength="6"
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
                    />
                    {loadingPincode && (
                      <div className="absolute right-2 top-2">
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-500"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="City"
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-800 mb-1">
                    State*
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State"
                    className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom rounded corners */}
        <div className="bg-white rounded-b-lg shadow-sm h-2"></div>
      </div>
    </div>
  );
};

export default MarketingLeadCaptureAdd;
