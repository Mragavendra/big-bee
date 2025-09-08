import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ActionEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [action, setAction] = useState({
    action_name: "",
    description: "",
    is_active: true,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Snackbar Close
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch action by id
  useEffect(() => {
    const fetchAction = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/actions/${id}`);
        const data = await res.json();
        setAction(data);
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to fetch action",
          severity: "error",
        });
      }
    };
    fetchAction();
  }, [id]);

  // Handle input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle Active
  const toggleActiveStatus = () => {
    setAction((prev) => ({
      ...prev,
      is_active: !prev.is_active,
    }));
  };

  // Update API
  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/actions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action),
      });

      if (res.ok) {
        setSnackbar({
          open: true,
          message: "Action updated successfully!",
          severity: "success",
        });
        setTimeout(() => navigate("/settings/action"), 1500);
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error updating action",
        severity: "error",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Action
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/settings/action")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
            >
              Update
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Action Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">
              Action Details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Action Name
                </label>
                <input
                  type="text"
                  name="action_name"
                  value={action.action_name}
                  onChange={handleInputChange}
                  placeholder="Enter Action Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={action.description}
                  onChange={handleInputChange}
                  placeholder="Enter Description"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Control */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Control:</h2>
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 mr-4">
                Active Status*
              </label>
              <div
                className={`relative inline-flex h-8 w-14 items-center rounded-full cursor-pointer transition-colors ${
                  action.is_active ? "bg-orange-500" : "bg-gray-200"
                }`}
                onClick={toggleActiveStatus}
              >
                <div
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    action.is_active ? "translate-x-7" : "translate-x-1"
                  } shadow-sm`}
                >
                  {action.is_active && (
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

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <MuiAlert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{
              width: "100%",
              backgroundColor:
                snackbar.severity === "success" ? "green" : "red",
              color: "white",
            }}
            elevation={6}
            variant="filled"
          >
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ActionEdit;
