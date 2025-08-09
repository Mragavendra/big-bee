import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, Share } from "@mui/icons-material";

/**
 * @param {{
 *  columns: { id: string, label: string, minWidth?: number, align?: string }[],
 *  rows: any[],
 *  title: string,
 *  onEdit?: (row: any) => void,
 *  onDelete?: (row: any) => void,
 *  onAssign?: (row: any) => void
 * }} props
 */
const DynamicTable = ({ columns, rows, title, onEdit, onDelete, onAssign }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ p: 2, borderBottom: "1px solid #ccc" }}
      >
        {title}
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="dynamic table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth || 100, fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
              {(onEdit || onDelete || onAssign) && (
                <TableCell align="center">Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || "left"}>
                        {value}
                      </TableCell>
                    );
                  })}
                  {(onEdit || onDelete || onAssign) && (
                    <TableCell align="center">
                      {onEdit && (
                        <Tooltip title="Edit">
                          <IconButton onClick={() => onEdit(row)} color="primary">
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip title="Delete">
                          <IconButton onClick={() => onDelete(row)} color="error">
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onAssign && (
                        <Tooltip title="Assign">
                          <IconButton onClick={() => onAssign(row)} color="secondary">
                            <Share />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DynamicTable;
