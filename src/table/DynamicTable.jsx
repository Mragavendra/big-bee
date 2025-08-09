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
} from "@mui/material";
import {
  Visibility as ViewIcon,
  PictureAsPdf as PdfIcon,
  Print as PrintIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
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
  headerButtons = [], // [{ label, variant, startIcon, onClick, size }]
  searchPlaceholder = "Search for item",
  categoryLabel = "All Category",
  statusLabel = "All Status",
  addButtonLabel = "Add New",
  addButtonProps = {}, // pass color / size etc
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewData, setViewData] = useState(null);

  useEffect(() => {
    if (Array.isArray(initialData) && initialData.length > 0) {
      setData(initialData);
    } else {
      setData([]);
    }
  }, [initialData]);

  // derive unique filters from current data
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
    const basePath = location.pathname.replace(/\/$/, ""); // remove trailing slash
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

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: true,
      useCORS: true,
    });
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
            .print-container { width: 210mm; min-height: 297mm; padding: 10mm; box-sizing: border-box; }
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

  const ViewDialog = ({ open, onClose, data }) => {
    if (!data) return null;
    return (
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>{title} Details</DialogTitle>
        <DialogContent>
          <div id="view-dialog-content" style={{ padding: 20 }}>
            {columns.map((column) => (
              <div key={column.id} style={{ marginBottom: 15 }}>
                <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                  {column.label}:
                </Typography>
                <Typography variant="body1">
                  {String(data[column.id] || "N/A")}
                </Typography>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button
            onClick={() =>
              handleExportPDF("view-dialog-content", `${title}-${data.id}`)
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
    );
  };

  const actionCount =
    1 + (disableView ? 0 : 1) + (disableEdit ? 0 : 1) + (disableDelete ? 0 : 1);

  return (
    <Box>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
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
                label={categoryLabel}
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
                label={statusLabel}
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

          {/* Render extra header buttons (Assign, Import, etc.) */}
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

          {/* Add button */}
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
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
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
              paginatedData.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={`${row.id}-${column.id}`} align="center">
                      {column.render
                        ? column.render(row[column.id], row)
                        : String(row[column.id] || "N/A")}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <IconButton onClick={() => toggleStatus(row)}>
                      {row[statusField] === "Active" ? (
                        <ActiveIcon color="success" />
                      ) : (
                        <InactiveIcon color="error" />
                      )}
                    </IconButton>
                  </TableCell>
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
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor: "rgba(251, 146, 60, 0.04)",
                            boxShadow: "0 1px 2px 0 rgba(251, 146, 60, 0.15)",
                            transform: "translateY(-1px)",
                          },
                          borderRadius: "8px",
                          fontWeight: 600,
                          px: 2.5,
                          py: 1,
                          transition: "all 0.25s ease",
                          letterSpacing: "0.025em",
                          borderWidth: "1px",
                          "&:active": {
                            transform: "translateY(0)",
                            boxShadow: "none",
                          },
                          "& .MuiTouchRipple-root": {
                            color: "#ea580c",
                          },
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
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor: "rgba(220, 38, 38, 0.04)",
                            boxShadow: "0 1px 2px 0 rgba(220, 38, 38, 0.15)",
                            transform: "translateY(-1px)",
                          },
                          borderRadius: "8px",
                          fontWeight: 600,
                          px: 2.5,
                          py: 1,
                          transition: "all 0.25s ease",
                          letterSpacing: "0.025em",
                          borderWidth: "1px",
                          "&:active": {
                            transform: "translateY(0)",
                            boxShadow: "none",
                          },
                          "& .MuiTouchRipple-root": {
                            color: "#dc2626",
                          },
                          ml: 1.5,
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + actionCount}
                  align="center"
                >
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
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* View dialog */}
      <ViewDialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        data={viewData}
      />
    </Box>
  );
};

export default DynamicTable;
