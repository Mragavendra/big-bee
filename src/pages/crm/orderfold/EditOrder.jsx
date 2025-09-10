import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const EditOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the order ID from URL params
  const [formData, setFormData] = useState({
    order_id: "",
    order_date: "",
    order_value: "",
    quotation_id: "",
    quotation_date: "",
    prospect: "",
    contact_person: "",
    email_id: "",
    mobile_number: "",
    department: "",
    designation: "",
    address_line1: "",
    landmark: "",
    street: "",
    state: "",
    city: "",
    pincode: "",
    base_amount: "",
    gst_percent: "",
    gst_value: "",
    discount: "",
    final_total: "",
    event_date: "",
    event_location: "",
    service: "",
    bde: "",
    client_servicing_person: "",
    active_status: true,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  // Fetch order data by ID
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${id}`);
        const data = response.data;
        setFormData({
          order_id: data.order_id || "",
          order_date: data.order_date || "",
          order_value: data.order_value || "",
          quotation_id: data.quotation_id || "",
          quotation_date: data.quotation_date || "",
          prospect: data.prospect || "",
          contact_person: data.contact_person || "",
          email_id: data.email_id || "",
          mobile_number: data.mobile_number || "",
          department: data.department || "",
          designation: data.designation || "",
          address_line1: data.address_line1 || "",
          landmark: data.landmark || "",
          street: data.street || "",
          state: data.state || "",
          city: data.city || "",
          pincode: data.pincode || "",
          base_amount: data.base_amount || "",
          gst_percent: data.gst_percent || "",
          gst_value: data.gst_value || "",
          discount: data.discount || "",
          final_total: data.final_total || "",
          event_date: data.event_date || "",
          event_location: data.event_location || "",
          service: data.service || "",
          bde: data.bde || "",
          client_servicing_person: data.client_servicing_person || "",
          active_status: data.active_status || true,
        });
        setSnackbar({
          open: true,
          message: "Order data loaded successfully",
          severity: "success",
        });
      } catch (error) {
        console.error("Error fetching order data:", error);
        setSnackbar({
          open: true,
          message: "Failed to fetch order data",
          severity: "error",
        });
      }
    };
    fetchOrder();
  }, [id]);

  // Generate random Order ID if empty
  useEffect(() => {
    const generateOrderId = () => {
      const randomNum = Math.floor(100 + Math.random() * 900);
      return `ORD-${randomNum}`;
    };
    if (!formData.order_id) {
      setFormData((prev) => ({
        ...prev,
        order_id: generateOrderId(),
      }));
    }
  }, [formData.order_id]);

  // Handle pincode change and fetch state/city
  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
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
    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${id}`, formData);
      console.log("Form Data Submitted:", response.data);
      setSnackbar({
        open: true,
        message: "Order updated successfully",
        severity: "success",
      });
      setTimeout(() => navigate("/order"), 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error submitting form:", error);
      setSnackbar({
        open: true,
        message: "Failed to update order",
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Order</h1>
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
                    name="order_id"
                    value={formData.order_id}
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
                    name="order_date"
                    value={formData.order_date}
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
                  name="order_value"
                  value={formData.order_value}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
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
                    name="quotation_id"
                    value={formData.quotation_id}
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
                    name="quotation_date"
                    value={formData.quotation_date}
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
                  placeholder="Enter Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
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
                    name="email_id"
                    value={formData.email_id}
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
                    name="mobile_number"
                    value={formData.mobile_number}
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
                  Address line 1
                </label>
                <input
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LandMark*
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Enter Description"
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
                  name="base_amount"
                  value={formData.base_amount}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
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
                    name="gst_percent"
                    value={formData.gst_percent}
                    onChange={handleInputChange}
                    placeholder="Enter GST"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GST / Tax Value
                  </label>
                  <input
                    type="text"
                    name="gst_value"
                    value={formData.gst_value}
                    onChange={handleInputChange}
                    placeholder="Enter GST %"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount(if any)
                </label>
                <input
                  type="text"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Final Total
                </label>
                <input
                  type="text"
                  name="final_total"
                  value={formData.final_total}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
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
                    name="event_date"
                    value={formData.event_date}
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
                    name="event_location"
                    value={formData.event_location}
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
                  placeholder="Enter Description"
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
                  placeholder="Enter Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Servicing Person
                </label>
                <input
                  type="text"
                  name="client_servicing_person"
                  value={formData.client_servicing_person}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Control Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Control:
            </h2>
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-700 mr-4">
                Active Status*
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="active_status"
                  checked={formData.active_status}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div
                  className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer transition-colors ${
                    formData.active_status ? "bg-orange-500" : "bg-gray-200"
                  }`}
                >
                  <div
                    className={`dot absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform ${
                      formData.active_status ? "transform translate-x-5" : ""
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

export default EditOrder;