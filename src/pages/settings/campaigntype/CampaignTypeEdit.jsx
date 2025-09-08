// src/pages/settings/campaign-type/CampaignTypeEdit.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const API_URL = "http://localhost:5000/api/campaign-types";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CampaignTypeEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ get ID from URL params
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const [campaignData, setCampaignData] = useState({
    campaign_type: "",
    description: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // ✅ Fetch campaign type details by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        if (res.ok) {
          setCampaignData({
            campaign_type: data.campaign_type,
            description: data.description,
          });
          setIsActive(data.is_active);
        } else {
          setSnackbar({ open: true, message: data.message, severity: "error" });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setSnackbar({ open: true, message: "Failed to fetch data", severity: "error" });
      }
    };
    fetchData();
  }, [id]);

  // ✅ Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle update (PUT)
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...campaignData, is_active: isActive }),
      });

      const data = await res.json();
      if (res.ok) {
        setSnackbar({ open: true, message: "Campaign type updated successfully!", severity: "success" });
        setTimeout(() => navigate("/settings/campaign-type"), 1500);
      } else {
        setSnackbar({ open: true, message: data.message || "Update failed", severity: "error" });
      }
    } catch (error) {
      console.error("Error updating:", error);
      setSnackbar({ open: true, message: "Something went wrong", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Edit Campaign Type</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/settings/campaign-type")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Campaign Type Details</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Type</label>
                <input
                  type="text"
                  name="campaign_type"
                  value={campaignData.campaign_type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={campaignData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Control</h2>
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
                      <svg className="h-3 w-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
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

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CampaignTypeEdit;
