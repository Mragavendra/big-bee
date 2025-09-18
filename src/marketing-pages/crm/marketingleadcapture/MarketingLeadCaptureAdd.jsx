import React, { useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";

const MarketingLeadCaptureEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    enquiryNo: "",
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
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fetch existing lead
  useEffect(() => {
    const fetchLead = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/marketing-leads/${id}`);
        const data = await res.json();
        if (res.ok) {
          const lead = data.data;
          setFormData({
            enquiryNo: lead.enquiry_no || "",
            leadDate: lead.lead_date ? new Date(lead.lead_date) : new Date(),
            leadType: lead.lead_type || "",
            leadSource: lead.lead_source || "",
            notes: lead.notes || "",
            prospect: lead.prospect || "",
            contactPerson: lead.contact_person || "",
            emailId: lead.email_id || "",
            mobileNumber: lead.mobile_number || "",
            department: lead.department || "",
            designation: lead.designation || "",
            addressLine1: lead.address_line1 || "",
            state: lead.state || "",
            city: lead.city || "",
            pincode: lead.pincode || "",
            bde: lead.bde || "",
            clientServicingPerson: lead.client_servicing_person || "",
            activeStatus: lead.active_status ?? true,
          });
        } else {
          alert("Failed to fetch lead data");
        }
      } catch (error) {
        console.error("Error fetching lead:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLead();
  }, [id]);

  // Save updated lead
  const handleUpdate = async () => {
    const payload = {
      enquiry_no: formData.enquiryNo,
      lead_date: formData.leadDate
        ? formData.leadDate.toISOString().split("T")[0]
        : null,
      lead_type: formData.leadType,
      lead_source: formData.leadSource,
      notes: formData.notes,
      prospect: formData.prospect,
      contact_person: formData.contactPerson,
      email_id: formData.emailId,
      mobile_number: formData.mobileNumber,
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

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/marketing-leads/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Lead updated successfully!");
        navigate("/marketing-lead-capture");
      } else {
        alert("Error updating lead: " + data.message);
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch City & State from Pincode
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

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading lead data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Edit Lead</h1>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className={`px-6 py-2 text-white text-sm font-medium rounded-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Basic Lead Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Basic Lead Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enquiry No*
                  </label>
                  <input
                    type="text"
                    value={formData.enquiryNo}
                    onChange={(e) =>
                      handleInputChange("enquiryNo", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Date*
                  </label>
                  <DatePicker
                    selected={formData.leadDate}
                    onChange={(date) => handleInputChange("leadDate", date)}
                    dateFormat="dd-MM-yyyy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Type*
                  </label>
                  <div className="relative">
                    <select
                      value={formData.leadType}
                      onChange={(e) =>
                        handleInputChange("leadType", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white"
                    >
                      <option value=""></option>
                      <option value="hot">Hot Lead</option>
                      <option value="warm">Warm Lead</option>
                      <option value="cold">Cold Lead</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Source*
                  </label>
                  <div className="relative">
                    <select
                      value={formData.leadSource}
                      onChange={(e) =>
                        handleInputChange("leadSource", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white"
                    >
                      <option value=""></option>
                      <option value="website">Website</option>
                      <option value="referral">Referral</option>
                      <option value="social">Social Media</option>
                      <option value="email">Email Campaign</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Enter Description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Address</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address line 1
                  </label>
                  <input
                    type="text"
                    value={formData.addressLine1}
                    onChange={(e) =>
                      handleInputChange("addressLine1", e.target.value)
                    }
                    placeholder="Enter Description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                      {loadingPincode && (
                        <div className="absolute right-3 top-2.5">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City*
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="City"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State*
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      placeholder="State"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Client Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Client Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prospect
                    </label>
                    <input
                      type="text"
                      value={formData.prospect}
                      onChange={(e) =>
                        handleInputChange("prospect", e.target.value)
                      }
                      placeholder="Enter Description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email ID*
                    </label>
                    <input
                      type="email"
                      value={formData.emailId}
                      onChange={(e) =>
                        handleInputChange("emailId", e.target.value)
                      }
                      placeholder="Enter Email address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) =>
                        handleInputChange("department", e.target.value)
                      }
                      placeholder="Enter Department"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        handleInputChange("contactPerson", e.target.value)
                      }
                      placeholder="Enter Description"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number*
                    </label>
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) =>
                        handleInputChange("mobileNumber", e.target.value)
                      }
                      placeholder="Enter Mobile Number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) =>
                        handleInputChange("designation", e.target.value)
                      }
                      placeholder="Enter Designation"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Assignment */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Internal Assignment
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BDE
                  </label>
                  <div className="relative">
                    <select
                      value={formData.bde}
                      onChange={(e) => handleInputChange("bde", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white"
                    >
                      <option value="">Select</option>
                      <option value="bde1">BDE 1</option>
                      <option value="bde2">BDE 2</option>
                      <option value="bde3">BDE 3</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Servicing Person
                  </label>
                  <div className="relative">
                    <select
                      value={formData.clientServicingPerson}
                      onChange={(e) =>
                        handleInputChange("clientServicingPerson", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-white"
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

            {/* Control */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Control:</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Active Status*
                </label>
                <div
                  className={`w-11 h-6 ${
                    formData.activeStatus ? "bg-orange-500" : "bg-gray-300"
                  } rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out flex items-center`}
                  onClick={() =>
                    handleInputChange("activeStatus", !formData.activeStatus)
                  }
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ease-in-out flex items-center justify-center ${
                      formData.activeStatus ? "translate-x-5" : "translate-x-0"
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
    </div>
  );
};

export default MarketingLeadCaptureEdit;

