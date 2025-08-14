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
} from "@mui/material";
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
  // NEW: optional Overall Status column
  showOverallStatus = false,
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

  // For Overall Status popup (Pending / Finalized)
  const [openStatusDialog, setOpenStatusDialog] = useState(false);
  const [statusRow, setStatusRow] = useState(null);

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

  // ===== Overall Status (Pending / Finalized) =====
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
  // ================================================

  // Count fixed action columns:
  // 1 (Status) + optional Overall Status + View? + Edit? + Delete?
  const actionCount =
    1 +
    (showOverallStatus ? 1 : 0) +
    (disableView ? 0 : 1) +
    (disableEdit ? 0 : 1) +
    (disableDelete ? 0 : 1);

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">{title}</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            label={searchPlaceholder}
            variant="outlined"
            size="small"
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            sx={{ minWidth: 320 }}
          />
          {uniqueCategories.length > 0 && (
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>{categoryLabel}</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
              >
                <MenuItem value="All">{categoryLabel}</MenuItem>
                {uniqueCategories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {uniqueStatuses.length > 0 && (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>{statusLabel}</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              >
                <MenuItem value="All">{statusLabel}</MenuItem>
                {uniqueStatuses.map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
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
                  indeterminate={selected.length > 0 && selected.length < data.length}
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id} align="center" sx={{ fontWeight: "bold" }}>
                  {column.label}
                </TableCell>
              ))}
              {/* Fixed Status column */}
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
              {/* Optional Overall Status column */}
              {showOverallStatus && (
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Overall Status
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
                      <TableCell key={`${row.id}-${column.id}`} align="center">
                        {column.render ? column.render(row[column.id], row) : String(row[column.id] || "N/A")}
                      </TableCell>
                    ))}

                    {/* Status switch (Active/Inactive) */}
                    <TableCell align="center">
                      <Switch
                        checked={row[statusField] === "Active"}
                        onChange={() => toggleStatus(row)}
                        sx={{
                          "& .MuiSwitch-switchBase": {
                            color: "#fff",
                            "&.Mui-checked": { color: "#fff" },
                            "&.Mui-checked + .MuiSwitch-track": { backgroundColor: "#1976d2" },
                          },
                          "& .MuiSwitch-track": { backgroundColor: "#ff1100ff" },
                        }}
                      />
                    </TableCell>

                    {/* Optional Overall Status pill */}
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
                                ? "rgba(253, 230, 138, 0.6)" // amber-ish
                                : "rgba(229, 231, 235, 0.9)", // gray-ish
                            color:
                              (row.overallStatus || "Pending") === "Finalized"
                                ? "#b45309" // amber-700
                                : "#374151", // gray-700
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
                                  ? "#f59e0b" // amber dot
                                  : "#111827", // near-black dot
                              borderRadius: "50%",
                              display: "inline-block",
                            }}
                          />
                          {row.overallStatus || "Pending"}
                        </Button>
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
                <TableCell colSpan={columns.length + actionCount + 1} align="center">
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

      {/* Delete confirmation */}
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

      {/* View dialog */}
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
            onClick={() =>
              handleExportPDF("view-dialog-content", `${title}-${viewData?.id ?? ""}`)
            }
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

      {/* Overall Status dialog (only if feature is enabled) */}
      {showOverallStatus && (
        <Dialog open={openStatusDialog} onClose={() => setOpenStatusDialog(false)}>
          <DialogTitle>Change Overall Status</DialogTitle>
          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={1} sx={{ mt: 1, minWidth: 260 }}>
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
    </Box>
  );
};

export default DynamicTable;
