import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const AddOrder = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orderId: "",
    orderDate: "2025-06-20",
    orderValue: "",
    quotationId: "",
    quotationDate: "2025-06-20",
    prospect: "",
    contactPerson: "",
    emailId: "",
    mobileNumber: "",
    department: "",
    designation: "",
    addressLine1: "",
    landmark: "",
    street: "",
    state: "",
    city: "",
    pincode: "",
    baseAmount: "",
    gstPercent: "",
    gstValue: "",
    discount: "",
    finalTotal: "",
    eventDate: "",
    eventLocation: "",
    service: "",
    bde: "",
    clientServicingPerson: "",
    activeStatus: true,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Generate random Order ID (ORD-XXX)
  useEffect(() => {
    const generateOrderId = () => {
      const randomNum = Math.floor(100 + Math.random() * 900);
      return `ORD-${randomNum}`;
    };
    setFormData((prev) => ({
      ...prev,
      orderId: generateOrderId(),
    }));
  }, []);

  // Handle pincode change and fetch state/city
  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    // Validate pincode: must be up to 6 digits, numeric
    if (!/^\d{0,6}$/.test(pincode)) {
      setSnackbar({
        open: true,
        message: "Pincode must be a 6-digit number",
        severity: "error",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      pincode,
      state: "",
      city: "",
    }));

    if (pincode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = response.data[0];
        if (data.Status === "Success" && data.PostOffice && data.PostOffice.length > 0) {
          const { State, District } = data.PostOffice[0];
          setFormData((prev) => ({
            ...prev,
            state: State || "",
            city: District || "",
          }));
          setSnackbar({
            open: true,
            message: "Pincode data fetched successfully",
            severity: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message: "Invalid pincode or no data found",
            severity: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching pincode data:", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch pincode data. Please check your connection or try again later.",
          severity: "error",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields validation
    const requiredFields = [
      "orderId",
      "orderDate",
      "quotationId",
      "quotationDate",
      "emailId",
      "mobileNumber",
      "landmark",
      "street",
      "pincode",
      "state",
      "city",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      setSnackbar({
        open: true,
        message: `Please fill in all required fields: ${missingFields
          .map((field) => field.replace(/([A-Z])/g, " $1").trim())
          .join(", ")}`,
        severity: "error",
      });
      return;
    }

    // Map formData to API payload
    const payload = {
      order_id: formData.orderId,
      order_date: formData.orderDate,
      order_value: Number(formData.orderValue) || 0,
      quotation_id: formData.quotationId,
      quotation_date: formData.quotationDate,
      prospect: formData.prospect,
      contact_person: formData.contactPerson,
      email_id: formData.emailId,
      mobile_number: formData.mobileNumber,
      department: formData.department,
      designation: formData.designation,
      address_line1: formData.addressLine1,
      landmark: formData.landmark,
      street: formData.street,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      base_amount: Number(formData.baseAmount) || 0,
      gst_percent: Number(formData.gstPercent) || 0,
      gst_value: Number(formData.gstValue) || 0,
      discount: Number(formData.discount) || 0,
      final_total: Number(formData.finalTotal) || 0,
      event_date: formData.eventDate,
      event_location: formData.eventLocation,
      service: formData.service,
      bde: formData.bde,
      client_servicing_person: formData.clientServicingPerson,
      active_status: formData.activeStatus,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/create",
        payload
      );
      console.log("API Response:", response.data);
      setSnackbar({
        open: true,
        message: "Order created successfully!",
        severity: "success",
      });
      // Navigate to /order after a short delay to show the Snackbar
      setTimeout(() => navigate("/order"), 2000);
    } catch (error) {
      console.error("Error creating order:", error);
      setSnackbar({
        open: true,
        message:
          error.response?.data?.message ||
          "Failed to create order. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCancel = () => {
    navigate("/order");
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="mx-auto p-6 min-h-screen">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ backgroundColor: "#4caf50", color: "#fff" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Add Order</h1>
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Order Details Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Details
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order ID*
                  </label>
                  <input
                    type="text"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Date*
                  </label>
                  <input
                    type="date"
                    name="orderDate"
                    value={formData.orderDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Value
                </label>
                <input
                  type="text"
                  name="orderValue"
                  value={formData.orderValue}
                  onChange={handleInputChange}
                  placeholder="Enter Order Value"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quotation ID*
                  </label>
                  <input
                    type="text"
                    name="quotationId"
                    value={formData.quotationId}
                    onChange={handleInputChange}
                    placeholder="Enter Quotation ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quotation Date*
                  </label>
                  <input
                    type="date"
                    name="quotationDate"
                    value={formData.quotationDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Customer Details Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Customer Details
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prospect
                </label>
                <input
                  type="text"
                  name="prospect"
                  value={formData.prospect}
                  onChange={handleInputChange}
                  placeholder="Enter Prospect"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Enter Contact Person"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID*
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    placeholder="Enter Email Address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number*
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Mobile Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Enter Department"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Enter Designation"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Address Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Address
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Enter Address Line 1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Landmark*
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Enter Landmark"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street*
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    placeholder="Enter Street"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode*
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handlePincodeChange}
                  placeholder="Enter Pincode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State*
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter State"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Enter City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Financials Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Financials
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Amount
                </label>
                <input
                  type="text"
                  name="baseAmount"
                  value={formData.baseAmount}
                  onChange={handleInputChange}
                  placeholder="Enter Base Amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST %
                  </label>
                  <input
                    type="text"
                    name="gstPercent"
                    value={formData.gstPercent}
                    onChange={handleInputChange}
                    placeholder="Enter GST %"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST / Tax Value
                  </label>
                  <input
                    type="text"
                    name="gstValue"
                    value={formData.gstValue}
                    onChange={handleInputChange}
                    placeholder="Enter GST Value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount (if any)
                </label>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="Enter Discount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Final Total
                </label>
                <input
                  type="text"
                  name="finalTotal"
                  value={formData.finalTotal}
                  onChange={handleInputChange}
                  placeholder="Enter Final Total"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Event Details Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Event Details
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    placeholder="Select Event Date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Location
                  </label>
                  <input
                    type="text"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleInputChange}
                    placeholder="Enter Event Location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service
                </label>
                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  placeholder="Enter Service"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Internal Assignment Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Internal Assignment
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  BDE
                </label>
                <input
                  type="text"
                  name="bde"
                  value={formData.bde}
                  onChange={handleInputChange}
                  placeholder="Enter BDE"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Servicing Person
                </label>
                <input
                  type="text"
                  name="clientServicingPerson"
                  value={formData.clientServicingPerson}
                  onChange={handleInputChange}
                  placeholder="Enter Client Servicing Person"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Control Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Control
            </h2>
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-4">
                Active Status*
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="activeStatus"
                  checked={formData.activeStatus}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer transition-colors ${
                    formData.activeStatus ? "bg-orange-500" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`dot absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform ${
                      formData.activeStatus ? "transform translate-x-5" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;