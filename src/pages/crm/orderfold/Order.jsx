import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import DynamicTable from "../../../table/DynamicTable";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AddIcon from "@mui/icons-material/Add";

const OrderTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = [
    { id: "sNo", label: "Sl No", width: 80 },
    { id: "orderId", label: "Order ID", width: 100 },
    { id: "orderDate", label: "Order Date", width: 100 },
    { id: "prospect", label: "Prospect", width: 180 },
    { id: "orderValue", label: "Order Value", width: 120 },
    { id: "finalTotal", label: "Final Total", width: 120 },
    { id: "eventDate", label: "Event Date", width: 100 },
    { id: "eventLocation", label: "Event Location", width: 120 },
    { id: "activeStatus", label: "Status", width: 100 },
  ];

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/orders");
        if (!response.status === 200) {
          throw new Error(`Server error: ${response.status}`);
        }

        const apiData = response.data;
        // Map API response to table data structure
        const mappedData = apiData.map((item, index) => ({
          sNo: index + 1,
          id: item.id?.toString() || "",
          orderId: item.order_id || "",
          orderDate: item.order_date
            ? new Date(item.order_date).toLocaleDateString("en-GB")
            : "",
          prospect: item.prospect || "",
          orderValue: item.order_value
            ? `₹${item.order_value.toLocaleString()}`
            : "",
          finalTotal: item.final_total
            ? `₹${item.final_total.toLocaleString()}`
            : "",
          eventDate: item.event_date
            ? new Date(item.event_date).toLocaleDateString("en-GB")
            : "",
          eventLocation: item.event_location || "",
          activeStatus: item.active_status ? "Active" : "Inactive",
        }));

        setData(mappedData);
        setError(null);
        setSnackbar({
          open: true,
          message: "Orders fetched successfully!",
          severity: "success",
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders. Please try again.");
        setData([]);
        setSnackbar({
          open: true,
          message:
            error.response?.data?.message ||
            "Failed to fetch orders. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const headerButtons = [
    {
      label: "Import",
      variant: "outlined",
      size: "small",
      startIcon: <UploadFileIcon />,
      onClick: () => navigate(`${location.pathname}/import`),
      props: { sx: { textTransform: "none" } },
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg font-medium text-gray-900">
          Loading Orders...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-6">
        <div className="text-red-500 text-lg font-medium mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

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
      <DynamicTable
        title="Order List"
        columns={columns}
        data={data}
        rowsPerPage={10}
        headerButtons={headerButtons}
        addButtonLabel="Add Order"
        addButtonProps={{
          color: "primary",
          size: "small",
          startIcon: <AddIcon />,
          sx: { textTransform: "none" },
          onClick: () => navigate("/add-order"),
        }}
        searchPlaceholder="Search for order"
        categoryLabel="All Categories"
        statusLabel="All Status"
        disableEdit={false}
        disableDelete={false}
        disableView={true}
        showAssignColumn={false}
      />
    </div>
  );
};

export default OrderTable;