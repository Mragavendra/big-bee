import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Stack,
  Pagination,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  Switch,
  Chip,           // Add this
  Rating,         // Add this
  FormControlLabel, // Add this
} from "@mui/material";

// Also add this for the star icon
import StarIcon from "@mui/icons-material/Star";
import {
  Visibility as ViewIcon,
  PictureAsPdf as PdfIcon,
  Print as PrintIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const DynamicTable = ({
  columns,
  data: initialData = [],
  rowsPerPage = 10,
  apiEndpoint,
  addRoute = "add",
  editRoute = "edit",
  title = "",
  disableAdd = false,
  disableEdit = false,
  disableDelete = false,
  disableView = false,
  statusField = "status",
  categoryField = "category",
  headerButtons = [],
  searchPlaceholder = "Search for item",
  categoryLabel = "All Category",
  statusLabel = "All Status",
  addButtonLabel = "Add New",
  addButtonProps = {},
  showOverallStatus = false,
  showAssignColumn = false,
  showExtraOverallStatus = false,
  showActionColumn = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [statusRow, setStatusRow] = useState(null);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [assignRow, setAssignRow] = useState(null);
  const [assignBDE, setAssignBDE] = useState("");
  const [assignCSE, setAssignCSE] = useState("");

  const [openRateDialog, setOpenRateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [actionRow, setActionRow] = useState(null);

  useEffect(() => {
    if (Array.isArray(initialData) && initialData.length > 0) {
      setData(initialData);
    } else {
      setData([]);
    }
  }, [initialData]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleCheckboxClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const uniqueCategories = [
    ...new Set(data.map((item) => item[categoryField]).filter(Boolean)),
  ];
  const uniqueStatuses = [
    ...new Set(data.map((item) => item[statusField]).filter(Boolean)),
  ];

  const filteredData = data.filter((row) => {
    const matchesSearch = columns.some((column) =>
      String(row[column.id] || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    const matchesCategory =
      categoryFilter === "All" || row[categoryField] === categoryFilter;
    const matchesStatus =
      statusFilter === "All" || row[statusField] === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const paginatedData = filteredData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));

  const handleEdit = (row) => {
    const basePath = location.pathname.replace(/\/$/, "");
    navigate(`${basePath}/${editRoute}/${row.id}`);
  };

  const handleDeleteClick = (row) => {
    setSelectedRow(row);
    setOpenDeleteDialog(true);
  };

  const handleView = async (row) => {
    try {
      if (apiEndpoint) {
        const response = await axios.get(`${apiEndpoint}/${row.id}`);
        setViewData(response.data);
      } else {
        setViewData(row);
      }
      setOpenViewDialog(true);
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleAdd = () => {
    navigate(`${location.pathname}/${addRoute}`);
  };

  const handleConfirmDelete = async () => {
    if (selectedRow && apiEndpoint) {
      try {
        await axios.delete(`${apiEndpoint}/${selectedRow.id}`);
        setData(data.filter((row) => row.id !== selectedRow.id));
      } catch (error) {
        console.error("Error deleting:", error);
      }
    } else if (selectedRow) {
      setData(data.filter((row) => row.id !== selectedRow.id));
    }
    setOpenDeleteDialog(false);
  };

  const handleExportPDF = async (elementId, fileName) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(canvas);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(canvas, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  };

  const handlePrint = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print ${title}</title>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; padding: 0; }
            .print-container { width: 210mm; min-height: 297mm; padding: 10mm; }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${element.innerHTML}
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); window.close(); }, 300);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const toggleStatus = async (row) => {
    try {
      const updatedRow = {
        ...row,
        [statusField]: row[statusField] === "Active" ? "Inactive" : "Active",
      };
      if (apiEndpoint) {
        await axios.put(`${apiEndpoint}/${row.id}`, updatedRow);
      }
      setData(data.map((item) => (item.id === row.id ? updatedRow : item)));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleStatusClick = (row) => {
    setStatusRow(row);
    setOpenStatusDialog(true);
  };

  const handleStatusChange = async (newStatus) => {
    if (!statusRow) return;
    const updatedRow = { ...statusRow, overallStatus: newStatus };
    try {
      if (apiEndpoint) {
        await axios.put(`${apiEndpoint}/${statusRow.id}`, updatedRow);
      }
      setData((prev) =>
        prev.map((r) => (r.id === statusRow.id ? updatedRow : r))
      );
    } catch (error) {
      console.error("Error updating overall status:", error);
    }
    setOpenStatusDialog(false);
  };

  const handleAssignClick = (row) => {
    setAssignRow(row);
    setAssignBDE("");
    setAssignCSE("");
    setOpenAssignDialog(true);
  };

  const handleAssignSend = () => {
    console.log("Assign Lead", {
      rowId: assignRow?.id,
      BDE: assignBDE,
      CSE: assignCSE,
    });
    setOpenAssignDialog(false);
  };

  const handleActionView = (row) => {
    setActionRow(row);
    setOpenViewDialog(true);
    setViewData(row);
  };

  const handleActionRate = (row) => {
    setActionRow(row);
    setOpenRateDialog(true);
  };

  const handleActionEdit = (row) => {
    setActionRow(row);
    setOpenEditDialog(true);
  };

  // Calculate total columns for colspan
  const totalColumns = 
    1 + // Checkbox column
    columns.length + // Data columns
    (showAssignColumn ? 1 : 0) + // Assign column
    1 + // Status column
    (showOverallStatus ? 1 : 0) + // Overall Status column
    (showExtraOverallStatus ? 1 : 0) + // Extra Overall Status column
    (showActionColumn ? 1 : 0) + // Action column
    (!disableView ? 1 : 0) + // View column
    (!disableEdit ? 1 : 0) + // Edit column
    (!disableDelete ? 1 : 0); // Delete column

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">{title}</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            label={searchPlaceholder}
            variant="outlined"
            size="small"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            sx={{ minWidth: 320 }}
          />

          {uniqueCategories.length > 0 && (
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>{categoryLabel}</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value="All">{categoryLabel}</MenuItem>
                {uniqueCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {uniqueStatuses.length > 0 && (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{statusLabel}</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <MenuItem value="All">{statusLabel}</MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {headerButtons.map((btn, idx) => (
            <Button
              key={idx}
              variant={btn.variant || "outlined"}
              size={btn.size || "small"}
              startIcon={btn.startIcon}
              onClick={btn.onClick}
              sx={{ textTransform: "none" }}
              {...(btn.props || {})}
            >
              {btn.label}
            </Button>
          ))}

          {!disableAdd && (
            <Button
              variant={addButtonProps.variant || "contained"}
              size={addButtonProps.size || "small"}
              onClick={handleAdd}
              sx={{ textTransform: "none" }}
              {...addButtonProps}
            >
              {addButtonLabel}
            </Button>
          )}
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={
                    selected.length > 0 && selected.length < data.length
                  }
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "center"}
                  sx={{ fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}

              {showAssignColumn && (
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Assign
                </TableCell>
              )}
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              {showOverallStatus && (
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Overall Status
                </TableCell>
              )}
              {showExtraOverallStatus && (
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Overall Status
                </TableCell>
              )}
              {showActionColumn && (
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              )}

              {!disableView && (
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  View
                </TableCell>
              )}
              {!disableEdit && (
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Edit
                </TableCell>
              )}
              {!disableDelete && (
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Delete
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow key={row.id} hover selected={isItemSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => handleCheckboxClick(event, row.id)}
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell
                        key={`${row.id}-${column.id}`}
                        align={column.align || "center"}
                      >
                        {column.render
                          ? column.render(row[column.id], row)
                          : String(row[column.id] || "N/A")}
                      </TableCell>
                    ))}

                    {showAssignColumn && (
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            textTransform: "none",
                            backgroundColor: "#f97316",
                            "&:hover": { backgroundColor: "#ea580c" },
                          }}
                          onClick={() => handleAssignClick(row)}
                        >
                          Assign
                        </Button>
                      </TableCell>
                    )}

                    <TableCell align="center">
                      <Switch
                        checked={row[statusField] === "Active"}
                        onChange={() => toggleStatus(row)}
                        sx={{
                          "& .MuiSwitch-switchBase": {
                            color: "#fff",
                            "&.Mui-checked": { color: "#fff" },
                            "&.Mui-checked + .MuiSwitch-track": {
                              backgroundColor: "#1976d2",
                            },
                          },
                          "& .MuiSwitch-track": { backgroundColor: "#ff1100ff" },
                        }}
                      />
                    </TableCell>

                    {showOverallStatus && (
                      <TableCell align="center">
                        <Button
                          onClick={() => handleStatusClick(row)}
                          sx={{
                            borderRadius: "20px",
                            padding: "4px 12px",
                            fontSize: "0.85rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            textTransform: "none",
                            backgroundColor:
                              (row.overallStatus || "Pending") === "Finalized"
                                ? "rgba(253, 230, 138, 0.6)"
                                : "rgba(229, 231, 235, 0.9)",
                            color:
                              (row.overallStatus || "Pending") === "Finalized"
                                ? "#b45309"
                                : "#374151",
                            "&:hover": {
                              backgroundColor:
                                (row.overallStatus || "Pending") === "Finalized"
                                  ? "rgba(253, 230, 138, 0.8)"
                                  : "rgba(209, 213, 219, 0.9)",
                            },
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              backgroundColor:
                                (row.overallStatus || "Pending") === "Finalized"
                                  ? "#f59e0b"
                                  : "#111827",
                              borderRadius: "50%",
                              display: "inline-block",
                            }}
                          />
                          {row.overallStatus || "Pending"}
                        </Button>
                      </TableCell>
                    )}

                    {showExtraOverallStatus && (
                      <TableCell align="center">
                        <Button
                          onClick={() => handleStatusClick(row)}
                          sx={{
                            borderRadius: "20px",
                            padding: "4px 12px",
                            fontSize: "0.85rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            textTransform: "none",
                            backgroundColor:
                              (row.overallStatus || "Pending") === "Finalized"
                                ? "rgba(253, 230, 138, 0.6)"
                                : "rgba(229, 231, 235, 0.9)",
                            color:
                              (row.overallStatus || "Pending") === "Finalized"
                                ? "#b45309"
                                : "#374151",
                            "&:hover": {
                              backgroundColor:
                                (row.overallStatus || "Pending") === "Finalized"
                                  ? "rgba(253, 230, 138, 0.8)"
                                  : "rgba(209, 213, 219, 0.9)",
                            },
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              backgroundColor:
                                (row.overallStatus || "Pending") === "Finalized"
                                  ? "#f59e0b"
                                  : "#111827",
                              borderRadius: "50%",
                              display: "inline-block",
                            }}
                          />
                          {row.overallStatus || "Pending"}
                        </Button>
                      </TableCell>
                    )}

                    {showActionColumn && (
                      <TableCell align="center">
                        {row.overallStatus === "Finalized" ? (
                          <>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleActionView(row)}
                              sx={{ mr: 1 }}
                            >
                              View
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handleActionEdit(row)}
                            >
                              Edit
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleActionView(row)}
                              sx={{ mr: 1 }}
                            >
                              View
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="secondary"
                              onClick={() => handleActionRate(row)}
                            >
                              Rate
                            </Button>
                          </>
                        )}
                      </TableCell>
                    )}

                    {!disableView && (
                      <TableCell align="center">
                        <IconButton onClick={() => handleView(row)}>
                          <ViewIcon color="primary" />
                        </IconButton>
                      </TableCell>
                    )}

                    {!disableEdit && (
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleEdit(row)}
                          sx={{
                            textTransform: "none",
                            borderColor: "#fb923c",
                            color: "#ea580c",
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    )}

                    {!disableDelete && (
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleDeleteClick(row)}
                          sx={{
                            textTransform: "none",
                            borderColor: "#fecaca",
                            color: "#dc2626",
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={totalColumns} align="center">
                  <Typography>No data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack spacing={2} sx={{ mt: 2, alignItems: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this record?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>{title} Details</DialogTitle>
        <DialogContent>
          <div id="view-dialog-content" style={{ padding: 20 }}>
            {columns.map((column) => (
              <div key={column.id} style={{ marginBottom: 15 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {column.label}:
                </Typography>
                <Typography>{String(viewData?.[column.id] ?? "N/A")}</Typography>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          <Button
            onClick={() => handleExportPDF("view-dialog-content", `${title}-${viewData?.id ?? ""}`)}
            startIcon={<PdfIcon />}
            variant="contained"
            color="primary"
          >
            Export PDF
          </Button>
          <Button
            onClick={() => handlePrint("view-dialog-content")}
            startIcon={<PrintIcon />}
            variant="contained"
            color="secondary"
          >
            Print
          </Button>
        </DialogActions>
      </Dialog>

      {/* Overall Status Dialog - Show for both showOverallStatus and showExtraOverallStatus */}
      {(showOverallStatus || showExtraOverallStatus) && (
        <Dialog open={openStatusDialog} onClose={() => setOpenStatusDialog(false)}>
          <DialogTitle>Change Overall Status</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1, minWidth: 260 }}>
              <Button
                variant="outlined"
                onClick={() => handleStatusChange("Pending")}
                sx={{ textTransform: "none" }}
              >
                Pending
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleStatusChange("Finalized")}
                sx={{ textTransform: "none" }}
              >
                Finalized
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenStatusDialog(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Assign Dialog */}
      <Dialog open={openAssignDialog} onClose={() => setOpenAssignDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Assign Lead</DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>BDE</Typography>
            <FormControl fullWidth size="small">
              <Select
                value={assignBDE}
                onChange={(e) => setAssignBDE(e.target.value)}
                displayEmpty
                renderValue={(selected) => (selected ? selected : "Select")}
              >
                <MenuItem value=""><em>Select</em></MenuItem>
                <MenuItem value="Anand Kumar">Anand Kumar</MenuItem>
                <MenuItem value="Rajesh Singh">Rajesh Singh</MenuItem>
                <MenuItem value="Sneha Patil">Sneha Patil</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mt={3}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>CSE</Typography>
            <FormControl fullWidth size="small">
              <Select
                value={assignCSE}
                onChange={(e) => setAssignCSE(e.target.value)}
                displayEmpty
                renderValue={(selected) => (selected ? selected : "Select Specification")}
              >
                <MenuItem value=""><em>Select Specification</em></MenuItem>
                <MenuItem value="Priya Menon">Priya Menon</MenuItem>
                <MenuItem value="Kiran Desai">Kiran Desai</MenuItem>
                <MenuItem value="Vinay Sharma">Vinay Sharma</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenAssignDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleAssignSend}
            disabled={!assignBDE || !assignCSE}
            sx={{
              backgroundColor: "#fb6e0a",
              color: "white",
              textTransform: "none",
              "&:hover": { backgroundColor: "#e85a00" },
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
{/* Rate Dialog */}
<Dialog open={openRateDialog} onClose={() => setOpenRateDialog(false)} maxWidth="md" fullWidth>
  <DialogTitle>
    <div className="flex justify-between items-center">
      <span>Rate Event</span>
      <Chip 
        label={actionRow?.status || "Completed"} 
        color="success" 
        size="small" 
      />
    </div>
  </DialogTitle>
  
  <DialogContent>
    {/* Event Details */}
    <div className="mb-6">
      <Typography variant="h6" className="mb-3">Event Details</Typography>
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
        <div>
          <Typography variant="body2" className="text-gray-600">Event Name:</Typography>
          <Typography variant="body1" className="font-medium">
            {actionRow?.eventName || "Annual Tech Conference 2025"}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" className="text-gray-600">Event Date:</Typography>
          <Typography variant="body1" className="font-medium">
            {actionRow?.eventDate || "March 15, 2025"}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" className="text-gray-600">Venue:</Typography>
          <Typography variant="body1" className="font-medium">
            {actionRow?.venue || "Grand Convention Center"}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" className="text-gray-600">Organizer:</Typography>
          <Typography variant="body1" className="font-medium">
            {actionRow?.organizer || "Tech Solutions Inc."}
          </Typography>
        </div>
      </div>
    </div>

    {/* Rating Categories */}
    <div className="space-y-6">
      <Typography variant="h6" className="mb-4">Rate Event Performance</Typography>
      
      {/* Overall Event Rating */}
      <div>
        <Typography variant="subtitle1" className="mb-2 font-medium">
          Overall Event Experience
        </Typography>
        <div className="flex items-center gap-2">
          <Rating
            name="overall-rating"
            value={5}
            precision={0.5}
            size="large"
            onChange={(event, newValue) => {
              console.log('Overall rating:', newValue);
            }}
          />
          <Typography variant="body2" className="text-gray-600 ml-2">
            (5.0/5.0)
          </Typography>
        </div>
      </div>

      {/* Detailed Ratings */}
      <div className="grid grid-cols-1 gap-4">
        <div className="border rounded p-4">
          <Typography variant="subtitle2" className="mb-2">Event Organization</Typography>
          <div className="flex items-center justify-between">
            <Rating
              name="organization-rating"
              value={4.5}
              precision={0.5}
              onChange={(event, newValue) => {
                console.log('Organization rating:', newValue);
              }}
            />
            <Typography variant="body2" className="text-gray-600">4.5/5.0</Typography>
          </div>
        </div>

        <div className="border rounded p-4">
          <Typography variant="subtitle2" className="mb-2">Venue & Facilities</Typography>
          <div className="flex items-center justify-between">
            <Rating
              name="venue-rating"
              value={4.0}
              precision={0.5}
              onChange={(event, newValue) => {
                console.log('Venue rating:', newValue);
              }}
            />
            <Typography variant="body2" className="text-gray-600">4.0/5.0</Typography>
          </div>
        </div>

        <div className="border rounded p-4">
          <Typography variant="subtitle2" className="mb-2">Content Quality</Typography>
          <div className="flex items-center justify-between">
            <Rating
              name="content-rating"
              value={5.0}
              precision={0.5}
              onChange={(event, newValue) => {
                console.log('Content rating:', newValue);
              }}
            />
            <Typography variant="body2" className="text-gray-600">5.0/5.0</Typography>
          </div>
        </div>

        <div className="border rounded p-4">
          <Typography variant="subtitle2" className="mb-2">Networking Opportunities</Typography>
          <div className="flex items-center justify-between">
            <Rating
              name="networking-rating"
              value={4.5}
              precision={0.5}
              onChange={(event, newValue) => {
                console.log('Networking rating:', newValue);
              }}
            />
            <Typography variant="body2" className="text-gray-600">4.5/5.0</Typography>
          </div>
        </div>

        <div className="border rounded p-4">
          <Typography variant="subtitle2" className="mb-2">Value for Money</Typography>
          <div className="flex items-center justify-between">
            <Rating
              name="value-rating"
              value={4.0}
              precision={0.5}
              onChange={(event, newValue) => {
                console.log('Value rating:', newValue);
              }}
            />
            <Typography variant="body2" className="text-gray-600">4.0/5.0</Typography>
          </div>
        </div>
      </div>

      {/* Attendance & Statistics */}
      <div className="bg-blue-50 p-4 rounded">
        <Typography variant="subtitle1" className="mb-3 font-medium">Event Statistics</Typography>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Typography variant="h4" className="font-bold text-blue-600">
              {actionRow?.attendees || "450"}
            </Typography>
            <Typography variant="body2" className="text-gray-600">Total Attendees</Typography>
          </div>
          <div>
            <Typography variant="h4" className="font-bold text-green-600">
              {actionRow?.satisfaction || "92%"}
            </Typography>
            <Typography variant="body2" className="text-gray-600">Satisfaction Rate</Typography>
          </div>
          <div>
            <Typography variant="h4" className="font-bold text-purple-600">
              {actionRow?.nps || "8.5"}
            </Typography>
            <Typography variant="body2" className="text-gray-600">NPS Score</Typography>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <Typography variant="subtitle1" className="mb-2 font-medium">
          Additional Comments & Feedback
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder="Share your thoughts about the event, suggestions for improvement, or highlight what went exceptionally well..."
          variant="outlined"
          defaultValue="Excellent event overall! The keynote speakers were highly engaging and the networking sessions were well-organized. The venue was perfect and the technical setup was flawless. Would definitely recommend for future events."
        />
      </div>

      {/* Recommendation */}
      <div className="border-l-4 border-green-400 pl-4 py-2 bg-green-50">
        <Typography variant="subtitle2" className="font-medium text-green-800">
          Recommendation Status
        </Typography>
        <div className="flex items-center gap-4 mt-2">
          <FormControlLabel
            control={<Checkbox defaultChecked color="success" />}
            label="Would recommend this event to others"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked color="primary" />}
            label="Would attend future events by this organizer"
          />
        </div>
      </div>
    </div>
  </DialogContent>
  
  <DialogActions className="px-6 pb-4">
    <Button onClick={() => setOpenRateDialog(false)} color="inherit">
      Cancel
    </Button>
    <Button 
      variant="contained" 
      color="primary"
      startIcon={<StarIcon />}
      onClick={() => {
        console.log('Rating submitted');
        setOpenRateDialog(false);
      }}
    >
      Submit Rating
    </Button>
  </DialogActions>
</Dialog>

     <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="xl" fullWidth>
  <DialogTitle>
    <div className="flex justify-between items-center">
      <span>Edit KRA</span>
      <Button 
        onClick={() => setOpenEditDialog(false)}
        className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
      >
        Save
      </Button>
    </div>
  </DialogTitle>
  
  <DialogContent>
    {/* Employee Details */}
    <div className="mb-6">
      <Typography variant="h6" className="mb-4 font-semibold">Employee Details</Typography>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <Typography variant="body2" className="text-gray-600 mb-1">Employee Name</Typography>
          <Typography variant="body1">Ankit Sharma</Typography>
        </div>
        <div>
          <Typography variant="body2" className="text-gray-600 mb-1">Department</Typography>
          <Typography variant="body1">Project Management</Typography>
        </div>
        <div>
          <Typography variant="body2" className="text-gray-600 mb-1">Reporting Manager</Typography>
          <Typography variant="body1">Priya Menon</Typography>
        </div>
        <div>
          <Typography variant="body2" className="text-gray-600 mb-1">Month</Typography>
          <Typography variant="body1">July 2025</Typography>
        </div>
      </div>
    </div>

    {/* Job Performance Section */}
    <div className="mb-6">
      <Typography variant="h6" className="mb-4 font-semibold">A. Job Performance</Typography>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left text-xs">Sr no</th>
              <th className="border p-2 text-left text-xs">Key Parameters</th>
              <th className="border p-2 text-center text-xs">Weightage</th>
              <th className="border p-2 text-center text-xs">Emp. Rating</th>
              <th className="border p-2 text-left text-xs">Employee Justification</th>
              <th className="border p-2 text-center text-xs">Manager Rating</th>
              <th className="border p-2 text-left text-xs">Manager Comments</th>
              <th className="border p-2 text-center text-xs">Average Rating</th>
              <th className="border p-2 text-center text-xs">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center text-sm">1</td>
              <td className="border p-2 text-sm">Revenue Generation</td>
              <td className="border p-2 text-center text-sm">15</td>
              <td className="border p-2 text-center text-sm">15</td>
              <td className="border p-2 text-sm">Have identified 4 clients</td>
              <td className="border p-2 text-center">
                <input type="number" defaultValue="2" className="w-12 text-center border rounded p-1" />
              </td>
              <td className="border p-2">
                <input type="text" placeholder="Enter..." className="w-full border rounded p-1" />
              </td>
              <td className="border p-2 text-center text-sm">3</td>
              <td className="border p-2 text-center text-sm">9</td>
            </tr>
            <tr>
              <td className="border p-2 text-center text-sm">2</td>
              <td className="border p-2 text-sm">Lead Gen & Networking</td>
              <td className="border p-2 text-center text-sm">10</td>
              <td className="border p-2 text-center text-sm">10</td>
              <td className="border p-2 text-sm">Have created a pipeline</td>
              <td className="border p-2 text-center">
                <input type="number" defaultValue="1.5" className="w-12 text-center border rounded p-1" />
              </td>
              <td className="border p-2">
                <input type="text" placeholder="Enter..." className="w-full border rounded p-1" />
              </td>
              <td className="border p-2 text-center text-sm">2.75</td>
              <td className="border p-2 text-center text-sm">5.5</td>
            </tr>
            <tr>
              <td className="border p-2 text-center text-sm">3</td>
              <td className="border p-2 text-sm">Client Relationship Management</td>
              <td className="border p-2 text-center text-sm">7.5</td>
              <td className="border p-2 text-center text-sm">7.5</td>
              <td className="border p-2 text-sm">have created a client relationship with clients</td>
              <td className="border p-2 text-center">
                <input type="number" defaultValue="2" className="w-12 text-center border rounded p-1" />
              </td>
              <td className="border p-2">
                <input type="text" placeholder="Enter..." className="w-full border rounded p-1" />
              </td>
              <td className="border p-2 text-center text-sm">3</td>
              <td className="border p-2 text-center text-sm">4.5</td>
            </tr>
            <tr>
              <td className="border p-2 text-center text-sm">4</td>
              <td className="border p-2 text-sm">Proposal Development</td>
              <td className="border p-2 text-center text-sm">5</td>
              <td className="border p-2 text-center text-sm">5</td>
              <td className="border p-2 text-sm">Have worked with marketing and done the research</td>
              <td className="border p-2 text-center">
                <input type="number" defaultValue="2" className="w-12 text-center border rounded p-1" />
              </td>
              <td className="border p-2">
                <input type="text" placeholder="Enter..." className="w-full border rounded p-1" />
              </td>
              <td className="border p-2 text-center text-sm">3</td>
              <td className="border p-2 text-center text-sm">3</td>
            </tr>
            <tr>
              <td className="border p-2 text-center text-sm">5</td>
              <td className="border p-2 text-sm">Market Research & Strategy</td>
              <td className="border p-2 text-center text-sm">5</td>
              <td className="border p-2 text-center text-sm">5</td>
              <td className="border p-2 text-sm">have researched the clients needs and market</td>
              <td className="border p-2 text-center">
                <input type="number" defaultValue="2" className="w-12 text-center border rounded p-1" />
              </td>
              <td className="border p-2">
                <input type="text" placeholder="Enter..." className="w-full border rounded p-1" />
              </td>
              <td className="border p-2 text-center text-sm">3.5</td>
              <td className="border p-2 text-center text-sm">3.5</td>
            </tr>
            <tr>
              <td className="border p-2 text-center text-sm">6</td>
              <td className="border p-2 text-sm">Team Collaboration</td>
              <td className="border p-2 text-center text-sm">2.5</td>
              <td className="border p-2 text-center text-sm">2.5</td>
              <td className="border p-2 text-sm">have working with desgining and marketing team and coordinating</td>
              <td className="border p-2 text-center">
                <input type="number" defaultValue="2" className="w-12 text-center border rounded p-1" />
              </td>
              <td className="border p-2">
                <input type="text" placeholder="Enter..." className="w-full border rounded p-1" />
              </td>
              <td className="border p-2 text-center text-sm">3</td>
              <td className="border p-2 text-center text-sm">1.5</td>
            </tr>
            <tr>
              <td className="border p-2 text-center text-sm">7</td>
              <td className="border p-2 text-sm">Reporting & Documentation</td>
              <td className="border p-2 text-center text-sm">5</td>
              <td className="border p-2 text-center text-sm">5</td>
              <td className="border p-2 text-sm">doing it on the regular basis and done with sales reports</td>
              <td className="border p-2 text-center">
                <input type="number" defaultValue="3" className="w-12 text-center border rounded p-1" />
              </td>
              <td className="border p-2">
                <input type="text" placeholder="Enter..." className="w-full border rounded p-1" />
              </td>
              <td className="border p-2 text-center text-sm">4</td>
              <td className="border p-2 text-center text-sm">4</td>
            </tr>
            <tr className="bg-gray-100 font-semibold">
              <td colSpan="2" className="border p-2 text-center">A. Total %</td>
              <td className="border p-2 text-center">50</td>
              <td className="border p-2 text-center">30</td>
              <td className="border p-2"></td>
              <td className="border p-2 text-center">14.5</td>
              <td className="border p-2"></td>
              <td className="border p-2 text-center">22.5</td>
              <td className="border p-2 text-center">31.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Company Performance Section */}
    <div className="mb-6">
      <Typography variant="h6" className="mb-4 font-semibold">
        A. Company Performance - Revenue Target achievement [Min Criteria - 75% Target Achievement]
      </Typography>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-left text-xs">Sr no</th>
              <th className="border p-2 text-left text-xs">Key Parameters</th>
              <th className="border p-2 text-center text-xs">Weightage</th>
              <th className="border p-2 text-center text-xs">Target</th>
              <th className="border p-2 text-center text-xs">Achieved INR</th>
              <th className="border p-2 text-center text-xs">Achieved Percentage</th>
              <th className="border p-2 text-center text-xs">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 text-center text-sm">1</td>
              <td className="border p-2 text-sm">Revenue Generation</td>
              <td className="border p-2 text-center text-sm">15</td>
              <td className="border p-2 text-center text-sm">42000000</td>
              <td className="border p-2 text-center text-sm">23550000</td>
              <td className="border p-2 text-center text-sm">56.071259</td>
              <td className="border p-2 text-center text-sm">28.0</td>
            </tr>
            <tr className="bg-gray-100 font-semibold">
              <td colSpan="6" className="border p-2 text-center">B. Total %</td>
              <td className="border p-2 text-center">28.0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    {/* Final Score Section */}
    <div className="bg-gray-50 p-4 rounded mb-4">
      <div className="text-center space-y-2">
        <div>
          <span className="font-semibold text-lg">TOTAL FINAL SCORE (A+B) %: </span>
          <span className="font-bold text-lg">59.0</span>
        </div>
        <div>
          <span className="font-semibold text-lg">FINAL RATING: </span>
          <span className="font-bold text-lg text-orange-600">Improvement Plant Required</span>
        </div>
      </div>
    </div>
  </DialogContent>
  
  <DialogActions>
    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
    <Button variant="contained">Save</Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default DynamicTable;