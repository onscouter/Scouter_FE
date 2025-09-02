import React from "react";
import { TablePagination } from "@mui/material";

interface TablePaginationFooterProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TablePaginationFooter: React.FC<TablePaginationFooterProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      sx={{
        px: 2,
        py: 1,
        borderTop: "1px solid",
        borderColor: "divider",
        fontSize: 14,
      }}
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      rowsPerPageOptions={[5, 10, 25]}
    />
  );
};

export default TablePaginationFooter;
