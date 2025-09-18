import React, { useState, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const MarketingLeadCaptureEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    enquiryNo: "",
    leadDate: "",
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

  useEffect(() => {
    const fetchLead = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/marketing-leads/${id}`);
        if (!res.ok) throw new Error("Failed to fetch lead data");
        const { data } = await res.json();

        setFormData({
          enquiryNo: data.enquiry_no || "",
          leadDate: data.lead_date ? data.lead_date.split("T")[0] : "",
          leadType: data.lead_type || "",
          leadSource: data.lead_source || "",
          notes: data.notes || "",
          prospect: data.prospect || "",
          contactPerson: data.contact_person || "",
          emailId: data.email_id || "",
          mobileNumber: data.mobile_number || "",
          department: data.department || "",
          designation: data.designation || "",
          addressLine1: data.address_line1 || "",
          state: data.state || "",
          city: data.city || "",
          pincode: data.pincode || "",
          bde: data.bde || "",
          clientServicingPerson: data.client_servicing_person || "",
          activeStatus: data.active_status ?? true,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load lead data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLead();
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const apiData = {
        enquiry_no: formData.enquiryNo,
        lead_date: formData.leadDate,
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

      const res = await fetch(`http://localhost:5000/api/marketing-leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      if (!res.ok) throw new Error("Failed to update lead");

      alert("Lead updated successfully!");
      navigate("/marketing-lead-capture");
    } catch (err) {
      console.error(err);
      alert("Failed to update lead.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading lead data...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mx-auto bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">Edit Lead</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/marketing-lead-capture")}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-orange-500 text-white text-sm font-medium rounded-md hover:bg-orange-600"
            >
              Update
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Basic Lead Details */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Basic Lead Details</h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Enquiry No */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enquiry No*</label>
                <input
                  type="text"
                  value={formData.enquiryNo}
                  onChange={(e) => handleInputChange("enquiryNo", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Lead Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Date*</label>
                <input
                  type="date"
                  value={formData.leadDate}
                  onChange={(e) => handleInputChange("leadDate", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Lead Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Type*</label>
                <div className="relative">
                  <select
                    value={formData.leadType}
                    onChange={(e) => handleInputChange("leadType", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="hot">Hot Lead</option>
                    <option value="warm">Warm Lead</option>
                    <option value="cold">Cold Lead</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Lead Source */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source*</label>
                <div className="relative">
                  <select
                    value={formData.leadSource}
                    onChange={(e) => handleInputChange("leadSource", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="social">Social Media</option>
                    <option value="email">Email Campaign</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Notes */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Client Info & Internal Assignment */}
          <div className="grid grid-cols-2 gap-x-12 mb-8">
            {/* Client Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Client Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prospect</label>
                  <input
                    type="text"
                    value={formData.prospect}
                    onChange={(e) => handleInputChange("prospect", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email ID*</label>
                    <input
                      type="email"
                      value={formData.emailId}
                      onChange={(e) => handleInputChange("emailId", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number*</label>
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <input
                      type="text"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => handleInputChange("designation", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Assignment */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Internal Assignment</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">BDE</label>
                  <div className="relative">
                    <select
                      value={formData.bde}
                      onChange={(e) => handleInputChange("bde", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select BDE</option>
                      <option value="bde1">BDE1</option>
                      <option value="bde2">BDE2</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Servicing Person
                  </label>
                  <div className="relative">
                    <select
                      value={formData.clientServicingPerson}
                      onChange={(e) => handleInputChange("clientServicingPerson", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select Person</option>
                      <option value="person1">Person1</option>
                      <option value="person2">Person2</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Toggle Active Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Active Status*</label>
                  <div
                    className={`w-11 h-6 ${formData.activeStatus ? "bg-orange-500" : "bg-gray-300"} rounded-full p-0.5 cursor-pointer transition-colors duration-200 ease-in-out flex items-center`}
                    onClick={() => handleInputChange("activeStatus", !formData.activeStatus)}
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

          {/* Address */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-6">Address</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address line 1</label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State*</label>
                  <div className="relative">
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
                  <div className="relative">
                    <select
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">Select</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode*</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => handleInputChange("pincode", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
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
