import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
} from "@mui/material";
import TableHeader, { type HeadCell } from "./TableHeader";
import type { Order } from "@/types/filters";

interface TableViewProps<T> {
  total: number;
  rows: T[];
  headCells: HeadCell[];
  renderRow: (row: T) => React.ReactNode;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  order: Order;
  orderBy: keyof T;
  onRequestSort: (property: keyof T) => void;
  rowsPerPageOptions: number[];
}

function TableView<T>({
  total,
  rows,
  headCells,
  renderRow,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  order,
  orderBy,
  onRequestSort,
  rowsPerPageOptions,
}: TableViewProps<T>) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
        <Table
          size="small"
          stickyHeader
          sx={{ minWidth: 900, width: "100%", tableLayout: "fixed" }}
        >
          <TableHead>
            <TableHeader<T>
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={(_, prop) => onRequestSort(prop)}
            />
          </TableHead>
          <TableBody>{rows.map((row) => renderRow(row))}</TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, newPage) => onPageChange(newPage + 1)}
        onRowsPerPageChange={(e) => {
          const newLimit = parseInt(e.target.value, 10);
          onRowsPerPageChange(newLimit);
          onPageChange(1);
        }}
        rowsPerPageOptions={
          rowsPerPageOptions.length ? rowsPerPageOptions : [total || 5]
        }
      />
    </Paper>
  );
}

export default TableView;
