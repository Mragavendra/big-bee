import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddFunnelTracker = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Basic Lead Details
    enquiryNo: "LED044",
    leadDate: "2025-06-20",
    funnelStatus: "",
    action: "",
    lastFollowUpDate: "",
    nextFollowUpDate: "",
    lostOrderDate: "",

    // Follow Up Details
    followUpLastDate: "",
    followUpNextDate: "2025-06-20",
    followUpNotes: "",

    // Customer Details
    prospect: "",
    contactPerson: "",
    email: "",
    mobileNumber: "",
    department: "",
    designation: "",

    // Address
    addressLine1: "",
    landmark: "",
    street: "",
    state: "",
    city: "",
    pincode: "",

    // Quotation Details
    quotationDate: "2025-06-20",
    quotationNo: "LED044",
    quotationValue: "2025-06-20",
    closureTarget: "",

    // Lead Qualification
    leadSource: "",
    eventDate: "2025-06-20",
    eventLocation: "2025-06-20",
    service: "",

    // Internal Assignment
    bde: "",
    clientServicingPerson: "",

    // Additional Briefs & Comments
    briefs: "",
    comments: "",

    // Control
    activeStatus: true,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fetch city and state based on pincode
  useEffect(() => {
    const fetchPincodeData = async () => {
      if (formData.pincode.length === 6) {
        try {
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${formData.pincode}`
          );
          const data = await response.json();
          if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
            const { State, District } = data[0].PostOffice[0];
            handleInputChange("state", State);
            handleInputChange("city", District);
          } else {
            handleInputChange("state", "");
            handleInputChange("city", "");
          }
        } catch (error) {
          console.error("Error fetching pincode data:", error);
          handleInputChange("state", "");
          handleInputChange("city", "");
        }
      } else {
        handleInputChange("state", "");
        handleInputChange("city", "");
      }
    };
    fetchPincodeData();
  }, [formData.pincode]);

  const handleSave = async () => {
    // Map formData to API's expected field names
    const payload = {
      enquiry_no: formData.enquiryNo,
      lead_date: formData.leadDate,
      funnel_status: formData.funnelStatus,
      action: formData.action,
      last_follow_up_date: formData.lastFollowUpDate || null,
      next_follow_up_date: formData.nextFollowUpDate || null,
      lost_order_date: formData.lostOrderDate || null,
      follow_up_last_date: formData.followUpLastDate || null,
      follow_up_next_date: formData.followUpNextDate || null,
      follow_up_notes: formData.followUpNotes,
      prospect: formData.prospect,
      contact_person: formData.contactPerson,
      email: formData.email,
      mobile_number: formData.mobileNumber,
      department: formData.department,
      designation: formData.designation,
      address_line1: formData.addressLine1,
      landmark: formData.landmark,
      street: formData.street,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      quotation_date: formData.quotationDate || null,
      quotation_no: formData.quotationNo,
      quotation_value: formData.quotationValue,
      closure_target: formData.closureTarget,
      lead_source: formData.leadSource,
      event_date: formData.eventDate || null,
      event_location: formData.eventLocation,
      service: formData.service,
      bde: formData.bde,
      client_servicing_person: formData.clientServicingPerson,
      briefs: formData.briefs,
      comments: formData.comments,
      active_status: formData.activeStatus,
    };

    try {
      const response = await fetch("http://localhost:5000/api/funnel-tracker/create", {
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
      navigate("/funnel-review");
    } catch (error) {
      console.error("Error creating lead:", error);
    }
  };

  const handleCancel = () => {
    navigate("/funnel-review");
  };

  return (
    <div className=" mx-auto p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Add Funnel tracker
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-2 rounded-md font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
          >
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Basic Lead Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Basic Lead Details
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enquiry No
                </label>
                <input
                  type="text"
                  value={formData.enquiryNo}
                  onChange={(e) =>
                    handleInputChange("enquiryNo", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lead Date*
                </label>
                <input
                  type="date"
                  value={formData.leadDate}
                  onChange={(e) =>
                    handleInputChange("leadDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Funnel Status
                </label>
                <select
                  value={formData.funnelStatus}
                  onChange={(e) =>
                    handleInputChange("funnelStatus", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select</option>
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="cold">Cold</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Action
                </label>
                <select
                  value={formData.action}
                  onChange={(e) => handleInputChange("action", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select</option>
                  <option value="follow-up">Follow Up</option>
                  <option value="quote">Send Quote</option>
                  <option value="meeting">Schedule Meeting</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Follow-up Date
                </label>
                <input
                  type="date"
                  placeholder="Enter"
                  value={formData.lastFollowUpDate}
                  onChange={(e) =>
                    handleInputChange("lastFollowUpDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Next Follow-up Date
                </label>
                <input
                  type="date"
                  placeholder="Enter"
                  value={formData.nextFollowUpDate}
                  onChange={(e) =>
                    handleInputChange("nextFollowUpDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lost/Order Date
              </label>
              <input
                type="date"
                value={formData.lostOrderDate}
                onChange={(e) =>
                  handleInputChange("lostOrderDate", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Follow Up Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Follow Up Details
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Follow-up Date
                </label>
                <input
                  type="date"
                  placeholder="Enter"
                  value={formData.followUpLastDate}
                  onChange={(e) =>
                    handleInputChange("followUpLastDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Next Follow-up Date
                </label>
                <input
                  type="date"
                  value={formData.followUpNextDate}
                  onChange={(e) =>
                    handleInputChange("followUpNextDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows="3"
                value={formData.followUpNotes}
                onChange={(e) =>
                  handleInputChange("followUpNotes", e.target.value)
                }
                placeholder="Enter description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Customer Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Customer Details
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prospect
              </label>
              <input
                type="text"
                value={formData.prospect}
                onChange={(e) => handleInputChange("prospect", e.target.value)}
                placeholder="Enter prospect name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) =>
                  handleInputChange("contactPerson", e.target.value)
                }
                placeholder="Enter contact person name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email ID*
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number*
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    handleInputChange("mobileNumber", e.target.value)
                  }
                  placeholder="Enter mobile number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    handleInputChange("department", e.target.value)
                  }
                  placeholder="Enter department"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                    handleInputChange("designation", e.target.value)
                  }
                  placeholder="Enter designation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Address
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address line 1
              </label>
              <input
                type="text"
                placeholder="Enter Address Line 1"
                value={formData.addressLine1}
                onChange={(e) =>
                  handleInputChange("addressLine1", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Landmark*
                </label>
                <input
                  type="text"
                  placeholder="Enter Landmark"
                  value={formData.landmark}
                  onChange={(e) =>
                    handleInputChange("landmark", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street*
                </label>
                <input
                  type="text"
                  placeholder="Enter Street"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Pincode Full Row */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode*
              </label>
              <input
                type="text"
                placeholder="Enter Pincode"
                value={formData.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                maxLength={6}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State*
                </label>
                <input
                  type="text"
                  value={formData.state}
                  readOnly
                  placeholder="Auto-filled"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quotation Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Quotation Details
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quotation Date
              </label>
              <input
                type="date"
                value={formData.quotationDate}
                onChange={(e) =>
                  handleInputChange("quotationDate", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quotation V No
                </label>
                <input
                  type="text"
                  value={formData.quotationNo}
                  onChange={(e) =>
                    handleInputChange("quotationNo", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quotation Value
                </label>
                <input
                  type="text"
                  value={formData.quotationValue}
                  onChange={(e) =>
                    handleInputChange("quotationValue", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Closure Target
              </label>
              <input
                type="text"
                placeholder="Enter Closure Target"
                value={formData.closureTarget}
                onChange={(e) =>
                  handleInputChange("closureTarget", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Lead Qualification */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Lead Qualification
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lead Source
              </label>
              <input
                type="text"
                placeholder="Enter Lead Source"
                value={formData.leadSource}
                onChange={(e) =>
                  handleInputChange("leadSource", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) =>
                    handleInputChange("eventDate", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Location
                </label>
                <input
                  type="text"
                  value={formData.eventLocation}
                  onChange={(e) =>
                    handleInputChange("eventLocation", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <input
                type="text"
                placeholder="Enter Service"
                value={formData.service}
                onChange={(e) => handleInputChange("service", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Internal Assignment */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Internal Assignment
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BDE
              </label>
              <select
                value={formData.bde}
                onChange={(e) => handleInputChange("bde", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select</option>
                <option value="john-doe">John Doe</option>
                <option value="jane-smith">Jane Smith</option>
                <option value="mike-johnson">Mike Johnson</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Servicing Person
              </label>
              <select
                value={formData.clientServicingPerson}
                onChange={(e) =>
                  handleInputChange("clientServicingPerson", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select</option>
                <option value="sarah-wilson">Sarah Wilson</option>
                <option value="david-brown">David Brown</option>
                <option value="lisa-garcia">Lisa Garcia</option>
              </select>
            </div>
          </div>

          {/* Additional Briefs & Comments */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Additional Briefs & Comments
            </h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Briefs
              </label>
              <textarea
                rows="3"
                placeholder="Enter Brief"
                value={formData.briefs}
                onChange={(e) => handleInputChange("briefs", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Comments
              </label>
              <textarea
                rows="3"
                placeholder="Enter Comments"
                value={formData.comments}
                onChange={(e) => handleInputChange("comments", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Control */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">
              Control:
            </h2>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Active Status*
              </label>
              <div
                onClick={() =>
                  handleInputChange("activeStatus", !formData.activeStatus)
                }
                className={`relative w-12 h-6 rounded-full cursor-pointer transition-colors ${
                  formData.activeStatus ? "bg-orange-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    formData.activeStatus ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFunnelTracker;